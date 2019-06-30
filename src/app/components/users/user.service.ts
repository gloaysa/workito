import {Injectable} from '@angular/core';

import {UserModel} from '../../models/user.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {
  private userLogged: boolean;
  private user: UserModel;

  constructor(private afAuth: AngularFireAuth, private authService: AuthService) {
    this.afAuth.authState.subscribe((user: User) => {
      if (user) {
        this.user = UserService.createUserModel(user);
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

  async login(email, password) {
    await this.authService.login(email, password);
  }

  async logout() {
    this.userLogged = false;
    await this.authService.logout();
    this.user = null;
  }

  get currentUser(): UserModel {
    return this.user;
  }

  get userLoggedIn(): boolean {
    return this.userLogged;
  }

  get userLoggedInAsObservable(): Observable<User> {
    return this.afAuth.authState;
  }


}

