import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as moment from 'moment';
import { Color, Label } from 'ng2-charts';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ITSValue } from 'src/app/shared/models/ts.model';
import chartUtils from 'src/app/shared/utils/chart-utils';
import dateUtils from 'src/app/shared/utils/date-utils';
import { ISensorPopulated } from './../../../sensor/sensor.model';
import { SensorService } from './../../../sensor/sensor.service';

@Component({
  selector: 'm-sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.scss']
})
export class SensorDetailsComponent implements OnInit, OnDestroy {

  @Input() sensor: ISensorPopulated;

  public value: ITSValue;
  public tsFromNow = '—';

  private onDestroy: Subject<void> = new Subject<void>();

  chartData: ChartDataSets[];
  chartLabels: Label[];
  chartOptions: ChartOptions;
  chartColors: Color[];

  constructor(
    private sensorService: SensorService
  ) { }

  async ngOnInit(): Promise<void> {
    this.initChart();

    this.getTSFromNow();
    this.getValue();

  }

  public async getValue() {
    const value$ = await this.sensorService.getValue(this.sensor.thing.project._id, this.sensor.thing._id, this.sensor._id);

    value$.pipe(takeUntil(this.onDestroy)).subscribe(value => {
      this.value = value;
      if (value) {
        this.addDataPoint(value.value, moment(value.ts));
      }
    });
  }

  public getTSFromNow(): void {
    interval(1000).pipe(takeUntil(this.onDestroy))
    .subscribe(() => {
      if (this.value) { this.tsFromNow = dateUtils.fromNow(this.value.ts); }
      else { this.tsFromNow = '—'; }
    });
  }

  private initChart() {
    this.chartData = [
      { data: [], label: this.sensor.name, steppedLine: 'before', fill: false }
    ];
    this.chartLabels = [];

    this.chartOptions = chartUtils.getSingleDeviceOptions(this.sensor.pollTime);
    this.chartColors = chartUtils.getSingleDeviceColors();
  }

  private addDataPoint(y: any, x: moment.Moment) {
    console.log(y, x);
    this.chartData[0].data.push(y);
    this.chartLabels.push(x.toString());

    if (this.chartLabels.length > 10) {
      this.chartData[0].data.shift();
      this.chartLabels.shift();
    }
  }

  public getPollTime(): string {
    if (!this.sensor) { return '—'; }

    return dateUtils.formatMillis(this.sensor.pollTime);
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

}
