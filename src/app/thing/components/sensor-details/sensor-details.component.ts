import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ISensor, ITSValue } from 'src/app/sensor/sensor.model';
import * as moment from 'moment';
import dateUtils from 'src/app/shared/utils/date-utils';
import { SocketIOService } from 'src/app/shared/socket-io/socket-io.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'm-sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.scss']
})
export class SensorDetailsComponent implements OnInit, OnDestroy {

  @Input() sensor: ISensor;
  @Input() value: ITSValue;

  private onDestroy: Subject<void> = new Subject<void>();

  constructor(
    private socketIOService: SocketIOService
  ) { }

  ngOnInit(): void {
    this.getValue();
  }

  public getValue() {
    this.socketIOService.on(this.sensor._id).pipe(takeUntil(this.onDestroy))
    .subscribe((data: ITSValue) => {
      this.value = data;
    });
  }

  public getTS(): string {
    if (!this.value) { return '—'; }

    return moment(this.value.ts).fromNow();
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
