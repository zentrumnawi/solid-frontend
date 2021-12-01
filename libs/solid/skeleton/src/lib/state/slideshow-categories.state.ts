import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { SolidCoreConfig, SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import { GetSlideshowCategories } from './slideshow-categories.actions';
import { SlideshowCategory } from './slideshow-categories.model';
import { map, tap } from 'rxjs/operators';

export type CategoriesStateModel = SlideshowCategory[];

@State<CategoriesStateModel>({
  name: 'categories',
  defaults: [],
})
@Injectable()
export class CategoriesState {
  constructor(
    router: Router,
    private store: Store,
    private _http: HttpClient,
    @Inject(SOLID_CORE_CONFIG) private _config: SolidCoreConfig
  ) {}

  @Selector()
  public static getSlideshowCategoriesItems(state: CategoriesStateModel) {
    const fn = () =>
      state.map((s) => ({
        id: s.id,
        name: s.name,
        slug: s.slug,
      }));
    return fn();
  }

  @Action(GetSlideshowCategories)
  public GetSlideshowCategories(ctx: StateContext<CategoriesStateModel>) {
    return this._http
      .get<SlideshowCategory[]>(`${this._config.apiUrl}/categories`)
      .pipe(
        map((res) => {
          const mapit = (input: SlideshowCategory[]): SlideshowCategory[] => {
            return input.map((categories) => {
              return {
                ...categories,
              };
            });
          };
          return mapit(res);
        }),
        tap((res) => {
          ctx.setState([
            ...res.map((categories) => {
              return categories;
            }),
          ]);
        })
      );
  }
}
