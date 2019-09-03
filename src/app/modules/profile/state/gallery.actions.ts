import {PhotographModel} from './gallery.model';

export class GallerySetAction {
  static readonly type = '[Gallery] SetEntries';
  constructor(public entries: PhotographModel[]) {
  }
}
