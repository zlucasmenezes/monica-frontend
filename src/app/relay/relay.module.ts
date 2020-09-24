import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RelayCreateComponent } from './pages/relay-create/relay-create.component';
import { RelayRoutes } from './relay.routes';

@NgModule({
  declarations: [RelayCreateComponent],
  imports: [SharedModule, RelayRoutes],
})
export class RelayModule {}
