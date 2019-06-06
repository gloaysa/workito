import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';

import {Observable} from 'rxjs';
import {UserService} from '../services/user.service';
import {map, take, tap} from 'rxjs/operators';

@Injectable()
export class UserGuard implements CanActivate, CanActivateChild {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.userService.currentUser) { return true; }
    return this.checkUserStatusAndRedirect();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // redirect and return false
    this.userService.currentUserObservable.subscribe(user => {
      if (!user) {
        this.router.navigate(['']);
        return false;
      }
    });
    return true;
  }

  private checkUserStatusAndRedirect(): Observable<boolean> {
    return this.userService.currentUserObservable.pipe(
      take(1),
      map(user => !user),
      tap(loggedIn => this.router.navigate(['login']))
    );
  }
}
