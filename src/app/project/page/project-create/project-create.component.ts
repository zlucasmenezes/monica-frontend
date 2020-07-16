import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import formUtils from 'src/app/shared/utils/form-utils';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from 'src/app/auth/auth.model';

@Component({
  selector: 'm-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {

  public form: FormGroup;
  public loading = false;

  public userList: IUser[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      description: [null, Validators.maxLength(240)],
      admin: [this.authService.getTokenData().userId, [Validators.required]],
      privacy: [null, [Validators.required]],
      users: [null],
    });
  }

  public getError(control: string): string {
    return formUtils.getError(this.form, control);
  }

  public resizeTextArea(textarea: any, control: AbstractControl) {
    return formUtils.resizeTextArea(textarea, control);
  }

  public save() {
    console.log(this.form.value);

    if (!this.validate()) { return; }

    if (this.form.get('privacy').value === 'public') {
      this.form.get('users').setValue(null);
    }
  }

  private validate(): boolean {
    this.form.get('privacy').markAsDirty();

    if (this.form.valid){ return false; }
    return true;
  }

}
