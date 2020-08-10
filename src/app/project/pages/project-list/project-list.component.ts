import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ProjectService } from '../../project.service';
import { IProjectPopulated } from '../../project.model';
import arrayUtils from 'src/app/shared/utils/array-utils';
import { AuthService } from 'src/app/auth/auth.service';
import { UserListComponent } from '../../components/user-list/user-list.component';

@Component({
  selector: 'm-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects: IProjectPopulated[];

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private router: Router,
    public dialog: MatDialog) { }

  async ngOnInit() {
    this.projects = arrayUtils.orderBy(await this.getProjects(), 'DESC', 'updatedAt');
  }

  private async getProjects(): Promise<IProjectPopulated[]> {
    return await this.projectService.getProjects();
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

  public getDate(date: string): Date {
    return new Date(date);
  }

  public isAdmin(project: IProjectPopulated): boolean {
    return project.admin._id === this.authService.getTokenData().userId;
  }

  public openUserListDialog(project: IProjectPopulated) {
    this.dialog.open(UserListComponent, {
      data: project?.users,
      panelClass: 'm-dialog',
      disableClose: true
    });
  }

}
