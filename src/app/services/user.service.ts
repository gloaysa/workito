import {Injectable} from '@angular/core';

import {UserModel} from '../models/user.model';
import {Observable, ReplaySubject} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {AuthService} from './auth.service';

@Injectable()
export class UserService {
  private user$: ReplaySubject<UserModel> = new ReplaySubject(1);
  private userLogged: boolean;

  constructor(private afAuth: AngularFireAuth, private authService: AuthService) {
    this.afAuth.authState.subscribe((user: User) => {
      if (user) {
        this.user$.next(UserService.createUserModel(user));
        this.userLogged = true;
      }
    });
  }

  static createUserModel(user: User): UserModel {
    const newUser = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      providerId: user.providerId
    };
    return new UserModel().deserialize(newUser);

  }

  login(email, password) {
    this.authService.login(email, password);
  }

  logout() {
    this.userLogged = false;
    this.authService.logout();
    this.user$.next(null);
  }

  get currentUserObservable(): Observable<UserModel> {
    return this.user$.asObservable();
  }

  get userLoggedIn(): boolean {
    return this.userLogged;
  }


}

