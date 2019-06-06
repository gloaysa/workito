import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SessionsComponent} from './sessions.component';
import {SessionDetailsComponent} from './session-details/session-details.component';
import {DateFnsModule} from 'ngx-date-fns';
import {SessionsRoutingModule} from './sessions-routing.module';
import { NewSessionComponent } from './new-session/new-session.component';

@NgModule({
  declarations: [
    SessionsComponent,
    SessionDetailsComponent,
    NewSessionComponent
  ],
  exports: [
    SessionsComponent
  ],
  imports: [
    CommonModule,
    DateFnsModule,
    SessionsRoutingModule
  ]
})
export class SessionsModule { }