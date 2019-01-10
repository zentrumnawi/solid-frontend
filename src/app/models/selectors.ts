import {createSelector} from '@ngrx/store';
import {oc} from 'ts-optchain';
import {AppModel} from './app.model';

export const selectRouterUrl = createSelector(
  (state: AppModel) => oc(state).router.state.url('/'),
);

export const selectGlossaryEntries = createSelector(
  (state: AppModel) => oc(state).glossary({}),
);
