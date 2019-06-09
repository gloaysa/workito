import {Component, Input, OnInit} from '@angular/core';

import {SessionsService} from './sessions.service';
import {ProjectModel} from '../../models/project.model';
import {SessionModel} from '../../models/session.model';
import {AutoUnsubscribe} from '../../decorators/autoUnsubscribe.decorator';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'workito-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
@AutoUnsubscribe
export class SessionsComponent implements OnInit {
  @Input() project: ProjectModel;
  private sessionsCollectionSubscription: Subscription;
  private sessionList: SessionModel[];
  private invalidName: boolean;

  filteredSessions: SessionModel[];

  constructor(private sessionsService: SessionsService, private router: Router) {}

  ngOnInit(): void {
    this.getSessions();
  }

  getSessions() {
    this.sessionsCollectionSubscription = this.sessionsService.getsessionsCollection(this.project.id).valueChanges()
      .subscribe(sessions => {
        this.sessionList = sessions.map(session => new SessionModel(session.id, session.uid, session.project).deserialize(session));
      });
  }

  createNewSession(name: string) {
    if (name && !this.sessionsService.sessionRunning) {
      this.sessionsService.createNewSession(this.project.id, name).then(session => {
        this.router.navigate(['sessions/', session.project, session.id]);
      });
    }
  }

  checkName(name: string) {
    this.invalidName = !name || name.length > 20;
  }

  filteredList(filteredSessions: SessionModel[]) {
    this.filteredSessions = filteredSessions;
  }

  get sessionsToShow(): SessionModel[] {
    return this.filteredSessions ? this.filteredSessions : this.sessionList;
  }

}
