import { MediaObjectModel } from './media-object.model';
export declare class MediaModel {
  private _mediaObject;
  constructor(_mediaObject: MediaObjectModel);
  get mediaType(): 'audio' | 'video' | 'image';
  get isLandscape(): boolean;
  get attributions(): string | undefined;
  get description(): string | undefined;
  get audiosrc(): string | undefined;
  get alt(): string;
  get author(): string | undefined;
  get license(): string | undefined;
  getRawImage(
    size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original'
  ): string;
  getSrc(): string | null;
  get deepZoomLink(): string | false;
  get getTitle(): string;
  get getProfilePosition(): number;
}
