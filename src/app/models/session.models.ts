import {format} from 'date-fns';
import {Deserialize} from './deserialize.model';

import * as esLocale from 'date-fns/locale/es/index.js';


export class Session implements Deserialize {
  constructor(id?) {
    this.id = id;
    this.createdAt = new Date().toString();
    this.name = Session.generateName();
    this.timer = new Date(2000, 1, 1).toString();
    this.finished = false;
    this.paused = false;
  }
  id: string;
  name: string;
  createdAt: string;
  timer: string;
  paused: boolean;
  finished: boolean;

  static generateName(): string {
    return format(new Date(), 'dddd DD MMMM YY', {locale: esLocale});
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
