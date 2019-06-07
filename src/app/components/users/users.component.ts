import { Component } from '@angular/core';
import {UserService} from './user.service';

@Component({
  selector: 'workito-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent  {

  constructor(private userService: UserService) {}

  logout() {
    this.userService.logout();
  }

}
