import {Component, Input} from '@angular/core';
import {ProjectModel} from '../../../models/project.model';
import {ProjectsService} from '../projects.service';

@Component({
  selector: 'workito-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  @Input() project: ProjectModel;

  constructor(private projectsService: ProjectsService) { }

  private destroyProject(project) {
    this.projectsService.destroyProject(project.id);
  }

}
