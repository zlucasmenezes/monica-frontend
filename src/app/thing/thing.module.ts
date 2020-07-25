import { NgModule } from '@angular/core';

import { ThingCreateComponent } from './page/thing-create/thing-create.component';
import { SharedModule } from '../shared/shared.module';
import { ThingRoutes } from './thing.routes';


@NgModule({
  declarations: [ThingCreateComponent],
  imports: [
    SharedModule,
    ThingRoutes
  ]
})
export class ThingModule { }
