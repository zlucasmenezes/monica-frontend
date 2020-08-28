import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SensorCreateComponent } from './page/sensor-create/sensor-create.component';
import { MRoute } from '../shared/models/angular.model';
import { IsAdminGuard } from '../project/is-admin.guard';

const routes: MRoute[] = [
  {
    path: 'create',
    component: SensorCreateComponent,
    canActivate: [ IsAdminGuard ],
    data: {
      backRoute: 'project/:projectId/thing/:thingId'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class SensorRoutes { }
