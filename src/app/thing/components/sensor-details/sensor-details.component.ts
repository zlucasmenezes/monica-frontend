import { ISensorPopulated } from './../../../sensor/sensor.model';
import { SensorService } from './../../../sensor/sensor.service';
import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ITSValue } from 'src/app/sensor/sensor.model';
import dateUtils from 'src/app/shared/utils/date-utils';
import { Subject, interval } from 'rxjs';

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

  constructor(
    private sensorService: SensorService
  ) { }

  ngOnInit(): void {
    this.getValue();
    this.getTSFromNow();
  }

  public async getValue() {
    const value$ = await this.sensorService.getValue(this.sensor.thing.project._id, this.sensor.thing._id, this.sensor._id);

    value$.pipe(takeUntil(this.onDestroy)).subscribe(value => {
      this.value = value;
    });
  }

  public getTSFromNow(): void {
    interval(1000).pipe(takeUntil(this.onDestroy))
    .subscribe(() => {
      if (this.value) { this.tsFromNow = dateUtils.fromNow(this.value.ts); }
      else { this.tsFromNow = '—'; }
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
