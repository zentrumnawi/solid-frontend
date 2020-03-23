import {Action, Selector, State, StateContext} from "@ngxs/store";
import {MineralProfile, Profile, ProfileCategory} from "./profile.model";
import {ProfileSetAction} from "./profile.actions";
import {Injectable} from "@angular/core";

export type ProfileStateModel = Profile[];

@State<ProfileStateModel>({
  name: 'profile',
  defaults: []
})
@Injectable()
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
  static selectProfileAndCategory(state: ProfileStateModel): (profileId?: number) => ({ profile: MineralProfile; category: ProfileCategory } | null) {
    return (profileId?: number) => {
      if (!profileId) {
        return null;
      }
      for (let profile of state) {
        if (profile.type === 'category') {
          const childSearch = ProfileState.findProfileDeep(profile.children, profileId);
          if (childSearch) {
            return {profile: childSearch.profile, category: childSearch.category ? childSearch.category : profile};
          }
        }
      }
      return null;
    };
  }

  @Selector()
  static select(state: ProfileStateModel): Profile[] {
    return [...state];
  }

  @Action(ProfileSetAction)
  public set(ctx: StateContext<ProfileStateModel>, action: ProfileSetAction) {
    ctx.setState(action.entries);
  }
}
