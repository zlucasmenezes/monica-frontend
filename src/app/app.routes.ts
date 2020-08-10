import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoAuthGuard } from 'src/app/auth/no-auth.guard';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
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
