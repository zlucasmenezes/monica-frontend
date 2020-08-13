import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThingCreateComponent } from './page/thing-create/thing-create.component';
import { MRoute } from '../shared/models/angular.model';


const routes: MRoute[] = [
  {
    path: 'create',
    component: ThingCreateComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ThingRoutes { }
