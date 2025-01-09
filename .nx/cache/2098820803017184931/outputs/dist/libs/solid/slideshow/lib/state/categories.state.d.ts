import { HttpClient } from '@angular/common/http';
import { StateContext } from '@ngxs/store';
import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import { SlideshowCategory } from './categories.model';
import * as i0 from '@angular/core';
export type CategoriesStateModel = SlideshowCategory[];
export declare class CategoriesState {
  private _http;
  private _config;
  constructor(_http: HttpClient, _config: SolidCoreConfig);
  static getSlideshowCategoriesItems(state: CategoriesStateModel): {
    id: number;
    name: string;
    slug: string;
  }[];
  GetSlideshowCategories(
    ctx: StateContext<CategoriesStateModel>
  ): import('rxjs').Observable<SlideshowCategory[]> | undefined;
  static ɵfac: i0.ɵɵFactoryDeclaration<CategoriesState, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<CategoriesState>;
}
