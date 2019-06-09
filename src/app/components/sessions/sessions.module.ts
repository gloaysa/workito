import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SessionsComponent} from './sessions.component';
import {SessionDetailsComponent} from './session-details/session-details.component';
import {DateFnsModule} from 'ngx-date-fns';
import {SessionsRoutingModule} from './sessions-routing.module';
import { NewSessionComponent } from './new-session/new-session.component';
import {FormsModule} from '@angular/forms';
import {ElementsModule} from '../elements/elements.module';
import { SessionItemComponent } from './session-item/session-item.component';

@NgModule({
  declarations: [
    SessionsComponent,
    SessionDetailsComponent,
    NewSessionComponent,
    SessionItemComponent
  ],
  exports: [
    SessionsComponent,
    NewSessionComponent,
    SessionDetailsComponent,
    SessionItemComponent
  ],
  imports: [
    CommonModule,
    DateFnsModule,
    SessionsRoutingModule,
    FormsModule,
    ElementsModule
  ]
})
export class SessionsModule { }
