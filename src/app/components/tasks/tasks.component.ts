import {Component, Input, OnInit} from '@angular/core';

import {TaskService} from './task.service';
import {ProjectModel} from '../../models/project.model';
import {TaskModel} from '../../models/task.model';
import {AutoUnsubscribe} from '../../decorators/autoUnsubscribe.decorator';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {SessionModel} from '../../models/session.model';

@Component({
  selector: 'workito-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
@AutoUnsubscribe
export class TasksComponent implements OnInit {
  @Input() project: ProjectModel;
  private tasksSubscription: Subscription;
  private taskList: SessionModel[];
  private invalidName: boolean;

  filteredTasks: SessionModel[];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.taskService.getTasks(this.project.id).then(() => {
      this.tasksSubscription = this.taskService.tasks$.subscribe(tasks => {
        const taskList = tasks.map(task => new TaskModel().deserialize(task));
        this.taskList = this.orderTasks(taskList);
      });
    });
  }

  createNewTask(name: string) {
    if (name) {
      this.taskService.createNewTask(this.project.id, name).then(task => {
        this.router.navigate(['tasks/', task.project, task.getId]);
      });
    }
  }

  checkName(name: string) {
    this.invalidName = !name || name.length > 20;
  }

  filteredList(filteredTasks: SessionModel[]) {
    this.filteredTasks = filteredTasks;
  }

  get sessionsToShow(): SessionModel[] {
    return this.filteredTasks ? this.filteredTasks : this.taskList;
  }

  orderTasks(taskList: TaskModel[]) {
    const newTaskList: SessionModel[] = [];
    taskList.forEach((task, index) => {
      if (newTaskList.some(session => session.name === task.getSession)) {
        newTaskList.forEach(session => {
          if (session.name === task.getSession) { session.addTask(task); }
        });
      } else {
        newTaskList.push(new SessionModel().deserialize({id: index, name: task.getSession, project: this.project.id, tasks: [task]}));
      }
    });
    return newTaskList;
  }

}
