import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IResponse } from 'src/app/shared/models/backend.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { SocketIOService } from 'src/app/shared/socket-io/socket-io.service';
import { ILoginRequest, ISignUpRequest, IToken } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private auth = false;
  private tokenData: IToken;
  private expirationTimer: any;

  constructor(http: HttpClient, private router: Router, private socketIOService: SocketIOService) {
    super('user/auth', http);
  }

  public async login(credentials: ILoginRequest): Promise<void> {
    try {
      const response = await this.http.post<IResponse>(`${this.getUrl()}/login`, credentials).toPromise();

      if (response.error) {
        throw response.error;
      }

      const tokenData: IToken = response.data as IToken;
      this.tokenData = tokenData;
      this.saveCredentials(tokenData);
      this.setExpirationTimer(tokenData.exp - Math.ceil(new Date().getTime() / 1000));

      this.socketIOService.connect(tokenData);
      this.auth = true;

      this.router.navigate(['/']);
    } catch (e) {
      throw e;
    }
  }

  public async signup(newUser: ISignUpRequest): Promise<void> {
    try {
      const response = await this.http.post<IResponse>(`${this.getUrl()}/signup`, newUser).toPromise();

      if (response.error) {
        throw response.error;
      }

      this.router.navigate(['/auth/login']);
    } catch (e) {
      throw e;
    }
  }

  public logout(): void {
    this.tokenData = null;
    this.clearCredentials();
    clearTimeout(this.expirationTimer);

    this.socketIOService.disconnect();
    this.auth = false;

    this.router.navigate(['/auth/login']);
  }

  public autoLogin(): void {
    const tokenData = this.getCredentials();

    if (!tokenData) {
      return;
    }

    const expirationTime = tokenData.exp - Math.ceil(new Date().getTime() / 1000);
    if (expirationTime > 0) {
      this.tokenData = tokenData;
      this.setExpirationTimer(expirationTime);

      this.socketIOService.connect(tokenData);
      this.auth = true;
    } else {
      this.logout();
    }
  }

  public getTokenData(): IToken {
    return this.tokenData;
  }

  public isAuth(): boolean {
    return this.auth;
  }

  private saveCredentials(data: IToken): void {
    for (const field of Object.keys(data)) {
      localStorage.setItem(field, data[field] as string);
    }
  }

  private getCredentials(): IToken {
    return {
      token: localStorage.getItem('token'),
      userId: localStorage.getItem('userId'),
      exp: Number(localStorage.getItem('exp')),
    };
  }

  private clearCredentials(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('exp');
  }

  private setExpirationTimer(duration) {
    this.expirationTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
}
