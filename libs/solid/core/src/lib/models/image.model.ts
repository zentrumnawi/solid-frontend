import { PhotographModel } from './photograph.model';

export class ImageModel {
  public get isLandscape() {
    return (
      this._photograph.img_original_width > this._photograph.img_original_height
    );
  }
  public get attributions(): string | undefined {
    const author = this._photograph.author;
    const license = this._photograph.license;
    if (author && license) {
      return `${this._photograph.author} (${this._photograph.license})`;
    }
    if (license) {
      return license;
    }
    if (author) {
      return author;
    }
    return undefined;
  }

  public get alt(): string {
    return this._photograph.img_alt;
  }

  public get author(): string | undefined {
    return this._photograph.author;
  }

  public get license(): string | undefined {
    return this._photograph.license;
  }

  public getRawImage(size: 'thumbnail' | 'small' | 'medium' | 'large') {
    return this._photograph.img[size];
  }

  public get deepZoomLink(): string | false {
    if (!this._photograph.dzi_file) {
      return false;
    }
    return this._photograph.dzi_file;
  }

  constructor(private _photograph: PhotographModel) {}
}
