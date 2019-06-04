import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SessionDetailsComponent} from './session-details/session-details.component';
import {SessionsComponent} from './sessions.component';

const routes = [
  { path: '', component: SessionsComponent},
  { path: 'session-details/:id', component: SessionDetailsComponent}
];

@NgModule({
  imports: [
    [RouterModule.forChild(routes)],
  ],
  exports: [RouterModule]
})
export class SessionsRoutingModule {}
