import {TestBed} from '@angular/core/testing';

import {AuthGuard, LoginPageGuard} from './auth.guard';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRouteSnapshot, Router} from '@angular/router';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let loginPageGuard: LoginPageGuard;
  let mockLocalStorage: any;
  let route: ActivatedRouteSnapshot;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        {provide: Router, useValue: router}

      ]
    });

    guard = TestBed.inject(AuthGuard);
    loginPageGuard = TestBed.inject(LoginPageGuard);
    route = new ActivatedRouteSnapshot();

    const store: any = {};
    mockLocalStorage = {
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
  });

  it('guard should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('loginPageGuard should be created', () => {
    expect(loginPageGuard).toBeTruthy();
  });
});
