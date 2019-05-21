import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GeoRoutingModule } from './geo-routing.module';
import { AqiCardModule } from '../aqi-card/aqi-card.module';
import { GeoComponent } from './geo.component';
import { MatCardModule } from '@angular/material/card';
import { IndexscaleModule } from '../indexscale/indexscale.module';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
  declarations: [GeoComponent],
  imports: [
    CommonModule,
    GeoRoutingModule,
    MatProgressSpinnerModule,
    MatCardModule,
    AqiCardModule,
    IndexscaleModule,
    MatSnackBarModule
  ]
})
export class GeoModule { }
