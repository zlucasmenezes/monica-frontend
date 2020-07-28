import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from './modules/material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog/error-dialog.component';
import { HttpErrorInterceptor } from './components/error-dialog/http-error.interceptor';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardComponent } from './components/card/card.component';
import { PageContainerComponent } from './components/page-container/page-container.component';
import { CodeComponent } from './components/code/code.component';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    HeaderComponent,
    FooterComponent,
    CardComponent,
    PageContainerComponent,
    CodeComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule
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
    FormsModule,
    CodeComponent
  ],
  entryComponents: [
    ErrorDialogComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
})
export class SharedModule { }
