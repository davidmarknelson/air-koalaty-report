import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from "./services/auth/auth.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';

// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from "@angular/material";
import { MatSnackBarModule } from '@angular/material';

// Components
import { LandingComponent } from './landing/landing.component';

// Google Places
import { AgmCoreModule } from '@agm/core';
import { environment } from '../environments/environment';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatSnackBarComponent } from './mat-snack-bar/mat-snack-bar.component';

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
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatSnackBarModule,
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
