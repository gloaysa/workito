import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';

import { User } from 'firebase';
import {UserModel} from '../../models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {}

  async login(email: string, password: string): Promise<void> {
    await this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .catch(error => console.log('error', error.message));
  }

  async signUp(email: string, password: string): Promise<void> {
    await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(data => this.createNewUserInDataBase(data.user))
      .catch(error => console.log(error.message));
  }

  async logout() {
    await this.afAuth.auth.signOut();
  }

  private createNewUserInDataBase(user: User) {
    const newUser = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL
    };
    this.saveUser(new UserModel().deserialize(newUser));

  }

  private saveUser(user: UserModel) {
    this.db.collection<User[]>('users').doc(user.uid).set(Object.assign({}, user));
  }

}
