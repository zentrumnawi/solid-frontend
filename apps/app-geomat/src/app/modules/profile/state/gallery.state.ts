import {Action, Selector, State, StateContext} from '@ngxs/store';
import {PhotographModel} from './gallery.model';
import {GalleryLoadAction} from './gallery.actions';
import {GalleryService} from '../services/gallery.service';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

export interface GalleryStateModel {
  photographs: PhotographModel[];
  _loaded: boolean;
}

@State<GalleryStateModel>({
  name: 'gallery',
  defaults: {
    photographs: [],
    _loaded: false,
  }
})
@Injectable()
export class GalleryState {
  constructor(private _service: GalleryService) {
  }

  @Selector()
  static getGalleryEntries(state: GalleryStateModel) {
    return state.photographs;
  }

  @Selector()
  static getGalleryEntry(state: GalleryStateModel) {
    return (entryId: number) => {
      const profile = state.photographs.find(i => i.id === entryId);
      return profile ? profile : null;
    };
  }

  @Selector()
  static getSurroundingGalleryEntries(state: GalleryStateModel) {
    return (entryId: number) => {
      const middleIndex = state.photographs.findIndex(item => item.id === entryId);
      const ret: { before: number | null, after: number | null } = {before: null, after: null};
      if (middleIndex >= 1) {
        ret.before = state.photographs[middleIndex - 1].id;
      }
      if (middleIndex < state.photographs.length - 1 && middleIndex !== -1) {
        ret.after = state.photographs[middleIndex + 1].id;
      }
      return ret;
    };
  }

  @Action(GalleryLoadAction)
  public set(ctx: StateContext<GalleryStateModel>, {}: GalleryLoadAction) {
    if (ctx.getState()._loaded) {
      return;
    }
    return this._service.loadGallery().pipe(tap(entries => {
      ctx.patchState({
        _loaded: true,
        photographs: entries
      });
    }));
  }
}
