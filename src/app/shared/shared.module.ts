import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from './material/material.module';


@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class SharedModule { }
