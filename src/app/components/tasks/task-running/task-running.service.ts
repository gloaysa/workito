import {Injectable} from '@angular/core';
import {TaskModel} from '../../../models/task.model';
import {addMilliseconds, addSeconds} from 'date-fns';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable()
export class TaskRunningService {
  task: TaskModel;
  showTimer: Date;
  timerInterval: number;

  constructor(private afs: AngularFirestore) {
    afs.collection('tasks', ref => {
      let query: firebase.firestore.Query = ref;
      query = query.orderBy('status');
      query = query.where('status', '<', 'stop').limit(1);
      return query;
    }).valueChanges()
      .subscribe((tasks: TaskModel[]) => {
        if (tasks.length) {
          const task = tasks[0];
          this.task = new TaskModel().deserialize(task);
          if (this.task.running) { this.startShowTimerInterval(); }
          if (this.task.pause) { this.pauseTimer(); }
        } else {
          this.stopTimer();
        }
      });
  }

  private startShowTimerInterval() {
    this.showTimer = addMilliseconds(new Date(0, 0, 0), this.task.getTotalTime);
    this.timerInterval = setInterval(() => {
      this.showTimer = addSeconds(this.showTimer, 1);
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.timerInterval);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.task = null;
  }
}
