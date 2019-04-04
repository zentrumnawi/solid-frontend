import {Action} from '@ngrx/store';
import {Profile} from './profile.model';

export enum ProfileActionTypes {
  Set = '[Profile] SetEntries',
}

export class ProfileSetAction implements Action {
  readonly type = ProfileActionTypes.Set;

  constructor(public entries: Profile[]) {
  }
}
