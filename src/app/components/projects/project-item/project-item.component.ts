import {Component, Input} from '@angular/core';
import {ProjectModel} from '../../../models/project.model';
import {ProjectsService} from '../projects.service';

@Component({
  selector: 'workito-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent {
  @Input() project: ProjectModel;

  constructor(private projectsService: ProjectsService) {}

  deleteProject(project) {
    this.projectsService.destroyProject(project.id);
  }

}
