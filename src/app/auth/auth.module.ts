import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthInterceptor } from './auth.interceptor';
import { AuthRoutes } from './auth.routes';
import { AuthCardComponent } from './components/auth-card/auth-card.component';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { AuthPageContainerComponent } from './components/auth-page-container/auth-page-container.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

@NgModule({
  declarations: [LoginComponent, SignUpComponent, AuthCardComponent, AuthHeaderComponent, AuthFooterComponent, AuthPageContainerComponent],
  imports: [SharedModule, AuthRoutes],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
})
export class AuthModule {}
