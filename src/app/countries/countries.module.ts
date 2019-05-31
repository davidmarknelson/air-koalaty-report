import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesRoutingModule } from './countries-routing.module';
// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// Components
import { CityComponent } from './city/city.component';
import { CountriesComponent } from './countries.component';
import { CountryComponent } from './country/country.component';
import { StateComponent } from './state/state.component';
// Child Modules
import { AqiCardModule } from '../aqi-card/aqi-card.module';
import { IndexscaleModule } from '../indexscale/indexscale.module';
import { WeatherCardModule } from '../weather-card/weather-card.module';

@NgModule({
  declarations: [CountriesComponent, CountryComponent, StateComponent, CityComponent],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    // Angular Material
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    // Child Modules
    AqiCardModule,
    IndexscaleModule,
    WeatherCardModule
  ]
})
export class CountriesModule { }
