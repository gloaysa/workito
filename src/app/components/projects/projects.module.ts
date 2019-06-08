import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from '@angular/forms';
import {ProjectsRoutingModule} from './projects-routing.module';
import {ProjectsComponent} from './projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import {SessionsModule} from '../sessions/sessions.module';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectDetailsComponent
  ],
  exports: [
    ProjectsComponent,
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    FormsModule,
    SessionsModule
  ]
})
export class ProjectsModule { }
