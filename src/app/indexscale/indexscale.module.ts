import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexscaleComponent } from './indexscale.component';
// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
// Popover
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [IndexscaleComponent],
  imports: [
    CommonModule,
    // Angular Material
    MatButtonModule,
    MatTooltipModule,
    // Popover
    NgbPopoverModule
  ],
  exports: [IndexscaleComponent]
})
export class IndexscaleModule { }
