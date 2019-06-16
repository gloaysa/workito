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

  private tasksCollectionSubscription: Subscription;
  private childParamSubscription: Subscription;
  private paramSubscription: Subscription;

  constructor(private taskService: TaskService,
              private taskRunningService: TaskRunningService,
              private route: ActivatedRoute,
              private router: Router
  ) {}

  ngOnInit() {
    let taskId: string;
    this.childParamSubscription = this.route.firstChild.paramMap.subscribe(paramMap => taskId = paramMap.get('taskId'));
    this.paramSubscription = this.route.paramMap.subscribe(paramMap => {
      const projectId = paramMap.get('projectId');
      this.getTask(projectId, taskId);
    });
  }

  getTask(projectId: string, taskId: string) {
    this.tasksCollectionSubscription = this.taskService.getTaskCollection(projectId).doc(taskId)
      .valueChanges().subscribe((task: TaskModel) => {
        if (task) {
          this.task = new TaskModel(task.id, task.uid, task.project).deserialize(task);
        } else {
          this.router.navigate(['/projects', projectId]);
        }
      });
  }

  startTimer() {
    this.taskRunningService.startTimer(this.task);
    this.taskService.updateTask(this.task);
  }

  stopTimer() {
    this.taskRunningService.stopTimer();
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
