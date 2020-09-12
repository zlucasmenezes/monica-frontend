import { SocketIOService } from 'src/app/shared/socket-io/socket-io.service';
import { SensorService } from './../../../sensor/sensor.service';
import { ISensorPopulated } from './../../../sensor/sensor.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProjectPopulated } from 'src/app/project/project.model';
import { IThingPopulated } from '../../thing.model';
import { ReplaySubject, Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ThingService } from '../../thing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/project/project.service';
import { ICardMenuItem } from 'src/app/shared/components/card/card.model';
import arrayUtils from 'src/app/shared/utils/array-utils';
import { FormControl } from '@angular/forms';
import { takeUntil, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'm-thing-details',
  templateUrl: './thing-details.component.html',
  styleUrls: ['./thing-details.component.scss']
})
export class ThingDetailsComponent implements OnInit, OnDestroy {

  public project: IProjectPopulated;
  public thing: IThingPopulated;

  public sensors: ISensorPopulated[];
  public sensorsFiltered$: ReplaySubject<ISensorPopulated[]> = new ReplaySubject<ISensorPopulated[]>(1);
  public sensorsMenuItems: ReplaySubject<ICardMenuItem[]> = new ReplaySubject<ICardMenuItem[]>(1);
  public sensorsFilter = new FormControl();

  private onDestroy: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private thingService: ThingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private sensorService: SensorService,
    private socketIOService: SocketIOService
  ) {
    this.socketIOService.join(`thing:${this.getThingId()}`);
  }

  async ngOnInit(): Promise<void> {
    this.project = await this.getProject();
    this.thing = await this.getThing();

    this.sensorsFiltered$.next(this.sensors = arrayUtils.orderBy(await this.getSensors(), 'ASC', 'name'));
    this.subscribeForm();

    this.subscribeSensorsMenuItems();
  }

  private subscribeForm(): void {
    this.sensorsFilter.valueChanges.pipe(takeUntil(this.onDestroy))
    .subscribe((value: string) => {
      this.filterSensors(value);
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

  public subscribeSensorsMenuItems(): void {
    this.sensorsFiltered$.pipe(takeUntil(this.onDestroy))
    .subscribe((sensorsFiltered) => {
      const sensors = {};

      sensorsFiltered.forEach(s => {
        if (!sensors[s.type.type]) { sensors[s.type.type] = {}; }
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

  public isAdmin(): boolean {
    if (!this.project) { return false; }
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

  ngOnDestroy(): void {
    this.socketIOService.leave(`thing:${this.getThingId()}`);
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
