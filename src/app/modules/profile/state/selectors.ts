import {createSelector} from '@ngrx/store';
import {oc} from 'ts-optchain';
import {MineralProfile, Profile, ProfileAppState, ProfileCategory} from './profile.model';
import {GalleryAppState} from './gallery.model';

export const selectProfiles = createSelector(
  (state: ProfileAppState) => oc(state).profile([]),
);

const findProfileDeep = (profiles: Profile[], profileId: number): { profile: MineralProfile, category: ProfileCategory | null } | null => {
  for (let profile of profiles) {
    if (profile.type === 'mineral' && profile.id === profileId) {
      return { profile, category: null };
    } else if (profile.type === 'category') {
      const childSearch = findProfileDeep(profile.children, profileId);
      if (childSearch) return childSearch;
    }
  }
  return null;
};

export const selectProfile = createSelector((state: ProfileAppState, profileId: number) => {
  for (let profile of state.profile) {
    if (profile.type === 'category') {
      const childSearch = findProfileDeep(profile.children, profileId);
      if (childSearch) {
        return { profile: childSearch.profile, category: childSearch.category ? childSearch.category : profile };
      }
    }
  }
});

export const selectPhotographs = createSelector(
  (state: GalleryAppState) => oc(state).gallery([]),
);
