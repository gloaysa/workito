import {Component, HostListener} from '@angular/core';

import {TaskService} from '../task.service';

@Component({
  selector: 'workito-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent {
  
  constructor(private taskService: TaskService) { }
}
