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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutes { }
