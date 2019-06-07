import { Component, OnInit } from '@angular/core';
import {ProjectsService} from './projects.service';

@Component({
  selector: 'workito-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  constructor(private projectsService: ProjectsService) { }

  createNewProject(name) {
    if (name) {
      this.projectsService.createNewProject(name);
    }
  }
}
