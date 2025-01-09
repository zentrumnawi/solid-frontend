import { StateContext } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import { SlideshowSelectApi } from './slideshow-select.model';
import * as i0 from '@angular/core';
export type SlideshowSelectStateModel = SlideshowSelectApi[];
export declare class SlideshowSelectState {
  private _config;
  private _http;
  constructor(_config: SolidCoreConfig, _http: HttpClient);
  static getSlideshowSelect(state: SlideshowSelectStateModel): {
    id: number;
    pages: number[];
    title_image: import('@zentrumnawi/solid-core').PhotographModel;
    categories: string[];
    position: number;
    title: string;
  }[];
  load(
    ctx: StateContext<SlideshowSelectStateModel>
  ): import('rxjs').Observable<SlideshowSelectApi[]> | undefined;
  static ɵfac: i0.ɵɵFactoryDeclaration<SlideshowSelectState, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<SlideshowSelectState>;
}
