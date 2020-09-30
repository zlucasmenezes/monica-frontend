import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { TsDetailsComponent } from './page/ts-details/ts-details.component';
import { TsRoutes } from './ts.routes';

@NgModule({
  declarations: [TsDetailsComponent],
  imports: [SharedModule, TsRoutes],
})
export class TsModule {}
