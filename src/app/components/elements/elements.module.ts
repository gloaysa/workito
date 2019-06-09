import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FixedNavbarComponent} from './fixed-navbar/fixed-navbar.component';
import {PanelComponent} from './panel/panel.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { PanelListComponent } from './panel-list/panel-list.component';

@NgModule({
  declarations: [
    FixedNavbarComponent,
    PanelComponent,
    PanelListComponent
  ],
  exports: [
    FixedNavbarComponent,
    PanelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class ElementsModule { }
