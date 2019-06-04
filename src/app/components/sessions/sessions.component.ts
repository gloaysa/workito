import {Component, OnDestroy, OnInit} from '@angular/core';
import {Session} from '../../models/session.models';
import {Subscription} from 'rxjs';
import {SessionsService} from '../../services/sessions.service';

@Component({
  selector: 'workito-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit, OnDestroy {

  sessions: Session[];
  sessionsSubscription: Subscription;

  constructor(private sessionsService: SessionsService) {}

  ngOnInit(): void {
    this.sessionsSubscription = this.sessionsService.sessionsSubscriber.subscribe(sessions => this.sessions = sessions);
  }

  ngOnDestroy(): void {
    this.sessionsSubscription.unsubscribe();
  }

}
