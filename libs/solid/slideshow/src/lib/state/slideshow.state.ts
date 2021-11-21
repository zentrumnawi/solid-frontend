import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Slideshow, SlideshowApi } from './slideshow.model';
import { HttpClient } from '@angular/common/http';
import { SlideshowActions } from './slideshow.actions';
import { Inject, Injectable } from '@angular/core';
import {
  SOLID_CORE_CONFIG,
  SolidCoreConfig,
  ImageModel,
} from '@zentrumnawi/solid-core';
import { tap, map } from 'rxjs/operators';

export type SlideshowStateModel = Slideshow[];

@State<SlideshowStateModel>({
  name: 'slideshow',
  defaults: [],
})
@Injectable()
export class SlideshowState {
  constructor(
    @Inject(SOLID_CORE_CONFIG) private _config: SolidCoreConfig,
    private _http: HttpClient
  ) {}

  @Selector()
  public static getSlideshowByCategoriesAndId(state: SlideshowStateModel) {
    // This redundant variable is required
    // https://github.com/ng-packagr/ng-packagr/issues/696
    const fn = function (
      id: number,
      categories: string | undefined
    ): Slideshow | undefined {
      return state
        .filter((slideshow) => slideshow.categories === categories)
        .find((slideshow) => slideshow.id === id);
    };
    return fn;
  }

  @Selector()
  public static getSlideshowByCategories(state: SlideshowStateModel) {
    const fn = function (
      categories: string | undefined
    ): Slideshow[] | undefined {
      return state.filter((s) => {
        if (!categories) {
          return;
        } else {
          return s.categories === categories;
        }
      });
    };
    return fn;
  }

  @Selector()
  public static SlideshowByCategoryCounter(state: SlideshowStateModel) {
    const fn = function (categories: string | undefined): number {
      return state.filter((s) => s.categories === categories).length;
    };
    return fn;
  }

  @Selector()
  public static getSlideshows(state: SlideshowStateModel) {
    // This redundant variable is required
    // https://github.com/ng-packagr/ng-packagr/issues/696
    const fn = () =>
      state.map((s) => ({
        id: s.id,
        title: s.title,
        title_image: s.title_image,
        position: s.position,
        categories: s.categories,
      }));
    return fn();
  }

  @Action(SlideshowActions.Load)
  public load(
    ctx: StateContext<SlideshowStateModel>,
    {}: SlideshowActions.Load
  ) {
    if (ctx.getState().length > 0) {
      return;
    }
    return this._http
      .get<Slideshow[]>(`${this._config.apiUrl}/slideshows`)
      .pipe(
        map((response) => {
          const mapit = (input: SlideshowApi[]): Slideshow[] => {
            return input.map((slideshow) => {
              return {
                ...slideshow,
                categories: slideshow.categories[0],
                pages: slideshow.pages.map((page) => ({
                  ...page,
                  images: page.images?.map((slideshowImg) => ({
                    ...slideshowImg,
                    img: new ImageModel(slideshowImg.image),
                  })),
                })),
              };
            });
          };
          return mapit(response);
        }),
        tap((res) => {
          ctx.setState([
            ...res.map((slideshow) => {
              slideshow.pages = slideshow.pages.sort(
                (a, b) => a.position - b.position
              );
              return slideshow;
            }),
          ]);
        })
      );
  }
}
