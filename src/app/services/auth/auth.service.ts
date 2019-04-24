import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { environment } from '../../../environments/environment';
import { Subscription, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private observer: Observer<string>;
  private _idToken: string;
  private _accessToken: string;
  private _expiresAt: number;
  // Subscribe to token expiration stream
  refreshSub: Subscription;
  userProfile: any;

  auth0 = new auth0.WebAuth({
    clientID: environment.clientID,
    domain: environment.domain,
    responseType: 'token id_token',
    redirectUri: environment.redirectUri,
    scope: 'openid profile edit:cities'
  });

  constructor(public router: Router) {
    if (JSON.parse(localStorage.getItem('expires_at')) > Date.now()) {
      this.renewTokens();
    }
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get idToken(): string {
    return this._idToken;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.href = environment.afterCallbackUri;
        this.localLogin(authResult);
        this.router.navigate(['/list']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
      // this.getProfile(err);
    });
  }

  private localLogin(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + Date.now();
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = expiresAt;
    localStorage.setItem('expires_at', JSON.stringify(this._expiresAt));
    // Schedule access token renewal
    this.scheduleRenewal();
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        this.logout();
      }
    });
  }

  private _clearExpiration() {
    // Remove token expiration from localStorage
    localStorage.removeItem('expires_at');
  }

  public logout(): void {
    // Remove tokens and expiry time
    this._accessToken = '';
    this._idToken = '';
    this._expiresAt = 0;
    this._clearExpiration();

    this.auth0.logout({
      clientID: environment.clientID,
      return_to: window.location.origin
    });
  }


  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    // return this._accessToken && Date.now() < this._expiresAt; (this is a previous line)
    let expiration = JSON.parse(localStorage.getItem('expires_at'));
    if (Date.now() < expiration) {
      return true;
    } else {
      return false;
    }
  }

  get tokenValid(): boolean {
    // Check if current time is past access token's expiration
    return Date.now() < JSON.parse(localStorage.getItem('expires_at'));
  }

  scheduleRenewal() {
    // If last token is expired, do nothing
    if (!this.tokenValid) { return; }
    // Unsubscribe from previous expiration observable
    this.unscheduleRenewal();
    // Create and subscribe to expiration observable
    const expiresIn$ = of(this._expiresAt).pipe(
      mergeMap(
        expires => {
          const now = Date.now();
          // Use timer to track delay until expiration
          // to run the refresh at the proper time
          return timer(Math.max(1, expires - now));
        }
      )
    );

    this.refreshSub = expiresIn$.subscribe(() => {
          this.renewTokens();
          this.scheduleRenewal();
      }
    );
  }

  unscheduleRenewal() {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }

  // from Auth0 guide
  // public getProfile(cb): void {
  //   if (!this._accessToken) {
  //     throw new Error('Access Token must exist to fetch profile');
  //   }
  
  //   const self = this;
  //   this.auth0.client.userInfo(this._accessToken, (err, profile) => {
  //     if (profile) {
  //       self.userProfile = profile;
  //     }
  //     cb(err, profile);
  //   });
  // }

  // from github issues
  // public getProfile(): void {
  //   // const accessToken = localStorage.getItem('access_token');
  //   if (!this._accessToken) {
  //     throw new Error('Access token must exist to fetch profile');
  //   }
  //   const self = this;
  //   this.auth0.client.userInfo(this._accessToken, (err, profile) => {
  //   if (profile) {
  //       this.observer.next(profile.picture);
  //     }
  //   });
  // }

}
