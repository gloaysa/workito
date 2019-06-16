import {Component} from '@angular/core';

import {TaskService} from '../task.service';

@Component({
  selector: 'workito-task-running',
  templateUrl: './task-running.component.html',
  styleUrls: ['./task-running.component.scss']
})
export class TaskRunningComponent {

  constructor(private taskService: TaskService) { }
}
