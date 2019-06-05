import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';

import {Observable} from 'rxjs';
import { AuthService } from '../services/auth.service';
import {map, take, tap} from 'rxjs/operators';

@Injectable()
export class UserGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService, private router: Router) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.auth.isLoggedIn) { return true; }

    return this.checkUserStatusAndRedirect();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // redirect and return false
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }

  private checkUserStatusAndRedirect() {
    return this.auth.currentUserObservable.pipe(
      take(1),
      map(user => !user),
      tap(loggedIn => this.router.navigate(['login']))
    );
  }
}
