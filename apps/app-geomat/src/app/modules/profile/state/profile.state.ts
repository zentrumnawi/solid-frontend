import {Action, Selector, State, StateContext} from '@ngxs/store';
import {MineralProfile, Profile, ProfileCategory} from './profile.model';
import {ProfileSetAction} from './profile.actions';
import {Injectable} from '@angular/core';

export type ProfileStateModel = Profile[];

@State<ProfileStateModel>({
  name: 'profile',
  defaults: []
})
@Injectable()
export class ProfileState {
  @Selector()
  static selectProfileAndCategory(state: ProfileStateModel): (profileId?: number) => ({ profile: MineralProfile; category: ProfileCategory } | null) {
    return (profileId?: number) => {
      if (!profileId) {
        return null;
      }
      for (const profile of state) {
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
  static selectTree(state: ProfileStateModel): Profile[] {
    return [...state];
  }

  @Selector()
  static selectFlat(state: ProfileStateModel): MineralProfile[] {
    const map = (result: MineralProfile[], value: Profile[]) => {
      for (const v of value) {
        if (v.type === 'category') {
          result.push(...map([], v.children));
        } else {
          result.push(v);
        }
      }
      return result;
    };
    return map([], state);
  }

  private static findProfileDeep(profiles: Profile[], profileId: number): { profile: MineralProfile, category: ProfileCategory | null } | null {
    for (const profile of profiles) {
      if (profile.type === 'mineral' && profile.id === profileId) {
        return {profile, category: null};
      } else if (profile.type === 'category') {
        const childSearch = ProfileState.findProfileDeep(profile.children, profileId);
        if (childSearch) {
          return {profile: childSearch.profile, category: childSearch.category ? childSearch.category : profile};
        }
      }
    }
    return null;
  }

  @Action(ProfileSetAction)
  public set(ctx: StateContext<ProfileStateModel>, action: ProfileSetAction) {
    ctx.setState(action.entries);
  }
}
