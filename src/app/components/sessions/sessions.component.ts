import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionModel} from '../../models/session.model';
import {SessionsService} from '../../services/sessions.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'workito-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit, OnDestroy {

  sessions: SessionModel[];
  sessionsSubscription: Subscription;

  constructor(private sessionsService: SessionsService) {}

  ngOnInit(): void {
    this.sessionsSubscription = this.sessionsService.getSessionsAsObservable.subscribe(sessions => {
      this.sessions = sessions;
    });
  }

  ngOnDestroy(): void {
    this.sessionsSubscription.unsubscribe();
  }

}
