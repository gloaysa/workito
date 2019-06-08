import { Component } from '@angular/core';
import {Router} from '@angular/router';

import {SessionsService} from '../sessions.service';
import {format} from 'date-fns';

@Component({
  selector: 'workito-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.scss']
})
export class NewSessionComponent {
  constructor(private sessionsService: SessionsService, private router: Router) { }
}
