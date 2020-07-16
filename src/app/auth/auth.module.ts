import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthRoutes } from './auth.routes';
import { AuthCardComponent } from './components/auth-card/auth-card.component';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';
import { AuthPageContainerComponent } from './components/auth-page-container/auth-page-container.component';
import { AuthInterceptor } from './auth.interceptor';

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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AuthModule { }
