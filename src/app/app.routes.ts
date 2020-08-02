import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoAuthGuard } from 'src/app/auth/no-auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './auth/auth.routes#AuthRoutes',
    canActivate: [ NoAuthGuard ]
  },
  {
    path: 'project',
    loadChildren: './project/project.routes#ProjectRoutes',
  },
  {
    path: 'project/:projectId/thing',
    loadChildren: './thing/thing.routes#ThingRoutes',
  },
  {
    path: 'project/:projectId/thing/:thingId/sensor',
    loadChildren: './sensor/sensor.routes#SensorRoutes',
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
