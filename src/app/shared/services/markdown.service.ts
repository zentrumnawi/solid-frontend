import {Injectable, SecurityContext} from '@angular/core';
import * as MarkdownIt from 'markdown-it';
import {DomSanitizer} from '@angular/platform-browser';
import overlinePlugin from './overline.plugin';

@Injectable()
export class MarkdownService {
  private _markdownIt = new MarkdownIt({
    html: true,
  })
    .use(require('markdown-it-sub') as any)
    .use(require('markdown-it-sup') as any)
    .use(overlinePlugin);

    constructor(
        private _domSanitizer: DomSanitizer
    ) {

    }

    public compile(data: string): any {
        return this._domSanitizer.sanitize(
            SecurityContext.HTML,
            this._markdownIt.render(data)
        );
    }
}
