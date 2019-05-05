import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesComponent } from './countries.component';
import { CountryComponent } from './country/country.component';
import { StateComponent } from './state/state.component';
import { CityComponent } from './city/city.component';

const routes: Routes = [
  { path: '', component: CountriesComponent }
  ,
  { path: ':country', component: CountryComponent }
  ,
  { path: ':country/:state', component: StateComponent },
  { path: ':country/:state/:city', component: CityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
