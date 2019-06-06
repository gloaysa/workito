import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

import {SessionModel} from '../models/session.model';
import {UserService} from './user.service';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class SessionsService {
  private sessions$: Subject<SessionModel[]> = new Subject();
  private sessionsCollection: AngularFirestoreCollection<any>;
  private sessions: SessionModel[] = [];

  public sessionsSubscriber: Observable<SessionModel[]> = this.sessions$.asObservable();

  constructor(private db: AngularFirestore, private userService: UserService) {
    this.userService.currentUserObservable.subscribe(user => {
      this.sessionsCollection = db.collection<SessionModel[]>('users').doc(user.uid)
        .collection('sessions');
      this.getSessions();
    });

  }

  getSessions(): void {
    this.sessionsCollection.valueChanges()
      .subscribe(sessions => {
        const deserializeSessions =  sessions.map(session => {
          return new SessionModel(session.id, session.uid).deserialize(session);
        });
        this.sessions = deserializeSessions;
        this.sessions$.next(deserializeSessions);
      });
  }

  getSession(id): SessionModel {
    return this.sessions.find(session => {
      return session.id === id;
    });
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

  updateSession(session) {
    this.sessionsCollection.doc(session.id).update(Object.assign({}, session));
  }
}
