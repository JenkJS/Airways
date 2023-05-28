import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { HomeComponent, SearchFlightsComponent } from '../home/index';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    SearchFlightsComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HomeRoutingModule
  ],
  exports: [
    HomeComponent,
    SearchFlightsComponent
  ],
})
export class HomeModule {}
