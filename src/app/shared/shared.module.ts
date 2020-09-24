import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { CardComponent } from './components/card/card.component';
import { CodeComponent } from './components/code/code.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog/error-dialog.component';
import { HttpErrorInterceptor } from './components/error-dialog/http-error.interceptor';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PageContainerComponent } from './components/page-container/page-container.component';
import { AngularMaterialModule } from './modules/material.module';

@NgModule({
  declarations: [ErrorDialogComponent, HeaderComponent, FooterComponent, CardComponent, PageContainerComponent, CodeComponent],
  imports: [CommonModule, AngularMaterialModule, FormsModule],
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
    CodeComponent,
    ChartsModule,
  ],
  entryComponents: [ErrorDialogComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }],
})
export class SharedModule {}
