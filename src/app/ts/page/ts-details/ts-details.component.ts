import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as dayjs from 'dayjs';
import { Color, Label } from 'ng2-charts';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IProjectPopulated } from 'src/app/project/project.model';
import { ProjectService } from 'src/app/project/project.service';
import { IRelayPopulated } from 'src/app/relay/relay.model';
import { RelayService } from 'src/app/relay/relay.service';
import { ISensorPopulated } from 'src/app/sensor/sensor.model';
import { SensorService } from 'src/app/sensor/sensor.service';
import arrayUtils from 'src/app/shared/utils/array-utils';
import chartUtils from 'src/app/shared/utils/chart-utils';
import formUtils from 'src/app/shared/utils/form-utils';
import { IThingPopulated } from 'src/app/thing/thing.model';
import { ThingService } from 'src/app/thing/thing.service';
import { GetNameFromListPipe } from './../../../shared/pipes/get-name-from-list.pipe';
import { ITSValue } from './../../ts.model';
import { TSService } from './../../ts.service';

@Component({
  selector: 'm-ts-details',
  templateUrl: './ts-details.component.html',
  styleUrls: ['./ts-details.component.scss'],
})
export class TsDetailsComponent implements OnInit, OnDestroy {
  public form: FormGroup;

  public projectList: IProjectPopulated[];
  public projectFilteredList$: ReplaySubject<IProjectPopulated[]> = new ReplaySubject<IProjectPopulated[]>(1);
  public projectFilter = new FormControl();

  public thingList: IThingPopulated[];
  public thingFilteredList$: ReplaySubject<IThingPopulated[]> = new ReplaySubject<IThingPopulated[]>(1);
  public thingFilter = new FormControl();

  public sensorList: ISensorPopulated[];
  public sensorFilteredList$: ReplaySubject<ISensorPopulated[]> = new ReplaySubject<ISensorPopulated[]>(1);

  public relayList: IRelayPopulated[];
  public relayFilteredList$: ReplaySubject<IRelayPopulated[]> = new ReplaySubject<IRelayPopulated[]>(1);

  public deviceFilter = new FormControl();

  public loading = false;
  public downloading = false;

  public today = dayjs().endOf('day').toDate();
  public year2020 = new Date(2020, 0, 1);

  public showChart = false;
  public chartData: ChartDataSets[];
  public chartLabels: Label[];
  public chartOptions: ChartOptions;
  public chartColors: Color[];

  private onDestroy = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private thingService: ThingService,
    private sensorService: SensorService,
    private relayService: RelayService,
    private tsService: TSService
  ) {}

  async ngOnInit(): Promise<void> {
    this.projectFilteredList$.next((this.projectList = arrayUtils.orderBy(await this.getProjects(), 'ASC', 'name')));

    this.initForm();
    this.subscribeForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      project: [null, [Validators.required]],
      thing: [{ value: null, disabled: true }, [Validators.required]],
      devices: [{ value: null, disabled: true }, [Validators.required]],
      start: [null],
      end: [null],
    });
  }

  private subscribeForm(): void {
    this.projectFilter.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(value => {
      this.projectFilteredList$.next(this.filterProjects(value));
    });
    this.thingFilter.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(value => {
      this.thingFilteredList$.next(this.filterThings(value));
    });
    this.deviceFilter.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(value => {
      this.sensorFilteredList$.next(this.filterSensors(value));
      this.relayFilteredList$.next(this.filterRelays(value));
    });

    this.form
      .get('project')
      .valueChanges.pipe(takeUntil(this.onDestroy))
      .subscribe(async value => {
        this.form.get('thing').setValue(null);
        this.thingFilteredList$.next((this.thingList = arrayUtils.orderBy(await this.getThings(value), 'ASC', 'name')));
      });
    this.form
      .get('thing')
      .valueChanges.pipe(takeUntil(this.onDestroy))
      .subscribe(async value => {
        this.form.get('devices').setValue(null);
        if (value) {
          this.sensorFilteredList$.next(
            (this.sensorList = arrayUtils.orderBy(await this.getSensors(this.form.get('project').value, value), 'ASC', 'name'))
          );
          this.relayFilteredList$.next(
            (this.relayList = arrayUtils.orderBy(await this.getRelays(this.form.get('project').value, value), 'ASC', 'name'))
          );
        }
      });
    this.form
      .get('devices')
      .valueChanges.pipe(takeUntil(this.onDestroy))
      .subscribe(value => {
        if (value && value.length === 0) {
          this.form.get('devices').setValue(null);
        }
      });
    this.form
      .get('end')
      .valueChanges.pipe(takeUntil(this.onDestroy))
      .subscribe(value => {
        if (value && !dayjs(value as Date).isSame(dayjs(value as Date).endOf('day'))) {
          this.form.get('end').setValue(dayjs(value).endOf('day').toDate());
        }
      });

    this.thingFilteredList$.pipe(takeUntil(this.onDestroy)).subscribe(things => {
      if (things && things.length > 0) {
        this.form.get('thing').enable();
      }
    });
    this.sensorFilteredList$.pipe(takeUntil(this.onDestroy)).subscribe(sensors => {
      if (sensors && sensors.length > 0) {
        this.form.get('devices').enable();
      }
    });
    this.relayFilteredList$.pipe(takeUntil(this.onDestroy)).subscribe(relays => {
      if (relays && relays.length > 0) {
        this.form.get('devices').enable();
      }
    });
  }

  public getError(control: string): string {
    return formUtils.getError(this.form, control);
  }

  private async getProjects(): Promise<IProjectPopulated[]> {
    return await this.projectService.getProjects();
  }

  private async getThings(project: string): Promise<IThingPopulated[]> {
    return await this.thingService.getThings(project);
  }

  private async getSensors(project: string, thing: string): Promise<ISensorPopulated[]> {
    return (await this.sensorService.getSensors(project, thing)).filter(sensor => sensor.store);
  }

  private async getRelays(project: string, thing: string): Promise<IRelayPopulated[]> {
    return await this.relayService.getRelays(project, thing);
  }

  public filterProjects(filter: string): IProjectPopulated[] {
    if (!filter) {
      return this.projectList;
    }

    const fields = ['name'];
    return arrayUtils.filter(this.projectList, filter, fields);
  }

  public filterThings(filter: string): IThingPopulated[] {
    if (!filter) {
      return this.thingList;
    }

    const fields = ['name', 'type'];
    return arrayUtils.filter(this.thingList, filter, fields);
  }

  public filterSensors(filter: string): ISensorPopulated[] {
    if (!filter) {
      return this.sensorList;
    }

    const fields = ['name', 'type.type', 'type.input'];
    return arrayUtils.filter(this.sensorList, filter, fields);
  }

  public filterRelays(filter: string): IRelayPopulated[] {
    if (!filter) {
      return this.relayList;
    }

    const fields = ['name'];
    return arrayUtils.filter(this.relayList, filter, fields);
  }

  public async downloadTSData(): Promise<void> {
    if (this.form.invalid) {
      this.form.get('start').markAsTouched();
      this.form.get('end').markAsTouched();
      return;
    }
    this.downloading = true;

    const tsQuery = this.form.getRawValue();
    this.tsService
      .downloadTSData(tsQuery.project, tsQuery.thing, tsQuery.devices.device, tsQuery.devices._id, tsQuery.start, tsQuery.end)
      .finally(() => {
        this.downloading = false;
      });
  }

  public async getData(): Promise<void> {
    if (this.form.invalid) {
      this.form.get('start').markAsTouched();
      this.form.get('end').markAsTouched();
      return;
    }
    this.loading = true;

    const tsQuery = this.form.getRawValue();
    await this.tsService
      .getTSData(tsQuery.project, tsQuery.thing, tsQuery.devices.device, tsQuery.devices._id, tsQuery.start, tsQuery.end)
      .then(data => {
        this.setupChart(
          GetNameFromListPipe.prototype.transform(tsQuery.project, this.projectList),
          GetNameFromListPipe.prototype.transform(tsQuery.thing, this.thingList),
          tsQuery.devices.device,
          GetNameFromListPipe.prototype.transform(tsQuery.devices._id, this[`${tsQuery.devices.device}List`]),
          data
        );
      })
      .catch(console.error)
      .finally(() => {
        this.loading = false;
      });
  }

  private setupChart(project: string, thing: string, deviceType: string, device: string, data: ITSValue[]): void {
    this.chartData = [{ data: data.map(d => d.value), label: device, steppedLine: 'before', fill: false }];
    this.chartLabels = data.map(d => dayjs(d.ts).toString());

    this.chartOptions = chartUtils.getTSDataOptions([
      `${project.toLocaleUpperCase()}`,
      `${thing.toLocaleUpperCase()}`,
      `${deviceType.toLocaleUpperCase()}: ${device.toLocaleUpperCase()}`,
    ]);
    this.chartColors = chartUtils.getTSDataColors();

    this.showChart = true;
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
