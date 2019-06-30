import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FixedNavbarComponent} from './fixed-navbar/fixed-navbar.component';
import {PanelComponent} from './panel/panel.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NotificationComponent} from './notifications/notification.component';

@NgModule({
  declarations: [
    FixedNavbarComponent,
    PanelComponent,
    NotificationComponent
  ],
  exports: [
    FixedNavbarComponent,
    PanelComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class ElementsModule { }
