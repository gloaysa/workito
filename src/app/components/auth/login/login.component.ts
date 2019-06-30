import { Component, OnInit } from '@angular/core';

import {UserService} from '../../users/user.service';
import {Router} from '@angular/router';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'workito-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  login(email: NgModel, password: NgModel) {
    this.userService.login(email.value, password.value).then(() => {
      this.router.navigate(['projects']);
    });
    password.reset();
  }

  private emailInvalid(email: NgModel) {
    const re = /\S+@\S+\.\S+/;
    if (email.dirty) {
      return !re.test(email.value);
    }
  }

}
