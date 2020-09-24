import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IsAdminGuard } from '../project/is-admin.guard';
import { MRoute } from '../shared/models/angular.model';
import { SensorCreateComponent } from './pages/sensor-create/sensor-create.component';

const routes: MRoute[] = [
  {
    path: 'create',
    component: SensorCreateComponent,
    canActivate: [IsAdminGuard],
    data: {
      backRoute: 'project/:projectId/thing/:thingId',
    },
  },
  {
    path: 'edit/:sensorId',
    component: SensorCreateComponent,
    canActivate: [IsAdminGuard],
    data: {
      backRoute: 'project/:projectId/thing/:thingId',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class SensorRoutes {}
