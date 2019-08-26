import {oc} from 'ts-optchain';
import {MineralProfile, Profile, ProfileAppState, ProfileCategory} from './profile.model';
import {GalleryAppState} from './gallery.model';
import {createSelector} from '@ngrx/store';

export const selectProfiles = (state: ProfileAppState): Profile[] => oc(state).profile.profile([]);

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

export const selectProfile = (state: ProfileAppState, profileId: number) => {
  for (let profile of state.profile.profile) {
    if (profile.type === 'category') {
      const childSearch = findProfileDeep(profile.children, profileId);
      if (childSearch) {
        return {profile: childSearch.profile, category: childSearch.category ? childSearch.category : profile};
      }
    }
  }
};

export const selectNonTreeProfile = (state: ProfileAppState, profileId: number): MineralProfile | null =>
  state.profile.nonTreeProfiles.reduce((prev, curr) => curr.id === profileId ? curr : prev, null as MineralProfile | null);

export const selectPhotographs = createSelector(
  (state: GalleryAppState) => oc(state).gallery([]),
  p => p
);


export const selectPhotograph = (state: GalleryAppState, id: number) => {
  const profile = state.gallery.find(img => img.id === id);
  if (!profile) {
    return null;
  }
  return profile;
};

export const selectSurroundingPhotographs = (state: GalleryAppState, middleId: number) => {
  const middleIndex = state.gallery.findIndex(item => item.id === middleId);
  const ret: { before: number | null, after: number | null } = { before: null, after: null };
  if (middleIndex >= 1) {
    ret.before = state.gallery[middleIndex - 1].id;
  }
  if (middleIndex <= state.gallery.length - 1 && middleIndex !== -1) {
    ret.after = state.gallery[middleIndex + 1].id;
  }
  return ret;
};
