import {Component, HostListener} from '@angular/core';

import {TaskService} from '../task.service';

@Component({
  selector: 'workito-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent {
  @HostListener('window:beforeunload', ['$event'])
  warningBeforeClosingTab($event) {
    if (this.taskService.taskRunning) {
      event.preventDefault();
      $event.returnValue = 'Pausa la sesión antes de cerrar la página';
    }
  }
  constructor(private taskService: TaskService) { }
}
