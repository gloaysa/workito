import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';

import { User } from 'firebase';
import {UserModel} from '../../models/user.model';
import {NotificationService} from '../elements/notifications/notification.service';

@Injectable()
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private notification: NotificationService
  ) {}

  async login(email: string, password: string): Promise<void> {
    await this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .catch(error => this.notification.notify(error.message, 'is-danger'));
  }

  async signUp(email: string, password: string): Promise<void> {
    await this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(data => this.createNewUserInDataBase(data.user))
      .catch(error => this.notification.notify(error.message, 'is-danger'));
  }

  async logout() {
    await this.afAuth.auth.signOut().then(() => this.notification.notify('Logged out', 'is-info'));
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
