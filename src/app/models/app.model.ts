import {RouterReducerState} from '@ngrx/router-store';
import {createSelector} from '@ngrx/store';
import {oc} from 'ts-optchain';

export interface AppModel {
  router: RouterReducerState,
}

export const selectRouterUrl = createSelector(
  (state: AppModel) => oc(state).router.state.url('/'),
);
