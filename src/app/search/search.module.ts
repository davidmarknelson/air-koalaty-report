import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatGridListModule
  ]
})
export class SearchModule { }
