import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TaskService } from '../task.service';
import { TaskModel } from '../../../models/task.model';
import { AutoUnsubscribe } from '../../../decorators/autoUnsubscribe.decorator';
import { Subscription } from 'rxjs';
import {TaskRunningService} from '../task-running/task-running.service';

@Component({
  selector: 'workito-task-detail',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
@AutoUnsubscribe
export class TaskDetailsComponent implements OnInit, OnDestroy {
  private task: TaskModel;

  private tasksSubscription: Subscription;
  private paramSubscription: Subscription;

  constructor(private taskService: TaskService,
              private taskRunningService: TaskRunningService,
              private route: ActivatedRoute,
              private router: Router
  ) {}

  ngOnInit() {
    this.paramSubscription = this.route.firstChild.paramMap
      .subscribe(paramMap => this.getTask(paramMap.get('taskId')));

  }

  getTask(taskId): void {
    this.tasksSubscription = this.taskService.tasks$.subscribe(tasks => {
      const foundTask = tasks.find(task => task.id === taskId);
      this.task = new TaskModel(foundTask.id, foundTask.uid, foundTask.project).deserialize(foundTask);
    });
  }

  startTimer() {
    this.taskRunningService.startTimer(this.task);
    this.taskService.updateTask(this.task);
  }

  stopTimer() {
    this.taskRunningService.stopTimer(this.task);
    this.taskService.updateTask(this.task);
  }

  deleteTask() {
    this.taskService.destroyTask(this.task);
    this.router.navigate(['/projects', this.task.project]);
    this.task = null;
  }

  ngOnDestroy(): void {
    if (this.task) {
      this.taskService.updateTask(this.task);
    }
  }

}
