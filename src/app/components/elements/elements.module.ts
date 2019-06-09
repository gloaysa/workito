import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FixedNavbarComponent} from './fixed-navbar/fixed-navbar.component';
import {PanelListComponent} from './panel-list/panel-list.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    FixedNavbarComponent,
    PanelListComponent
  ],
  exports: [
    FixedNavbarComponent,
    PanelListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class ElementsModule { }
