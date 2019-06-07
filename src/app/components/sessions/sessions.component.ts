import {Component} from '@angular/core';

import {SessionsService} from './sessions.service';

@Component({
  selector: 'workito-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent {


  constructor(private sessionsService: SessionsService) {}

}
