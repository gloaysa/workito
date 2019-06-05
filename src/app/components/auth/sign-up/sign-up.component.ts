import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'workito-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user: string;
  password: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  signUp() {
    this.authService.signUp(this.user, this.password);
  }

}
