import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/**
 * Auth guard to prevent un-authenticated user to visit Market list
 */

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService:AuthService, private router:Router){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuth = !!this.authService.isLoggedIn;

      if(isAuth){
        return true;
      }

      return this.router.createUrlTree(['/auth']);

  }
}

/**
 * Auth guard to prevent user to vist Log out page for logged in user
 */

@Injectable({
  providedIn: 'root'
})
export class LoginPageGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuth = !!this.authService.isLoggedIn;

      if(!isAuth){
        return true;
      }

      return this.router.createUrlTree(['/markets']);
  }
  
}
