import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaskService} from '../../tasks/task.service';

@Component({
  selector: 'workito-new-task-button',
  templateUrl: './new-task-button.component.html',
  styleUrls: ['./new-task-button.component.scss']
})
export class NewTaskButtonComponent {
  @Input() projectId: string;
  @Input() classes: string;
  @Output() whenCreateNewTask = new EventEmitter();
  constructor(private taskService: TaskService) {}

  createNewTask() {
    this.taskService.createNewTask(this.projectId).then(task => {
      this.whenCreateNewTask.emit(task);
    });
  }

}
