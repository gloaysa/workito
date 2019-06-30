export class NotificationModel {

  public message: string;
  public classes: string;

  constructor(message: string, classes: string) {
    this.message = message;
    this.classes = classes;
  }
}
