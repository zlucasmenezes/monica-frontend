import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IResponse } from 'src/app/models/backend.interface';
import { ILoginRequest, IToken, ISignUpRequest } from '../models/auth.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(http: HttpClient, private router: Router) {
    super('users/auth', http);
  }

  public async login(credentials: ILoginRequest): Promise<void> {
    try {
      const response = await this.http.post<IResponse>(`${this.url}login`, credentials).toPromise();

      if (response.error) { throw response.error; }

      const token: IToken = response.data as IToken;
      this.saveAuthData(token);

      this.router.navigate(['/']);
    }
    catch (e) {
      throw e;
    }
  }

  public async signup(newUser: ISignUpRequest): Promise<void> {
    try {
      const response = await this.http.post<IResponse>(`${this.url}signup`, newUser).toPromise();

      if (response.error) { throw response.error; }

      this.router.navigate(['/auth/login']);
    }
    catch (e) {
      throw e;
    }
  }

  private saveAuthData(data: IToken): void {
    for (const field of Object.keys(data)) {
      localStorage.setItem(field, data[field] as string);
    }
  }

}
