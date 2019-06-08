import {addSeconds, format, parse} from 'date-fns';
import {Deserialize} from './deserialize.interface';

import * as esLocale from 'date-fns/locale/es/index.js';

export class SessionModel implements Deserialize {
  constructor(id, uid, projectId, name?) {
    this.id = id;
    this.uid = uid;
    this.createdAt = new Date().toString();
    this.name = name || SessionModel.generateName();
    this.timer = new Date(2000, 1, 1).toString();
    this.started = false;
    this.stopped = false;
    this.paused = true;
    this.project = projectId;
  }
  id: string;
  uid: string;
  createdAt: string;
  name: string;
  timer: any;
  started: boolean;
  stopped: boolean;
  paused: boolean;
  comments: string;
  project: string;
  protected timerInterval;

  static generateName(): string {
    return format(new Date(), 'dddd DD MMMM YY', {locale: esLocale});
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

  startTimer() {
    if (this.paused || !this.timerInterval ) {
      this.timer = parse(this.timer);
      this.paused = false;
      this.timerInterval = setInterval(() => {
        this.timer = addSeconds(this.timer, 1);
      }, 1000);
    }
  }

  pauseTimer() {
    if (!this.stopped) {
      this.paused = true;
      clearInterval(this.timerInterval);
    }
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.paused = false;
    this.stopped = true;
  }

}
