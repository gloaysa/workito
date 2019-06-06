import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';

import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';

@Injectable()
export class UserGuard implements CanActivate, CanActivateChild {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.userLoggedIn) { return true; }
    return this.redirectToLogin();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.userLoggedIn) { return true; }
    return this.redirectToLogin();
  }

  private redirectToLogin(): Promise<boolean> {
    return this.router.navigate(['login']);
  }
}
