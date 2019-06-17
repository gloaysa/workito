import {Component, Input, OnInit} from '@angular/core';

import {TaskService} from './task.service';
import {ProjectModel} from '../../models/project.model';
import {TaskModel} from '../../models/task.model';
import {AutoUnsubscribe} from '../../decorators/autoUnsubscribe.decorator';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

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
  private invalidName: boolean;

  filteredTasks: TaskModel[];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.taskService.getTasks(this.project.id).then(() => {
      this.tasksSubscription = this.taskService.tasks$.subscribe(tasks => this.taskList = tasks);
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

  get tasksToShow(): TaskModel[] {
    return this.filteredTasks ? this.filteredTasks : this.taskList;
  }

}
