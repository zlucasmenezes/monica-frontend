import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from 'src/app/auth/auth.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { ProjectModule } from './project/project.module';
import { RelayModule } from './relay/relay.module';
import { SensorModule } from './sensor/sensor.module';
import { ThingModule } from './thing/thing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    SharedModule,
    AppRoutes,
    ProjectModule,
    ThingModule,
    SensorModule,
    RelayModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
