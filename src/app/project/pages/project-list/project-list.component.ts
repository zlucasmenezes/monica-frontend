import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import arrayUtils from 'src/app/shared/utils/array-utils';
import { UserListDialogComponent } from '../../components/user-list-dialog/user-list-dialog.component';
import { IProjectPopulated } from '../../project.model';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'm-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
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
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.projectsFiltered$.next((this.projects = arrayUtils.orderBy(await this.getProjects(), 'DESC', 'updatedAt')));
    this.subscribeForm();
  }

  private async getProjects(): Promise<IProjectPopulated[]> {
    return await this.projectService.getProjects();
  }

  private async subscribeForm() {
    this.projectsFilter.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((value: string) => {
      this.filterProjects(value);
    });
  }

  public goTo(project: IProjectPopulated) {
    this.router.navigate([`project/${project._id}/thing`]);
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
      autoFocus: false,
    });
  }
}
