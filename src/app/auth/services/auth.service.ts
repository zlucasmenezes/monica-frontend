import { Injectable } from '@angular/core';
import { BaseService } from '../../services/base.service';
import { IResponse } from 'src/app/models/backend.interface';
import { ILoginRequest, IToken } from '../models/auth.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(http: HttpClient) {
    super('users/auth', http);
  }

  public async login(credentials: ILoginRequest): Promise<void> {

    try {
      const response = await this.http.post<IResponse>(`${this.url}login`, credentials).toPromise();

      if (response.error) { throw response.error; }

      console.log((response.data as IToken).token);
    }
    catch (e) {
      console.error(e);
    }
  }

}
