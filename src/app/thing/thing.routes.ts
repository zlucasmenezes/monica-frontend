import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThingCreateComponent } from './pages/thing-create/thing-create.component';
import { MRoute } from '../shared/models/angular.model';
import { ThingListComponent } from './pages/thing-list/thing-list.component';
import { IsUserGuard } from '../project/is-user.guard';
import { IsAdminGuard } from '../project/is-admin.guard';


const routes: MRoute[] = [
  {
    path: '',
    component: ThingListComponent,
    canActivate: [ IsUserGuard ],
    data: {
      backRoute: 'project'
    }
  },
  {
    path: 'create',
    component: ThingCreateComponent,
    canActivate: [ IsAdminGuard ],
    data: {
      backRoute: 'project/:projectId'
    }
  },
  {
    path: 'edit/:thingId',
    component: ThingCreateComponent,
    canActivate: [ IsAdminGuard ],
    data: {
      backRoute: 'project/:projectId'
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ThingRoutes { }
