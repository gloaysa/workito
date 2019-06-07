import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';

import {Observable} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {UserService} from '../components/users/user.service';

@Injectable()
export class UserGuard implements CanActivate, CanActivateChild {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkUserStatusAndRedirect();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkUserStatusAndRedirect();
  }

  private checkUserStatusAndRedirect(): Observable<boolean> {
    return this.userService.userLoggedInAsObservable.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['login']);
        }
      })
    );
  }
}
