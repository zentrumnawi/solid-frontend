import {RouterReducerState} from '@ngrx/router-store';
import {GlossaryEntriesOrdered} from './glossary-entry.model';

export interface AppState {
  glossary: GlossaryEntriesOrdered
  router: RouterReducerState,
}
