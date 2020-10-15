import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';
import { FileService } from '../shared/services/file.service';

@Injectable({
  providedIn: 'root',
})
export class TSService extends BaseService {
  constructor(http: HttpClient, private fileService: FileService) {
    super('project/:0/thing/:1/:2/:3/ts', http);
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
      .get(`${this.getUrl(projectId, thingId, deviceType, deviceId)}/download?start=${start.toISOString()}&end=${end.toISOString()}`, {
        observe: 'response',
        responseType: 'blob',
      })
      .toPromise();

    return this.fileService.download(response.body, response.headers.get('Content-Type'), this.fileService.getFileNameFromHeader(response));
  }
}
