import {Action, Selector, State, StateContext} from "@ngxs/store";
import {PhotographModel} from "./gallery.model";
import {GallerySetAction} from "./gallery.actions";


@State<PhotographModel[]>({
  name: 'gallery',
  defaults: []
})
export class GalleryState {
  @Selector()
  static getGalleryEntries(state: PhotographModel[]) {
    return state;
  }

  @Selector()
  static getGalleryEntry(state: PhotographModel[]) {
    return (entryId: number) => {
      const profile = state.find(i => i.id === entryId);
      return profile ? profile : null;
    };
  }

  @Selector()
  static getSurroundingGalleryEntries(state: PhotographModel[]) {
    return (entryId: number) => {
      const middleIndex = state.findIndex(item => item.id === entryId);
      const ret: { before: number | null, after: number | null } = {before: null, after: null};
      if (middleIndex >= 1) {
        ret.before = state[middleIndex - 1].id;
      }
      if (middleIndex <= state.length - 1 && middleIndex !== -1) {
        ret.after = state[middleIndex + 1].id;
      }
      return ret;
    };
  }

  @Action(GallerySetAction)
  public set(ctx: StateContext<PhotographModel[]>, action: GallerySetAction) {
    ctx.setState(action.entries);
  }
}
