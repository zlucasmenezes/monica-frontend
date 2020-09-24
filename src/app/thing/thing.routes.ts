import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IsAdminGuard } from '../project/is-admin.guard';
import { IsUserGuard } from '../project/is-user.guard';
import { MRoute } from '../shared/models/angular.model';
import { ThingCreateComponent } from './pages/thing-create/thing-create.component';
import { ThingDetailsComponent } from './pages/thing-details/thing-details.component';
import { ThingListComponent } from './pages/thing-list/thing-list.component';

const routes: MRoute[] = [
  {
    path: '',
    component: ThingListComponent,
    canActivate: [IsUserGuard],
    data: {
      backRoute: 'project',
    },
  },
  {
    path: 'create',
    component: ThingCreateComponent,
    canActivate: [IsAdminGuard],
    data: {
      backRoute: 'project/:projectId/thing',
    },
  },
  {
    path: ':thingId',
    component: ThingDetailsComponent,
    canActivate: [IsUserGuard],
    data: {
      backRoute: 'project/:projectId/thing',
    },
  },
  {
    path: 'edit/:thingId',
    component: ThingCreateComponent,
    canActivate: [IsAdminGuard],
    data: {
      backRoute: 'project/:projectId/thing',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ThingRoutes {}
