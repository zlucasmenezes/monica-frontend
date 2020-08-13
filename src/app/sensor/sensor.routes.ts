import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SensorCreateComponent } from './page/sensor-create/sensor-create.component';
import { MRoute } from '../shared/models/angular.model';

const routes: MRoute[] = [
  {
    path: 'create',
    component: SensorCreateComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class SensorRoutes { }
