import {Component} from '@angular/core';

import {TaskRunningService} from './task-running.service';
import {TaskService} from '../task.service';

@Component({
  selector: 'workito-task-running',
  templateUrl: './task-running.component.html',
  styleUrls: ['./task-running.component.scss']
})
export class TaskRunningComponent {

  constructor(private taskRunningService: TaskRunningService, private taskService: TaskService) { }
}
