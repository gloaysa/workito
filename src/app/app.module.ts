import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {DateFnsConfigurationService, DateFnsModule} from 'ngx-date-fns';
import * as esLocale from 'date-fns/locale/es/index.js';
import {TasksModule} from './components/tasks/tasks.module';
import {UsersModule} from './components/users/users.module';
import { LoginComponent } from './components/auth/login/login.component';
import {UserGuard} from './guards/user.guard';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import {TaskService} from './components/tasks/task.service';
import {AuthService} from './components/auth/auth.service';
import {UserService} from './components/users/user.service';
import {ProjectsModule} from './components/projects/projects.module';
import {ProjectsService} from './components/projects/projects.service';
import {ElementsModule} from './components/elements/elements.module';
import {TaskRunningService} from './components/tasks/task-running/task-running.service';
import {DirectivesModule} from './directives/directives.module';
import {NotificationService} from './components/elements/notifications/notification.service';

const SpanishConfig = new DateFnsConfigurationService();
SpanishConfig.setLocale(esLocale);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DateFnsModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,     // imports firebase/storage only needed for storage features
    FormsModule,
    TasksModule,
    UsersModule,
    ProjectsModule,
    ElementsModule,
    DirectivesModule
  ],
  providers: [
    {provide: DateFnsConfigurationService, useValue: SpanishConfig},
    UserGuard,
    TaskService,
    TaskRunningService,
    AuthService,
    UserService,
    ProjectsService,
    NotificationService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
