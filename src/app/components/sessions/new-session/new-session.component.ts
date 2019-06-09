import {Component, HostListener} from '@angular/core';

import {SessionsService} from '../sessions.service';

@Component({
  selector: 'workito-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.scss']
})
export class NewSessionComponent {
  @HostListener('window:beforeunload', ['$event'])
  warningBeforeClosingTab($event) {
    if (this.sessionsService.sessionRunning) {
      event.preventDefault();
      $event.returnValue = 'Pausa la sesión antes de cerrar la página';
    }
  }
  constructor(private sessionsService: SessionsService) { }
}
