import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { ListAddComponent } from './list-add/list-add.component';
import { CitySearchModule } from '../city-search/city-search.module';


@NgModule({
  declarations: [ListComponent, ListAddComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    CitySearchModule
  ]
})
export class ListModule { }
