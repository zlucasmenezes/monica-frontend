import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectCreateComponent } from './page/project-create/project-create.component';

const routes: Routes = [
  {
    path: 'create',
    component: ProjectCreateComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ProjectRoutes { }
