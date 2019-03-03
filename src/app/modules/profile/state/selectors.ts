import {createSelector} from '@ngrx/store';
import {oc} from 'ts-optchain';
import {MineralProfile, Profile, ProfileAppState} from './profile.model';

export const selectProfiles = createSelector(
  (state: ProfileAppState) => oc(state).profile([]),
);

const findProfileDeep = (profiles: Profile[], profileId: number): MineralProfile | null => {
  for (let profile of profiles) {
    if (profile.type === 'mineral' && profile.id === profileId) {
      return profile;
    } else if (profile.type === 'category') {
      const childSearch = findProfileDeep(profile.children, profileId);
      if (childSearch) return childSearch;
    }
  }
  return null;
};

export const selectProfile = createSelector((state: ProfileAppState, profileId: number) => {
  return findProfileDeep(state.profile, profileId) as MineralProfile;
});
