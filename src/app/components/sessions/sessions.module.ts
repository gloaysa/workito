import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SessionsComponent} from './sessions.component';
import {SessionDetailsComponent} from './session-details/session-details.component';
import {DateFnsModule} from 'ngx-date-fns';
import {SessionsRoutingModule} from './sessions-routing.module';
import { NewSessionComponent } from './new-session/new-session.component';
import {FormsModule} from '@angular/forms';
import { SessionListItemComponent } from './session-list-item/session-list-item.component';

@NgModule({
  declarations: [
    SessionsComponent,
    SessionDetailsComponent,
    NewSessionComponent,
    SessionListItemComponent
  ],
  exports: [
    SessionsComponent,
    NewSessionComponent,
    SessionDetailsComponent
  ],
  imports: [
    CommonModule,
    DateFnsModule,
    SessionsRoutingModule,
    FormsModule
  ]
})
export class SessionsModule { }
