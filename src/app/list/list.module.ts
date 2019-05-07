import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { ListAddComponent } from './list-add/list-add.component';
import { CitySearchModule } from '../city-search/city-search.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AqiCardModule } from '../aqi-card/aqi-card.module';


@NgModule({
  declarations: [ListComponent, ListAddComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    CitySearchModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    AqiCardModule
  ]
})
export class ListModule { }
