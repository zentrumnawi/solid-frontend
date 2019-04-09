import {Action} from '@ngrx/store';
import {MineralProfile, Profile} from './profile.model';

export enum ProfileActionTypes {
  Set = '[Profile] SetEntries',
  SetEntry = '[Profile] SetEntry',
}

export class ProfileSetAction implements Action {
  readonly type = ProfileActionTypes.Set;

  constructor(public entries: Profile[]) {
  }
}

export class ProfileSetEntryAction implements Action {
  readonly type = ProfileActionTypes.SetEntry;
  constructor(public entry: MineralProfile) {

  }
}
