import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProjectCreateComponent } from './pages/project-create/project-create.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { IsAdminGuard } from './is-admin.guard';
import { MRoute } from '../shared/models/angular.model';

const routes: MRoute[] = [
  {
    path: '',
    component: ProjectListComponent
  },
  {
    path: 'create',
    component: ProjectCreateComponent,
    data: {
      backRoute: 'project'
    }
  },
  {
    path: 'edit/:projectId',
    component: ProjectCreateComponent,
    canActivate: [ IsAdminGuard ],
    data: {
      backRoute: 'project'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ProjectRoutes { }
