import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/auth/login.component';
import {UserGuard} from './guards/user.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sessions',
    loadChildren: () => import('./components/sessions/sessions.module').then(mod => mod.SessionsModule),
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
