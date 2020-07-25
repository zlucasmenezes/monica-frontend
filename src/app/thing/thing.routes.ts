import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThingCreateComponent } from './page/thing-create/thing-create.component';


const routes: Routes = [
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
