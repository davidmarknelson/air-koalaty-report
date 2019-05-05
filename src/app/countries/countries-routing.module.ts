import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesComponent } from './countries.component';
// import { StatesComponent } from './states/states.component';

const routes: Routes = [
  { path: '', component: CountriesComponent }
  // ,
  // { path: 'country', component: StatesComponent }
  // ,
  // { path: 'state', component: CitiesComponent },
  // { path: 'city', component: CityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
