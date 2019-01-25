import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import {ActionReducerMap} from '@ngrx/store';
import {GlossaryEntriesOrdered} from './glossary-entry.model';
import {glossaryReducer} from './glossary.reducer';

export interface AppState {
  glossary: GlossaryEntriesOrdered
  router: RouterReducerState,
}

export const reducers: ActionReducerMap<AppState> = {
  glossary: glossaryReducer,
  router: routerReducer,
};
