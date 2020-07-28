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
    this.resetForm();

    sensorType.config.forEach(config => {
      (this.form.get('config') as FormArray).push(
        this.fb.group({
          parameter: [config.parameter, Validators.required],
          value: [config.default, Validators.required]
        })
      );
    });

    if (sensorType.config.length === 0) {
      this.form.get('function').setValue(defaultCode);
      this.form.get('function').setValidators([Validators.required]);
    }
  }

  private resetForm() {
    (this.form.get('config') as FormArray).clear();

    this.form.get('function').setValue(null);
    this.form.get('function').setValidators([]);
  }

  public getFormArray(): FormArray {
    return (this.form.get('config') as FormArray);
  }

  public getError(control: string, index?: number): string {
    if (index) {
      return formUtils.getError(this.getFormArray().at(index) as FormGroup, control);
    }

    return formUtils.getError(this.form, control);
  }

}

const defaultCode = `/*
  Create a function to calculate the sensor\'s value of interest based on the board pin reading.

  The variable value has the value that was read on the board.
  The variable resolution has the value of the resolution(1024 or 4096) of the board.

  It\'s possible to create variables and use all javascript features on this editor.
*/

const result = (value / resolution) * 100;`;
