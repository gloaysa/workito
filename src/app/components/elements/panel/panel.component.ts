import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
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
  @Input() invalidInput: boolean;

  @Input() itemListTemplate: TemplateRef<any>;

  @Output() whenCreateItem = new EventEmitter();
  @Output() whenCheckInput = new EventEmitter();
  @Output() whenSearch = new EventEmitter();

  formOpen: boolean;
  nameInput: string;
  searchInput: string;

  constructor() { }

  toggleAddButton() {
    this.formOpen = !this.formOpen;
  }

  checkInput(event) {
    this.whenCheckInput.emit(event.target.value);
  }

  searchInList() {
    if (this.searchInput) {
      const searchReg = new RegExp(this.searchInput, 'i');
      const filteredList = this.modelList.filter(model => model[this.searchCriteria].match(searchReg));
      this.whenSearch.emit(filteredList);
    } else {
      this.whenSearch.emit(null);
    }
  }

  createNewItem(form: NgForm) {
    if (this.nameInput && !this.invalidInput) {
      this.whenCreateItem.emit(form.value.name);
      form.reset();
      this.toggleAddButton();
    }
  }

  cleanSearchBox() {
    this.searchInput = '';
    this.searchInList();
  }

  private formInvalid(nameForm: NgForm): boolean {
    if (!nameForm.pristine && !nameForm.valid) {
      return true;
    }
    if (!nameForm.pristine && this.invalidInput) {
      return true;
    }
  }

}
