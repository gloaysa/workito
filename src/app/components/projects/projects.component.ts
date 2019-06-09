import {Component, OnInit} from '@angular/core';
import {ProjectsService} from './projects.service';
import {Form, NgForm} from '@angular/forms';
import {ProjectModel} from '../../models/project.model';
import {Subscription} from 'rxjs';
import {AutoUnsubscribe} from '../../decorators/autoUnsubscribe.decorator';
import {isRegExp} from 'util';

@Component({
  selector: 'workito-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
@AutoUnsubscribe
export class ProjectsComponent implements OnInit {
  private invalidName: boolean;
  private addProject: boolean;
  private name: string;

  projectList: ProjectModel[];
  filteredList: ProjectModel[];
  search: string;


  constructor(private projectsService: ProjectsService) { }

  ngOnInit(): void {
    this.projectsService.projectsCollection.valueChanges()
      .subscribe(projects => this.projectList = projects);
  }

  private createNewProject(nameForm: NgForm) {
    if (this.name && !this.invalidName) {
      this.projectsService.createNewProject(this.name);
      nameForm.reset();
      this.toggleAddButton();
    }
  }

  private searchProjects() {
    const searchReg = RegExp(this.search, 'i');
    if (this.search) {
      this.filteredList = this.projectList.filter(({name}) => name.match(searchReg));
    }
    console.log(this.filteredList);
  }

  private destroyProject(project) {
    this.projectsService.destroyProject(project.id);
  }

  private checkName(event: any) {
    this.invalidName = !this.projectsService.projectNameIsValid(event.target.value);
  }

  private formInvalid(nameForm: NgForm): boolean {
    if (!nameForm.pristine && !nameForm.valid) {

      // TODO: call notification service for error
      return true;
    }
    if (this.invalidName) {
      return true;
    }
  }

  toggleAddButton() {
    this.addProject = !this.addProject;
  }
}
