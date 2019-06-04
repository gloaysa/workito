import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SessionDetailComponent} from './components/session/session-detail.component';

const routes: Routes = [
  { path: 'session/:id', component: SessionDetailComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
