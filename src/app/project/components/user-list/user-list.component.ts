import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IUser } from 'src/app/auth/auth.model';
import arrayUtils from 'src/app/shared/utils/array-utils';

@Component({
  selector: 'm-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public users: IUser[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: IUser[]) {
    console.log(this.data);
  }

  ngOnInit() {
    this.users = arrayUtils.orderBy(this.data, 'ASC', 'firstName');
  }

  public getInitials(user: IUser): string {
    const names = user.lastName.split(' ');
    const lastName = names[names.length - 1];

    return `${user.firstName[0]}${lastName[0]}`;
  }

}
