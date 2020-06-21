import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IResponse } from '../models/backend.model';

@Injectable()
export abstract class BaseService {

  private baseUrl: string;
  protected url: string;

  constructor(@Inject(String) backendRoute: string, protected http: HttpClient) {
    this.baseUrl = `http://${environment.backend.host}:${environment.backend.port}/${environment.backend.path}`;
    this.url = `${this.baseUrl}/${backendRoute}/`;
  }

  public async test(): Promise<IResponse> {
    return await (await this.http.get<IResponse>(this.baseUrl).toPromise()).data;
  }

}
