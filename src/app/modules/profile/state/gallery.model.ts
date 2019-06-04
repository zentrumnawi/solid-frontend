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
  orig_height: number;
  orig_width: number;
  audio_file: string | null;
  description: string | null;
  online_status: boolean;
  created_at: Date;
  last_modified: Date;
}

export interface HandpieceModel {
  id: number;
  name: string;
  mineral_type: { id: number}[];
  finding_place: string;
  current_location: string;
  old_inventory_number: string;
  created_at: Date;
  last_modified: Date;
}
