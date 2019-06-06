import { Component, OnInit } from '@angular/core';
import {SessionsService} from '../../../services/sessions.service';
import {Session} from '../../../models/session.models';
import {addHours, addMinutes, addSeconds, parse} from 'date-fns';

@Component({
  selector: 'workito-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.scss']
})
export class NewSessionComponent implements OnInit {
  session: Session;
  timerRunning = false;
  timer: Date;
  constructor(private sessionsService: SessionsService) { }

  private timerInterval: number;

  ngOnInit() {
  }

  createNewSession() {
    this.sessionsService.createNewSession().then(session => {
      this.session = session;
      this.startTimer();
    });
  }

  startTimer() {
    this.timer = parse(this.session.timer);
    let seconds = this.timer.getSeconds();
    let minutes = this.timer.getMinutes();
    let hours = this.timer.getHours();

    this.setFinishedAndPaused(false, false);

    this.timerInterval = setInterval(() => {
      seconds += 1;
      this.timer = addSeconds(this.timer, 1);
      if (seconds > 59) {
        seconds = 0;
        minutes += 1;
        this.timer = addMinutes(this.timer, 1);
      }
      if (minutes > 59) {
        seconds = 0;
        minutes = 0;
        hours += 1;
        this.timer = addHours(this.timer, 1);
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.timerInterval);
    this.setFinishedAndPaused(false, true);
    this.saveCurrentTimer();
    this.sessionsService.updateSession(this.session);
  }

  resumeTimer() {
    this.startTimer();
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.saveCurrentTimer();
    this.setFinishedAndPaused(true, true);
    this.sessionsService.updateSession(this.session);

  }

  private setFinishedAndPaused(finished, paused) {
    this.session.finished = finished;
    this.session.paused = paused;
    this.timerRunning = !paused;
  }

  private saveCurrentTimer() {
    this.session.timer = this.timer.toString();
  }


}
