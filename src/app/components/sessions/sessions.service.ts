import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

import {SessionModel} from '../../models/session.model';
import {UserService} from '../users/user.service';
import {Subscription} from 'rxjs';

@Injectable()
export class SessionsService {
  private sessionsCollection: AngularFirestoreCollection<any>;

  sessions: SessionModel[];
  sessionRunning: SessionModel;
  noSessionIsRunning = true;

  constructor(private db: AngularFirestore, private userService: UserService) {
    if (this.userService.currentUser) {
      this.sessionsCollection = db.collection<SessionModel[]>('users')
        .doc(this.userService.currentUser.uid)
        .collection('sessions');
      this.getSessions();
    }
  }

  private getSessions(): Promise<void> {
    return this.sessionsCollection.valueChanges()
      .forEach(sessions => {
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
