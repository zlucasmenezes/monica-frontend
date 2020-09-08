import { ISensorPopulated } from './../../../sensor/sensor.model';
import { SensorService } from './../../../sensor/sensor.service';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ISensor, ITSValue } from 'src/app/sensor/sensor.model';
import * as moment from 'moment';
import dateUtils from 'src/app/shared/utils/date-utils';
import { SocketIOService } from 'src/app/shared/socket-io/socket-io.service';
import { Subject, interval } from 'rxjs';

@Component({
  selector: 'm-sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.scss']
})
export class SensorDetailsComponent implements OnInit, OnDestroy {

  @Input() sensor: ISensorPopulated;
  @Input() value: ITSValue;

  public tsFromNow = '—';

  private onDestroy: Subject<void> = new Subject<void>();

  constructor(
    private sensorService: SensorService,
    private socketIOService: SocketIOService
  ) { }

  ngOnInit(): void {
    this.getValue();
    this.getTS();
  }

  public async getValue(): Promise<void> {
    this.socketIOService.on(this.sensor._id).pipe(takeUntil(this.onDestroy))
    .subscribe((data: ITSValue) => {
      this.value = data;
    });

    this.value = await this.sensorService.getCurrentValue(this.sensor.thing.project._id, this.sensor.thing._id, this.sensor._id);
  }

  public getTS(): void {
    interval(1000).pipe(takeUntil(this.onDestroy))
    .subscribe(() => {
      if (!this.value) { this.tsFromNow = '—'; }

      this.tsFromNow = dateUtils.fromNow(this.value.ts);
    });
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
