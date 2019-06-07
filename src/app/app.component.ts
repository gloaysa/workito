import {Component} from '@angular/core';
import {UserService} from './components/users/user.service';


@Component({
  selector: 'workito-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'workito';
  constructor(private userService: UserService) {}

}
