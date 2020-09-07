import { ITSValue } from 'src/app/sensor/sensor.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BaseService } from 'src/app/shared/services/base.service';
import { IResponse } from '../shared/models/backend.model';
import { ISensor, ISensorPopulated } from './sensor.model';

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
      this.router.navigate([`project/${projectId}/thing/${sensor.thing}`]);
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

  public async getSensors(projectId: string, thingId: string): Promise<ISensorPopulated[]> {
    try {
      const sensors = await this.http.get<IResponse>(`${this.getUrl(projectId, thingId)}`).toPromise();
      return sensors.data;
    }
    catch (e) {
      throw e;
    }
  }

  public async getSensor(projectId: string, thingId: string, sensorId: string): Promise<ISensorPopulated> {
    try {
      if (!sensorId) { return; }

      const sensor = await this.http.get<IResponse>(`${this.getUrl(projectId, thingId)}/${sensorId}`).toPromise();
      return sensor.data;
    }
    catch (e) {
      throw e;
    }
  }

  public async editSensor(projectId: string, sensorId: string, sensor: ISensor): Promise<void> {
    try {
      const editedSensor = await this.http.put<IResponse>(`${this.getUrl(projectId, sensor.thing)}/${sensorId}`, sensor).toPromise();
      this.router.navigate([`project/${projectId}/thing/${sensor.thing}`]);
    }
    catch (e) {
      throw e;
    }
  }

  public async getCurrentValue(projectId: string, thingId: string, sensorId: string): Promise<ITSValue> {
    try {
      if (!sensorId) { return; }

      const sensor = await this.http.get<IResponse>(`${this.getUrl(projectId, thingId)}/${sensorId}/value`).toPromise();
      return sensor.data;
    }
    catch (e) {
      throw e;
    }
  }

}
