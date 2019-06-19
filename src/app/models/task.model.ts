import { Deserialize } from './deserialize.interface';
import {isToday, startOfDay} from 'date-fns';

export class TaskModel implements Deserialize {
    constructor() {
        this.createdAt = new Date();
        this.timers = [];
        this.name = TaskModel.generateName();
        this.session = startOfDay(new Date()).toString();
    }
    name: string;
    comments: string;
    project: string;
    protected id: string;
    protected uid: string;
    protected status: string;
    protected session: string;
    protected createdAt: Date;
    protected timers: {
          started: number,
          stopped: number
      }[];

    static generateName(): string {
        return Intl.DateTimeFormat('es-ES').format(new Date());
    }

    startTimer() {
      if (!this.running && isToday(this.session)) {
        this.status = 'running';
        this.timers.push({
            started: Date.now(),
            stopped: 0
        });
      }
    }

    pauseTimer() {
      if (this.running) {
        this.status = 'pause';
        this.saveLastTimeEntry();
      }
    }

    stopTimer() {
      if (this.running) {
        this.saveLastTimeEntry();
      }
      this.status = 'stop';
    }

    get getTotalTime(): number {
      if (this.running) {
        this.saveLastTimeEntry();
      }
      let totalTime = 0;
      this.timers.forEach(timer => {
        totalTime = totalTime + (timer.stopped - timer.started);
      });
      return totalTime;
    }

    get running(): boolean {
      return this.status === 'running';
    }

    get pause(): boolean {
      return this.status === 'pause';
    }

    get stop(): boolean {
      return this.status === 'stop';
    }

    get getId(): string {
      return this.id;
    }

    get getUid(): string {
      return this.uid;
    }

    get getSession(): string {
      return this.session;
    }

    private saveLastTimeEntry() {
      const lastIndex = this.timers.length - 1;
      this.timers[lastIndex].stopped = Date.now();
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
