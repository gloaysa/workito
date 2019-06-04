import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Session} from '../models/session.models';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class SessionsService {
  private sessions$: Subject<Session[]> = new Subject();
  private sessionsCollection: AngularFirestoreCollection<any>;
  private sessions: Session[] = [];

  public sessionsSubscriber: Observable<Session[]> = this.sessions$.asObservable();

  constructor(private afs: AngularFirestore) {
    this.sessionsCollection = afs.collection<Session[]>('sessions');
    this.getSessions();

  }

  getSessions(): void {
    this.sessionsCollection.valueChanges()
      .subscribe(sessions => {
        const deserializeSessions =  sessions.map(session => {
          return new Session(session.id).deserialize(session);
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


  addNewSession() {
    const id = this.afs.createId();
    const session = new Session(id);

    this.sessionsCollection.doc(id).set(Object.assign({}, session));
  }
}
