import { Component, OnInit } from '@angular/core';
import {UserService} from '../users/user.service';

@Component({
  selector: 'workito-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
