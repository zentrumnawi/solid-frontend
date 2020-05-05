import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Inject, Injectable } from '@angular/core';
import { GlossaryActions } from './glossary.actions';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '@zentrumnawi/solid/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

export interface GlossaryEntryModel {
  id: number;
  term: string;
  text: string;
  // images are not used
  // img?: string;
  // img_alt?: string;
  links: number[];
}

export interface GlossaryEntries {
  [key: number]: GlossaryEntryModel;
}

export interface GlossaryStateModel {
  entries: GlossaryEntries;
  sections: [string, number[]][];
}

@State<GlossaryStateModel>({
  name: 'glossary',
  defaults: {
    entries: {},
    sections: []
  }
})
@Injectable()
export class GlossaryState {
  constructor(
    @Inject(SOLID_CORE_CONFIG) private _config: SolidCoreConfig,
    private _http: HttpClient
  ) {}

  @Selector()
  static state(state: GlossaryStateModel) {
    return { ...state };
  }

  @Action(GlossaryActions.Load)
  public load(ctx: StateContext<GlossaryStateModel>, {}: GlossaryActions.Load) {
    return this._http
      .get<GlossaryEntryModel[]>(`${this._config.newApiUrl}/api/glossaries`)
      .pipe(
        map(result => {
          const entries: GlossaryEntries = {};
          const sections: { [key: string]: number[] } = {};
          result.forEach(entry => {
            entries[entry.id] = entry;
            const firstChar = entry.term[0].toUpperCase();
            if (sections[firstChar] === undefined) {
              sections[firstChar] = [];
            }
            sections[firstChar].push(entry.id);
          });
          Object.keys(sections).forEach(sectionKey =>
            sections[sectionKey].sort((a, b) =>
              entries[a].term.localeCompare(entries[b].term)
            )
          );
          return { entries, sections: Object.entries(sections) };
        }),
        tap(v => {
          ctx.patchState(v);
        })
      );
  }
}
