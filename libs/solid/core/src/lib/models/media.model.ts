import { MediaObjectModel } from './media-object.model';

export class MediaModel {
  constructor(private _mediaObject: MediaObjectModel) {}

  public get mediaType() {
    return this._mediaObject.media_format;
  }

  public get isLandscape() {
    return (
      this._mediaObject.img_original_width >
      this._mediaObject.img_original_height
    );
  }
  public get attributions(): string | undefined {
    const author = this._mediaObject.author;
    const license = this._mediaObject.license;
    if (author && license) {
      return `${this._mediaObject.author} (${this._mediaObject.license})`;
    }
    if (license) {
      return license;
    }
    if (author) {
      return author;
    }
    return undefined;
  }

  public get description(): string | undefined {
    return this._mediaObject.description;
  }

  public get audiosrc(): string | undefined {
    return this._mediaObject.audio;
  }

  //   public get audioduration(): string | undefined {
  //     return this._mediaObject.audio_duration;
  //   }

  public get alt(): string {
    return this._mediaObject.img_alt;
  }

  public get author(): string | undefined {
    return this._mediaObject.author;
  }

  public get license(): string | undefined {
    return this._mediaObject.license;
  }

  public getRawImage(size: 'thumbnail' | 'small' | 'medium' | 'large') {
    // return this._mediaObject.img[size];
    if (this.mediaType === 'image') {
      return this._mediaObject.file;
    }
    if (this.mediaType === 'audio') {
      return 'assets/profile/planty_audio.svg';
    }
    return 'assets/profile/no_thumbnail.svg';
  }
  public getSrc() {
    if (this.mediaType === 'video' || this.mediaType === 'audio') {
      return this._mediaObject.file;
    }
    return null;
  }

  public get deepZoomLink(): string | false {
    if (!this._mediaObject.dzi_file) {
      return false;
    }
    return this._mediaObject.dzi_file;
  }
}
