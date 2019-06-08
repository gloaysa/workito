import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SessionDetailsComponent} from './session-details/session-details.component';

const routes = [
  { path: ':projectId', component: SessionDetailsComponent,
    children: [
      { path: ':sessionId', component: SessionDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [
    [RouterModule.forChild(routes)],
  ],
  exports: [RouterModule]
})
export class SessionsRoutingModule {}
