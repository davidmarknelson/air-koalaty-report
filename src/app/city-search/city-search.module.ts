import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitySearchComponent } from './city-search.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CitySearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [CitySearchComponent]
})
export class CitySearchModule { }
