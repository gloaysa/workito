import {Injectable} from '@angular/core';
import {NotifierService} from './notifier.service';
import {NotificationModel} from '../../../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public notifier = new NotifierService();

  public notify(message: string, notificationClass: string, duration: number = 2000): void {

    const notification: NotificationModel = new NotificationModel(message, notificationClass);

    const dismissWait = () => {
      new Promise<void>((resolve) => setTimeout(resolve, duration)).then(() => {
        this.notifier.destroy(notification);
      });
    };

    this.notifier.add(notification);

    dismissWait();

  }
}
