import {NotificationModel} from '../../../models/notification.model';

export class NotifierService {

  public notifications: NotificationModel[] = [];

  public destroy(notification: NotificationModel): void {
    this.notifications.splice(this.notifications.indexOf(notification), 1);
  }

  public add(notification: NotificationModel): void {
    this.notifications.unshift(notification);
  }
}
