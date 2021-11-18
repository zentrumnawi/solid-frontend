import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Slideshow } from './slideshow.model';
import { HttpClient } from '@angular/common/http';
import { SlideshowActions } from './slideshow.actions';
import { Inject, Injectable } from '@angular/core';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '@zentrumnawi/solid-core';
import { tap } from 'rxjs/operators';

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
  public static getSlideshowById(state: SlideshowStateModel) {
    // This redundant variable is required
    // https://github.com/ng-packagr/ng-packagr/issues/696
    const fn = function (id: number): Slideshow | undefined {
      return state.find((slideshow) => slideshow.id === id);
    };
    return fn;
  }

  @Selector()
  public static getSlideshowOverview(state: SlideshowStateModel) {
    // This redundant variable is required
    // https://github.com/ng-packagr/ng-packagr/issues/696
    const fn = () =>
      state.map((s) => ({
        id: s.id,
        title: s.title,
        title_image: s.title_image,
        position: s.position,
      }));
    return fn();
  }

  @Action(SlideshowActions.Load)
  public load(ctx: StateContext<SlideshowStateModel>) {
    if (ctx.getState().length > 0) {
      return;
    }
    return this._http
      .get<Slideshow[]>(`${this._config.apiUrl}/slideshows`)
      .pipe(
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
