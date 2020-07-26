import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISensorType } from '../../sensor.model';
import formUtils from 'src/app/shared/utils/form-utils';

@Component({
  selector: 'm-sensor-config',
  templateUrl: './sensor-config.component.html',
  styleUrls: ['./sensor-config.component.scss']
})
export class SensorConfigComponent implements OnInit {

  @Input() public form: FormGroup;

  @Input() set configuration(sensorType: ISensorType) {
    this.sensorType = sensorType;
    this.initForm(sensorType);
  }

  public sensorType: ISensorType;

  constructor(private fb: FormBuilder) { }

  ngOnInit() { }

  private initForm(sensorType: ISensorType) {
    (this.form.get('config') as FormArray).clear();

    sensorType.config.forEach(config => {
      (this.form.get('config') as FormArray).push(
        this.fb.group({
          parameter: [config.parameter, Validators.required],
          value: [config.default, Validators.required]
        })
      );
    });
  }

  public getFormArray(): FormArray {
    return (this.form.get('config') as FormArray);
  }

  public getError(index: number, control: string): string {
    return formUtils.getError(this.getFormArray().at(index) as FormGroup, control);
  }

}
