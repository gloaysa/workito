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
  private tasksCollectionSubscription: Subscription;
  private taskList: TaskModel[];
  private invalidName: boolean;

  filteredTasks: TaskModel[];

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.tasksCollectionSubscription = this.taskService.getTaskCollection(this.project.id).valueChanges()
      .subscribe(tasks => {
        this.taskList = tasks.map(task => new TaskModel(task.id, task.uid, task.project).deserialize(task));
      });
  }

  createNewTask(name: string) {
    if (name && !this.taskService.taskRunning) {
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
