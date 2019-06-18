import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExpandableDirective} from './expandable.directive';

@NgModule({
  declarations: [
    ExpandableDirective
  ],
  exports: [
    ExpandableDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
