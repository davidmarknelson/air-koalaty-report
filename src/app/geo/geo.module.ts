import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GeoComponent } from './geo.component';
import { GeoRoutingModule } from './geo-routing.module';
// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material';
// Child Modules
import { AqiCardModule } from '../aqi-card/aqi-card.module';
import { IndexscaleModule } from '../indexscale/indexscale.module';

@NgModule({
  declarations: [GeoComponent],
  imports: [
    CommonModule,
    GeoRoutingModule,
    // Angular Material
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    // Child Modules
    AqiCardModule,
    IndexscaleModule
  ]
})
export class GeoModule { }
