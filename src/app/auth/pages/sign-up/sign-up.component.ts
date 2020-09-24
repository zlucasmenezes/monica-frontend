import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISignUpRequest } from 'src/app/auth/auth.model';
import { AuthService } from 'src/app/auth/auth.service';
import formUtils from 'src/app/shared/utils/form-utils';

@Component({
  selector: 'm-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public form: FormGroup;
  public hidePassword = true;
  public loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.initForm();
  }

  ngOnInit(): void {}

  private initForm(): void {
    this.form = this.fb.group({
      firstName: [null, [Validators.required, Validators.maxLength(24)]],
      lastName: [null, [Validators.required, Validators.maxLength(24)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(64)]],
      username: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(48)]],
    });
  }

  public async signup(): Promise<void> {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.authService.signup(this.form.value as ISignUpRequest).finally(() => {
      this.loading = false;
    });
  }

  public getError(control: string): string {
    return formUtils.getError(this.form, control);
  }
}
