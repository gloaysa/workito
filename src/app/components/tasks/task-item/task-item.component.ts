import { Component, Input, OnInit } from '@angular/core';
import { TaskModel } from '../../../models/task.model';

@Component({
  selector: 'workito-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {
  @Input() task: TaskModel;
  @Input() showSession: boolean;

  constructor() { }

  ngOnInit(): void {

  }

}
