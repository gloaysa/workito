import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'workito-panel-list',
  templateUrl: './panel-list.component.html',
  styleUrls: ['./panel-list.component.scss']
})
export class PanelListComponent {
  @Input() item;

  @Output() whenClickItem = new EventEmitter();
  @Output() whenDeleteItem = new EventEmitter();

  constructor() { }

  deleteItem(item) {
    this.whenDeleteItem.emit(item);
  }

  clickItem(item) {
    this.whenClickItem.emit(item);
  }


}
