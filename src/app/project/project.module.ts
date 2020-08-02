import { NgModule } from '@angular/core';

import { ProjectCreateComponent } from './pages/project-create/project-create.component';
import { ProjectRoutes } from './project.routes';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { ProjectListComponent } from './pages/project-list/project-list.component';

@NgModule({
  declarations: [
    ProjectCreateComponent,
    ProjectListComponent
  ],
  imports: [
    SharedModule,
    ProjectRoutes,
    AuthModule
  ]
})
export class ProjectModule { }
