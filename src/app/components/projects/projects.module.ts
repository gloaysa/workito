import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from '@angular/forms';
import {ProjectsRoutingModule} from './projects-routing.module';
import {ProjectsComponent} from './projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import {TasksModule} from '../tasks/tasks.module';
import {ElementsModule} from '../elements/elements.module';
import { ProjectItemComponent } from './project-item/project-item.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectDetailsComponent,
    ProjectItemComponent
  ],
  exports: [
    ProjectsComponent,
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    FormsModule,
    TasksModule,
    ElementsModule
  ]
})
export class ProjectsModule { }
