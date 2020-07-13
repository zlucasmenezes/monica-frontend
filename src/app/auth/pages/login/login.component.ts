import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { ILoginRequest } from 'src/app/auth/auth.model';
import formUtils from 'src/app/shared/utils/form-utils';

@Component({
  selector: 'm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public hidePassword = true;
  public loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.initForm();
  }

  ngOnInit(): void { }

  private initForm(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(48)]],
    });
  }

  public async login(): Promise<void> {
    if (this.form.invalid){ return; }

    this.loading = true;

    this.authService.login(this.form.value as ILoginRequest)
    .finally(() => { this.loading = false; });
  }

  public getError(control: string): string {
    return formUtils.getError(this.form, control);
  }

}
