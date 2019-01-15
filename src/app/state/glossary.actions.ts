import {Action} from '@ngrx/store';
import {GlossaryEntriesOrdered} from './glossary-entry.model';

export enum GlossaryActionTypes {
  Set = '[Glossary] SetEntries',
}

export class GlossarySetAction implements Action {
  readonly type = GlossaryActionTypes.Set;

  constructor(public entries: GlossaryEntriesOrdered) {
  }
}
