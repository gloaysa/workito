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
  private user;

  public sessionsSubscriber: Observable<Session[]> = this.sessions$.asObservable();

  constructor(private db: AngularFirestore, private userService: UserService) {
    this.user = this.userService.currentUser;
    this.sessionsCollection = db.collection<Session[]>('sessions');
    this.getSessions();
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

  createNewSession(): Session {
    const id = this.db.createId();
    const uid = this.user.uid;
    const session = new Session(id, uid);
    this.sessionsCollection.doc(id).set(Object.assign({}, session));
    return session;
  }

  updateSession(session) {
    this.sessionsCollection.doc(session.id).update(Object.assign({}, session));
  }
}
