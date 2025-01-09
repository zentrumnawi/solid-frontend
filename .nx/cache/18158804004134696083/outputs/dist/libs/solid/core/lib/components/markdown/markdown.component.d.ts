import { MarkdownService } from '../../services/markdown.service';
import * as i0 from '@angular/core';
export declare class MarkdownComponent {
  private _md;
  set inline(value: boolean);
  innerHTML: string;
  private _data;
  private _inline;
  inlineClass: () => boolean;
  constructor(_md: MarkdownService);
  set data(value: string);
  set appendData(value: string);
  onDataChange(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<MarkdownComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    MarkdownComponent,
    '[markdown]',
    never,
    {
      inline: { alias: 'inline'; required: false };
      data: { alias: 'data'; required: false };
      appendData: { alias: 'appendData'; required: false };
    },
    {},
    never,
    ['*'],
    false,
    never
  >;
}
