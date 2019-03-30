import {ImageFiles} from '../../../shared/models';
import {AppState} from '../../../state/app.model';

export interface GalleryAppState extends AppState {
  gallery: GalleryState;
}

export type GalleryState = PhotographModel[];

export const galleryInitialState = [];

export interface PhotographModel {
  id: number;
  image_file: ImageFiles;
  handpiece: HandpieceModel;
  orientation: PhotographOrientation;
  shot_type: ShotType;
  online_status: boolean;
  created_at: Date;
  last_modified: Date;
}

export interface ImageFiles {
  large: string; // { width: 1200, height: 800}
  medium: string; // { width: 900, height: 600}
  small: string; // { width: 600, height: 400}
  thumbnail: string; // { width: 100, height: 100}
  original: string;
}

export enum PhotographOrientation {
  T = 'T',
  B = 'B',
  S = 'S',
}

export enum ShotType {
  MI = 'MI',
  MA = 'MA',
  FE = 'FE',
  TL = 'TL'
}


export interface HandpieceModel {
  id: number;
  name: string;
  finding_place: string;
  current_location: string;
  old_inventory_number: string;
  created_at: Date;
  last_modified: Date;
}

