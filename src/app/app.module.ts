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
import {SessionsService} from './services/sessions.service';
import { SessionDetailComponent } from './components/session/session-detail.component';

const SpanishConfig = new DateFnsConfigurationService();
SpanishConfig.setLocale(esLocale);


@NgModule({
  declarations: [
    AppComponent,
    SessionDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DateFnsModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    FormsModule,
    // imports firebase/storage only needed for storage features
  ],
  providers: [
    { provide: DateFnsConfigurationService, useValue: SpanishConfig },
    SessionsService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
