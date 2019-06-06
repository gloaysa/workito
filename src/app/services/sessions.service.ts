import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

import {Session} from '../models/session.models';
import {Observable, Subject} from 'rxjs';
import {UserService} from './user.service';

@Injectable()
export class SessionsService {
  private sessions$: Subject<Session[]> = new Subject();
  private sessionsCollection: AngularFirestoreCollection<any>;
  private sessions: Session[] = [];

  public sessionsSubscriber: Observable<Session[]> = this.sessions$.asObservable();

  constructor(private db: AngularFirestore, private userService: UserService) {
    this.userService.currentUserObservable.subscribe(user => {
      this.sessionsCollection = db.collection<Session[]>('users').doc(user.uid)
        .collection('sessions');
      this.getSessions();
    });

  }

  getSessions(): void {
    this.sessionsCollection.valueChanges()
      .subscribe(sessions => {
        const deserializeSessions =  sessions.map(session => {
          return new Session(session.id, session.uid).deserialize(session);
        });
        this.sessions = deserializeSessions;
        this.sessions$.next(deserializeSessions);
      });
  }

  getSession(id): Session {
    return this.sessions.find(session => {
      return session.id === id;
    });
  }

  async createNewSession(): Promise<Session> {
    const id = this.db.createId();
    let session: Session;
    await this.userService.currentUserObservable.subscribe(user => {
      session = new Session(id, user.uid);
      this.sessionsCollection.doc(id).set(Object.assign({}, session));
    });
    return session;
  }

  updateSession(session) {
    this.sessionsCollection.doc(session.id).update(Object.assign({}, session));
  }
}
