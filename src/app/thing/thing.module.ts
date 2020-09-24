import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BoardCredentialsDialogComponent } from './components/board-credentials-dialog/board-credentials-dialog.component';
import { RelayDetailsComponent } from './components/relay-details/relay-details.component';
import { SensorDetailsComponent } from './components/sensor-details/sensor-details.component';
import { ThingCreateComponent } from './pages/thing-create/thing-create.component';
import { ThingDetailsComponent } from './pages/thing-details/thing-details.component';
import { ThingListComponent } from './pages/thing-list/thing-list.component';
import { ThingRoutes } from './thing.routes';

@NgModule({
  declarations: [
    ThingCreateComponent,
    BoardCredentialsDialogComponent,
    ThingListComponent,
    ThingDetailsComponent,
    SensorDetailsComponent,
    RelayDetailsComponent,
  ],
  imports: [SharedModule, ThingRoutes],
})
export class ThingModule {}
