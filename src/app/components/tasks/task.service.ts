import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { TaskModel } from '../../models/task.model';
import { UserService } from '../users/user.service';
import {ReplaySubject, Subscription} from 'rxjs';
import { AutoUnsubscribe } from '../../decorators/autoUnsubscribe.decorator';

@Injectable() @AutoUnsubscribe
export class TaskService {

  constructor(private db: AngularFirestore, private userService: UserService) {
    this.userServiceSubscription = this.userService.userLoggedInAsObservable.subscribe((user) => {
      if (user) {
        this.tasksCollection = db.collection<TaskModel[]>('users')
          .doc(user.uid)
          .collection('tasks');

        this.getTasks();
      }
    });
  }
  private tasksCollection: AngularFirestoreCollection<any>;
  private tasksCollectionSubs: Subscription;
  private userServiceSubscription: Subscription;

  tasks$: ReplaySubject<TaskModel[]> = new ReplaySubject();
  taskRunning: TaskModel;

  static stringifyTask(task: TaskModel): object {
    return Object.assign({}, task);
  }

  private getTasks(): void {
    this.tasksCollectionSubs =  this.tasksCollection.valueChanges().subscribe(tasks => {
      const taskList = tasks.map(task => new TaskModel(task.id, task.uid, task.project).deserialize(task));
      this.tasks$.next(taskList);
    });
  }

  async createNewTask(projectId: string, name?: string): Promise<TaskModel> {
    if (!this.taskRunning && this.userService.currentUser) {
      const id = this.db.createId();
      const task = new TaskModel(id, this.userService.currentUser.uid, projectId, name);
      await this.tasksCollection.doc(task.id).set(TaskService.stringifyTask(task));
      return task;
    }
  }

  async updateTask(task: TaskModel): Promise<void> {
    await this.tasksCollection.doc(task.id).update(TaskService.stringifyTask(task));
  }

  async destroyTask(task: TaskModel): Promise<void> {
    await this.tasksCollection.doc(task.id).delete();
  }
}
