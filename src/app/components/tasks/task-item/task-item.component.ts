import { Component, Input, OnInit } from '@angular/core';
import { TaskModel } from '../../../models/task.model';
import {TaskRunningService} from '../task-running/task-running.service';

@Component({
  selector: 'workito-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() task: TaskModel;

  constructor(private taskRunningService: TaskRunningService) { }

  ngOnInit(): void {
    if (this.task && this.task.running) {
      this.task = this.taskRunningService.task;
    }
  }

}
