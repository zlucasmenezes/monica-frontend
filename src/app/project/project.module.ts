import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { UserListDialogComponent } from './components/user-list-dialog/user-list-dialog.component';
import { ProjectCreateComponent } from './pages/project-create/project-create.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectRoutes } from './project.routes';

@NgModule({
  declarations: [ProjectCreateComponent, ProjectListComponent, UserListDialogComponent],
  imports: [SharedModule, ProjectRoutes, AuthModule],
})
export class ProjectModule {}
