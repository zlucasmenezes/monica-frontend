import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageContainerComponent } from './components/page-container/page-container.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthRoutes } from './auth.routes';

@NgModule({
  declarations: [
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    PageContainerComponent,
    SignUpComponent
  ],
  imports: [
    SharedModule,
    AuthRoutes
  ]
})
export class AuthModule { }
