import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TasksComponent} from './tasks.component';
import {TaskDetailsComponent} from './task-details/task-details.component';
import {DateFnsModule} from 'ngx-date-fns';
import {TasksRoutingModule} from './tasks-routing.module';
import { TaskRunningComponent } from './task-running/task-running.component';
import {FormsModule} from '@angular/forms';
import {ElementsModule} from '../elements/elements.module';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskTimerComponent } from './task-timer/task-timer.component';

@NgModule({
  declarations: [
    TasksComponent,
    TaskDetailsComponent,
    TaskRunningComponent,
    TaskItemComponent,
    TaskTimerComponent
  ],
  exports: [
    TasksComponent,
    TaskDetailsComponent,
    TaskRunningComponent,
    TaskItemComponent
  ],
  imports: [
    CommonModule,
    DateFnsModule,
    TasksRoutingModule,
    FormsModule,
    ElementsModule,
  ]
})
export class TasksModule { }
