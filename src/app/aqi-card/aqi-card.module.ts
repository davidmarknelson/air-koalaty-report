import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AqiCardComponent } from './aqi-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [AqiCardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  exports: [AqiCardComponent]
})
export class AqiCardModule { }
