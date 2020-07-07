import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';

import { AuthService } from 'src/app/auth/auth.service';
import { ISignUpRequest } from 'src/app/auth/auth.model';

@Component({
  selector: 'm-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public form: FormGroup;
  public hidePassword = true;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.initForm();
  }

  ngOnInit(): void { }

  private initForm(): void {
    this.form = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      username: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  public async signup(): Promise<void> {
    if (this.form.invalid){ return; }

    this.authService.signup(this.form.value as ISignUpRequest);
  }

  public getError(control: string): string {
    const errors: ValidationErrors = this.form.get(control).errors;

    let error = `invalid ${control}`;

    if (!errors) { return error; }
    if (errors.required) { error = `${control} is required`; }
    if (errors.minlength) { error = `${control} must be at least ${errors.minlength.requiredLength} characters`; }

    return error.charAt(0).toUpperCase() + error.slice(1);
  }

}
