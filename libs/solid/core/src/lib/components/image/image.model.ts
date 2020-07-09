import { PhotographModel } from './photograph.model';

export class ImageModel {
  public getRawImage(size: 'thumbnail' | 'small' | 'medium') {
    switch (size) {
      case 'small':
        return this._photograph.img.small;
      case 'medium':
        return this._photograph.img.medium;
      case 'thumbnail':
        return this._photograph.img.thumbnail;
    }
  }
  constructor(private _photograph: PhotographModel) {}
}
