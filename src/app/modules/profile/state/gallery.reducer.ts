import {GallerySetAction} from './gallery.actions';
import {galleryInitialState, PhotographModel} from './gallery.model';
import {Action, createReducer, Store} from 'ngrx-typed-actions';

@Store(galleryInitialState)
export class PhotographStore {
  @Action(GallerySetAction)
  set(state: PhotographModel[], action: GallerySetAction) {
    state.push(...action.entries);
  }
}

export const galleryReducer = createReducer(PhotographStore);
