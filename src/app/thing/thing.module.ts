import { NgModule } from '@angular/core';

import { ThingCreateComponent } from './pages/thing-create/thing-create.component';
import { SharedModule } from '../shared/shared.module';
import { ThingRoutes } from './thing.routes';
import { BoardCredentialsDialogComponent } from './components/board-credentials-dialog/board-credentials-dialog.component';
import { ThingListComponent } from './pages/thing-list/thing-list.component';


@NgModule({
  declarations: [ThingCreateComponent, BoardCredentialsDialogComponent, ThingListComponent],
  imports: [
    SharedModule,
    ThingRoutes
  ]
})
export class ThingModule { }
