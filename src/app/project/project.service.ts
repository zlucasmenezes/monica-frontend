import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from 'src/app/shared/services/base.service';
import { IProject } from './project.model';
import { IResponse } from '../shared/models/backend.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService {

  constructor(
    http: HttpClient,
    private router: Router
    ) {
    super('project', http);
  }

  public async createProject(project: IProject): Promise<void> {
    try {
      const createdProject = await this.http.post<IResponse>(`${this.getUrl()}`, project).toPromise();
      this.router.navigate([`/project/${(createdProject.data as IProject)._id}/thing/create`]);
    }
    catch (e) {
      throw e;
    }
  }

}
