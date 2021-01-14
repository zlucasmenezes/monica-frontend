import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { IProjectPopulated } from 'src/app/project/project.model';
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

  private socketIOEventsSubscription: Subscription[] = [];
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private thingService: ThingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private socketIOService: SocketIOService
  ) {}

  async ngOnInit() {
    this.project = await this.getProject();
    this.thingsFiltered$.next((this.things = arrayUtils.orderBy(await this.getThings(this.project._id), 'DESC', 'updatedAt')));
    this.subscribeForm();
    this.subscribeUpcomingChanges();
  }

  ngOnDestroy() {
    this.socketIOService.leaveAll();
    this.socketIOEventsSubscription.forEach(sub => sub.unsubscribe());
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

  private async subscribeForm() {
    this.thingsFilter.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe((value: string) => {
      this.filterThings(value);
    });
  }

  private async subscribeUpcomingChanges() {
    this.thingsFiltered$.pipe(takeUntil(this.onDestroy$)).subscribe(things => {
      things.forEach(thing => {
        this.socketIOService.join(`thing:${thing._id}`);
      });

      const updateThing = async (thingId: string) => {
        const updated = await this.getThing(this.getProjectId(), thingId);
        this.thingsFiltered$.next(things.map(original => (original._id === updated._id ? updated : original)));
      };

      this.socketIOEventsSubscription.forEach(sub => sub.unsubscribe());
      this.socketIOEventsSubscription = [
        this.socketIOService.on('update_devices').subscribe(async data => {
          updateThing(data.id);
        }),
        this.socketIOService.on('upcoming_changes').subscribe(async data => {
          updateThing(data.id);
        }),
      ];
    });
  }

  public goTo(thing: IThingPopulated) {
    this.router.navigate([`project/${this.project._id}/thing/${thing._id}`]);
  }

  public add() {
    this.router.navigate([`project/${this.project._id}/thing/create`]);
  }

  public edit(thing: IThingPopulated) {
    this.router.navigate([`project/${this.project._id}/thing/edit/${thing._id}`]);
  }

  public remove(thing: IThingPopulated) {
    console.log(`${thing._id}`);
  }

  public update(thing: IThingPopulated) {
    this.thingService
      .applyUpcomingChanges(thing.project._id, thing._id)
      .then(statusMessage => {
        console.log(statusMessage);
      })
      .catch(console.error);
  }

  public isAdmin(): boolean {
    if (!this.project) {
      return false;
    }
    return this.project.admin._id === this.authService.getTokenData().userId;
  }

  public filterThings(filter: string) {
    const fields = ['name', 'type'];
    this.thingsFiltered$.next(arrayUtils.filter(this.things, filter, fields));
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
