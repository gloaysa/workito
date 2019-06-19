import {Component, Input, OnInit} from '@angular/core';

import {TaskService} from './task.service';
import {ProjectModel} from '../../models/project.model';
import {TaskModel} from '../../models/task.model';
import {AutoUnsubscribe} from '../../decorators/autoUnsubscribe.decorator';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {SessionModel} from '../../models/session.model';
import {addMilliseconds} from 'date-fns';

@Component({
  selector: 'workito-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
@AutoUnsubscribe
export class TasksComponent implements OnInit {
  @Input() project: ProjectModel;
  private tasksSubscription: Subscription;
  private taskList: TaskModel[];
  private sessionList: SessionModel[];
  private invalidName: boolean;

  filteredTasks: TaskModel[];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.taskService.getTasks(this.project.id).then(() => {
      this.tasksSubscription = this.taskService.tasks$.subscribe(tasks => {
        this.taskList = tasks.map(task => new TaskModel().deserialize(task));
        this.sessionList = this.orderTasks(this.taskList);
      });
    });
  }

  createNewTask(name: string) {
    if (name) {
      this.taskService.createNewTask(this.project.id, name).then(task => {
        this.router.navigate(['tasks/', task.project, task.id]);
      });
    }
  }

  checkName(name: string) {
    this.invalidName = !name || name.length > 20;
  }

  filteredList(filteredTasks: TaskModel[]) {
    this.filteredTasks = filteredTasks;
  }

  get filteredTaskTotalHours(): Date {
    let totalTime = 0;
    if (this.filteredTasks) {
      this.filteredTasks.forEach(task => {
        totalTime += task.getTotalTime;
      });
    }
    return addMilliseconds(new Date(0, 0, 0), totalTime);
  }

  orderTasks(taskList: TaskModel[]) {
    const newTaskList: SessionModel[] = [];
    taskList.forEach((task, index) => {
      if (newTaskList.some(session => session.name === task.session)) {
        newTaskList.forEach(session => {
          if (session.name === task.session) { session.addTask(task); }
        });
      } else {
        newTaskList.push(new SessionModel().deserialize({id: index, name: task.session, project: this.project.id, tasks: [task]}));
      }
    });
    return newTaskList;
  }

}
