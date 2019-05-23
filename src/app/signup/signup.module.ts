import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
// Angular Material
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    // Angular Material
    MatButtonModule
  ]
})
export class SignupModule { }
