import {Component, OnInit} from '@angular/core';
import {Session} from '../../models/session.models';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {SessionsService} from '../../services/sessions.service';

@Component({
  selector: 'workito-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrls: ['./session-detail.component.scss']
})
export class SessionDetailComponent implements OnInit {
  session: Session;

  constructor(
    private route: ActivatedRoute,
    private sessionsService: SessionsService

  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
         this.session = this.sessionsService.getSession(params.get('id'));
      }
    );
  }

}
