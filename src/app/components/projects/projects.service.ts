import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

import {Subscription} from 'rxjs';
import {UserService} from '../users/user.service';
import {SessionModel} from '../../models/session.model';
import {ProjectModel} from '../../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsCollection: AngularFirestoreCollection<any>;
  private projectsCollectionSubscription: Subscription;
  private userServiceSubscription: Subscription;

  projects: ProjectModel[];

  constructor(private db: AngularFirestore, private userService: UserService) {
    this.userServiceSubscription = this.userService.userLoggedInAsObservable.subscribe((user) => {
      if (user) {
        this.projectsCollection = db.collection<SessionModel[]>('users')
          .doc(this.userService.currentUser.uid)
          .collection('projects');
        this.getProjects();
      } else {
        this.projectsCollectionSubscription.unsubscribe();
        this.userServiceSubscription.unsubscribe();
      }
    });
  }

  private getProjects() {
    this.userServiceSubscription = this.projectsCollection.valueChanges()
      .subscribe(projects => {
        this.projects = projects.map(project => new ProjectModel(project.id, project.uid, project.name).deserialize(project));
      });
  }

  getProject(projectId: string): ProjectModel {
    if (this.projects) {
      return this.projects.find(project => project.id === projectId);
    }
  }

  async createNewProject(name): Promise<ProjectModel> {
    if (name && this.userService.currentUser && this.projectNameIsValid(name)) {
      const id = name;
      const project = new ProjectModel(id, this.userService.currentUser.uid, name);
      await this.projectsCollection.doc(id).set(Object.assign({}, project));
      return this.getProject(project.id);
    }
  }

  projectNameIsValid(name): boolean {
    return name && name.length < 31 && !!!this.projects.find(project => project.name === name);
  }


}
