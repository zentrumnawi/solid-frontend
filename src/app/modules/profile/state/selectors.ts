import {createSelector} from '@ngrx/store';
import {oc} from 'ts-optchain';
import {ProfileAppState} from './profile.model';

export const selectProfiles = createSelector(
  (state: ProfileAppState) => oc(state).profile([]),
);
