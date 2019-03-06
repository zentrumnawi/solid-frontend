import {Action, createReducer, Store} from 'ngrx-actions/dist';
import {ProfileSetAction} from './profile.actions';
import {MineralState, profileInitialState} from './profile.model';

@Store(profileInitialState)
export class ProfileStore {
  @Action(ProfileSetAction)
  public set(state: MineralState, action: ProfileSetAction) {
    return action.entries;
  }
}

export const profileReducer = createReducer(ProfileStore);
