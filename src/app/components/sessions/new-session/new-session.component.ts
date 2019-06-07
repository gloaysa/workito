import { Component } from '@angular/core';
import {SessionsService} from '../sessions.service';
import {format} from 'date-fns';
import {Router} from '@angular/router';
@Component({
  selector: 'workito-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.scss']
})
export class NewSessionComponent {
  sessionName = format(new Date(), 'dddd DD MMMM YY');
  constructor(private sessionsService: SessionsService, private router: Router) { }

  createNewSession() {
    this.sessionsService.createNewSession(this.sessionName).then(session => {
      this.router.navigate(['sessions/' + session.id]);
    });
  }
}
