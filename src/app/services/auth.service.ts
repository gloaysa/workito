import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {
  user: User;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  async login(email: string, password: string) {

    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['user']);
    } catch (e) {
      console.error('Error!'  +  e.message);
    }
  }

  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['user/auth']);
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  get currentUserObservable(): Observable<any> {
    return this.afAuth.authState;
  }


}
