import { PhotographModel } from './photograph.model';
export declare class ImageModel {
  private _photograph;
  get isLandscape(): boolean;
  get attributions(): string | undefined;
  get description(): string | undefined;
  get audiosrc(): string | undefined;
  get audioduration(): string | undefined;
  get alt(): string;
  get author(): string | undefined;
  get license(): string | undefined;
  getRawImage(size: 'thumbnail' | 'small' | 'medium' | 'large'): string;
  get deepZoomLink(): string | false;
  constructor(_photograph: PhotographModel);
}
