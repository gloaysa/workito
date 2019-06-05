import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'sessions',
    loadChildren: () => import('./components/sessions/sessions.module').then(mod => mod.SessionsModule)
  },
  { path: 'user',
    loadChildren: () => import('./components/users/users.module').then(mod => mod.UsersModule)
  },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
