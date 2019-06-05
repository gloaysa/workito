import { NgModule } from '@angular/core';

import {SessionsService} from './sessions.service';
import {AuthService} from './auth.service';

@NgModule({
  providers: [
    SessionsService,
    AuthService
  ]
})
export class ServicesModule { }
