import { Inject, Injectable, Input, SecurityContext } from '@angular/core';
import * as MarkdownIt from 'markdown-it';
import { DomSanitizer } from '@angular/platform-browser';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '../solid-core-config';

@Injectable()
export class MarkdownService {
  private readonly _markdownIt: MarkdownIt;

  constructor(
    @Inject(SOLID_CORE_CONFIG) _config: SolidCoreConfig,
    private _domSanitizer: DomSanitizer
  ) {
    const md = new MarkdownIt({
      html: true
    });
    _config.markdownPlugins?.forEach(plugin => md.use(plugin));
    this._markdownIt = md;
  }

  public compile(data: string, inline: boolean): any {
    return this._domSanitizer.sanitize(
      SecurityContext.HTML,
      inline
        ? this._markdownIt.renderInline(data)
        : this._markdownIt.render(data)
    );
  }
}
