import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'callback', loadChildren: './callback/callback.module#CallbackModule' },
  { path: 'geo', loadChildren: './geo/geo.module#GeoModule' },
  { path: 'list', loadChildren: './list/list.module#ListModule' },
  { path: 'search', loadChildren: './search/search.module#SearchModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
  { path: 'countries', loadChildren: './countries/countries.module#CountriesModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
