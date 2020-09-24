import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IResponse } from '../models/backend.model';

@Injectable()
export abstract class BaseService {
  private baseUrl: string;
  private url: string;

  constructor(@Inject(String) backendRoute: string, protected http: HttpClient) {
    this.baseUrl = `http://${environment.backend.host}:${environment.backend.port}/${environment.backend.path}`;
    this.url = backendRoute;
  }

  public async test(): Promise<IResponse> {
    return await (await this.http.get<IResponse>(this.baseUrl).toPromise()).data;
  }

  public getUrl(...params: string[]) {
    let url = this.url;

    for (let index = 0; index < params.length; index++) {
      url = url.replace(`:${index}`, params[index]);
    }

    return `${this.baseUrl}/${url}`;
  }
}
