import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material';
// Child Modules
import { AqiCardModule } from '../aqi-card/aqi-card.module';
import { CitySearchModule } from '../city-search/city-search.module';
import { IndexscaleModule } from '../indexscale/indexscale.module';
import { ListComponent } from './list.component';
import { WeatherCardModule } from '../weather-card/weather-card.module';
// Routing
import { ListRoutingModule } from './list-routing.module';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    CitySearchModule,
    //Angular Material
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    // Child Modules
    AqiCardModule,
    IndexscaleModule,
    WeatherCardModule
  ]
})
export class ListModule { }
