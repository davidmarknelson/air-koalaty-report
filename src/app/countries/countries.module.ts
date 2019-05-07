import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesComponent } from './countries.component';
import { CountryComponent } from './country/country.component';
import { StateComponent } from './state/state.component';
import { CityComponent } from './city/city.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AqiCardModule } from '../aqi-card/aqi-card.module';



@NgModule({
  declarations: [CountriesComponent, CountryComponent, StateComponent, CityComponent],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule,
    AqiCardModule
  ]
})
export class CountriesModule { }
