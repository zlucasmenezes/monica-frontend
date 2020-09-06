import { Component, OnInit, Input } from '@angular/core';
import { ISensor, ITSValue } from 'src/app/sensor/sensor.model';
import * as moment from 'moment';
import dateUtils from 'src/app/shared/utils/date-utils';

@Component({
  selector: 'm-sensor-details',
  templateUrl: './sensor-details.component.html',
  styleUrls: ['./sensor-details.component.scss']
})
export class SensorDetailsComponent implements OnInit {

  @Input() sensor: ISensor;
  @Input() value: ITSValue;

  constructor() { }

  ngOnInit(): void {
  }

  getTS(): string {
    if (!this.value) { return '—'; }

    return moment(this.value.ts).fromNow();
  }

  getPollTime(): string {
    if (!this.sensor) { return '—'; }

    return dateUtils.formatMillis(this.sensor.pollTime);
  }

}
