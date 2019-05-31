import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// Child Modules
import { AqiCardModule } from '../aqi-card/aqi-card.module';
import { CitySearchModule } from '../city-search/city-search.module';
import { IndexscaleModule } from '../indexscale/indexscale.module';
import { WeatherCardModule } from '../weather-card/weather-card.module';
// Components
import { SearchComponent } from './search.component';
// Routing
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    // Angular Material
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    // Child Modules
    AqiCardModule,
    CitySearchModule,
    IndexscaleModule,
    WeatherCardModule
  ]
})
export class SearchModule { }
