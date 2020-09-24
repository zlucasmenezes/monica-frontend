import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/services/base.service';
import { IResponse } from '../shared/models/backend.model';
import { ITSValue } from '../shared/models/ts.model';
import { SocketIOService } from './../shared/socket-io/socket-io.service';
import { ISensor, ISensorPopulated } from './sensor.model';

@Injectable({
  providedIn: 'root',
})
export class SensorService extends BaseService {
  constructor(http: HttpClient, private router: Router, private socketIOService: SocketIOService) {
    super('project/:0/thing/:1/sensor', http);
  }

  public async createSensor(projectId: string, sensor: ISensor): Promise<void> {
    try {
      await this.http.post<IResponse>(`${this.getUrl(projectId, sensor.thing)}`, sensor).toPromise();
      this.router.navigate([`project/${projectId}/thing/${sensor.thing}`]);
    } catch (e) {
      throw e;
    }
  }

  public async getTypes(projectId: string): Promise<string[]> {
    try {
      const types = await this.http.get<IResponse>(`${this.getUrl(projectId)}/types`).toPromise();
      return types.data;
    } catch (e) {
      throw e;
    }
  }

  public async getSensors(projectId: string, thingId: string): Promise<ISensorPopulated[]> {
    try {
      const sensors = await this.http.get<IResponse>(`${this.getUrl(projectId, thingId)}`).toPromise();
      return sensors.data;
    } catch (e) {
      throw e;
    }
  }

  public async getSensor(projectId: string, thingId: string, sensorId: string): Promise<ISensorPopulated> {
    try {
      if (!sensorId) {
        return;
      }

      const sensor = await this.http.get<IResponse>(`${this.getUrl(projectId, thingId)}/${sensorId}`).toPromise();
      return sensor.data;
    } catch (e) {
      throw e;
    }
  }

  public async editSensor(projectId: string, sensorId: string, sensor: ISensor): Promise<void> {
    try {
      const editedSensor = await this.http.put<IResponse>(`${this.getUrl(projectId, sensor.thing)}/${sensorId}`, sensor).toPromise();
      this.router.navigate([`project/${projectId}/thing/${sensor.thing}`]);
    } catch (e) {
      throw e;
    }
  }

  public async getValue(projectId: string, thingId: string, sensorId: string): Promise<Observable<ITSValue>> {
    const value = await this.http.get<IResponse>(`${this.getUrl(projectId, thingId)}/${sensorId}/value`).toPromise();

    const value$ = new BehaviorSubject<ITSValue>(value.data ? value.data : null);
    const unsubscribeValue$ = new Subject<void>();
    value$.pipe(
      finalize(() => {
        unsubscribeValue$.next();
        unsubscribeValue$.complete();
      })
    );

    this.socketIOService
      .on(sensorId)
      .pipe(takeUntil(unsubscribeValue$))
      .subscribe((data: ITSValue) => {
        value$.next(data);
      });

    return value$.asObservable();
  }
}
