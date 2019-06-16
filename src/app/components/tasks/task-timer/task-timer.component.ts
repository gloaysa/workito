import {Component, Input} from '@angular/core';
import {TaskRunningService} from '../task-running/task-running.service';
import {TaskModel} from '../../../models/task.model';
import {addMilliseconds} from 'date-fns';

@Component({
  selector: 'workito-task-timer',
  templateUrl: './task-timer.component.html',
  styleUrls: ['./task-timer.component.scss']
})
export class TaskTimerComponent {
  @Input() task: TaskModel;

  constructor(private taskRunningService: TaskRunningService) { }

  getTotalTime() {
    return addMilliseconds(new Date(0, 0, 0), this.task.getTotalTime);
  }

}
