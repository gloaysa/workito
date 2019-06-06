import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';


@Component({
  selector: 'workito-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'workito';
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

}
