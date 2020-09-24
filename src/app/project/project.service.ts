import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/shared/services/base.service';
import { IResponse } from '../shared/models/backend.model';
import { IProject, IProjectPopulated } from './project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends BaseService {
  constructor(http: HttpClient, private router: Router) {
    super('project', http);
  }

  public async createProject(project: IProject): Promise<void> {
    try {
      const createdProject = await this.http.post<IResponse>(`${this.getUrl()}`, project).toPromise();
      this.router.navigate([`/project/${(createdProject.data as IProject)._id}/thing/create`]);
    } catch (e) {
      throw e;
    }
  }

  public async getProjects(): Promise<IProjectPopulated[]> {
    try {
      const projects = await this.http.get<IResponse>(`${this.getUrl()}`).toPromise();
      return projects.data as IProjectPopulated[];
    } catch (e) {
      throw e;
    }
  }

  public async getProject(projectId: string): Promise<IProjectPopulated> {
    try {
      const project = await this.http.get<IResponse>(`${this.getUrl()}/${projectId}`).toPromise();
      return project.data as IProjectPopulated;
    } catch (e) {
      throw e;
    }
  }

  public async editProject(projectId: string, project: IProject): Promise<void> {
    try {
      const editedProject = await this.http.put<IResponse>(`${this.getUrl()}/${projectId}`, project).toPromise();
      this.router.navigate([`/project`]);
    } catch (e) {
      throw e;
    }
  }
}
