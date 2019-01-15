import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {GlossarySetAction} from '../actions/glossary.actions';
import {AppState} from '../models/app.model';
import {GlossaryEntriesOrdered, GlossaryEntryModel} from '../models/glossary-entry.model';
import {ApiHttpClient} from '../shared/abstract/api-http-client';

@Injectable()
export class GlossaryService extends ApiHttpClient {
  constructor(
    http: HttpClient,
    private _store: Store<AppState>,
  ) {
    super(http, 'glossary');

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
