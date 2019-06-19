import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskService} from '../task.service';
import {Router} from '@angular/router';
import {TaskRunningService} from '../task-running/task-running.service';
import {TaskModel} from '../../../models/task.model';

@Component({
  selector: 'workito-task-control-buttons',
  templateUrl: './task-control-buttons.component.html',
  styleUrls: ['./task-control-buttons.component.scss']
})
export class TaskControlButtonsComponent {
  @Input() task: TaskModel;
  @Input() projectId: string;
  @Input() classes: string;
  @Input() redirectOnCreate: boolean;
  @Output() whenCreateNewTask = new EventEmitter();

  constructor(private taskService: TaskService, private taskRunningService: TaskRunningService, private router: Router) {}

  createNewTask() {
    if (!this.currentTask) {
      this.taskService.createNewTask(this.projectId).then(task => {
        this.whenCreateNewTask.emit(task);
        task.startTimer();
        if (this.redirectOnCreate) {
          this.router.navigate(['tasks/', task.project, task.getId]);
        }
      });
    } else if (!this.currentTask.running) {
      this.currentTask.startTimer();
      this.taskService.updateTask(this.currentTask);
    }
  }

  pauseTask() {
    if (this.taskIsRunning) {
      this.currentTask.pauseTimer();
      this.taskService.updateTask(this.currentTask);
    }
  }

  stopTask() {
    if (this.taskIsRunning || this.taskIsPaused) {
      this.currentTask.stopTimer();
      this.taskService.updateTask(this.currentTask);
    }
  }

  private get taskIsRunning(): boolean {
    return this.currentTask && this.currentTask.running;
  }

  private get taskIsPaused(): boolean {
    return this.currentTask && this.currentTask.pause;
  }

  private get currentTask(): TaskModel {
    return this.task ? this.task : this.taskRunningService.task;
  }

}
