import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isPinAvailableValidator(unavailablePins: number[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    if (unavailablePins.includes(control.value)) {
      return { pin: true, error: `pin ${control.value} is unavailable` };
    }

    return null;
  };
}

export function buttonPinValidator(control: AbstractControl): ValidationErrors {
  if (!control.parent) {
    return null;
  }
  if (!control.parent.get('pin').value) {
    return null;
  }

  if (control.parent.get('pin').value === control.value) {
    return { pin: true, error: `pin ${control.value} is unavailable` };
  }

  return null;
}
