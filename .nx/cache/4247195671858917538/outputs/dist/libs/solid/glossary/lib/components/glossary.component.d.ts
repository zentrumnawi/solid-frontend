import { OnDestroy, QueryList } from '@angular/core';
import { Store } from '@ngxs/store';
import { GlossaryStateModel } from '../glossary.state';
import { Observable } from 'rxjs';
import { RefDirective } from './link.directive';
import { UntypedFormControl } from '@angular/forms';
import * as i0 from '@angular/core';
export declare class GlossaryComponent implements OnDestroy {
  private $destroyed;
  Filter: UntypedFormControl;
  refElements: QueryList<RefDirective>;
  State: Observable<GlossaryStateModel>;
  GlossaryEntries: Observable<GlossaryStateModel>;
  constructor(store: Store);
  followRef(refId: number): void;
  ngOnDestroy(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<GlossaryComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    GlossaryComponent,
    'solid-glossary',
    never,
    {},
    {},
    never,
    never,
    false,
    never
  >;
}
