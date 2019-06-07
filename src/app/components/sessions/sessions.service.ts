import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

import {SessionModel} from '../../models/session.model';
import {UserService} from '../users/user.service';
import {Subscription} from 'rxjs';

@Injectable()
export class SessionsService {
  private sessionsCollection: AngularFirestoreCollection<any>;
  private sessionsCollectionSubscription: Subscription;
  private userServiceSubscription: Subscription;

  sessions: SessionModel[];
  sessionRunning: SessionModel;
  noSessionIsRunning = true;

  constructor(private db: AngularFirestore, private userService: UserService) {
    this.userServiceSubscription = this.userService.userLoggedInAsObservable.subscribe((user) => {
      if (user) {
        this.sessionsCollection = db.collection<SessionModel[]>('users')
          .doc(this.userService.currentUser.uid)
          .collection('sessions');
        this.getSessions();
      } else {
        this.sessionsCollectionSubscription.unsubscribe();
        this.userServiceSubscription.unsubscribe();
      }
    });

  }

  static currentTimerToString(session) {
    session.timer = session.timer.toString();
  }

  private getSessions() {
    this.sessionsCollectionSubscription = this.sessionsCollection.valueChanges()
      .subscribe(sessions => {
        this.sessions = sessions.map(session => new SessionModel(session.id, session.uid).deserialize(session));
      });
  }

  async createNewSession(name?): Promise<SessionModel> {
    if (this.noSessionIsRunning && this.userService.currentUser) {
      const id = this.db.createId();
      const session = new SessionModel(id, this.userService.currentUser.uid, name);
      await this.sessionsCollection.doc(id).set(Object.assign({}, session));
      return this.sessionRunning = this.getSession(session.id);
    }
  }

  async updateSession(session: SessionModel): Promise<void> {
    await this.sessionsCollection.doc(session.id).update(Object.assign({}, session));
  }

  async destroySession(session: SessionModel): Promise<void> {
    await this.sessionsCollection.doc(session.id).delete();
  }

  getSession(sessionId: string): SessionModel {
    return this.sessions.find(session => {
      return session.id === sessionId;
    });
  }

  startTimer(session) {
    if (this.noSessionIsRunning) {
      session.started = true;
      this.sessionRunning = session;
      session.startTimer();
      this.noSessionIsRunning = false;
    }
  }

  pauseTimer(session) {
    session.pauseTimer();
    SessionsService.currentTimerToString(session);
    this.updateSession(session);
    this.noSessionIsRunning = true;
  }

  stopTimer(session) {
    session.stopTimer();
    SessionsService.currentTimerToString(session);
    this.updateSession(session);
    this.noSessionIsRunning = true;
  }
}
