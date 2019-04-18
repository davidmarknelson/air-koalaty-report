import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { MatButtonModule } from '@angular/material/button';
import { IndexscaleComponent } from '../indexscale/indexscale.component';
import { MatExpansionModule } from '@angular/material/expansion';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    declarations: [SearchComponent, IndexscaleComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatExpansionModule
  ]
})
export class SearchModule { }
