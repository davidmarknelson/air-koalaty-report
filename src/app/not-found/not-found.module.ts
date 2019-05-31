import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';
// Angular Material
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    // Angular Material
    MatCardModule
  ]
})
export class NotFoundModule { }
