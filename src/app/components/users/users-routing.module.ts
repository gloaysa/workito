import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UsersComponent} from './users.component';
import {UserLoginComponent} from './user-login/user-login.component';


const routes = [
  { path: '', component: UsersComponent},
  { path: 'login', component: UserLoginComponent}
];

@NgModule({
  imports: [
    [RouterModule.forChild(routes)],
  ],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
