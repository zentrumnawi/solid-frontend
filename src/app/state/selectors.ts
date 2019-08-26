import {oc} from 'ts-optchain';
import {AppState} from './app.model';
import {createSelector} from '@ngrx/store';

export const selectRouterUrl = createSelector(
  (state: AppState) => oc(state).router.state.url('/'),
  p => p
);

export const selectGlossaryEntries = createSelector(
  (state: AppState) => oc(state).glossary({}),
  p => p
);
