import { Component, OnInit } from '@angular/core';
import {SessionsService} from '../../../services/sessions.service';
import {SessionModel} from '../../../models/session.model';
import {format} from 'date-fns';
import {Router} from '@angular/router';
@Component({
  selector: 'workito-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.scss']
})
export class NewSessionComponent implements OnInit {
  session: SessionModel;
  sessionName = format(new Date(), 'dddd DD MMMM YY');
  constructor(private sessionsService: SessionsService, private router: Router) { }

  ngOnInit() {
  }

  createNewSession() {
    this.sessionsService.createNewSession(this.sessionName).then(session => {
      this.session = session;
      this.session.startTimer();
      this.router.navigate(['sessions/' + session.id]);
    });
  }
}
