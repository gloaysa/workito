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
import {SessionsModule} from './components/sessions/sessions.module';
import {ServicesModule} from './services/services.module';
import {UsersModule} from './components/users/users.module';
import { LoginComponent } from './components/auth/login.component';
import {UserGuard} from './guards/user.guard';

const SpanishConfig = new DateFnsConfigurationService();
SpanishConfig.setLocale(esLocale);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
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
    SessionsModule,
    ServicesModule,
    UsersModule
  ],
  providers: [
    { provide: DateFnsConfigurationService, useValue: SpanishConfig },
    UserGuard
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
