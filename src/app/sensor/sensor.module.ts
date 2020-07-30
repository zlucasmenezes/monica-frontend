import { NgModule } from '@angular/core';

import { SensorCreateComponent } from './page/sensor-create/sensor-create.component';
import { SensorRoutes } from './sensor.routes';
import { SharedModule } from '../shared/shared.module';
import { SensorConfigComponent } from './components/sensor-config/sensor-config.component';

@NgModule({
  declarations: [
    SensorCreateComponent,
    SensorConfigComponent
  ],
  imports: [
    SharedModule,
    SensorRoutes
  ]
})
export class SensorModule { }
