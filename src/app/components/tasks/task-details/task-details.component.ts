import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TaskService } from '../task.service';
import { TaskModel } from '../../../models/task.model';
import { AutoUnsubscribe } from '../../../decorators/autoUnsubscribe.decorator';
import { Subscription } from 'rxjs';
import { addSeconds, parse } from 'date-fns';

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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    let taskId;
    this.childParamSubscription = this.route.firstChild.paramMap.subscribe(paramMap => taskId = paramMap.get('taskId'));
    this.paramSubscription = this.route.paramMap.subscribe(paramMap => {
      const projectId = paramMap.get('projectId');
      if (this.taskService.taskRunning && this.taskService.taskRunning.id === taskId) {
        this.task = this.taskService.taskRunning;
      } else {
        this.getTask(projectId, taskId);
      }
    });
  }

  getTask(projectId, taskId) {
    this.tasksCollectionSubscription = this.taskService.getTaskCollection(projectId).doc(taskId)
      .valueChanges().subscribe((task: TaskModel) => {
        if (task) {
          this.task = new TaskModel(task.id, task.uid, task.project).deserialize(task);
        } else {
          this.router.navigate(['/projects', projectId]);
        }
      });
  }

  updateTask() {
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

  private startTimer() {
    this.taskService.startTimer(this.task);
  }

  private stopTimer() {
    this.taskService.stopTimer(this.task);
  }

}
