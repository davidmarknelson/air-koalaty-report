import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/signup']);
      return false;
    }
    return true;
  }

}
