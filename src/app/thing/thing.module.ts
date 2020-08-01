import { NgModule } from '@angular/core';

import { ThingCreateComponent } from './page/thing-create/thing-create.component';
import { SharedModule } from '../shared/shared.module';
import { ThingRoutes } from './thing.routes';
import { BoardCredentialsDialogComponent } from './components/board-credentials-dialog/board-credentials-dialog.component';


@NgModule({
  declarations: [ThingCreateComponent, BoardCredentialsDialogComponent],
  imports: [
    SharedModule,
    ThingRoutes
  ]
})
export class ThingModule { }
