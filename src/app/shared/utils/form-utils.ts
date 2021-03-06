import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import * as dayjs from 'dayjs';

class FormUtils {
  public getError(form: FormGroup, control: string): string {
    const errors: ValidationErrors = form.get(control).errors;

    let error = `invalid ${control}`;

    if (!errors) {
      return error;
    }
    if (errors.required) {
      error = `${control} is required`;
    }
    if (errors.minlength) {
      error = `${control} must be at least ${errors.minlength.requiredLength} characters`;
    }
    if (errors.maxlength) {
      error = `${control} must contain maximum ${errors.maxlength.requiredLength} characters`;
    }
    if (errors.min) {
      error = `minimum ${control} is ${errors.min.min}`;
    }
    if (errors.max) {
      error = `maximum ${control} is ${errors.max.max}`;
    }
    if (errors.code) {
      error = `${errors.error}`;
    }
    if (errors.pin) {
      error = `${errors.error}`;
    }
    if (errors.matDatepickerMin) {
      error = `${control} date must be after ${errors.matDatepickerMin.min.toLocaleDateString()}`;
    }
    if (errors.matDatepickerMax) {
      error = `${control} date cannot be after ${
        dayjs(errors.matDatepickerMax.max).isSame(dayjs(), 'day') ? 'today' : errors.matDatepickerMax.max.toLocaleDateString()
      }`;
    }

    return error.charAt(0).toUpperCase() + error.slice(1);
  }

  public resizeTextArea(textarea: any, control: AbstractControl) {
    if (textarea.value.length === 0) {
      control.setValue(null);
    } else {
      control.setValue(textarea.value);
    }

    textarea.style.height = '1px';
    textarea.style.height = textarea.scrollHeight - 4 + 'px';
  }
}
export default new FormUtils();
