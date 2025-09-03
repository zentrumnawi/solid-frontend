import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Inject, Injectable } from '@angular/core';
import { LoadGLossary } from './glossary.actions';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '@zentrumnawi/solid-core';
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

export interface ExtendedGlossaryEntryModel {
  [key: string]: GlossaryStateModel;
}

export interface GlossaryApiResponse {
  [key: string]: GlossaryEntryModel[];
}

@State<ExtendedGlossaryEntryModel>({
  name: 'glossary',
  defaults: {
    Glossar: {
      entries: {},
      sections: [],
    },
  },
})
@Injectable()
export class GlossaryState {
  constructor(
    @Inject(SOLID_CORE_CONFIG) private _config: SolidCoreConfig,
    private _http: HttpClient,
  ) {}

  @Selector()
  static state(state: ExtendedGlossaryEntryModel) {
    return { ...state };
  }

  @Action(LoadGLossary)
  public load(ctx: StateContext<ExtendedGlossaryEntryModel>) {
    return this._http
      .get<GlossaryApiResponse>(`${this._config.apiUrl}/glossaryentries`)
      .pipe(
        map((result) => {
          const extendedGlossary: ExtendedGlossaryEntryModel = {};

          // Iterate over each tab content
          Object.entries(result).forEach(([tabName, entryArray]) => {
            const entries: GlossaryEntries = {};
            const sections: { [key: string]: number[] } = {};

            // Process each entry
            entryArray.forEach((entry) => {
              entries[entry.id] = entry;
              const firstChar = entry.term[0].toUpperCase();
              if (sections[firstChar] === undefined) {
                sections[firstChar] = [];
              }
              sections[firstChar].push(entry.id);
            });

            // Sort entries within each section by term
            Object.keys(sections).forEach((sectionKey) =>
              sections[sectionKey].sort((a, b) =>
                entries[a].term.localeCompare(entries[b].term),
              ),
            );

            // Convert sections to array format and sort by section key
            const sectionArr = Object.entries(sections);
            sectionArr.sort((a, b) => a[0].localeCompare(b[0]));

            extendedGlossary[tabName] = {
              entries,
              sections: sectionArr,
            };
          });
          return extendedGlossary;
        }),
        tap((v) => {
          ctx.patchState(v);
        }),
      );
  }
}
