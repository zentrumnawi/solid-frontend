import {MineralProfile, Profile} from "./profile.model";

export class ProfileSetAction {
  static readonly type = '[Profile] SetEntries';
  constructor(public entries: Profile[]) {
  }
}

export class ProfileSetEntryAction {
  static readonly type = '[Profile] SetEntry';
  constructor(public entry: MineralProfile) {

  }
}
