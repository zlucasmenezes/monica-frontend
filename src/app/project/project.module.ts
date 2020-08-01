import { NgModule } from '@angular/core';

import { ProjectCreateComponent } from './pages/project-create/project-create.component';
import { ProjectRoutes } from './project.routes';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [ProjectCreateComponent],
  imports: [
    SharedModule,
    ProjectRoutes,
    AuthModule
  ]
})
export class ProjectModule { }
