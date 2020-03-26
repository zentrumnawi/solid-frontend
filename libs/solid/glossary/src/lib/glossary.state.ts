import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Inject, Injectable } from '@angular/core';
import { GlossaryActions } from './glossary.actions';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '@zentrumnawi/solid/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

export interface GlossaryEntryModel {
  id: string;
  header: string;
  description: string;
}

export interface GlossaryEntriesOrdered {
  [key: string]: GlossaryEntryModel[];
}

export interface GlossaryStateModel {
  entries: GlossaryEntriesOrdered;
}

@State<GlossaryStateModel>({
  name: 'glossary',
  defaults: {
    entries: {}
  }
})
@Injectable()
export class GlossaryState {
  constructor(
    @Inject(SOLID_CORE_CONFIG) private _config: SolidCoreConfig,
    private _http: HttpClient
  ) {
  }

  @Selector()
  static entries(state: GlossaryStateModel) {
    return Object.entries(state.entries);
  }

  @Action(GlossaryActions.Load)
  public load(ctx: StateContext<GlossaryStateModel>, {}: GlossaryActions.Load) {
    return this._http.get<GlossaryEntryModel[]>(`${this._config.apiUrl}/api/glossary`).pipe(
      map(result => {
        const ordered: GlossaryEntriesOrdered = {};
        result.forEach(entry => {
          const firstChar = entry.header[0].toUpperCase();
          if (ordered[firstChar] === undefined) {
            ordered[firstChar] = [];
          }
          ordered[firstChar].push(entry);
        });
        return ordered;
      }),
      tap(v => {
        ctx.patchState({ entries: v });
      }));
  }
}
