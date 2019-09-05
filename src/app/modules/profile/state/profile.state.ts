import {Action, Selector, State, StateContext} from "@ngxs/store";
import {MineralProfile, Profile, ProfileCategory} from "./profile.model";
import {ProfileSetAction, ProfileSetEntryAction} from "./profile.actions";

export interface ProfileStateModel {
  profile: Profile[];
  nonTreeProfiles: MineralProfile[];
}

@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    profile: [],
    nonTreeProfiles: []
  }
})
export class ProfileState {
  private static findProfileDeep(profiles: Profile[], profileId: number): { profile: MineralProfile, category: ProfileCategory | null } | null {
    for (let profile of profiles) {
      if (profile.type === 'mineral' && profile.id === profileId) {
        return { profile, category: null };
      } else if (profile.type === 'category') {
        const childSearch = ProfileState.findProfileDeep(profile.children, profileId);
        if (childSearch) {
          return {profile: childSearch.profile, category: childSearch.category ? childSearch.category : profile}
        }
      }
    }
    return null;
  };
  @Selector()
  static selectNonTreeProfiles(state: ProfileStateModel) {
    return (profileId: number): MineralProfile | null =>
      state.nonTreeProfiles.reduce((prev, curr) => curr.id === profileId ? curr : prev, null as MineralProfile | null);
  }

  @Selector()
  static selectProfile(state: ProfileStateModel) {
    return (profileId: number) => {
      for (let profile of state.profile) {
        if (profile.type === 'category') {
          const childSearch = ProfileState.findProfileDeep(profile.children, profileId);
          if (childSearch) {
            return {profile: childSearch.profile, category: childSearch.category ? childSearch.category : profile};
          }
        }
      }
    };
  }

  @Action(ProfileSetAction)
  public set(ctx: StateContext<ProfileStateModel>, action: ProfileSetAction) {
    ctx.patchState({
      profile: action.entries,
    });
  }

  @Action(ProfileSetEntryAction)
  public setEntry(ctx: StateContext<ProfileStateModel>, action: ProfileSetEntryAction) {
    ctx.patchState({
      nonTreeProfiles: [...ctx.getState().nonTreeProfiles, action.entry],
    });
  }
}
