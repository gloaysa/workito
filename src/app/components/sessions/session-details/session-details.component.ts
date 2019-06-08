import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {SessionsService} from '../sessions.service';
import {SessionModel} from '../../../models/session.model';
import {AutoUnsubscribe} from '../../../decorators/autoUnsubscribe.decorator';
import {Subscription} from 'rxjs';

@Component({
  selector: 'workito-session-detail',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.scss']
})
@AutoUnsubscribe
export class SessionDetailsComponent implements OnInit, OnDestroy {
  private session: SessionModel;
  private sessionsCollectionSubscription: Subscription;
  private childParamSubscription: Subscription;
  private paramSubscription: Subscription;

  constructor(private sessionsService: SessionsService,
              private route: ActivatedRoute,
              private router: Router
  ) {}

  ngOnInit() {
    let sessionId;
    this.childParamSubscription = this.route.firstChild.paramMap.subscribe(paramMap => sessionId = paramMap.get('sessionId'));
    this.paramSubscription = this.route.paramMap.subscribe(paramMap => {
      const projectId = paramMap.get('projectId');
      if (this.sessionsService.sessionRunning && this.sessionsService.sessionRunning.id === sessionId) {
        this.session = this.sessionsService.sessionRunning;
      } else {
        this.getSession(projectId, sessionId);
      }
    });
  }

  getSession(projectId, sessionId) {
    this.sessionsCollectionSubscription = this.sessionsService.getsessionsCollection(projectId).doc(sessionId)
      .valueChanges().subscribe((session: SessionModel) => {
        if (session) {
          this.session = new SessionModel(session.id, session.uid, session.project).deserialize(session);
        } else {
          this.router.navigate(['/projects', projectId]);
        }
    });
  }

  updateSession() {
    this.sessionsService.updateSession(this.session);
  }

  deleteSession() {
    if (this.session.stopped) {
      this.sessionsService.destroySession(this.session);
      this.router.navigate(['/projects', this.session.project]);
    }
  }

  ngOnDestroy(): void {
    if (this.session && !this.session.started) {
      this.sessionsService.destroySession(this.session);
    }
  }

  private startTimer() {
    this.sessionsService.startTimer(this.session);
  }

  private pauseTimer() {
    this.sessionsService.pauseTimer(this.session);
  }

  private stopTimer() {
    this.sessionsService.stopTimer(this.session);
  }

}
