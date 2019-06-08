import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentData} from '@angular/fire/firestore';

import {SessionModel} from '../../models/session.model';
import {UserService} from '../users/user.service';
import {Subscription} from 'rxjs';
import {AutoUnsubscribe} from '../../decorators/autoUnsubscribe.decorator';

@Injectable() @AutoUnsubscribe
export class SessionsService {
  private sessionsCollection: AngularFirestoreCollection<any>;
  private userServiceSubscription: Subscription;

  sessions: SessionModel[];
  sessionRunning: SessionModel;

  constructor(private db: AngularFirestore, private userService: UserService) {
    this.userServiceSubscription = this.userService.userLoggedInAsObservable.subscribe((user) => {
      if (user) {
        this.sessionsCollection = db.collection<SessionModel[]>('users')
          .doc(user.uid)
          .collection('projects');
      }
    });

  }

  static currentTimerToString(session) {
    session.timer = session.timer.toString();
  }

  public getsessionsCollection(projectId): AngularFirestoreCollection<DocumentData> {
    return this.sessionsCollection.doc(projectId).collection('sessions');
  }

  async createNewSession(projectId, name?): Promise<void> {
    if (!this.sessionRunning && this.userService.currentUser) {
      const id = this.db.createId();
      const session = new SessionModel(id, this.userService.currentUser.uid, projectId, name);
      await this.getsessionsCollection(projectId).doc(session.id).set(Object.assign({}, session));
    }
  }

  async updateSession(session: SessionModel): Promise<void> {
    await this.getsessionsCollection(session.project).doc(session.id).update(Object.assign({}, session));
  }

  async destroySession(session: SessionModel): Promise<void> {
    await this.getsessionsCollection(session.project).doc(session.id).delete();
  }

  startTimer(session) {
    if (!this.sessionRunning) {
      this.sessionRunning = session;
      session.started = true;
      session.startTimer();
    }
  }

  pauseTimer(session) {
    session.pauseTimer();
    SessionsService.currentTimerToString(session);
    this.updateSession(session);
    this.sessionRunning = null;
  }

  stopTimer(session) {
    session.stopTimer();
    SessionsService.currentTimerToString(session);
    this.updateSession(session);
    this.sessionRunning = null;
  }
}
