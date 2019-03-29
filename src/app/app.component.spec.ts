import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthService } from './services/auth/auth.service';

class MockAuthService {
  public handleAuthentication = jasmine.createSpy('handleAuthentication');
  renewTokens = jasmine.createSpy('renewTokens');
}

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let auth: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AuthService, useClass:  MockAuthService }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    auth = fixture.debugElement.injector.get(AuthService);
  });

  it('should create the app', () => {
    app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('with a user who is logged in', () => {
    beforeEach(() => {
      auth.isAuthenticated = jasmine.createSpy('auth.isAuthenticated').and.returnValue(true);
      fixture.detectChanges();
    });

    it('should initialize to see if a user is logged in', () => {
      expect(auth.handleAuthentication).toHaveBeenCalled();
      expect(auth.renewTokens).toHaveBeenCalled();
    });

    it('should have a link to the home page when clicking the brand button', () => {
      const link = fixture.debugElement.query(By.css('[data-test=home-button]'));
      expect(link.attributes.routerLink).toEqual('/home');
    });

    it('should show the log out button', () => {
      expect(By.css('[data-test=logout-button]')).toBeTruthy();
    });
  });

  describe('with a user who is not logged in', () => {
    beforeEach(() => {
      auth.isAuthenticated = jasmine.createSpy('auth.isAuthenticated').and.returnValue(false);
      fixture.detectChanges();
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
  });
});
