import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

import {SessionModel} from '../models/session.model';
import {UserService} from './user.service';
import {ReplaySubject} from 'rxjs';

@Injectable()
export class SessionsService {
  private sessions$: ReplaySubject<SessionModel[]> = new ReplaySubject(1);
  private sessionsCollection: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore, private userService: UserService) {
    this.userService.currentUserObservable.subscribe(user => {
      this.sessionsCollection = db.collection<SessionModel[]>('users').doc(user.uid)
        .collection('sessions');
      this.getSessions();
    });

  }

  get getSessionsAsObservable() {
    return this.sessions$.asObservable();
  }

  async createNewSession(name?): Promise<SessionModel> {
    const id = this.db.createId();
    let session: SessionModel;
    await this.userService.currentUserObservable.subscribe(user => {
      session = new SessionModel(id, user.uid, name);
      this.sessionsCollection.doc(id).set(Object.assign({}, session));
    });
    return session;
  }

  async updateSession(session: SessionModel): Promise<void> {
    await this.sessionsCollection.doc(session.id).update(Object.assign({}, session));
  }

  async destroySession(session: SessionModel): Promise<void> {
    await this.sessionsCollection.doc(session.id).delete();
  }

  private getSessions(): void {
    this.sessionsCollection.valueChanges()
      .subscribe(sessions => {
        const deserializeSessions =  sessions.map(session => {
          return new SessionModel(session.id, session.uid).deserialize(session);
        });
        this.sessions$.next(deserializeSessions);
      });
  }
}
