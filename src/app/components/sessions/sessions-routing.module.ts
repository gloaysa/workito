import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SessionDetailsComponent} from './session-details/session-details.component';
import {NewSessionComponent} from './new-session/new-session.component';

const routes = [
  { path: 'hola', component: NewSessionComponent},
  { path: ':id', component: SessionDetailsComponent}
];

@NgModule({
  imports: [
    [RouterModule.forChild(routes)],
  ],
  exports: [RouterModule]
})
export class SessionsRoutingModule {}
