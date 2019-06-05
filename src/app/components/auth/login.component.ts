import { Component, OnInit } from '@angular/core';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'workito-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: string;
  password: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.user, this.password);
  }

}
