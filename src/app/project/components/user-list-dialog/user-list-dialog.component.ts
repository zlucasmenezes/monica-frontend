import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IUser } from 'src/app/auth/auth.model';
import arrayUtils from 'src/app/shared/utils/array-utils';

@Component({
  selector: 'm-user-list-dialog',
  templateUrl: './user-list-dialog.component.html',
  styleUrls: ['./user-list-dialog.component.scss'],
})
export class UserListDialogComponent implements OnInit {
  public users: IUser[];

  public usersFiltered$: ReplaySubject<IUser[]> = new ReplaySubject<IUser[]>(1);
  public usersFilter = new FormControl();

  private onDestroy: Subject<void> = new Subject<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: IUser[]) {}

  ngOnInit() {
    this.usersFiltered$.next((this.users = arrayUtils.orderBy(this.data, 'ASC', 'firstName')));
    this.subscribeForm();
  }

  private async subscribeForm() {
    this.usersFilter.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: string) => {
      this.filterUsers(value);
    });
  }

  public filterUsers(filter: string) {
    const fields = ['fullName', 'username', 'email'];
    this.usersFiltered$.next(arrayUtils.filter(this.users, filter, fields));
  }
}
