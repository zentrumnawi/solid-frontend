import {RouterReducerState} from '@ngrx/router-store';
import {GlossaryEntriesOrdered} from './glossary-entry.model';

export interface AppModel {
  glossary: GlossaryEntriesOrdered
  router: RouterReducerState,
}
