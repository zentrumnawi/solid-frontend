import { DomSanitizer } from '@angular/platform-browser';
import { SolidCoreConfig } from '../solid-core-config';
import * as i0 from '@angular/core';
export declare class MarkdownService {
  private _domSanitizer;
  private readonly _markdownIt;
  constructor(_config: SolidCoreConfig, _domSanitizer: DomSanitizer);
  compile(data: string, inline: boolean): any;
  static ɵfac: i0.ɵɵFactoryDeclaration<MarkdownService, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<MarkdownService>;
}
