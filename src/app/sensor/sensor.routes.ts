import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SensorCreateComponent } from './page/sensor-create/sensor-create.component';

const routes: Routes = [
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
