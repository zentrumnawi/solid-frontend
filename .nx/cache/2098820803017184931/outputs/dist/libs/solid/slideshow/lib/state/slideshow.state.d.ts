import { StateContext } from '@ngxs/store';
import { Slideshow } from './slideshow.model';
import { HttpClient } from '@angular/common/http';
import { AddSlideshow } from './slideshow.actions';
import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import * as i0 from '@angular/core';
export type SlideshowStateModel = Slideshow[];
export declare class SlideshowState {
  private _config;
  private _http;
  constructor(_config: SolidCoreConfig, _http: HttpClient);
  static getSlideshowById(
    state: SlideshowStateModel
  ): (slideshowId: string) => Slideshow;
  addSlideshow(
    ctx: StateContext<SlideshowStateModel>,
    { payload }: AddSlideshow
  ): import('rxjs').Observable<Slideshow> | undefined;
  static ɵfac: i0.ɵɵFactoryDeclaration<SlideshowState, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<SlideshowState>;
}
