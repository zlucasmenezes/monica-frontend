import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { IResponse } from '../shared/models/backend.model';
import { FileService } from '../shared/services/file.service';

@Injectable({
  providedIn: 'root',
})
export class TSService extends BaseService {
  constructor(http: HttpClient, private fileService: FileService) {
    super('project/:0/thing/:1/:2/:3/ts', http);
  }

  public async getTSData(
    projectId: string,
    thingId: string,
    deviceType: 'sensor' | 'relay',
    deviceId: string,
    start?: Date,
    end?: Date
  ): Promise<void> {
    const response = await this.http
      .get<IResponse>(`${this.getUrl(projectId, thingId, deviceType, deviceId)}${this.buildQuery(start, end)}`)
      .toPromise();

    return response.data;
  }

  public async downloadTSData(
    projectId: string,
    thingId: string,
    deviceType: 'sensor' | 'relay',
    deviceId: string,
    start?: Date,
    end?: Date
  ): Promise<void> {
    const response = await this.http
      .get(`${this.getUrl(projectId, thingId, deviceType, deviceId)}/download${this.buildQuery(start, end)}`, {
        observe: 'response',
        responseType: 'blob',
      })
      .toPromise();

    return this.fileService.download(response.body, response.headers.get('Content-Type'), this.fileService.getFileNameFromHeader(response));
  }

  private buildQuery(start: Date, end: Date): string {
    let query = '';

    if (start || end) {
      query = '?';

      if (start) {
        query += `start=${start.toISOString()}`;

        if (end) {
          query += '&';
        }
      }

      if (end) {
        query += `end=${end.toISOString()}`;
      }
    }

    return query;
  }
}
