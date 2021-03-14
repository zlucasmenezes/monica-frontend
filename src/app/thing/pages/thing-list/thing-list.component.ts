import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { IProjectPopulated } from 'src/app/project/project.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SocketIOService } from 'src/app/shared/socket-io/socket-io.service';
import arrayUtils from 'src/app/shared/utils/array-utils';
import { IThingPopulated } from '../../thing.model';
import { ProjectService } from './../../../project/project.service';
import { ThingService } from './../../thing.service';

@Component({
  selector: 'm-thing-list',
  templateUrl: './thing-list.component.html',
  styleUrls: ['./thing-list.component.scss'],
})
export class ThingListComponent implements OnInit, OnDestroy {
  public project: IProjectPopulated;

  public things: IThingPopulated[];

  public thingsFiltered$: ReplaySubject<IThingPopulated[]> = new ReplaySubject<IThingPopulated[]>(1);
  public thingsFilter = new FormControl();

  public boardStatus: { [boardId: string]: boolean } = {};

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private thingService: ThingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private socketIOService: SocketIOService,
    private notificationService: NotificationService
  ) {}

  async ngOnInit() {
    this.project = await this.getProject();
    this.thingsFiltered$.next((this.things = arrayUtils.orderBy(await this.getThings(this.getProjectId()), 'DESC', 'updatedAt')));

    this.subscribeForm();

    this.joinRooms();
    this.subscribeBoardStatus();
    this.subscribeUpcomingChanges();
  }

  ngOnDestroy() {
    this.socketIOService.leaveAll();
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private getProjectId(): string {
    return this.activatedRoute.snapshot.paramMap.get('projectId');
  }

  private async getProject(): Promise<IProjectPopulated> {
    return await this.projectService.getProject(this.getProjectId());
  }

  private async getThing(projectId: string, thingId: string): Promise<IThingPopulated> {
    return await this.thingService.getThing(projectId, thingId);
  }

  private async getThings(projectId: string): Promise<IThingPopulated[]> {
    return await this.thingService.getThings(projectId);
  }

  private joinRooms() {
    this.things.forEach(thing => {
      this.socketIOService.join(`thing:${thing._id}`);
    });
  }

  private async subscribeForm() {
    this.thingsFilter.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe((value: string) => {
      this.filterThings(value);
    });
  }

  public async subscribeBoardStatus(): Promise<void> {
    this.things.forEach(async thing => {
      const boardStatus$ = await this.thingService.getBoardStatus(this.getProjectId(), thing._id);

      boardStatus$.pipe(takeUntil(this.onDestroy$)).subscribe(boardStatus => {
        this.boardStatus[boardStatus.board] = boardStatus.status;
      });
    });
  }

  private async subscribeUpcomingChanges() {
    const updateThing = async (thingId: string) => {
      const updated = await this.getThing(this.getProjectId(), thingId);
      this.things = this.things.map(original => (original._id === updated._id ? updated : original));
      this.filterThings(this.thingsFilter.value);
    };

    this.socketIOService
      .on('update_devices')
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(async data => {
        console.log('update_devices', data.id);
        updateThing(data.id);
      });
    this.socketIOService
      .on('upcoming_changes')
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(async data => {
        console.log('upcoming_changes', data.id);
        updateThing(data.id);
      });
  }

  public goTo(thing: IThingPopulated) {
    this.router.navigate([`project/${this.getProjectId()}/thing/${thing._id}`]);
  }

  public add() {
    this.router.navigate([`project/${this.getProjectId()}/thing/create`]);
  }

  public edit(thing: IThingPopulated) {
    this.router.navigate([`project/${this.getProjectId()}/thing/edit/${thing._id}`]);
  }

  public remove(thing: IThingPopulated) {
    console.log(`${thing._id}`);
  }

  public showBoardCredentials(thing: IThingPopulated) {
    this.thingService.getBoardCredentials(this.getProjectId(), thing._id);
  }

  public isAdmin(): boolean {
    if (!this.project) {
      return false;
    }
    return this.project.admin._id === this.authService.getTokenData().userId;
  }

  public filterThings(filter: string) {
    const fields = ['name', 'type'];
    this.thingsFiltered$.next(arrayUtils.filter(this.things, filter ? filter : '', fields));
  }

  public applyUpcomingChanges(thing: IThingPopulated) {
    this.thingService
      .applyUpcomingChanges(thing.project._id, thing._id)
      .then(statusMessage => {
        this.notificationService.show(statusMessage);
      })
      .catch(console.error);
  }

  public hasUpcomingChanges(thing: IThingPopulated): boolean {
    return (
      thing.sensors.some(sensor => {
        return sensor.upcomingChanges ? true : false;
      }) ||
      thing.relays.some(relay => {
        return relay.upcomingChanges ? true : false;
      })
    );
  }
}
