import { Inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { Actions, ofActionSuccessful } from '@ngxs/store';
import { RouterNavigation } from '@ngxs/router-plugin';
import { SOLID_CORE_CONFIG } from '../solid-core-config';
import * as i0 from '@angular/core';
import * as i1 from '@angular/platform-browser';
import * as i2 from '@ngxs/store';
export class TitleService {
  cfg;
  _title;
  constructor(cfg, _title, actions) {
    this.cfg = cfg;
    this._title = _title;
    actions
      .pipe(
        ofActionSuccessful(RouterNavigation),
        map((value) => value.routerState.routeData.title)
      )
      .subscribe((title) => {
        this._title.setTitle(title ? `${title} | ${cfg.appName}` : cfg.appName);
      });
  }
  /**
   * Sets the title of the app for the lifetime of a dialog.
   */
  setDialogTitle(dialogRef, title) {
    const oldTitle = this._title.getTitle();
    this._title.setTitle(`${title} | ${this.cfg.appName}`);
    const sub = dialogRef.afterClosed().subscribe(() => {
      this._title.setTitle(oldTitle);
      sub.unsubscribe();
    });
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: TitleService,
    deps: [
      { token: SOLID_CORE_CONFIG },
      { token: i1.Title },
      { token: i2.Actions },
    ],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: TitleService,
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: TitleService,
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
      { type: i1.Title },
      { type: i2.Actions },
    ];
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvY29yZS9zcmMvbGliL3NlcnZpY2VzL3RpdGxlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQyxPQUFPLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzFELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXZELE9BQU8sRUFBRSxpQkFBaUIsRUFBbUIsTUFBTSxzQkFBc0IsQ0FBQzs7OztBQUcxRSxNQUFNLE9BQU8sWUFBWTtJQUVjO0lBQzNCO0lBRlYsWUFDcUMsR0FBb0IsRUFDL0MsTUFBYSxFQUNyQixPQUFnQjtRQUZtQixRQUFHLEdBQUgsR0FBRyxDQUFpQjtRQUMvQyxXQUFNLEdBQU4sTUFBTSxDQUFPO1FBR3JCLE9BQU87YUFDSixJQUFJLENBQ0gsa0JBQWtCLENBQUMsQ0FBQSxnQkFBbUMsQ0FBQSxDQUFDLEVBQ3ZELEdBQUcsQ0FDRCxDQUFDLEtBQTBDLEVBQUUsRUFBRSxDQUM3QyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQ3BDLENBQ0Y7YUFDQSxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxNQUFNLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOztPQUVHO0lBQ0gsY0FBYyxDQUFDLFNBQTRCLEVBQUUsS0FBYTtRQUN4RCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN2RCxNQUFNLEdBQUcsR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvQixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO3VHQTdCVSxZQUFZLGtCQUViLGlCQUFpQjsyR0FGaEIsWUFBWTs7MkZBQVosWUFBWTtrQkFEeEIsVUFBVTs7MEJBR04sTUFBTTsyQkFBQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVGl0bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xyXG5pbXBvcnQgeyBBY3Rpb25zLCBvZkFjdGlvblN1Y2Nlc3NmdWwgfSBmcm9tICdAbmd4cy9zdG9yZSc7XHJcbmltcG9ydCB7IFJvdXRlck5hdmlnYXRpb24gfSBmcm9tICdAbmd4cy9yb3V0ZXItcGx1Z2luJztcclxuaW1wb3J0IHsgUm91dGVyU3RhdGVQYXJhbXMgfSBmcm9tICcuLi9jdXN0b20tcm91dGVyLXN0YXRlLXNlcmlhbGl6ZXInO1xyXG5pbXBvcnQgeyBTT0xJRF9DT1JFX0NPTkZJRywgU29saWRDb3JlQ29uZmlnIH0gZnJvbSAnLi4vc29saWQtY29yZS1jb25maWcnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVGl0bGVTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoU09MSURfQ09SRV9DT05GSUcpIHByaXZhdGUgY2ZnOiBTb2xpZENvcmVDb25maWcsXHJcbiAgICBwcml2YXRlIF90aXRsZTogVGl0bGUsXHJcbiAgICBhY3Rpb25zOiBBY3Rpb25zXHJcbiAgKSB7XHJcbiAgICBhY3Rpb25zXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIG9mQWN0aW9uU3VjY2Vzc2Z1bChSb3V0ZXJOYXZpZ2F0aW9uPFJvdXRlclN0YXRlUGFyYW1zPiksXHJcbiAgICAgICAgbWFwKFxyXG4gICAgICAgICAgKHZhbHVlOiBSb3V0ZXJOYXZpZ2F0aW9uPFJvdXRlclN0YXRlUGFyYW1zPikgPT5cclxuICAgICAgICAgICAgdmFsdWUucm91dGVyU3RhdGUucm91dGVEYXRhLnRpdGxlXHJcbiAgICAgICAgKVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKHRpdGxlKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fdGl0bGUuc2V0VGl0bGUodGl0bGUgPyBgJHt0aXRsZX0gfCAke2NmZy5hcHBOYW1lfWAgOiBjZmcuYXBwTmFtZSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgdGl0bGUgb2YgdGhlIGFwcCBmb3IgdGhlIGxpZmV0aW1lIG9mIGEgZGlhbG9nLlxyXG4gICAqL1xyXG4gIHNldERpYWxvZ1RpdGxlKGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPGFueT4sIHRpdGxlOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IG9sZFRpdGxlID0gdGhpcy5fdGl0bGUuZ2V0VGl0bGUoKTtcclxuICAgIHRoaXMuX3RpdGxlLnNldFRpdGxlKGAke3RpdGxlfSB8ICR7dGhpcy5jZmcuYXBwTmFtZX1gKTtcclxuICAgIGNvbnN0IHN1YiA9IGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuX3RpdGxlLnNldFRpdGxlKG9sZFRpdGxlKTtcclxuICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19
