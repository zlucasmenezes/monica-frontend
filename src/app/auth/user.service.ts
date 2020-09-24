import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from 'src/app/shared/models/backend.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { IUser } from './auth.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(http: HttpClient, private authService: AuthService) {
    super('user', http);
  }

  public async getUsers(): Promise<IUser[]> {
    try {
      const users = (await this.http.get<IResponse>(`${this.getUrl()}`).toPromise()).data as IUser[];
      return users.filter(user => user._id !== this.authService.getTokenData().userId);
    } catch (e) {
      throw e;
    }
  }
}
