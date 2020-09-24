import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import formUtils from 'src/app/shared/utils/form-utils';
import { ISensorType } from '../../sensor.model';

@Component({
  selector: 'm-sensor-config',
  templateUrl: './sensor-config.component.html',
  styleUrls: ['./sensor-config.component.scss'],
})
export class SensorConfigComponent {
  @Input() form: FormGroup;
  @Input() type: ISensorType;

  constructor() {}

  public getFormArray(): FormArray {
    return this.form.get('config') as FormArray;
  }

  public getError(control: string, index?: number): string {
    if (index !== null) {
      return formUtils.getError(this.getFormArray().at(index) as FormGroup, control);
    }

    return formUtils.getError(this.form, control);
  }
}
