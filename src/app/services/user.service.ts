import {Injectable} from '@angular/core';

import {UserModel} from '../models/user.model';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from 'firebase';
import {AuthService} from './auth.service';

@Injectable()
export class UserService {
  private user: UserModel;

  constructor(private afAuth: AngularFireAuth, private authService: AuthService) {
    this.afAuth.authState.subscribe((user: User) => {
      if (user) {
        this.user = new UserModel().deserialize(user.providerData[0]);
      }
    });
  }

  login(email, password) {
    this.authService.login(email, password);
  }

  logout() {
    this.user = null;
    this.authService.logout();
  }

  get currentUser() {
    return this.user;
  }

  get currentUserObservable(): Observable<User> {
    return this.afAuth.authState;
  }


}

