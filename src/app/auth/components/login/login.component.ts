import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ILoginRequest } from '../../models/auth.interface';

@Component({
  selector: 'm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public hidePassword = true;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.initForm();
  }

  ngOnInit(): void { }

  private initForm(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  public async login(): Promise<void> {
    if (this.form.invalid){ return; }

    this.authService.login(this.form.value as ILoginRequest);
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
