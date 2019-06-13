import { Deserialize } from './deserialize.interface';
import { differenceInSeconds, addSeconds } from 'date-fns';

export class TaskModel implements Deserialize {
    constructor(id: string, uid: string, projectId: string, name?: string) {
        this.id = id;
        this.uid = uid;
        this.createdAt = new Date().toString();
        this.timers = [];
        this.started = true;
        this.stopped = false;
        this.name = name || TaskModel.generateName();
        this.project = projectId;
    }
    id: string;
    uid: string;
    createdAt: string;
    name: string;
    totalTime: string | Date;
    timers: {
        started: string | Date,
        stopped: string | Date
    }[];
    started: boolean;
    stopped: boolean;
    comments: string;
    project: string;
    private interval;

    static generateName(): string {
        return Intl.DateTimeFormat('es-ES').format(new Date());
    }

    startTimer() {
        if (this.stopped) {
            if (!this.totalTime) {
                this.totalTime = new Date(2000, 1, 1).toString();
            }
            this.stopped = false;
            this.started = true;
            this.startInterval();
            this.timers.push({
                started: new Date().toString(),
                stopped: ''
            })
        }
    }

    stopTimer() {
        if (this.started) {
            this.started = false;
            this.stopped = true;
            clearInterval(this.interval);
            const lastIndex = this.timers.length - 1;
            this.timers[lastIndex].stopped = new Date().toString();
        }
    }

    startInterval() {
        this.interval = setInterval(() => {
            this.totalTime = addSeconds(this.totalTime, 1).toString();
        }, 1000)
    }

    get getTime(): number {
        if (this.stopped) {
            const lastIndex = this.timers.length - 1;
            const firstStarted = this.timers[0].started;
            const lastStopped = this.timers[lastIndex].stopped;
            return differenceInSeconds(lastStopped, firstStarted);
        }
    }

    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
