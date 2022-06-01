import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({ selector: '[solidGlossaryEntry]' })
export class RefDirective {
  @Input() public refId!: number;
  @Input() public highlighted = false;
  @HostBinding('class.flash') get flashClass() {
    return this.highlighted;
  }
  constructor(public ref: ElementRef) {}
}
