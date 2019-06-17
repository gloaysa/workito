import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

import {Subscription} from 'rxjs';
import {UserService} from '../users/user.service';
import {TaskModel} from '../../models/task.model';
import {ProjectModel} from '../../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projectsCollectionSubscription: Subscription;

  public projectsCollection: AngularFirestoreCollection<any>;
  public projects: ProjectModel[];

  constructor(private db: AngularFirestore, private userService: UserService) {
    this.projectsCollection = db.collection<TaskModel[]>('projects', ref =>
      ref.orderBy('updatedAt', 'desc'));

    this.getProjects();
  }

  private createFriendlyId(id: string): string {
    let newId = id.replace(/([^a-z0-9_-]|[\t\n\f\r\v\0\s.,])/gim, '').trim().toLowerCase();
    let suffix = 1;
    while (!!this.projects.find(project => project.id === newId)) {
      newId = newId + '-' + suffix;
      suffix ++;
    }
    return newId;
  }

  private async getProjects(): Promise<void> {
    this.projectsCollectionSubscription = await this.projectsCollection.valueChanges()
      .subscribe(projects => {
        this.projects = projects.map(project => new ProjectModel(project.id, project.uid, project.name).deserialize(project));
      });
  }

  public async createNewProject(name): Promise<void> {
    if (name && this.userService.currentUser && this.projectNameIsValid(name)) {
      const id = this.createFriendlyId(name);
      const project = new ProjectModel(id, this.userService.currentUser.uid, name);
      await this.projectsCollection.doc(id).set(Object.assign({}, project));
    }
  }

  public destroyProject(projectId: string) {
    this.projectsCollection.doc(projectId).delete().catch(error => console.log('ERROR:', error.message));
  }

  public projectNameIsValid(name): boolean {
    return name && name.length < 31 && !!!this.projects.find(project => project.name.toLowerCase() === name.toLowerCase());
  }


}
