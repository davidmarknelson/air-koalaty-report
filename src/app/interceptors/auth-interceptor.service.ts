import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// Angular Material
import { MatSnackBarComponent } from '../mat-snack-bar/mat-snack-bar.component';
// Environments
import { environment } from '../../environments/environment';
// Services
import { StorageService } from '../services/storage/storage.service';


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private snackBar: MatSnackBarComponent,
    private storageService: StorageService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req)
    .pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // Save list of countries with a timestamp
          if (event.url === `${environment.apiUri}airvisual/countries`) {
            let body = this.storageService.createCountriesValueWithTimestamp(event.body);
            localStorage.setItem('countries', JSON.stringify(body));
          }
          // Notify users when a city has been saved or deleted from the city list
          if (event.body.message) {
            this.snackBar.openSnackBar(event.body.message, 'Close', 'green-snackbar');
          }
          // Save aqi data to visited cities with a timestamp
          if (event.body.current) {
            let key = this.storageService.createAqiCityKey(event.body);
            let value = this.storageService.createAqiValueWithTimestamp(event.body);
            localStorage.setItem(key, JSON.stringify(value));
          }
        }
      }, error => {
        console.log("----response----");
        console.error("status code:");
        console.error(error.status);
        console.error(error.message);
        console.error(error.error.message);
        console.log("--- end of response---");
        // Show errors to the user
        this.snackBar.openSnackBar(`ERROR: ${error.error.message}`,'Close', 'red-snackbar');
      })
    );
  }
}
