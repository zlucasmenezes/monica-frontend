import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NoAuthGuard } from 'src/app/auth/no-auth.guard';
import { AuthGuard } from './auth/auth.guard';
import { MRoute } from './shared/models/angular.model';

const routes: MRoute[] = [
  {
    path: 'auth',
    loadChildren: './auth/auth.routes#AuthRoutes',
    canActivate: [ NoAuthGuard ]
  },
  {
    path: 'project',
    loadChildren: './project/project.routes#ProjectRoutes',
    canActivate: [ AuthGuard ]
  },
  {
    path: 'project/:projectId/thing',
    loadChildren: './thing/thing.routes#ThingRoutes',
    canActivate: [ AuthGuard ]
  },
  {
    path: 'project/:projectId/thing/:thingId/sensor',
    loadChildren: './sensor/sensor.routes#SensorRoutes',
    canActivate: [ AuthGuard ]
  },
  {
    path: 'project/:projectId/thing/:thingId/relay',
    loadChildren: './relay/relay.routes#RelayRoutes',
    canActivate: [ AuthGuard ]
  },
  {
    path: '',
    redirectTo: 'project',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes { }
