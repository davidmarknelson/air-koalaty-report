import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Components
import { ListAddComponent } from './list-add/list-add.component';
import { ListComponent } from './list.component';
// Guards
import { AuthGuard } from '../guards/auth/auth.guard';

const routes: Routes = [
  { path: '', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'addcity', component: ListAddComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
