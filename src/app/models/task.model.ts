import { Deserialize } from './deserialize.interface';

export class TaskModel implements Deserialize {
    constructor(id: string, uid: string, projectId: string, name?: string) {
        this.id = id;
        this.uid = uid;
        this.createdAt = new Date();
        this.timers = [];
        this.name = name || TaskModel.generateName();
        this.project = projectId;
        this.stopped = true;
    }
    id: string;
    uid: string;
    createdAt: Date;
    name: string;
    timers: {
        started: number,
        stopped: number
    }[];
    running: boolean;
    stopped: boolean;
    comments: string;
    project: string;

    static generateName(): string {
        return Intl.DateTimeFormat('es-ES').format(new Date());
    }

    startTimer() {
      if (!this.running) {
        this.stopped = false;
        this.running = true;
        this.timers.push({
            started: Date.now(),
            stopped: 0
        });
      }
    }

    stopTimer() {
      if (this.running) {
          this.running = false;
          this.stopped = true;
          const lastIndex = this.timers.length - 1;
          this.timers[lastIndex].stopped = Date.now();
      }
    }

    get getTotalTime(): number {
      if (this.running) {
        const lastIndex = this.timers.length - 1;
        this.timers[lastIndex].stopped = Date.now();
      }
      let totalTime = 0;
      this.timers.forEach(timer => {
        totalTime = totalTime + (timer.stopped - timer.started);
      });
      return totalTime;
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
