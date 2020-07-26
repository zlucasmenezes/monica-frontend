import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Form } from '@angular/forms';
import { ISensorConfig, ISensorType } from '../../sensor.model';

@Component({
  selector: 'm-sensor-config',
  templateUrl: './sensor-config.component.html',
  styleUrls: ['./sensor-config.component.scss']
})
export class SensorConfigComponent implements OnInit {

  @Input() public form: FormGroup;

  @Input() set configuration(sensorType: ISensorType) {
    this.initForm(sensorType);
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() { }

  private initForm(sensorType: ISensorType) {
    (this.form.get('config') as FormArray).clear();

    sensorType.config.forEach(config => {
      (this.form.get('config') as FormArray).push(
        this.fb.group({
          parameter: [config.parameter],
          value: [config.default]
        })
      );
    });
  }

}
