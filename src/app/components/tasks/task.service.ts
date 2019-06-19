import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { TaskModel } from '../../models/task.model';
import { UserService } from '../users/user.service';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import { AutoUnsubscribe } from '../../decorators/autoUnsubscribe.decorator';
import {switchMap} from 'rxjs/operators';

@Injectable() @AutoUnsubscribe
export class TaskService {

  tasks$: Observable<TaskModel[]>;
  private projectFilter$: BehaviorSubject<string|null>;
  private dateFilter$: BehaviorSubject<string|null>;
  taskRunning: TaskModel;

  constructor(private db: AngularFirestore, private userService: UserService) {
    this.projectFilter$ = new BehaviorSubject(null);
    this.dateFilter$ = new BehaviorSubject(null);

    this.tasks$ = combineLatest(
      this.projectFilter$,
      this.dateFilter$
    ).pipe(
      switchMap(([projectId, date]) => {
        return db.collection<TaskModel>('tasks', ref => {
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
      await this.db.collection('tasks').doc(task.id).set(TaskService.stringifyTask(task));
      return task;
    }
  }

  async updateTask(task: TaskModel): Promise<void> {
    await this.db.collection('tasks').doc(task.id).update(TaskService.stringifyTask(task));
  }

  async destroyTask(task: TaskModel): Promise<void> {
    await this.db.collection('tasks').doc(task.id).delete();
  }
}
