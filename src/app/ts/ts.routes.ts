import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MRoute } from '../shared/models/angular.model';
import { TsDetailsComponent } from './page/ts-details/ts-details.component';

const routes: MRoute[] = [
  {
    path: '',
    component: TsDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TsRoutes {}
