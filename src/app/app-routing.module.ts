import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'callback', loadChildren: './callback/callback.module#CallbackModule' },
  { path: 'countries', loadChildren: './countries/countries.module#CountriesModule' },
  { path: 'geo', loadChildren: './geo/geo.module#GeoModule' },
  { path: 'list', loadChildren: './list/list.module#ListModule' },
  { path: 'search', loadChildren: './search/search.module#SearchModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
  { path: 'contact', loadChildren: './contact/contact.module#ContactModule' },
  { path: 'notfound', loadChildren: './not-found/not-found.module#NotFoundModule' },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
