import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';


import {ProjectsComponent} from './projects.component';

const routes = [
  { path: '', component: ProjectsComponent},
  { path: ':id', component: ProjectsComponent}
];

@NgModule({
  imports: [
    [RouterModule.forChild(routes)],
  ],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {}
