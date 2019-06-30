import {Component} from '@angular/core';

import {NotificationService} from './notification.service';
import {NotifierService} from './notifier.service';
import {notifyAnimation} from './notification.animations';

@Component({
  selector: 'workito-notification',
  templateUrl: './notification.component.html',
  animations: [
    notifyAnimation,
  ]
})
export class NotificationComponent {

  get src(): NotifierService {
    return this.notificationService.notifier;
  }

  constructor(private notificationService: NotificationService) {}
}
