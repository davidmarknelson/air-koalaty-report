import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'callback', loadChildren: './callback/callback.module#CallbackModule' },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'list', loadChildren: './list/list.module#ListModule' },
  { path: 'search', loadChildren: './search/search.module#SearchModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
