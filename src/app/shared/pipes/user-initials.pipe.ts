import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from './../../auth/auth.model';

@Pipe({
  name: 'userInitials',
  pure: true,
})
export class UserInitialsPipe implements PipeTransform {
  transform(user: IUser): string {
    const names = user.lastName.split(' ');
    const lastName = names[names.length - 1];

    return `${user.firstName[0]}${lastName[0]}`;
  }
}
