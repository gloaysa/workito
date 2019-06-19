import {Component, Input} from '@angular/core';
import {SessionModel} from '../../../models/session.model';
import {isToday, isYesterday} from 'date-fns';

@Component({
  selector: 'workito-session-item',
  templateUrl: './session-item.component.html',
  styleUrls: ['./session-item.component.scss']
})
export class SessionItemComponent {
  @Input() session: SessionModel;

  private isOpen = false;

  isToday(): boolean {
    return isToday(this.session.name);
  }

  isYesterday(): boolean {
    return isYesterday(this.session.name);
  }

  toggleIsOpen() {
    this.isOpen = !this.isOpen;
  }

}
