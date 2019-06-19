import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskService} from '../../tasks/task.service';
import {Router} from '@angular/router';
import {TaskRunningService} from '../../tasks/task-running/task-running.service';

@Component({
  selector: 'workito-new-task-button',
  templateUrl: './new-task-button.component.html',
  styleUrls: ['./new-task-button.component.scss']
})
export class NewTaskButtonComponent {
  @Input() projectId: string;
  @Input() classes: string;
  @Input() redirectOnCreate: boolean;
  @Output() whenCreateNewTask = new EventEmitter();

  constructor(private taskService: TaskService, private taskRunningService: TaskRunningService, private router: Router) {}

  createNewTask() {
    if (!this.taskRunningService.task) {
      this.taskService.createNewTask(this.projectId).then(task => {
        this.whenCreateNewTask.emit(task);
        task.startTimer();
        if (this.redirectOnCreate) {
          this.router.navigate(['tasks/', task.project, task.id]);
        }
      });
    } else if (this.taskRunningService.task.pause) {
      this.taskRunningService.task.startTimer();
      this.taskService.updateTask(this.taskRunningService.task);
    }
  }

  pauseTask() {
    if (this.taskIsRunning) {
      this.taskRunningService.task.pauseTimer();
      this.taskService.updateTask(this.taskRunningService.task);
    }
  }

  stopTask() {
    if (this.taskIsRunning) {
      this.taskRunningService.task.stopTimer();
      this.taskService.updateTask(this.taskRunningService.task);
    }
  }

  private get taskIsRunning(): boolean {
    return this.taskRunningService.task && this.taskRunningService.task.running;
  }

}
