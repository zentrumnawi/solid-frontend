import {Profile} from './profile.model';

export class ProfileSetAction {
  static readonly type = '[Profile] SetEntries';

  constructor(public entries: Profile[]) {
  }
}
