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
    afs.collection('tasks', ref => ref.where('running', '==', true).limit(1)).valueChanges()
      .subscribe((task: TaskModel[]) => {
        if (task.length) {
          this.task = new TaskModel(task[0].id, task[0].uid, task[0].project).deserialize(task[0]);
          this.startShowTimerInterval();
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

  stopTimer() {
    this.task = null;
    clearInterval(this.timerInterval);
  }
}
