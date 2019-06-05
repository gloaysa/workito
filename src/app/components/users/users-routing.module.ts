import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UsersComponent} from './users.component';


const routes = [
  { path: '', component: UsersComponent},
];

@NgModule({
  imports: [
    [RouterModule.forChild(routes)],
  ],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
