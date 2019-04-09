import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

class MockAuthService {
  public handleAuthentication = jasmine.createSpy('handleAuthentication');
  public renewTokens = jasmine.createSpy('renewTokens');
  public login = jasmine.createSpy('login');
  public logout = jasmine.createSpy('logout');
}

class MockRouter {
  navigate = jasmine.createSpy('reroute');
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let auth: AuthService;
  let router: Router;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AuthService, useClass:  MockAuthService },
        { provide: Router, useClass: MockRouter }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    auth = fixture.debugElement.injector.get(AuthService);
    router = fixture.debugElement.injector.get(Router);
  });

  describe('with a user who is logged in', () => {
    beforeEach(() => {
      auth.isAuthenticated = jasmine.createSpy('auth.isAuthenticated').and.returnValue(true);
      fixture.detectChanges();
    });

    it('should create the app', () => {
      component = fixture.debugElement.componentInstance;
      expect(component).toBeTruthy();
    });

    it('should initialize to see if a user is logged in', () => {
      expect(auth.handleAuthentication).toHaveBeenCalled();
      expect(auth.renewTokens).toHaveBeenCalled();
    });

    it('should redirect a user who is logged in', () => {
      expect(router.navigate).toHaveBeenCalled();
    })

    it('should have a link to the home page when clicking the brand button', () => {
      const link = fixture.debugElement.query(By.css('[data-test=home-button]'));
      expect(link.attributes.routerLink).toEqual('/home');
    });

    it('should show the log out button', () => {
      expect(By.css('[data-test=logout-button]')).toBeTruthy();
    });

    it('should call the logout function when clicking the logout button', () => {
      const loginButton = fixture.debugElement.query(By.css('[data-test=logout-button]'));
      loginButton.nativeElement.click();
      fixture.detectChanges();
      expect(auth.logout).toHaveBeenCalled();
    });
  });

  describe('with a user who is not logged in', () => {
    beforeEach(() => {
      auth.isAuthenticated = jasmine.createSpy('auth.isAuthenticated').and.returnValue(false);
      fixture.detectChanges();
    });

    it('should create the app', () => {
      component = fixture.debugElement.componentInstance;
      expect(component).toBeTruthy();
    });

    it('should initialize to see a user is not logged in', () => {
      expect(auth.handleAuthentication).toHaveBeenCalled();
      expect(auth.renewTokens).not.toHaveBeenCalled();
    });

    it('should show the log in & sign up button', () => {
      expect(By.css('[data-test=login-button]')).toBeTruthy();
    });

    it('should have a link to the landing page when clicking the brand button', () => {
      const link = fixture.debugElement.query(By.css('[data-test=brand-button]'));
      expect(link.attributes.routerLink).toEqual('');
    });

    it('should redirect a user to the login page when clicking the log in button', () => {
      const loginButton = fixture.debugElement.query(By.css('[data-test=login-button]'));
      loginButton.nativeElement.click();
      fixture.detectChanges();
      expect(auth.login).toHaveBeenCalled();
    });
  });
});
