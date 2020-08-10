import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectCreateComponent } from './pages/project-create/project-create.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { IsAdminGuard } from './is-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent
  },
  {
    path: 'create',
    component: ProjectCreateComponent
  },
  {
    path: 'edit/:projectId',
    component: ProjectCreateComponent,
    canActivate: [ IsAdminGuard ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ProjectRoutes { }
