import { AuthGuard } from './auth.guard';

class MockRouter {
  navigate(path) {}
}

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService;
  let router;

  it('should return true for a logged in user', () => {
    authService = { isAuthenticated: () => true };
    router = new MockRouter();
    authGuard = new AuthGuard(authService, router);
    expect(authGuard.canActivate()).toEqual(true);
  });
  
  it('should navigate to home for a logged out user', () => {
    authService = { isAuthenticated: () => false };
    router = new MockRouter();
    authGuard = new AuthGuard(authService, router);
    spyOn(router, 'navigate');
    expect(authGuard.canActivate()).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
