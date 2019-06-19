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
import {DirectivesModule} from '../../directives/directives.module';
import { SessionItemComponent } from './sessions/session-item.component';
import {TaskControlButtonsComponent} from './task-control-buttons/task-control-buttons.component';

@NgModule({
  declarations: [
    TasksComponent,
    TaskDetailsComponent,
    TaskRunningComponent,
    TaskItemComponent,
    TaskTimerComponent,
    SessionItemComponent,
    TaskControlButtonsComponent
  ],
  exports: [
    TasksComponent,
    TaskDetailsComponent,
    TaskRunningComponent,
    TaskItemComponent,
    TaskControlButtonsComponent
  ],
  imports: [
    CommonModule,
    DateFnsModule,
    TasksRoutingModule,
    FormsModule,
    ElementsModule,
    DirectivesModule,
  ]
})
export class TasksModule { }
