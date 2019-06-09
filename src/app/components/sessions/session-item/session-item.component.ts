import {Component, Input, OnInit} from '@angular/core';
import {SessionModel} from '../../../models/session.model';
import {SessionsService} from '../sessions.service';

@Component({
  selector: 'workito-session-item',
  templateUrl: './session-item.component.html',
  styleUrls: ['./session-item.component.scss']
})
export class SessionItemComponent implements OnInit {
  @Input() session: SessionModel;

  constructor(private sessionsService: SessionsService) { }

  ngOnInit(): void {
    if (this.sessionsService.sessionRunning && this.sessionsService.sessionRunning.id === this.session.id) {
      this.session = this.sessionsService.sessionRunning;
    }
  }

}
