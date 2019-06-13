import { Component, Input, OnInit } from '@angular/core';
import { TaskModel } from '../../../models/task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'workito-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() task: TaskModel;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    if (this.task && this.task.started) {
      this.task = this.taskService.taskRunning;
    }
  }

}
