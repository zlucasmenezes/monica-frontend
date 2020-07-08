import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from './modules/material.module';
import { ErrorDialogComponent } from './error-dialog/error-dialog/error-dialog.component';
import { HttpErrorInterceptor } from './error-dialog/http-error.interceptor';

@NgModule({
  declarations: [
    ErrorDialogComponent
  ],
  imports: [
    AngularMaterialModule
  ],
  exports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    ErrorDialogComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
})
export class SharedModule { }
