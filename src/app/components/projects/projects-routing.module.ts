import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';


import {ProjectsComponent} from './projects.component';
import {ProjectDetailsComponent} from './project-details/project-details.component';

const routes = [
  { path: '', component: ProjectsComponent},
  { path: ':id', component: ProjectDetailsComponent}
  ];

@NgModule({
  imports: [
    [RouterModule.forChild(routes)],
  ],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {}
