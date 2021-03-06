import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as dayjs from 'dayjs';
import { Color, Label } from 'ng2-charts';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IRelayPopulated } from 'src/app/relay/relay.model';
import { RelayService } from 'src/app/relay/relay.service';
import chartUtils from 'src/app/shared/utils/chart-utils';
import dateUtils from 'src/app/shared/utils/date-utils';
import { ITSValue } from 'src/app/ts/ts.model';

@Component({
  selector: 'm-relay-details',
  templateUrl: './relay-details.component.html',
  styleUrls: ['./relay-details.component.scss'],
})
export class RelayDetailsComponent implements OnInit, OnDestroy {
  @Input() relay: IRelayPopulated;
  @Input() disabled: boolean;
  @Output() edit = new EventEmitter<void>();

  public value: ITSValue;
  public tsFromNow = '—';

  private onDestroy: Subject<void> = new Subject<void>();

  public chartData: ChartDataSets[];
  public chartLabels: Label[];
  public chartOptions: ChartOptions;
  public chartColors: Color[];

  public loaded = false;

  constructor(private relayService: RelayService) {}

  async ngOnInit(): Promise<void> {
    this.initChart();

    this.getTSFromNow();
    this.getValue();
  }

  public async getValue(): Promise<void> {
    const value$ = await this.relayService.getValue(this.relay.thing.project._id, this.relay.thing._id, this.relay._id);

    value$.pipe(takeUntil(this.onDestroy)).subscribe(value => {
      this.value = value;
      if (value) {
        this.addDataPoint(value.value, dayjs(value.ts));
      }
    });

    this.loaded = true;
  }

  public getTSFromNow(): void {
    interval(1000)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        if (this.value && this.value.ts) {
          this.tsFromNow = dateUtils.fromNow(this.value.ts);
        } else {
          this.tsFromNow = '—';
        }
      });
  }

  public toggleRelay(event: MatSlideToggleChange): void {
    if (this.value) {
      event.source.writeValue(this.value.value);

      this.relayService.insertTSData(this.relay.thing.project._id, this.relay.thing._id, this.relay._id, !this.value.value);
    } else {
      event.source.writeValue(false);

      this.relayService.insertTSData(this.relay.thing.project._id, this.relay.thing._id, this.relay._id, true);
    }
  }

  private initChart(): void {
    this.chartData = [{ data: [], label: this.relay.name, steppedLine: 'before' }];
    this.chartLabels = [];

    this.chartOptions = chartUtils.getSingleDeviceDataOptions();
    this.chartColors = chartUtils.getSingleDeviceDataColors();
  }

  private addDataPoint(y: any, x: dayjs.Dayjs): void {
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
