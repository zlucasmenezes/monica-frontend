import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { IProjectPopulated } from 'src/app/project/project.model';
import { ProjectService } from 'src/app/project/project.service';
import { IRelayPopulated } from 'src/app/relay/relay.model';
import { RelayService } from 'src/app/relay/relay.service';
import { ICardMenuItem } from 'src/app/shared/components/card/card.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SocketIOService } from 'src/app/shared/socket-io/socket-io.service';
import arrayUtils from 'src/app/shared/utils/array-utils';
import { IThingPopulated } from '../../thing.model';
import { ThingService } from '../../thing.service';
import { ISensorPopulated } from './../../../sensor/sensor.model';
import { SensorService } from './../../../sensor/sensor.service';
import { IBoardStatus } from './../../thing.model';

@Component({
  selector: 'm-thing-details',
  templateUrl: './thing-details.component.html',
  styleUrls: ['./thing-details.component.scss'],
})
export class ThingDetailsComponent implements OnInit, OnDestroy {
  public project: IProjectPopulated;
  public thing: IThingPopulated;

  public sensors: ISensorPopulated[];
  public sensorsFiltered$: ReplaySubject<ISensorPopulated[]> = new ReplaySubject<ISensorPopulated[]>(1);
  public sensorsMenuItems: ReplaySubject<ICardMenuItem[]> = new ReplaySubject<ICardMenuItem[]>(1);
  public sensorsFilter = new FormControl();

  public relays: IRelayPopulated[];
  public relaysFiltered$: ReplaySubject<IRelayPopulated[]> = new ReplaySubject<IRelayPopulated[]>(1);
  public relaysMenuItems: ReplaySubject<ICardMenuItem[]> = new ReplaySubject<ICardMenuItem[]>(1);
  public relaysFilter = new FormControl();

  public boardStatus: boolean;

  private socketIOEventsSubscription: Subscription[] = [];
  private onDestroy: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private thingService: ThingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private sensorService: SensorService,
    private relayService: RelayService,
    private socketIOService: SocketIOService,
    private notificationService: NotificationService
  ) {
    this.socketIOService.join(`thing:${this.getThingId()}`);
  }

  async ngOnInit(): Promise<void> {
    this.subscribeBoardStatus();

    this.project = await this.getProject();
    this.thing = await this.getThing();

    this.sensorsFiltered$.next((this.sensors = arrayUtils.orderBy(await this.getSensors(), 'ASC', 'name')));
    this.relaysFiltered$.next((this.relays = arrayUtils.orderBy(await this.getRelays(), 'ASC', 'name')));
    this.subscribeForm();

    this.subscribeUpcomingChanges();

    this.subscribeSensorsMenuItems();
    this.subscribeRelaysMenuItems();
  }

  ngOnDestroy(): void {
    this.socketIOService.leave(`thing:${this.getThingId()}`);
    this.socketIOEventsSubscription.forEach(sub => sub.unsubscribe());
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private subscribeForm(): void {
    this.sensorsFilter.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: string) => {
      this.filterSensors(value);
    });
    this.relaysFilter.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: string) => {
      this.filterRelays(value);
    });
  }

  private getProjectId(): string {
    return this.activatedRoute.snapshot.paramMap.get('projectId');
  }

  private async getProject(): Promise<IProjectPopulated> {
    return await this.projectService.getProject(this.getProjectId());
  }

  private getThingId(): string {
    return this.activatedRoute.snapshot.paramMap.get('thingId');
  }

  private async getThing(): Promise<IThingPopulated> {
    return await this.thingService.getThing(this.getProjectId(), this.getThingId());
  }

  private async getSensors(): Promise<ISensorPopulated[]> {
    return await this.sensorService.getSensors(this.getProjectId(), this.getThingId());
  }

  private async getRelays(): Promise<IRelayPopulated[]> {
    return await this.relayService.getRelays(this.getProjectId(), this.getThingId());
  }

  public async subscribeBoardStatus(): Promise<void> {
    const status$ = await this.thingService.getBoardStatus(this.getProjectId(), this.getThingId());

    status$
      .pipe(
        takeUntil(this.onDestroy),
        map((status: IBoardStatus) => status.status)
      )
      .subscribe(status => {
        this.boardStatus = status;
      });
  }

  private async subscribeUpcomingChanges() {
    const updateDevices = async () => {
      this.sensorsFiltered$.next((this.sensors = arrayUtils.orderBy(await this.getSensors(), 'ASC', 'name')));
      this.relaysFiltered$.next((this.relays = arrayUtils.orderBy(await this.getRelays(), 'ASC', 'name')));
    };

    this.socketIOEventsSubscription = [
      this.socketIOService.on('update_devices').subscribe(async () => {
        const notification = this.notificationService.show('Applying upcoming changes', null);
        await updateDevices();
        notification.dismiss();
        this.notificationService.show('Upcoming changes applied');
      }),
      this.socketIOService.on('upcoming_changes').subscribe(async () => {
        updateDevices();
      }),
    ];
  }

  public subscribeSensorsMenuItems(): void {
    this.sensorsFiltered$.pipe(takeUntil(this.onDestroy)).subscribe(sensorsFiltered => {
      const sensors = {};

      sensorsFiltered.forEach(s => {
        if (!sensors[s.type.type]) {
          sensors[s.type.type] = {};
        }
        sensors[s.type.type][s.name] = s._id;
      });

      const items: ICardMenuItem[] = [];
      Object.keys(sensors).forEach(item => {
        const subItems = [];

        Object.keys(sensors[item]).forEach(subItem => {
          subItems.push({ label: subItem, _id: sensors[item][subItem] });
        });

        items.push({ label: item, items: arrayUtils.orderBy(subItems, 'ASC', 'label') });
      });

      this.sensorsMenuItems.next(arrayUtils.orderBy(items, 'ASC', 'label'));
    });
  }

  public subscribeRelaysMenuItems(): void {
    this.relaysFiltered$.pipe(takeUntil(this.onDestroy)).subscribe(relaysFiltered => {
      const items: ICardMenuItem[] = relaysFiltered.map(relay => {
        return { _id: relay._id, label: relay.name };
      });

      this.relaysMenuItems.next(arrayUtils.orderBy(items, 'ASC', 'label'));
    });
  }

  public isAdmin(): boolean {
    if (!this.project) {
      return false;
    }
    return this.project.admin._id === this.authService.getTokenData().userId;
  }

  public addSensor(): void {
    this.router.navigate([`project/${this.project._id}/thing/${this.thing._id}/sensor/create`]);
  }

  public editSensor(id): void {
    this.router.navigate([`project/${this.project._id}/thing/${this.thing._id}/sensor/edit/${id}`]);
  }

  public filterSensors(filter: string): void {
    const fields = ['name', 'type.type'];
    this.sensorsFiltered$.next(arrayUtils.filter(this.sensors, filter, fields));
  }

  public addRelay(): void {
    this.router.navigate([`project/${this.project._id}/thing/${this.thing._id}/relay/create`]);
  }

  public editRelay(id): void {
    this.router.navigate([`project/${this.project._id}/thing/${this.thing._id}/relay/edit/${id}`]);
  }

  public filterRelays(filter: string): void {
    const fields = ['name'];
    this.relaysFiltered$.next(arrayUtils.filter(this.relays, filter, fields));
  }
}
