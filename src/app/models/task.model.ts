import { Deserialize } from './deserialize.interface';

export class TaskModel implements Deserialize {
    constructor(id, uid, projectId, name?) {
        this.id = id;
        this.uid = uid;
        this.createdAt = new Date().toString();
        this.timer = new TimerModel();
        this.name = name || TaskModel.generateName();
        this.project = projectId;
    }
    id: string;
    uid: string;
    createdAt: string;
    name: string;
    timer: TimerModel;
    timers: TimerModel[];
    comments: string;
    project: string;

    static generateName(): string {
        return Intl.DateTimeFormat('es-ES').format(new Date());
    }

    startTimer() {
        this.timer.started = new Date().toString();
        this.timer.stopped = null;
    }
    
    stopTimer() {
        this.timer.stopped = new Date().toString();
        this.timers.push(this.timer);
    }
    
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}

export class TimerModel {
    started: string;
    stopped: string;
}