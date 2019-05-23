import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from "@angular/material";
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
// Components
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { LandingComponent } from './landing/landing.component';
import { MatSnackBarComponent } from './mat-snack-bar/mat-snack-bar.component';
// Environments
import { environment } from '../environments/environment';
// Google Places
import { AgmCoreModule } from '@agm/core';
// Services
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { AuthService } from "./services/auth/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DeleteDialogComponent,
    MatSnackBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Angular Material
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatMenuModule,
    MatSnackBarModule,
    MatToolbarModule,
    // Google Places
    AgmCoreModule.forRoot({
      apiKey: environment.googleMaps,
      libraries: ['places']
    })
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    MatSnackBarComponent
  ],
  bootstrap: [AppComponent],
  entryComponents: [DeleteDialogComponent]
})
export class AppModule { }
