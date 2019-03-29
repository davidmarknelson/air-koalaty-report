import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

class MockRouter {
  navigate(path) {}
}

describe('AuthService', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useClass: MockRouter }
      ]
    });
    authService = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });
});
