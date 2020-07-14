import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from './modules/material.module';
import { ErrorDialogComponent } from './error-dialog/error-dialog/error-dialog.component';
import { HttpErrorInterceptor } from './error-dialog/http-error.interceptor';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './card/card.component';
import { PageContainerComponent } from './page-container/page-container.component';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    PageContainerComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    CardComponent,
    PageContainerComponent,
    HeaderComponent,
    FooterComponent,
    FormsModule
  ],
  entryComponents: [
    ErrorDialogComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
})
export class SharedModule { }
