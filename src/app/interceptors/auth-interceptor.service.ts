import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBarComponent } from '../mat-snack-bar/mat-snack-bar.component';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService, private snackBar: MatSnackBarComponent) { }

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
          console.log('All is fine');
          console.log(event.status);
        }
      }, error => {
        console.log("----response----");
        console.error("status code:");
        console.error(error.status);
        console.error(error.message);
        console.error(error.error.message);
        console.log("--- end of response---");
        this.snackBar.openSnackBar(`ERROR: ${error.error.message}`,'Close');
      })
    );
  }

}
