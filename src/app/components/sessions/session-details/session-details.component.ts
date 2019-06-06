import {Component, OnInit} from '@angular/core';

import {SessionModel} from '../../../models/session.model';
import {SessionsService} from '../../../services/sessions.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'workito-session-detail',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.scss']
})
export class SessionDetailsComponent implements OnInit {
  session: SessionModel;

  constructor(
    private sessionsService: SessionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
         this.session = this.sessionsService.getSession(params.get('id'));
      }
    );
  }

  pauseTimer() {
    this.session.pauseTimer();
    this.currentTimerToString();
    this.sessionsService.updateSession(this.session);
  }

  resumeTimer() {
    this.session.startTimer();
  }

  stopTimer() {
    this.session.stopTimer();
    this.currentTimerToString();
    this.sessionsService.updateSession(this.session);
  }

  private currentTimerToString() {
    this.session.timer = this.session.timer.toString();
  }

}
