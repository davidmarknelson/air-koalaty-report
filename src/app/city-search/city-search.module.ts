import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CitySearchComponent } from './city-search.component';
// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [CitySearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Angular Material
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [CitySearchComponent]
})
export class CitySearchModule { }
