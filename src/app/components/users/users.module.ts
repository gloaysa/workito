import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import {UserLoginComponent} from './user-login/user-login.component';
import {UsersRoutingModule} from './users-routing.module';

@NgModule({
  declarations: [
    UsersComponent,
    UserLoginComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
