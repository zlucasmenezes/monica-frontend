import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';

import formUtils from 'src/app/shared/utils/form-utils';
import arrayUtils from 'src/app/shared/utils/array-utils';
import { AuthService } from 'src/app/auth/auth.service';
import { IUser } from 'src/app/auth/auth.model';
import { UserService } from 'src/app/auth/user.service';
import { takeUntil } from 'rxjs/operators';
import { IProject } from '../../project.model';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'm-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public loading = false;

  public userList: IUser[] = [];

  public userFilteredList$: ReplaySubject<IUser[]> = new ReplaySubject<IUser[]>(1);
  public userFilter = new FormControl();

  private onDestroy: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private projectService: ProjectService) { }

  async ngOnInit() {
    this.userFilteredList$.next(this.userList = arrayUtils.orderBy(await this.userService.getUsers(), 'ASC', 'username'));

    this.initForm();
    this.subscribeForm();
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

  private async subscribeForm() {
    this.userFilter.valueChanges.pipe(takeUntil(this.onDestroy))
    .subscribe((value: string) => {
      this.filterUsers(value);
    });
  }

  public save() {
    if (!this.validate()) { return; }

    this.loading = true;

    if (this.form.get('privacy').value === 'public') {
      this.form.get('users').setValue(null);
    }

    this.projectService.createProject(this.form.value as IProject).finally(() => {
      this.loading = false;
    });
  }

  private validate(): boolean {
    this.form.get('privacy').markAsDirty();

    if (this.form.invalid){ return false; }
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

  public filterUsers(filter: string) {
    const fields = ['username', 'email'];
    this.userFilteredList$.next(arrayUtils.filter(this.userList, filter, fields));
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

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

}
