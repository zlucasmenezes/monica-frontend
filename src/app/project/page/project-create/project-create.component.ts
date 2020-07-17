import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import formUtils from 'src/app/shared/utils/form-utils';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from 'src/app/auth/auth.model';
import { UserService } from 'src/app/auth/user.service';

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
    private authService: AuthService,
    private userService: UserService) { }

  async ngOnInit() {
    this.userList = await this.userService.getUsers();
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
      description: [null, Validators.maxLength(240)],
      admin: [this.authService.getTokenData().userId, [Validators.required]],
      privacy: [null, [Validators.required]],
      users: [null],
    });

    if (this.userList.length === 0) { this.form.get('users').disable(); }
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

  public getError(control: string): string {
    return formUtils.getError(this.form, control);
  }

  public resizeTextArea(textarea: any, control: AbstractControl) {
    return formUtils.resizeTextArea(textarea, control);
  }

  public getUsername(id: string): string {
    const user = this.userList.filter(u => u._id === id);

    return user[0] ? user[0].username : '';
  }

  public toogleSelectAllUsers() {
    if (!this.isAllUsersSelected()) {
      this.form.get('users').setValue(this.userList.map(user => user._id));
    } else {
      this.form.get('users').setValue(null);
    }
  }

  public isAllUsersSelected() {
    return this.userList.length === this.form.get('users').value?.length;
  }

}
