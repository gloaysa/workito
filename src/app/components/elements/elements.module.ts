import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FixedNavbarComponent} from './fixed-navbar/fixed-navbar.component';
import {PanelComponent} from './panel/panel.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NewTaskButtonComponent} from './new-task-button/new-task-button.component';

@NgModule({
  declarations: [
    FixedNavbarComponent,
    PanelComponent,
    NewTaskButtonComponent
  ],
  exports: [
    FixedNavbarComponent,
    PanelComponent,
    NewTaskButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class ElementsModule { }
