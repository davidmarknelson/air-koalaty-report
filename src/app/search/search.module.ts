import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { IndexscaleModule } from '../indexscale/indexscale.module';
import { CitySearchModule } from '../city-search/city-search.module';
import { AqiCardModule } from '../aqi-card/aqi-card.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatGridListModule,
    CitySearchModule,
    AqiCardModule,
    IndexscaleModule
  ]
})
export class SearchModule { }
