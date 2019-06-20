import { Component, Input } from '@angular/core';
import { TaskModel } from '../../../models/task.model';
import {isToday} from 'date-fns';

@Component({
  selector: 'workito-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent  {
  @Input() task: TaskModel;
  @Input() showSession: boolean;

  constructor() { }

  get isToday(): boolean {
    return isToday(this.task.session);
  }


}
