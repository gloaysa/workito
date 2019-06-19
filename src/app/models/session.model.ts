import {TaskModel} from './task.model';
import {Deserialize} from './deserialize.interface';
import {addMilliseconds} from 'date-fns';

export class SessionModel implements Deserialize {
  id: number;
  name: string;
  project: string;
  tasks: TaskModel[];

  get getTotalHours(): Date {
    let totalHours = 0;
    this.tasks.forEach(task => {
      totalHours += task.getTotalTime;
    });
    return addMilliseconds(new Date(0, 0, 0), totalHours);
  }

  addTask(task: TaskModel) {
    this.tasks.push(task);
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
