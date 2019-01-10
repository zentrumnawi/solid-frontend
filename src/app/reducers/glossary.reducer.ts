import {Action, createReducer, Store} from 'ngrx-actions/dist';
import {GlossarySetAction} from '../actions/glossary.actions';
import {GlossaryEntriesOrdered, glossaryInitialState} from '../models/glossary-entry.model';

@Store(glossaryInitialState)
export class GlossaryStore {
  @Action(GlossarySetAction)
  set(state: GlossaryEntriesOrdered, action: GlossarySetAction) {
    Object.assign(state, action.entries);
  }
}

export const glossaryReducer = createReducer(GlossaryStore);
