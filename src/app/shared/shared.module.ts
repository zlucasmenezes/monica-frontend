import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AngularMaterialModule } from './material/material.module';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    AngularMaterialModule,
    HttpClientModule
  ]
})
export class SharedModule { }
