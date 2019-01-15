import {Action} from '@ngrx/store';
import {PhotographModel} from './gallery.model';

export enum GalleryActionTypes {
  Set = '[Gallery] SetEntries',
}

export class GallerySetAction implements Action {
  readonly type = GalleryActionTypes.Set;

  constructor(public entries: PhotographModel[]) {
  }
}
