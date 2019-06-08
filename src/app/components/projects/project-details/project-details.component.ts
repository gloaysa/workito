import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ProjectsService} from '../projects.service';
import {ProjectModel} from '../../../models/project.model';

@Component({
  selector: 'workito-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  private project: ProjectModel;

  constructor(private route: ActivatedRoute, private router: Router, private projectsService: ProjectsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        this.getProject(params.get('id'));
      }
    );
  }

  async getProject(projectId: string): Promise<void> {
    this.projectsService.projectsCollection.doc(projectId).get().forEach(doc => {
      const newProject = doc.data();
      this.project = new ProjectModel(newProject.uid, newProject.id, newProject.name).deserialize(newProject);
      console.log(this.project)
    });
  }

}
