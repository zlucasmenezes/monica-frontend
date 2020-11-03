import { AbstractControl, ValidationErrors } from '@angular/forms';

export function codeValidator(control: AbstractControl): ValidationErrors {
  try {
    const code = new Function('value', 'resolution', control.value);

    const values = [code(0, 1024), code(512, 1024), code(1024, 1024), code(0, 4096), code(2048, 4096), code(4096, 4096)];
    for (const value of values) {
      if (value === null || value === undefined) {
        return { code: true, error: `function returns ${value}` };
      }
    }

    return null;
  } catch (e) {
    return { code: true, error: e };
  }
}
