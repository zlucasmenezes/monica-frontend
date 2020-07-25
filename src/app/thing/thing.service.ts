import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BaseService } from 'src/app/shared/services/base.service';
import { IResponse } from '../shared/models/backend.model';
import { IThing } from './thing.model';

@Injectable({
  providedIn: 'root'
})
export class ThingService extends BaseService {

  constructor(
    http: HttpClient,
    private router: Router
    ) {
    super('project/:0/thing', http);
  }

  public async createThing(thing: IThing): Promise<void> {
    try {
      const createdThing = await this.http.post<IResponse>(`${this.getUrl(thing.project)}`, thing).toPromise();
      console.log(createdThing);
      // this.router.navigate([`/project/${thing.project}/thing/${(createdThing.data as IThing)._id}/sensor/create`]);
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
