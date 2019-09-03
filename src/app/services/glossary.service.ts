import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiHttpClient} from '../shared/abstract/api-http-client';
import {GlossarySetAction} from '../state/glossary.actions';
import {Store} from "@ngxs/store";
import {GlossaryEntriesOrdered, GlossaryEntryModel} from "../state/glossary.state";

@Injectable()
export class GlossaryService extends ApiHttpClient {
  constructor(
    http: HttpClient,
    private _store: Store,
  ) {
    super(http, ['api', 'glossary']);

  }

  public loadGlossaryEntries(): void {
    this.list<GlossaryEntryModel>().subscribe(unordered => {
    const ordered: GlossaryEntriesOrdered = {};
    unordered.forEach(entry => {
      const firstChar = entry.header[0].toUpperCase();
      if (ordered[firstChar] === undefined) {
        ordered[firstChar] = [];
      }
      ordered[firstChar].push(entry);
    });
    this._store.dispatch(new GlossarySetAction(ordered));
    })
  }
}
