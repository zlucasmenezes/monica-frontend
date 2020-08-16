import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BaseService } from 'src/app/shared/services/base.service';
import { IResponse } from '../shared/models/backend.model';
import { ISensor } from './sensor.model';

@Injectable({
  providedIn: 'root'
})
export class SensorService extends BaseService {

  constructor(
    http: HttpClient,
    private router: Router
    ) {
    super('project/:0/thing/:1/sensor', http);
  }

  public async createSensor(projectId: string, sensor: ISensor): Promise<void> {
    try {
      await this.http.post<IResponse>(`${this.getUrl(projectId, sensor.thing)}`, sensor).toPromise();
    }
    catch (e) {
      throw e;
    }
  }

  public async getTypes(projectId: string): Promise<string[]> {
    try {
      const types = await this.http.get<IResponse>(`${this.getUrl(projectId)}/types`).toPromise();
      return types.data;
    }
    catch (e) {
      throw e;
    }
  }

}
