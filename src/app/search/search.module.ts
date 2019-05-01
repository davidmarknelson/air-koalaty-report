import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { IndexscaleComponent } from '../indexscale/indexscale.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CitySearchModule } from '../city-search/city-search.module';

@NgModule({
    declarations: [SearchComponent, IndexscaleComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatGridListModule,
    MatExpansionModule,
    CitySearchModule
  ]
})
export class SearchModule { }
