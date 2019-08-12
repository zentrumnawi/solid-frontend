import {createSelector} from '@ngrx/store';
import {oc} from 'ts-optchain';
import {GalleryAppState} from './gallery.model';

export const selectPhotographs = createSelector(
  (state: GalleryAppState) => oc(state).gallery([]),
  p => p
);
