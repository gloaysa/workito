import {Component, Input, OnInit} from '@angular/core';

import {SessionsService} from './sessions.service';
import {format} from 'date-fns';
import {ProjectModel} from '../../models/project.model';
import {SessionModel} from '../../models/session.model';
import {AutoUnsubscribe} from '../../decorators/autoUnsubscribe.decorator';
import {Subscription} from 'rxjs';

@Component({
  selector: 'workito-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
@AutoUnsubscribe
export class SessionsComponent implements OnInit {
  @Input() project: ProjectModel;
  private sessionsCollectionSubscription: Subscription;
  private sessionName = format(new Date(), 'dddd DD MMMM YY');
  private sessions: SessionModel[];

  constructor(private sessionsService: SessionsService) {}

  ngOnInit(): void {
    this.getSessions();
  }

  getSessions() {
    this.sessionsCollectionSubscription = this.sessionsService.getsessionsCollection(this.project.id).valueChanges()
      .subscribe(sessions => {
        this.sessions = sessions.map(session => new SessionModel(session.id, session.uid, session.project).deserialize(session));
      });
  }

  createNewSession() {
    if (!this.sessionsService.sessionRunning) {
      this.sessionsService.createNewSession(this.project.id, this.sessionName).then(session => {
        // this.router.navigate(['sessions/' + session.id]);
      });
    }
  }

}
