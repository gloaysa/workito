import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';

import { User } from 'firebase';

@Injectable()
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
  ) {}

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
    this.router.navigate(['user/auth']);
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
