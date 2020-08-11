import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { ProjectService } from '../../project.service';
import { IProjectPopulated } from '../../project.model';
import arrayUtils from 'src/app/shared/utils/array-utils';
import { AuthService } from 'src/app/auth/auth.service';
import { UserListDialogComponent } from '../../components/user-list-dialog/user-list-dialog.component';

@Component({
  selector: 'm-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects: IProjectPopulated[];

  public projectsFiltered$: ReplaySubject<IProjectPopulated[]> = new ReplaySubject<IProjectPopulated[]>(1);
  public projectsFilter = new FormControl();

  private onDestroy: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private router: Router,
    private dialog: MatDialog) { }

  async ngOnInit() {
    this.projectsFiltered$.next(this.projects = arrayUtils.orderBy(await this.getProjects(), 'DESC', 'updatedAt'));
    this.subscribeForm();
  }

  private async getProjects(): Promise<IProjectPopulated[]> {
    return await this.projectService.getProjects();
  }

  private async subscribeForm() {
    this.projectsFilter.valueChanges.pipe(takeUntil(this.onDestroy))
    .subscribe((value: string) => {
      this.filterProjects(value);
    });
  }

  public goTo(project: IProjectPopulated) {
    console.log(`project/${project._id}`);
  }

  public add() {
    this.router.navigate([`project/create`]);
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

  public filterProjects(filter: string) {
    const fields = ['name', 'admin.username', 'privacy'];
    this.projectsFiltered$.next(arrayUtils.filter(this.projects, filter, fields));
  }

  public openUserListDialog(project: IProjectPopulated) {
    this.dialog.open(UserListDialogComponent, {
      data: project?.users,
      panelClass: 'm-big-dialog',
      disableClose: true,
      autoFocus: false
    });
  }

}
