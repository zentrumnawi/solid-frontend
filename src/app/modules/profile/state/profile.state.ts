import {Action, Selector, State, StateContext} from "@ngxs/store";
import {MineralProfile, Profile, ProfileCategory} from "./profile.model";
import {ProfileSetAction} from "./profile.actions";

export type ProfileStateModel = Profile[];

@State<ProfileStateModel>({
  name: 'profile',
  defaults: []
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
  static selectProfile(state: ProfileStateModel) {
    return (profileId: number) => {
      for (let profile of state) {
        if (profile.type === 'category') {
          const childSearch = ProfileState.findProfileDeep(profile.children, profileId);
          if (childSearch) {
            return {profile: childSearch.profile, category: childSearch.category ? childSearch.category : profile};
          }
        }
      }
    };
  }

  @Selector()
  static select(state: ProfileStateModel) {
    return [...state];
  }

  @Action(ProfileSetAction)
  public set(ctx: StateContext<ProfileStateModel>, action: ProfileSetAction) {
    ctx.setState(action.entries);
  }
}
