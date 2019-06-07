import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {SessionsService} from '../sessions.service';

@Component({
  selector: 'workito-session-detail',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.scss']
})
export class SessionDetailsComponent implements OnInit, OnDestroy {
  editing = false;

  constructor(private sessionsService: SessionsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.sessionsService.getSession(params.get('id'));
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
    this.sessionsService.updateSession(this.sessionsService.session);
  }

  deleteSession() {
    if (this.sessionsService.session.stopped) {
      this.sessionsService.destroySession(this.sessionsService.session);
      this.router.navigate(['sessions/']);
    }
  }

  ngOnDestroy(): void {
    if (!this.sessionsService.session.started) {
      this.sessionsService.destroySession(this.sessionsService.session);
    }
  }

  private startTimer() {
    this.sessionsService.startTimer(this.sessionsService.session);
  }

  private pauseTimer() {
    this.sessionsService.pauseTimer(this.sessionsService.session);
  }

  private stopTimer() {
    this.sessionsService.stopTimer(this.sessionsService.session);
  }

}
