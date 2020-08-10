import { NgModule } from '@angular/core';

import { ProjectCreateComponent } from './pages/project-create/project-create.component';
import { ProjectRoutes } from './project.routes';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { UserListComponent } from './components/user-list/user-list.component';

@NgModule({
  declarations: [
    ProjectCreateComponent,
    ProjectListComponent,
    UserListComponent
  ],
  imports: [
    SharedModule,
    ProjectRoutes,
    AuthModule
  ]
})
export class ProjectModule { }
