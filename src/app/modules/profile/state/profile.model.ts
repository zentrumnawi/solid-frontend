import {ImageFiles} from '../../../shared/models';
import {AppState} from '../../../state/app.model';

export interface ProfileAppState extends AppState {
  profile: MineralState;
}

export type MineralState = Profile[];

export const profileInitialState = [];

export type Profile = ProfileCategory | MineralProfile;

export interface ProfileCategory {
  type: 'category';
  title: string;
  children: Profile[];
}

export interface MineralProfile {
  type: 'mineral';
  title: string;
  image_file: ImageFiles;
}

export interface MineralProfileApi {
  trivial_name: string;
  image_file: ImageFiles;
}

export type ProfileLinks = { [key: string]: { link: string } };
