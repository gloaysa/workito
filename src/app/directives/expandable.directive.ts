import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

import { debounce } from 'ts-debounce';

@Directive({
  selector: '[workitoExpandable]'
})
export class ExpandableDirective {
  WAIT_EVENT_TIME = 300;
  expand;
  debounceEvent = debounce(this.setNewHeight, this.WAIT_EVENT_TIME);

  @Input() set expanded(expanded: boolean) {
    this.expand = expanded;
    this.setNewHeight();
  }

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:resize') onResize() {
    this.debounceEvent();
  }

  setNewHeight() {
    const closedClass = 'workito-expandable__close';
    const openClass = 'workito-expandable__open';
    let newHeight;

    if (this.expand) {
      newHeight = this.getElementHeight();
      this.renderer.addClass(this.element.nativeElement, openClass);
      this.renderer.removeClass(this.element.nativeElement, closedClass);
    } else {
      newHeight = 0;
      this.renderer.addClass(this.element.nativeElement, closedClass);
      this.renderer.removeClass(this.element.nativeElement, openClass);

    }

    this.element.nativeElement.style.height = newHeight + 'px';
  }

  getElementHeight() {
    const currentHeight = this.getElementCurrentHeight();

    this.element.nativeElement.style.height = 'auto';
    const height = this.getElementCurrentHeight();

    this.element.nativeElement.style.height = currentHeight;

    this.getElementCurrentHeight();

    return height;
  }

  getElementCurrentHeight() {
    return this.element.nativeElement.offsetHeight;
  }

  debounce(fn, delay) {
    let timer = null;
    return function() {
      const self = this;
      const args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(self, args);
      }, delay);
    };
  }

}
