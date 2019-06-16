import {Component, Input, OnInit} from '@angular/core';
import {TaskModel} from '../../../models/task.model';
import {addMilliseconds, addSeconds} from 'date-fns';
import {TaskService} from '../task.service';

@Component({
  selector: 'workito-task-timer',
  templateUrl: './task-timer.component.html',
  styleUrls: ['./task-timer.component.scss']
})
export class TaskTimerComponent implements OnInit {
  @Input() task: TaskModel;

  showTimer: Date;
  timerInterval: number;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.showTimer = addMilliseconds(new Date(0, 0, 0), this.task.getTotalTime);

    if (this.task.running) {
      this.taskService.taskRunning = this.task;
      this.startTimer();
    }
  }

  startTimer() {
    this.taskService.startTimer(this.task);
    this.startShowTimerInterval();
  }

  stopTimer() {
    this.taskService.stopTimer(this.task);
    clearInterval(this.timerInterval);
  }

  private startShowTimerInterval() {
    this.timerInterval = setInterval(() => {
      this.showTimer = addSeconds(this.showTimer, 1);
    }, 1000);
  }

}
