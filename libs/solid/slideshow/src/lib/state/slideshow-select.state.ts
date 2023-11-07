import { Action, Selector, State, StateContext } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '@zentrumnawi/solid-core';
import { tap, map } from 'rxjs/operators';
import { GetSlideshowSelect } from './slideshow-select.actions';
import { SlideshowSelectApi } from './slideshow-select.model';

export type SlideshowSelectStateModel = SlideshowSelectApi[];

@State<SlideshowSelectStateModel>({
  name: 'slideshowSelect',
  defaults: [],
})
@Injectable()
export class SlideshowSelectState {
  constructor(
    @Inject(SOLID_CORE_CONFIG) private _config: SolidCoreConfig,
    private _http: HttpClient,
  ) {}

  @Selector()
  public static getSlideshowSelect(state: SlideshowSelectStateModel) {
    const fn = () =>
      state.map((s) => ({
        id: s.id,
        pages: s.pages,
        title_image: s.title_image,
        categories: s.categories,
        position: s.position,
        title: s.title,
      }));
    return fn();
  }

  @Action(GetSlideshowSelect)
  public load(ctx: StateContext<SlideshowSelectStateModel>) {
    if (ctx.getState().length > 0) {
      return;
    }
    return this._http
      .get<SlideshowSelectApi[]>(`${this._config.apiUrl}/slideshows`)
      .pipe(
        map((response) => {
          const mapit = (input: SlideshowSelectApi[]): SlideshowSelectApi[] => {
            return input.map((slideshow) => {
              return {
                ...slideshow,
                categories: slideshow.categories,
              };
            });
          };
          return mapit(response);
        }),
        tap((res) => {
          ctx.setState([...res].sort((a, b) => a.position - b.position));
        }),
      );
  }
}
