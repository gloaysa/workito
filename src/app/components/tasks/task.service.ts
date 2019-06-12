import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentData} from '@angular/fire/firestore';

import {TaskModel} from '../../models/task.model';
import {UserService} from '../users/user.service';
import {Subscription} from 'rxjs';
import {AutoUnsubscribe} from '../../decorators/autoUnsubscribe.decorator';

@Injectable() @AutoUnsubscribe
export class TaskService {
  private tasksCollection: AngularFirestoreCollection<any>;
  private userServiceSubscription: Subscription;

  tasks: TaskModel[];
  taskRunning: TaskModel;

  constructor(private db: AngularFirestore, private userService: UserService) {
    this.userServiceSubscription = this.userService.userLoggedInAsObservable.subscribe((user) => {
      if (user) {
        this.tasksCollection = db.collection<TaskModel[]>('users')
          .doc(user.uid)
          .collection('projects');
      }
    });

  }

  static currentTimerToString(task) {
    task.timer = task.timer.toString();
  }

  public getTaskCollection(projectId): AngularFirestoreCollection<DocumentData> {
    return this.tasksCollection.doc(projectId).collection('tasks');
  }

  async createNewTask(projectId, name?): Promise<TaskModel> {
    if (!this.taskRunning && this.userService.currentUser) {
      const id = this.db.createId();
      const task = new TaskModel(id, this.userService.currentUser.uid, projectId, name);
      await this.getTaskCollection(projectId).doc(task.id).set(Object.assign({}, task));
      return task;
    }
  }

  async updateTask(task: TaskModel): Promise<void> {
    TaskService.currentTimerToString(task);
    await this.getTaskCollection(task.project).doc(task.id).update(Object.assign({}, task));
  }

  async destroyTask(task: TaskModel): Promise<void> {
    await this.getTaskCollection(task.project).doc(task.id).delete();
  }

  startTimer(task) {
    if (!this.taskRunning) {
      this.taskRunning = task;
      task.startTimer();
    }
  }

  pauseTimer(task) {
    task.pauseTimer();
    this.updateTask(task);
    this.taskRunning = null;
  }

  stopTimer(task) {
    task.stopTimer();
    this.updateTask(task);
    this.taskRunning = null;
  }
}
