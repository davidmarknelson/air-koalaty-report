import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GeoRoutingModule } from './geo-routing.module';
import { GeoComponent } from './geo.component';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [GeoComponent],
  imports: [
    CommonModule,
    GeoRoutingModule,
    MatProgressSpinnerModule,
    MatCardModule
  ]
})
export class GeoModule { }
