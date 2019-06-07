import { Component, OnInit } from '@angular/core';
import {UserService} from '../users/user.service';

@Component({
  selector: 'workito-fixed-navbar',
  templateUrl: './fixed-navbar.component.html',
  styleUrls: ['./fixed-navbar.component.scss']
})
export class FixedNavbarComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
