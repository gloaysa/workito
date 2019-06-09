import {Component, Input} from '@angular/core';
import {SessionModel} from '../../../models/session.model';
import {SessionsService} from '../sessions.service';

@Component({
  selector: 'workito-session-item',
  templateUrl: './session-item.component.html',
  styleUrls: ['./session-item.component.scss']
})
export class SessionItemComponent {
  @Input() session: SessionModel;

  constructor(private sessionsService: SessionsService) { }

  deleteSession(session) {
    this.sessionsService.destroySession(session);
  }

}
