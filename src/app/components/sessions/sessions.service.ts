import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

import {SessionModel} from '../../models/session.model';
import {UserService} from '../users/user.service';
import {Observable, ReplaySubject, Subscription} from 'rxjs';

@Injectable()
export class SessionsService {
  private sessions$: ReplaySubject<SessionModel[]> = new ReplaySubject(1);
  private sessionsCollection: AngularFirestoreCollection<any>;
  session: SessionModel;
  noSessionIsRunning = true;
  sessionsCollectionSubscription: Subscription;
  userSubscription: Subscription;

  constructor(private db: AngularFirestore, private userService: UserService) {
    this.userSubscription = this.userService.currentUserObservable.subscribe(user => {
      if (user) {
        this.sessionsCollection = db.collection<SessionModel[]>('users').doc(user.uid)
          .collection('sessions');
        this.getSessions();
      } else {
        this.userSubscription.unsubscribe();
        this.sessionsCollectionSubscription.unsubscribe();
      }
    });
  }

  get getSessionsAsObservable(): Observable<SessionModel[]> {
    return this.sessions$.asObservable();
  }

  async createNewSession(name?): Promise<void> {
    if (this.noSessionIsRunning) {
      const id = this.db.createId();
      this.userSubscription = await this.userService.currentUserObservable.subscribe(user => {
        if (user) {
          this.session = new SessionModel(id, user.uid, name);
          this.sessionsCollection.doc(id).set(Object.assign({}, this.session));
        } else {
          this.userSubscription.unsubscribe();
        }

      });
    }
  }

  async updateSession(session: SessionModel): Promise<void> {
    await this.sessionsCollection.doc(session.id).update(Object.assign({}, session));
  }

  async destroySession(session: SessionModel): Promise<void> {
    await this.sessionsCollection.doc(session.id).delete();
  }

  private getSessions(): void {
    this.sessionsCollectionSubscription = this.sessionsCollection.valueChanges()
      .subscribe(sessions => {
        const deserializeSessions =  sessions.map(session => {
          return new SessionModel(session.id, session.uid).deserialize(session);
        });
        this.sessions$.next(deserializeSessions);
      });
  }

  async getSession(sessionId: string): Promise<void> {
    this.getSessionsAsObservable.subscribe(sessions => {
      this.session = sessions.find(sessionModel => {
        return sessionModel.id === sessionId;
      });
    });
  }

  startTimer(session) {
    if (this.noSessionIsRunning) {
      session.started = true;
      session.startTimer();
      this.noSessionIsRunning = false;
    }

  }

  pauseTimer(session) {
    session.pauseTimer();
    this.currentTimerToString(session);
    this.updateSession(session);
    this.noSessionIsRunning = true;
  }

  stopTimer(session) {
    session.stopTimer();
    this.currentTimerToString(session);
    this.updateSession(session);
    this.noSessionIsRunning = true;
  }

  private currentTimerToString(session) {
    session.timer = session.timer.toString();
  }
}
