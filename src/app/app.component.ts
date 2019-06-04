import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';
import {Session} from './models/session.models';
import {SessionsService} from './services/sessions.service';

@Component({
  selector: 'workito-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'workito';
  sessions: Session[];
  sessionsSubscription: Subscription;

  constructor(
    private sessionsService: SessionsService
  ) {}

  ngOnInit(): void {
    this.sessionsSubscription = this.sessionsService.sessionsSubscriber.subscribe(sessions => this.sessions = sessions);
  }

  addSession() {
    this.sessionsService.addNewSession();
  }

  ngOnDestroy(): void {
    this.sessionsSubscription.unsubscribe();
  }

}
