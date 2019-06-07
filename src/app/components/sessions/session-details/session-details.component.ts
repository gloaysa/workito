import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {SessionModel} from '../../../models/session.model';
import {SessionsService} from '../sessions.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'workito-session-detail',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.scss']
})
export class SessionDetailsComponent implements OnInit, OnDestroy {
  session: SessionModel;
  sessionsSubscription: Subscription;
  editing = false;

  constructor(private sessionsService: SessionsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.sessionsSubscription = this.sessionsService.getSessionsAsObservable.subscribe(sessions => {
          this.session = sessions.find(sessionModel => {
            return sessionModel.id === params.get('id');
          });
        });
      }
    );
  }

  toggleEditing() {
    this.editing = !this.editing;
  }

  editingButtonText() {
    return this.editing ? 'Guardar' : 'Editar';
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
    if (!this.session.started) {
      this.sessionsService.destroySession(this.session);
    }
    this.sessionsSubscription.unsubscribe();
  }

  private startTimer() {
    this.session.started = true;
    this.session.startTimer();
  }

  private pauseTimer() {
    this.session.pauseTimer();
    this.currentTimerToString();
    this.updateSession();
  }

  private stopTimer() {
    this.session.stopTimer();
    this.currentTimerToString();
    this.updateSession();
  }

  private currentTimerToString() {
    this.session.timer = this.session.timer.toString();
  }

}
