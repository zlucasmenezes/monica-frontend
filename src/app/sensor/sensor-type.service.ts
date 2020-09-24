import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { IResponse } from '../shared/models/backend.model';
import { ISensorType } from './sensor.model';

@Injectable({
  providedIn: 'root',
})
export class SensorTypeService extends BaseService {
  constructor(http: HttpClient) {
    super('sensortype', http);
  }

  public async getTypes(): Promise<ISensorType[]> {
    try {
      const types = await this.http.get<IResponse>(`${this.getUrl()}`).toPromise();
      return types.data;
    } catch (e) {
      throw e;
    }
  }
}
