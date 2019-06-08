import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {SessionsService} from '../sessions.service';
import {SessionModel} from '../../../models/session.model';

@Component({
  selector: 'workito-session-detail',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.scss']
})
export class SessionDetailsComponent implements OnInit, OnDestroy {
  session: SessionModel;

  constructor(private sessionsService: SessionsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.session = this.sessionsService.getSession(params.get('id'));
        if (!this.session) {
          // TODO: inform through notification service that session doesn't exist
          this.router.navigate(['sessions/']);
        }
      }
    );
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
