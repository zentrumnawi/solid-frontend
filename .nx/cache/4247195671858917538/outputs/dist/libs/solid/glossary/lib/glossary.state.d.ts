import { StateContext } from '@ngxs/store';
import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import { HttpClient } from '@angular/common/http';
import * as i0 from '@angular/core';
export interface GlossaryEntryModel {
  id: number;
  term: string;
  text: string;
  links: number[];
}
export interface GlossaryEntries {
  [key: number]: GlossaryEntryModel;
}
export interface GlossaryStateModel {
  entries: GlossaryEntries;
  sections: [string, number[]][];
}
export declare class GlossaryState {
  private _config;
  private _http;
  constructor(_config: SolidCoreConfig, _http: HttpClient);
  static state(state: GlossaryStateModel): {
    entries: GlossaryEntries;
    sections: [string, number[]][];
  };
  load(ctx: StateContext<GlossaryStateModel>): import('rxjs').Observable<{
    entries: GlossaryEntries;
    sections: [string, number[]][];
  }>;
  static ɵfac: i0.ɵɵFactoryDeclaration<GlossaryState, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<GlossaryState>;
}
