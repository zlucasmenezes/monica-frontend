import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthRoutes } from './auth.routes';
import { AuthCardComponent } from './components/auth-card/auth-card.component';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';
import { AuthPageContainerComponent } from './components/auth-page-container/auth-page-container.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    AuthCardComponent,
    AuthHeaderComponent,
    AuthFooterComponent,
    AuthPageContainerComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutes
  ]
})
export class AuthModule { }
