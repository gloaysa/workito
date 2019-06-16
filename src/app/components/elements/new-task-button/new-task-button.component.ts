import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskService} from '../../tasks/task.service';
import {Router} from '@angular/router';

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

  constructor(private taskService: TaskService, private router: Router) {}

  createNewTask() {
    this.taskService.createNewTask(this.projectId).then(task => {
      this.whenCreateNewTask.emit(task);
      if (this.redirectOnCreate) {
        this.router.navigate(['tasks/', task.project, task.id]);
      }
    });
  }

}
