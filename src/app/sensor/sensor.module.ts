import { NgModule } from '@angular/core';

import { SensorCreateComponent } from './page/sensor-create/sensor-create.component';
import { SensorRoutes } from './sensor.routes';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SensorCreateComponent
  ],
  imports: [
    SharedModule,
    SensorRoutes
  ]
})
export class SensorModule { }
