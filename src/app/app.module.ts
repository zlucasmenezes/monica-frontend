import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthModule } from 'src/app/auth/auth.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutes } from './app.routes';
import { ProjectModule } from './project/project.module';
import { ThingModule } from './thing/thing.module';
import { SensorModule } from './sensor/sensor.module';
import { RelayModule } from './relay/relay.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    SharedModule,
    AppRoutes,
    ProjectModule,
    ThingModule,
    SensorModule,
    RelayModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
