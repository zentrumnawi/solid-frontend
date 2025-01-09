var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
import { Action, Selector, State } from '@ngxs/store';
import { Inject, Injectable } from '@angular/core';
import { LoadGLossary } from './glossary.actions';
import { SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common/http';
export let GlossaryState = class GlossaryState {
  _config;
  _http;
  constructor(_config, _http) {
    this._config = _config;
    this._http = _http;
  }
  static state(state) {
    return { ...state };
  }
  load(ctx) {
    return this._http.get(`${this._config.apiUrl}/glossaryentries`).pipe(
      map((result) => {
        const entries = {};
        const sections = {};
        result.forEach((entry) => {
          entries[entry.id] = entry;
          const firstChar = entry.term[0].toUpperCase();
          if (sections[firstChar] === undefined) {
            sections[firstChar] = [];
          }
          sections[firstChar].push(entry.id);
        });
        Object.keys(sections).forEach((sectionKey) =>
          sections[sectionKey].sort((a, b) =>
            entries[a].term.localeCompare(entries[b].term)
          )
        );
        const sectionArr = Object.entries(sections);
        sectionArr.sort((a, b) => a[0].localeCompare(b[0]));
        return { entries, sections: sectionArr };
      }),
      tap((v) => {
        ctx.patchState(v);
      })
    );
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: GlossaryState,
    deps: [{ token: SOLID_CORE_CONFIG }, { token: i1.HttpClient }],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: GlossaryState,
  });
};
__decorate(
  [
    Action(LoadGLossary),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', void 0),
  ],
  GlossaryState.prototype,
  'load',
  null
);
__decorate(
  [
    Selector(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', void 0),
  ],
  GlossaryState,
  'state',
  null
);
GlossaryState = __decorate(
  [
    State({
      name: 'glossary',
      defaults: {
        entries: {},
        sections: [],
      },
    }),
    __metadata('design:paramtypes', [Object, HttpClient]),
  ],
  GlossaryState
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: GlossaryState,
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
      { type: i1.HttpClient },
    ];
  },
  propDecorators: { load: [] },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvc3Nhcnkuc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL2dsb3NzYXJ5L3NyYy9saWIvZ2xvc3Nhcnkuc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFnQixNQUFNLGFBQWEsQ0FBQztBQUNwRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFFLGlCQUFpQixFQUFtQixNQUFNLHlCQUF5QixDQUFDO0FBQzdFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUE2Qm5DLFdBQU0sYUFBYSxHQUFuQixNQUFNLGFBQWE7SUFFYTtJQUMzQjtJQUZWLFlBQ3FDLE9BQXdCLEVBQ25ELEtBQWlCO1FBRFUsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFDbkQsVUFBSyxHQUFMLEtBQUssQ0FBWTtJQUN4QixDQUFDO0lBR0csQUFBUCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQXlCO1FBQ3BDLE9BQU8sRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFHTSxJQUFJLENBQUMsR0FBcUM7UUFDL0MsT0FBTyxJQUFJLENBQUMsS0FBSzthQUNkLEdBQUcsQ0FBdUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sa0JBQWtCLENBQUM7YUFDbkUsSUFBSSxDQUNILEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ2IsTUFBTSxPQUFPLEdBQW9CLEVBQUUsQ0FBQztZQUNwQyxNQUFNLFFBQVEsR0FBZ0MsRUFBRSxDQUFDO1lBQ2pELE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDdkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQzFCLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzlDLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLFNBQVMsRUFBRTtvQkFDckMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztpQkFDMUI7Z0JBQ0QsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQzNDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FDakMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUMvQyxDQUNGLENBQUM7WUFDRixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUM7UUFDM0MsQ0FBQyxDQUFDLEVBQ0YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDUixHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDTixDQUFDO3VHQXhDVSxhQUFhLGtCQUVkLGlCQUFpQjsyR0FGaEIsYUFBYTs7QUFZakI7SUFETixNQUFNLENBQUMsWUFBWSxDQUFDOzs7O3lDQTZCcEI7QUFqQ007SUFETixRQUFRLEVBQUU7Ozs7Z0NBR1Y7QUFUVSxhQUFhO0lBUnpCLEtBQUssQ0FBcUI7UUFDekIsSUFBSSxFQUFFLFVBQVU7UUFDaEIsUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLEVBQUU7WUFDWCxRQUFRLEVBQUUsRUFBRTtTQUNiO0tBQ0YsQ0FBQzs2Q0FLaUIsVUFBVTtHQUhoQixhQUFhLENBeUN6QjsyRkF6Q1ksYUFBYTtrQkFEekIsVUFBVTs7MEJBR04sTUFBTTsyQkFBQyxpQkFBaUI7cUVBVXBCLElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24sIFNlbGVjdG9yLCBTdGF0ZSwgU3RhdGVDb250ZXh0IH0gZnJvbSAnQG5neHMvc3RvcmUnO1xyXG5pbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTG9hZEdMb3NzYXJ5IH0gZnJvbSAnLi9nbG9zc2FyeS5hY3Rpb25zJztcclxuaW1wb3J0IHsgU09MSURfQ09SRV9DT05GSUcsIFNvbGlkQ29yZUNvbmZpZyB9IGZyb20gJ0B6ZW50cnVtbmF3aS9zb2xpZC1jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcclxuaW1wb3J0IHsgbWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEdsb3NzYXJ5RW50cnlNb2RlbCB7XHJcbiAgaWQ6IG51bWJlcjtcclxuICB0ZXJtOiBzdHJpbmc7XHJcbiAgdGV4dDogc3RyaW5nO1xyXG4gIC8vIGltYWdlcyBhcmUgbm90IHVzZWRcclxuICAvLyBpbWc/OiBzdHJpbmc7XHJcbiAgLy8gaW1nX2FsdD86IHN0cmluZztcclxuICBsaW5rczogbnVtYmVyW107XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgR2xvc3NhcnlFbnRyaWVzIHtcclxuICBba2V5OiBudW1iZXJdOiBHbG9zc2FyeUVudHJ5TW9kZWw7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgR2xvc3NhcnlTdGF0ZU1vZGVsIHtcclxuICBlbnRyaWVzOiBHbG9zc2FyeUVudHJpZXM7XHJcbiAgc2VjdGlvbnM6IFtzdHJpbmcsIG51bWJlcltdXVtdO1xyXG59XHJcblxyXG5AU3RhdGU8R2xvc3NhcnlTdGF0ZU1vZGVsPih7XHJcbiAgbmFtZTogJ2dsb3NzYXJ5JyxcclxuICBkZWZhdWx0czoge1xyXG4gICAgZW50cmllczoge30sXHJcbiAgICBzZWN0aW9uczogW10sXHJcbiAgfSxcclxufSlcclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR2xvc3NhcnlTdGF0ZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KFNPTElEX0NPUkVfQ09ORklHKSBwcml2YXRlIF9jb25maWc6IFNvbGlkQ29yZUNvbmZpZyxcclxuICAgIHByaXZhdGUgX2h0dHA6IEh0dHBDbGllbnRcclxuICApIHt9XHJcblxyXG4gIEBTZWxlY3RvcigpXHJcbiAgc3RhdGljIHN0YXRlKHN0YXRlOiBHbG9zc2FyeVN0YXRlTW9kZWwpIHtcclxuICAgIHJldHVybiB7IC4uLnN0YXRlIH07XHJcbiAgfVxyXG5cclxuICBAQWN0aW9uKExvYWRHTG9zc2FyeSlcclxuICBwdWJsaWMgbG9hZChjdHg6IFN0YXRlQ29udGV4dDxHbG9zc2FyeVN0YXRlTW9kZWw+KSB7XHJcbiAgICByZXR1cm4gdGhpcy5faHR0cFxyXG4gICAgICAuZ2V0PEdsb3NzYXJ5RW50cnlNb2RlbFtdPihgJHt0aGlzLl9jb25maWcuYXBpVXJsfS9nbG9zc2FyeWVudHJpZXNgKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBtYXAoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZW50cmllczogR2xvc3NhcnlFbnRyaWVzID0ge307XHJcbiAgICAgICAgICBjb25zdCBzZWN0aW9uczogeyBba2V5OiBzdHJpbmddOiBudW1iZXJbXSB9ID0ge307XHJcbiAgICAgICAgICByZXN1bHQuZm9yRWFjaCgoZW50cnkpID0+IHtcclxuICAgICAgICAgICAgZW50cmllc1tlbnRyeS5pZF0gPSBlbnRyeTtcclxuICAgICAgICAgICAgY29uc3QgZmlyc3RDaGFyID0gZW50cnkudGVybVswXS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgICBpZiAoc2VjdGlvbnNbZmlyc3RDaGFyXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgc2VjdGlvbnNbZmlyc3RDaGFyXSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlY3Rpb25zW2ZpcnN0Q2hhcl0ucHVzaChlbnRyeS5pZCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIE9iamVjdC5rZXlzKHNlY3Rpb25zKS5mb3JFYWNoKChzZWN0aW9uS2V5KSA9PlxyXG4gICAgICAgICAgICBzZWN0aW9uc1tzZWN0aW9uS2V5XS5zb3J0KChhLCBiKSA9PlxyXG4gICAgICAgICAgICAgIGVudHJpZXNbYV0udGVybS5sb2NhbGVDb21wYXJlKGVudHJpZXNbYl0udGVybSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGNvbnN0IHNlY3Rpb25BcnIgPSBPYmplY3QuZW50cmllcyhzZWN0aW9ucyk7XHJcbiAgICAgICAgICBzZWN0aW9uQXJyLnNvcnQoKGEsIGIpID0+IGFbMF0ubG9jYWxlQ29tcGFyZShiWzBdKSk7XHJcbiAgICAgICAgICByZXR1cm4geyBlbnRyaWVzLCBzZWN0aW9uczogc2VjdGlvbkFyciB9O1xyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHRhcCgodikgPT4ge1xyXG4gICAgICAgICAgY3R4LnBhdGNoU3RhdGUodik7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICB9XHJcbn1cclxuIl19
