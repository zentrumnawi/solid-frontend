import { ElementRef } from '@angular/core';
import * as i0 from '@angular/core';
export declare class RefDirective {
  ref: ElementRef;
  refId: number;
  highlighted: boolean;
  get flashClass(): boolean;
  constructor(ref: ElementRef);
  static ɵfac: i0.ɵɵFactoryDeclaration<RefDirective, never>;
  static ɵdir: i0.ɵɵDirectiveDeclaration<
    RefDirective,
    '[solidGlossaryEntry]',
    never,
    {
      refId: { alias: 'refId'; required: false };
      highlighted: { alias: 'highlighted'; required: false };
    },
    {},
    never,
    never,
    false,
    never
  >;
}
