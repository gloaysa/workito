import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {TaskDetailsComponent} from './task-details/task-details.component';

const routes = [
  { path: ':projectId', component: TaskDetailsComponent,
    children: [
      { path: ':taskId', component: TaskDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [
    [RouterModule.forChild(routes)],
  ],
  exports: [RouterModule]
})
export class TasksRoutingModule {}
