import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MRoute } from '../shared/models/angular.model';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

const routes: MRoute[] = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthRoutes {}
