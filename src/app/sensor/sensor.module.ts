import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SensorConfigComponent } from './components/sensor-config/sensor-config.component';
import { SensorCreateComponent } from './pages/sensor-create/sensor-create.component';
import { SensorRoutes } from './sensor.routes';

@NgModule({
  declarations: [SensorCreateComponent, SensorConfigComponent],
  imports: [SharedModule, SensorRoutes],
})
export class SensorModule {}
