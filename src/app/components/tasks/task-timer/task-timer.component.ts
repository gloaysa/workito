import {Component} from '@angular/core';
import {TaskRunningService} from '../task-running/task-running.service';

@Component({
  selector: 'workito-task-timer',
  templateUrl: './task-timer.component.html',
  styleUrls: ['./task-timer.component.scss']
})
export class TaskTimerComponent {

  constructor(private taskRunningService: TaskRunningService) { }

}
