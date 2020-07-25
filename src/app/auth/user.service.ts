import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { IResponse } from 'src/app/shared/models/backend.model';
import { IUser } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(
    http: HttpClient,
    ) {
    super('user', http);
  }

  public async getUsers(): Promise<IUser[]> {
    try {
      return (await this.http.get<IResponse>(`${this.url}`).toPromise()).data as IUser[];
    }
    catch (e) {
      throw e;
    }
  }

}
