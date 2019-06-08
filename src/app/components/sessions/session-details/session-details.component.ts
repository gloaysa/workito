import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {SessionsService} from '../sessions.service';
import {SessionModel} from '../../../models/session.model';
import {AutoUnsubscribe} from '../../../decorators/autoUnsubscribe.decorator';

@Component({
  selector: 'workito-session-detail',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.scss']
})
@AutoUnsubscribe
export class SessionDetailsComponent implements OnInit, OnDestroy {
  private session: SessionModel;

  constructor(private sessionsService: SessionsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    let projectId;
    this.route.parent.paramMap.subscribe(paramMap => projectId = paramMap.get('id'));
    this.route.paramMap.subscribe(paramMap => {
      const sessionId = paramMap.get('id');
      this.getSession(projectId, sessionId);
    });
  }

  getSession(projectId, sessionId) {
    this.sessionsService.getsessionsCollection(projectId).doc(sessionId)
      .valueChanges().subscribe((session: SessionModel) => this.session = session);
  }

  updateSession() {
    this.sessionsService.updateSession(this.session);
  }

  deleteSession() {
    if (this.session.stopped) {
      this.sessionsService.destroySession(this.session);
      this.router.navigate(['sessions/']);
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
