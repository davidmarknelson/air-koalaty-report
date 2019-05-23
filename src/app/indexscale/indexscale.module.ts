import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexscaleComponent } from './indexscale.component';
// Angular Material
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [IndexscaleComponent],
  imports: [
    CommonModule,
    // Angular Material
    MatExpansionModule
  ],
  exports: [IndexscaleComponent]
})
export class IndexscaleModule { }
