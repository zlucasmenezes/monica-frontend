import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IsAdminGuard } from '../project/is-admin.guard';
import { MRoute } from '../shared/models/angular.model';
import { RelayCreateComponent } from './pages/relay-create/relay-create.component';

const routes: MRoute[] = [
  {
    path: 'create',
    component: RelayCreateComponent,
    canActivate: [IsAdminGuard],
    data: {
      backRoute: 'project/:projectId/thing/:thingId',
    },
  },
  {
    path: 'edit/:relayId',
    component: RelayCreateComponent,
    canActivate: [IsAdminGuard],
    data: {
      backRoute: 'project/:projectId/thing/:thingId',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class RelayRoutes {}
