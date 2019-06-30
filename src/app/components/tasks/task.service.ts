import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

import { TaskModel } from '../../models/task.model';
import { UserService } from '../users/user.service';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import { AutoUnsubscribe } from '../../decorators/autoUnsubscribe.decorator';
import {switchMap} from 'rxjs/operators';
import {NotificationService} from '../elements/notifications/notification.service';

@Injectable() @AutoUnsubscribe
export class TaskService {

  private tasksColl: AngularFirestoreCollection;
  private projectFilter$: BehaviorSubject<string|null>;
  private dateFilter$: BehaviorSubject<string|null>;
  tasks$: Observable<TaskModel[]>;
  taskRunning: TaskModel;

  constructor(private db: AngularFirestore, private userService: UserService, private notification: NotificationService) {
    this.tasksColl = db.collection('users').doc(userService.currentUser.uid).collection('tasks');
    this.projectFilter$ = new BehaviorSubject(null);
    this.dateFilter$ = new BehaviorSubject(null);

    this.tasks$ = combineLatest(
      this.projectFilter$,
      this.dateFilter$
    ).pipe(
      switchMap(([projectId, date]) => {
        return db.collection('users').doc(userService.currentUser.uid).collection<TaskModel>('tasks', ref => {
          let query: firebase.firestore.Query = ref;
          if (projectId) { query = query.where('project', '==', projectId); }
          if (date) { query = query.where('createdAt', '==', date); }
          query = query.orderBy('createdAt', 'desc');
          return query;
        }).valueChanges();
      })
    );

  }

  static stringifyTask(task: TaskModel): object {
    return Object.assign({}, task);
  }

  public async getTasks(projectId): Promise<void> {
    await this.projectFilter$.next(projectId);
  }

  async createNewTask(projectId: string, name?: string): Promise<TaskModel> {
    if (!this.taskRunning && this.userService.currentUser) {
      const id = this.db.createId();
      const newTask = {id, uid: this.userService.currentUser.uid, project: projectId};
      const task = new TaskModel().deserialize(newTask);
      if (name) { task.name = name; }
      task.startTimer();
      await this.tasksColl.doc(task.id).set(TaskService.stringifyTask(task));
      return task;
    }
  }

  async updateTask(task: TaskModel): Promise<void> {
    await this.tasksColl.doc(task.id).update(TaskService.stringifyTask(task))
      .catch(err => this.notification.notify(err.message, 'is-danger'));
  }

  async destroyTask(task: TaskModel): Promise<void> {
    await this.tasksColl.doc(task.id).delete()
      .then(() => this.notification.notify('Task eliminada', 'is-success'))
      .catch(err => this.notification.notify(err.message, 'is-danger'));
  }
}
