import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FixedNavbarComponent} from './fixed-navbar/fixed-navbar.component';
import {PanelComponent} from './panel/panel.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    FixedNavbarComponent,
    PanelComponent
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
