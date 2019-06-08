import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';


import {ProjectsComponent} from './projects.component';
import {ProjectDetailsComponent} from './project-details/project-details.component';
import {UserGuard} from '../../guards/user.guard';

const routes = [
  { path: '', component: ProjectsComponent},
  { path: ':id', component: ProjectDetailsComponent,
    loadChildren: () => import('../sessions/sessions.module').then(mod => mod.SessionsModule),
    canActivateChild: [UserGuard]}
];

@NgModule({
  imports: [
    [RouterModule.forChild(routes)],
  ],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {}
