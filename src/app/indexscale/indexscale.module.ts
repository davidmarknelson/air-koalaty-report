import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexscaleComponent } from './indexscale.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [IndexscaleComponent],
  imports: [
    CommonModule,
    MatExpansionModule
  ],
  exports: [IndexscaleComponent]
})
export class IndexscaleModule { }
