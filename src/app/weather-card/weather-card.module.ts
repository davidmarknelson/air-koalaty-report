import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherCardComponent } from './weather-card.component';
// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [WeatherCardComponent],
  imports: [
    CommonModule,
    // Angular Material
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  exports: [WeatherCardComponent]
})
export class WeatherCardModule { }
