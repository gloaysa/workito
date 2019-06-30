import { Component } from '@angular/core';
import {UserService} from './user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'workito-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent  {

  constructor(private userService: UserService, private router: Router) {}

  logout() {
    this.userService.logout().then(() => {
      this.router.navigate((['user/auth']));
    });
  }

}
