import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from '../../project.service';
import { IProjectPopulated } from '../../project.model';
import arrayUtils from 'src/app/shared/utils/array-utils';

@Component({
  selector: 'm-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects: IProjectPopulated[];

  constructor(
    private projectService: ProjectService,
    private router: Router) { }

  async ngOnInit() {
    this.projects = arrayUtils.orderBy(await this.getProjects(), 'DESC', 'updatedAt');
  }

  private async getProjects(): Promise<IProjectPopulated[]> {
    return await this.projectService.getProjects();
  }

  public getDate(date: string): Date {
    return new Date(date);
  }

  public goTo(project: IProjectPopulated) {
    console.log(`project/${project._id}`);
  }

  public edit(project: IProjectPopulated) {
    this.router.navigate([`project/edit/${project._id}`]);
  }

  public remove(project: IProjectPopulated) {
    console.log(`${project._id}`);
  }

}
