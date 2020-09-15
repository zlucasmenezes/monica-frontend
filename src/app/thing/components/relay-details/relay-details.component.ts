import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as moment from 'moment';
import { Color, Label } from 'ng2-charts';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IRelayPopulated } from 'src/app/relay/relay.model';
import { RelayService } from 'src/app/relay/relay.service';
import { ITSValue } from 'src/app/shared/models/ts.model';
import chartUtils from 'src/app/shared/utils/chart-utils';
import dateUtils from 'src/app/shared/utils/date-utils';

@Component({
  selector: 'm-relay-details',
  templateUrl: './relay-details.component.html',
  styleUrls: ['./relay-details.component.scss']
})
export class RelayDetailsComponent implements OnInit, OnDestroy {

  @Input() relay: IRelayPopulated;

  public value: ITSValue;
  public tsFromNow = '—';

  private onDestroy: Subject<void> = new Subject<void>();

  chartData: ChartDataSets[];
  chartLabels: Label[];
  chartOptions: ChartOptions;
  chartColors: Color[];

  constructor(
    private relayService: RelayService
  ) { }

  async ngOnInit(): Promise<void> {
    this.initChart();

    this.getTSFromNow();
    this.getValue();
  }

  public async getValue() {
    const value$ = await this.relayService.getValue(this.relay.thing.project._id, this.relay.thing._id, this.relay._id);

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
      { data: [], label: this.relay.name, steppedLine: 'before' }
    ];
    this.chartLabels = [];

    this.chartOptions = chartUtils.getSingleDeviceOptions();
    this.chartColors = chartUtils.getSingleDeviceColors();
  }

  private addDataPoint(y: any, x: moment.Moment) {
    this.chartData[0].data.push(y);
    this.chartLabels.push(x.toString());

    if (this.chartLabels.length > 10) {
      this.chartData[0].data.shift();
      this.chartLabels.shift();
    }
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

}
