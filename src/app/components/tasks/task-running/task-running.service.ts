import {Injectable} from '@angular/core';
import {TaskModel} from '../../../models/task.model';
import {addMilliseconds, addSeconds} from 'date-fns';


@Injectable()
export class TaskRunningService {
  task: TaskModel;
  showTimer: Date;
  timerInterval: number;

  constructor() {
  }

  startTimer(task) {
    if (!this.task) {
      this.showTimer = addMilliseconds(new Date(0, 0, 0), task.getTotalTime);
      this.task = task;
      this.task.startTimer();
      this.startShowTimerInterval();
    }
  }

  stopTimer() {
    if (this.task) {
      this.task.stopTimer();
      this.task = null;
      clearInterval(this.timerInterval);
    }
  }

  private startShowTimerInterval() {
    this.timerInterval = setInterval(() => {
      this.showTimer = addSeconds(this.showTimer, 1);
    }, 1000);
  }
}
