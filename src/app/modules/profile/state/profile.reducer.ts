import {Action, createReducer, Store} from 'ngrx-actions/dist';
import {ProfileSetAction, ProfileSetEntryAction} from './profile.actions';
import {profileInitialState, ProfileState} from './profile.model';

@Store(profileInitialState)
export class ProfileStore {
  @Action(ProfileSetAction)
  public set(state: ProfileState, action: ProfileSetAction): ProfileState {
    return {
      profile: action.entries,
      nonTreeProfiles: state.nonTreeProfiles,
    }
  }

  @Action(ProfileSetEntryAction)
  public setEntry(state: ProfileState, action: ProfileSetEntryAction): ProfileState {
    return {
      profile: state.profile,
      nonTreeProfiles: [...state.nonTreeProfiles, action.entry],
    }
  }
}

export const profileReducer = createReducer(ProfileStore);
