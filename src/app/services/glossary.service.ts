import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GlossaryEntriesOrdered, GlossaryEntryModel} from '../models/glossary-entry.model';
import {ApiHttpClient} from '../shared/abstract/api-http-client';

@Injectable()
export class GlossaryService extends ApiHttpClient {
  constructor(
    http: HttpClient,
  ) {
    super(http, 'glossary');

  }

  public async getGlossaryEntries(): Promise<GlossaryEntriesOrdered> {
    const unordered = await this.list<GlossaryEntryModel>();
    const ordered: GlossaryEntriesOrdered = {};
    unordered.forEach(entry => {
      const firstChar = entry.header[0].toUpperCase();
      if (ordered[firstChar] === undefined) {
        ordered[firstChar] = [];
      }
      ordered[firstChar].push(entry);
    });
    return ordered;
  }
}
