import {Component, OnInit} from '@angular/core';
import {ProjectsService} from './projects.service';
import {ProjectModel} from '../../models/project.model';
import {AutoUnsubscribe} from '../../decorators/autoUnsubscribe.decorator';

@Component({
  selector: 'workito-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
@AutoUnsubscribe
export class ProjectsComponent implements OnInit {
  private invalidName: boolean;

  projectList: ProjectModel[];
  filteredProjects: ProjectModel[];

  constructor(private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.projectsService.projectsCollection.valueChanges()
      .subscribe(projects => this.projectList = this.createAndSortProjects(projects));
  }

  private createAndSortProjects(projects: ProjectModel[]): ProjectModel[] {
    return projects.map(project => new ProjectModel(project.id, project.uid, project.name)
      .deserialize(project)).sort((a, b) => {
      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);
      return bDate.getTime() - aDate.getTime();
    });
  }

  private createNewProject(name: string) {
    if (name && !this.invalidName) {
      this.projectsService.createNewProject(name);
    }
  }

  private checkName(value: string) {
    this.invalidName = !this.projectsService.projectNameIsValid(value);
  }

  filteredList(filteredSessions: ProjectModel[]) {
    this.filteredProjects = filteredSessions;
  }

  get projectsToShow(): ProjectModel[] {
    return this.filteredProjects ? this.filteredProjects : this.projectList;
  }

}
