import { SensorService } from './../../../sensor/sensor.service';
import { ISensorPopulated } from './../../../sensor/sensor.model';
import { Component, OnInit } from '@angular/core';
import { IProjectPopulated } from 'src/app/project/project.model';
import { IThingPopulated } from '../../thing.model';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ThingService } from '../../thing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/project/project.service';
import { ICardMenuItem } from 'src/app/shared/components/card/card.model';
import arrayUtils from 'src/app/shared/utils/array-utils';

@Component({
  selector: 'm-thing-details',
  templateUrl: './thing-details.component.html',
  styleUrls: ['./thing-details.component.scss']
})
export class ThingDetailsComponent implements OnInit {

  public project: IProjectPopulated;
  public thing: IThingPopulated;

  public sensors: ISensorPopulated[];
  public sensorsMenuItems: ICardMenuItem[];

  private onDestroy: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private thingService: ThingService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private sensorService: SensorService
  ) { }

  async ngOnInit(): Promise<void> {
    this.project = await this.getProject();
    this.thing = await this.getThing();
    this.sensors = arrayUtils.orderBy(await this.getSensors(), 'ASC', 'name');
    this.sensorsMenuItems = this.getSensorsMenuItems();
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

  public getSensorsMenuItems(): ICardMenuItem[] {
    if (!this.sensors) { return []; }

    return arrayUtils.orderBy(
      this.sensors.map((s: ISensorPopulated) => {
        return { _id: s._id, label: `${s.type.type}: ${s.name}` };
      }),
      'ASC', 'label');
  }

  public isAdmin(): boolean {
    if (!this.project) { return false; }
    return this.project.admin._id === this.authService.getTokenData().userId;
  }

  public addSensor() {
    this.router.navigate([`project/${this.project._id}/thing/${this.thing._id}/sensor/create`]);
  }

  public editSensor(event) {
    // this.router.navigate([`project/${this.project._id}/thing/${this.thing._id}/sensor/create`]);
    console.log(event);
  }

}
