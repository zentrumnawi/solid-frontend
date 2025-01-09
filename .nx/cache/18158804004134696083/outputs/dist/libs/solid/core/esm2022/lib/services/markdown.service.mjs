import { Inject, Injectable, SecurityContext } from '@angular/core';
import * as MarkdownIt from 'markdown-it';
import { DomSanitizer } from '@angular/platform-browser';
import { SOLID_CORE_CONFIG } from '../solid-core-config';
import * as i0 from '@angular/core';
import * as i1 from '@angular/platform-browser';
export class MarkdownService {
  _domSanitizer;
  _markdownIt;
  constructor(_config, _domSanitizer) {
    this._domSanitizer = _domSanitizer;
    const md = new MarkdownIt({
      html: true,
    });
    _config.markdownPlugins?.forEach((plugin) => md.use(plugin));
    this._markdownIt = md;
  }
  compile(data, inline) {
    return this._domSanitizer.sanitize(
      SecurityContext.HTML,
      inline
        ? this._markdownIt.renderInline(data)
        : this._markdownIt.render(data)
    );
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MarkdownService,
    deps: [{ token: SOLID_CORE_CONFIG }, { token: i1.DomSanitizer }],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MarkdownService,
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: MarkdownService,
  decorators: [
    {
      type: Injectable,
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [SOLID_CORE_CONFIG],
          },
        ],
      },
      { type: i1.DomSanitizer },
    ];
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvY29yZS9zcmMvbGliL3NlcnZpY2VzL21hcmtkb3duLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sS0FBSyxVQUFVLE1BQU0sYUFBYSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQW1CLE1BQU0sc0JBQXNCLENBQUM7OztBQUcxRSxNQUFNLE9BQU8sZUFBZTtJQUtoQjtJQUpPLFdBQVcsQ0FBYTtJQUV6QyxZQUM2QixPQUF3QixFQUMzQyxhQUEyQjtRQUEzQixrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUVuQyxNQUFNLEVBQUUsR0FBRyxJQUFJLFVBQVUsQ0FBQztZQUN4QixJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUMsQ0FBQztRQUNILE9BQU8sQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVNLE9BQU8sQ0FBQyxJQUFZLEVBQUUsTUFBZTtRQUMxQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUNoQyxlQUFlLENBQUMsSUFBSSxFQUNwQixNQUFNO1lBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNyQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQ2xDLENBQUM7SUFDSixDQUFDO3VHQXJCVSxlQUFlLGtCQUloQixpQkFBaUI7MkdBSmhCLGVBQWU7OzJGQUFmLGVBQWU7a0JBRDNCLFVBQVU7OzBCQUtOLE1BQU07MkJBQUMsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBTZWN1cml0eUNvbnRleHQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgTWFya2Rvd25JdCBmcm9tICdtYXJrZG93bi1pdCc7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBTT0xJRF9DT1JFX0NPTkZJRywgU29saWRDb3JlQ29uZmlnIH0gZnJvbSAnLi4vc29saWQtY29yZS1jb25maWcnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTWFya2Rvd25TZXJ2aWNlIHtcclxuICBwcml2YXRlIHJlYWRvbmx5IF9tYXJrZG93bkl0OiBNYXJrZG93bkl0O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoU09MSURfQ09SRV9DT05GSUcpIF9jb25maWc6IFNvbGlkQ29yZUNvbmZpZyxcclxuICAgIHByaXZhdGUgX2RvbVNhbml0aXplcjogRG9tU2FuaXRpemVyXHJcbiAgKSB7XHJcbiAgICBjb25zdCBtZCA9IG5ldyBNYXJrZG93bkl0KHtcclxuICAgICAgaHRtbDogdHJ1ZSxcclxuICAgIH0pO1xyXG4gICAgX2NvbmZpZy5tYXJrZG93blBsdWdpbnM/LmZvckVhY2goKHBsdWdpbikgPT4gbWQudXNlKHBsdWdpbikpO1xyXG4gICAgdGhpcy5fbWFya2Rvd25JdCA9IG1kO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbXBpbGUoZGF0YTogc3RyaW5nLCBpbmxpbmU6IGJvb2xlYW4pOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2RvbVNhbml0aXplci5zYW5pdGl6ZShcclxuICAgICAgU2VjdXJpdHlDb250ZXh0LkhUTUwsXHJcbiAgICAgIGlubGluZVxyXG4gICAgICAgID8gdGhpcy5fbWFya2Rvd25JdC5yZW5kZXJJbmxpbmUoZGF0YSlcclxuICAgICAgICA6IHRoaXMuX21hcmtkb3duSXQucmVuZGVyKGRhdGEpXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=
