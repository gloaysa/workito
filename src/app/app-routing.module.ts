import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {UserGuard} from './guards/user.guard';
import {SignUpComponent} from './components/auth/sign-up/sign-up.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent, canActivate: [UserGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'projects',
    loadChildren: () => import('./components/projects/projects.module').then(mod => mod.ProjectsModule),
    canActivateChild: [UserGuard]
  },
  { path: 'user',
    loadChildren: () => import('./components/users/users.module').then(mod => mod.UsersModule),
    canActivateChild: [UserGuard]
  },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
