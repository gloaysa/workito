import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'workito-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent {
  @Input() title: string;
  @Input() inputPlaceholder: string;
  @Input() modelList: any[];
  @Input() searchCriteria: string;
  @Input() invalidInput;

  @Output() whenCreateItem = new EventEmitter();
  @Output() whenCheckInput = new EventEmitter();
  @Output() whenSearch = new EventEmitter();
  @Output() whenDeleteItem = new EventEmitter();
  @Output() whenClickItem = new EventEmitter();

  formOpen: boolean;
  nameInput: string;
  searchInput: string;
  filteredList: any[];

  constructor() { }

  toggleAddButton() {
    this.formOpen = !this.formOpen;
  }

  checkInput(event) {
    this.whenCheckInput.emit(event.target.value);
  }

  private search() {
    const searchReg = new RegExp(this.searchInput, 'i');
    this.filteredList = this.modelList.filter(model => model[this.searchCriteria].match(searchReg));
    if (!this.search) {
      this.filteredList = null;
    }
    this.whenSearch.emit(this.filteredList);
  }

  createNewItem(form: NgForm) {
    if (this.nameInput && !this.invalidInput) {
      this.whenCreateItem.emit(form.value.name);
      form.reset();
    }
  }

  deleteItem(item) {
    this.whenDeleteItem.emit(item);
  }

  clickItem(item) {
    this.whenClickItem.emit(item);
  }

  cleanSearchBox() {
    this.searchInput = '';
    this.filteredList = null;
  }

  private formInvalid(nameForm: NgForm): boolean {
    if (!nameForm.pristine && !nameForm.valid) {

      // TODO: call notification service for error
      return true;
    }
    if (this.invalidInput) {
      return true;
    }
  }

}
