import { Component } from '@angular/core';
import {ProjectsService} from './projects.service';

@Component({
  selector: 'workito-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  private invalidName;
  private name: string;

  constructor(private projectsService: ProjectsService) { }

  private createNewProject() {
    if (this.name && !this.invalidName) {
      this.projectsService.createNewProject(this.name);
    }
  }

  private destroyProject(project) {
    this.projectsService.destroyProject(project.id);
  }

  private checkName(event: any) {
    this.invalidName = !this.projectsService.projectNameIsValid(event.target.value);
  }
}
