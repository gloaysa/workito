import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable()
export class AuthService {
  user: User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
  ) {
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
    await this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .catch(error => console.log('error', error.message));
    this.router.navigate(['user']);

  }

  signUp(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(data => this.createNewUserInDataBase(data.user))
      .catch(error => console.log(error.message));

    this.router.navigate(['user']);
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

  get currentUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  get currentUserObservable(): Observable<any> {
    return this.afAuth.authState;
  }

  private createNewUserInDataBase(newUser) {
    const user = {id: '', name: '', email: ''};
    user.id = newUser.uid;
    user.name = newUser.displayName;
    user.email = newUser.email;
    console.log(user);
    this.saveUser(user);

  }

  saveUser(user) {
    this.db.collection<User[]>('users').doc(user.id).set(user);
  }


}
