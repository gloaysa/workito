import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/auth/login/login.component';
import {UserGuard} from './guards/user.guard';
import {SignUpComponent} from './components/auth/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
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
