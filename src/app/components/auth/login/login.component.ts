import { Component, OnInit } from '@angular/core';

import {UserService} from '../../users/user.service';

@Component({
  selector: 'workito-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: string;
  password: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.user, this.password);
  }

}
