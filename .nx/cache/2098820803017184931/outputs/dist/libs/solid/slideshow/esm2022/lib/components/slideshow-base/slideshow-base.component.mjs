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
import { Component, Inject } from '@angular/core';
import { SlideshowState } from '../../state/slideshow.state';
import { Observable, Subject } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { AddSlideshow } from '../../state/slideshow.actions';
import { map, takeUntil } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import { ActivatedRoute } from '@angular/router';
import { SOLID_SLIDESHOW_APP_ROUTING_CONFIG } from '../../app-config';
import * as i0 from '@angular/core';
import * as i1 from '@ngxs/store';
import * as i2 from '@angular/router';
import * as i3 from '@angular/common';
import * as i4 from '../slideshow/slideshow.component';
import * as i5 from '../slideshow-select/slideshow-select.component';
export function __internal__selectRouterParam(s) {
  return s.router.state.params;
}
export class SlideshowBaseComponent {
  routingConfig;
  store;
  route;
  $destroyed = new Subject();
  params;
  SlideshowS = null;
  Slideshow;
  SelectedSlideshow = false;
  DeepLinkFirstLoad = false;
  slideshowId;
  constructor(routingConfig, store, route) {
    this.routingConfig = routingConfig;
    this.store = store;
    this.route = route;
  }
  ngOnInit() {
    this.params.pipe(takeUntil(this.$destroyed)).subscribe((x) => {
      if (Object.keys(x).length === 0) {
        this.SelectedSlideshow = false;
        this.DeepLinkFirstLoad = false;
      }
    });
    this.slideshowId = this.route.firstChild?.snapshot.params['slideshowId'];
    if (this.slideshowId) {
      this.getSlideshow(this.slideshowId);
      this.SelectedSlideshow = true;
      this.DeepLinkFirstLoad = true;
    }
  }
  getSlideshow(slideshowId) {
    this.store.dispatch(new AddSlideshow(slideshowId));
    this.Slideshow = this.store
      .select(SlideshowState.getSlideshowById)
      .pipe(map((fn) => fn(slideshowId)));
  }
  selectSlideshow(data) {
    this.SelectedSlideshow = true;
    if (data.slideshowid) {
      this.getSlideshow(data.slideshowid);
    }
  }
  goBack() {
    this.SelectedSlideshow = false;
    this.DeepLinkFirstLoad = false;
    return new Navigate([`${this.routingConfig.url}`]);
  }
  ngOnDestroy() {
    this.$destroyed.next();
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SlideshowBaseComponent,
    deps: [
      { token: SOLID_SLIDESHOW_APP_ROUTING_CONFIG },
      { token: i1.Store },
      { token: i2.ActivatedRoute },
    ],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: SlideshowBaseComponent,
    selector: 'solid-slideshow-slideshow-base',
    ngImport: i0,
    template:
      '<solid-slideshow-slideshow-select\r\n  *ngIf="!DeepLinkFirstLoad"\r\n  [class.disappear]="SelectedSlideshow"\r\n  [class.appear]="!SelectedSlideshow"\r\n  (selectSlideshow)="selectSlideshow($event)"\r\n></solid-slideshow-slideshow-select>\r\n<solid-slideshow\r\n  *ngIf="SelectedSlideshow"\r\n  [selectSlideshow]="Slideshow | async"\r\n  (backButtonClick)="goBack()"\r\n></solid-slideshow>\r\n',
    styles: ['.disappear{display:none!important}.appear{display:block}\n'],
    dependencies: [
      {
        kind: 'directive',
        type: i3.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'component',
        type: i4.SlideshowComponent,
        selector: 'solid-slideshow',
        inputs: ['selectSlideshow'],
        outputs: ['backButtonClick'],
      },
      {
        kind: 'component',
        type: i5.SlideshowSelectComponent,
        selector: 'solid-slideshow-slideshow-select',
        outputs: ['selectSlideshow'],
      },
      { kind: 'pipe', type: i3.AsyncPipe, name: 'async' },
    ],
  });
}
__decorate(
  [
    Select(__internal__selectRouterParam),
    __metadata('design:type', Observable),
  ],
  SlideshowBaseComponent.prototype,
  'params',
  void 0
);
__decorate(
  [
    Dispatch(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', void 0),
  ],
  SlideshowBaseComponent.prototype,
  'goBack',
  null
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: SlideshowBaseComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-slideshow-slideshow-base',
          template:
            '<solid-slideshow-slideshow-select\r\n  *ngIf="!DeepLinkFirstLoad"\r\n  [class.disappear]="SelectedSlideshow"\r\n  [class.appear]="!SelectedSlideshow"\r\n  (selectSlideshow)="selectSlideshow($event)"\r\n></solid-slideshow-slideshow-select>\r\n<solid-slideshow\r\n  *ngIf="SelectedSlideshow"\r\n  [selectSlideshow]="Slideshow | async"\r\n  (backButtonClick)="goBack()"\r\n></solid-slideshow>\r\n',
          styles: [
            '.disappear{display:none!important}.appear{display:block}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [SOLID_SLIDESHOW_APP_ROUTING_CONFIG],
          },
        ],
      },
      { type: i1.Store },
      { type: i2.ActivatedRoute },
    ];
  },
  propDecorators: { params: [], goBack: [] },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVzaG93LWJhc2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9zbGlkZXNob3cvc3JjL2xpYi9jb21wb25lbnRzL3NsaWRlc2hvdy1iYXNlL3NsaWRlc2hvdy1iYXNlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvc2xpZGVzaG93L3NyYy9saWIvY29tcG9uZW50cy9zbGlkZXNob3ctYmFzZS9zbGlkZXNob3ctYmFzZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7O0FBRXRFLE1BQU0sVUFBVSw2QkFBNkIsQ0FBQyxDQUFNO0lBQ2xELE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQy9CLENBQUM7QUFP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IENvbXBvbmVudCwgSW5qZWN0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTbGlkZXNob3dTdGF0ZSB9IGZyb20gJy4uLy4uL3N0YXRlL3NsaWRlc2hvdy5zdGF0ZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgU2xpZGVzaG93IH0gZnJvbSAnLi4vLi4vc3RhdGUvc2xpZGVzaG93Lm1vZGVsJztcclxuaW1wb3J0IHsgU2VsZWN0LCBTdG9yZSB9IGZyb20gJ0BuZ3hzL3N0b3JlJztcclxuaW1wb3J0IHsgRGlzcGF0Y2ggfSBmcm9tICdAbmd4cy1sYWJzL2Rpc3BhdGNoLWRlY29yYXRvcic7XHJcbmltcG9ydCB7IEFkZFNsaWRlc2hvdyB9IGZyb20gJy4uLy4uL3N0YXRlL3NsaWRlc2hvdy5hY3Rpb25zJztcclxuaW1wb3J0IHsgbWFwLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IE5hdmlnYXRlIH0gZnJvbSAnQG5neHMvcm91dGVyLXBsdWdpbic7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU09MSURfU0xJREVTSE9XX0FQUF9ST1VUSU5HX0NPTkZJRyB9IGZyb20gJy4uLy4uL2FwcC1jb25maWcnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW50ZXJuYWxfX3NlbGVjdFJvdXRlclBhcmFtKHM6IGFueSkge1xyXG4gIHJldHVybiBzLnJvdXRlci5zdGF0ZS5wYXJhbXM7XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc29saWQtc2xpZGVzaG93LXNsaWRlc2hvdy1iYXNlJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc2xpZGVzaG93LWJhc2UuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NsaWRlc2hvdy1iYXNlLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTbGlkZXNob3dCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHByaXZhdGUgJGRlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gIEBTZWxlY3QoX19pbnRlcm5hbF9fc2VsZWN0Um91dGVyUGFyYW0pXHJcbiAgcGFyYW1zITogT2JzZXJ2YWJsZTxhbnk+O1xyXG5cclxuICBwdWJsaWMgU2xpZGVzaG93Uz86IFNsaWRlc2hvdyB8IG51bGwgPSBudWxsO1xyXG4gIHB1YmxpYyBTbGlkZXNob3c/OiBPYnNlcnZhYmxlPFNsaWRlc2hvdz47XHJcbiAgcHVibGljIFNlbGVjdGVkU2xpZGVzaG93ID0gZmFsc2U7XHJcbiAgcHVibGljIERlZXBMaW5rRmlyc3RMb2FkID0gZmFsc2U7XHJcbiAgcHVibGljIHNsaWRlc2hvd0lkITogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoU09MSURfU0xJREVTSE9XX0FQUF9ST1VUSU5HX0NPTkZJRykgcHVibGljIHJvdXRpbmdDb25maWc6IGFueSxcclxuICAgIHByaXZhdGUgc3RvcmU6IFN0b3JlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGVcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5wYXJhbXMucGlwZSh0YWtlVW50aWwodGhpcy4kZGVzdHJveWVkKSkuc3Vic2NyaWJlKCh4KSA9PiB7XHJcbiAgICAgIGlmIChPYmplY3Qua2V5cyh4KS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICB0aGlzLlNlbGVjdGVkU2xpZGVzaG93ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5EZWVwTGlua0ZpcnN0TG9hZCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnNsaWRlc2hvd0lkID0gdGhpcy5yb3V0ZS5maXJzdENoaWxkPy5zbmFwc2hvdC5wYXJhbXNbJ3NsaWRlc2hvd0lkJ107XHJcbiAgICBpZiAodGhpcy5zbGlkZXNob3dJZCkge1xyXG4gICAgICB0aGlzLmdldFNsaWRlc2hvdyh0aGlzLnNsaWRlc2hvd0lkKTtcclxuICAgICAgdGhpcy5TZWxlY3RlZFNsaWRlc2hvdyA9IHRydWU7XHJcbiAgICAgIHRoaXMuRGVlcExpbmtGaXJzdExvYWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0U2xpZGVzaG93KHNsaWRlc2hvd0lkOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEFkZFNsaWRlc2hvdyhzbGlkZXNob3dJZCkpO1xyXG4gICAgdGhpcy5TbGlkZXNob3cgPSB0aGlzLnN0b3JlXHJcbiAgICAgIC5zZWxlY3QoU2xpZGVzaG93U3RhdGUuZ2V0U2xpZGVzaG93QnlJZClcclxuICAgICAgLnBpcGUobWFwKChmbikgPT4gZm4oc2xpZGVzaG93SWQpKSk7XHJcbiAgfVxyXG5cclxuICBzZWxlY3RTbGlkZXNob3coZGF0YTogYW55KSB7XHJcbiAgICB0aGlzLlNlbGVjdGVkU2xpZGVzaG93ID0gdHJ1ZTtcclxuICAgIGlmIChkYXRhLnNsaWRlc2hvd2lkKSB7XHJcbiAgICAgIHRoaXMuZ2V0U2xpZGVzaG93KGRhdGEuc2xpZGVzaG93aWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQERpc3BhdGNoKClcclxuICBnb0JhY2soKSB7XHJcbiAgICB0aGlzLlNlbGVjdGVkU2xpZGVzaG93ID0gZmFsc2U7XHJcbiAgICB0aGlzLkRlZXBMaW5rRmlyc3RMb2FkID0gZmFsc2U7XHJcbiAgICByZXR1cm4gbmV3IE5hdmlnYXRlKFtgJHt0aGlzLnJvdXRpbmdDb25maWcudXJsfWBdKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy4kZGVzdHJveWVkLm5leHQoKTtcclxuICB9XHJcbn1cclxuIiwiPHNvbGlkLXNsaWRlc2hvdy1zbGlkZXNob3ctc2VsZWN0XHJcbiAgKm5nSWY9XCIhRGVlcExpbmtGaXJzdExvYWRcIlxyXG4gIFtjbGFzcy5kaXNhcHBlYXJdPVwiU2VsZWN0ZWRTbGlkZXNob3dcIlxyXG4gIFtjbGFzcy5hcHBlYXJdPVwiIVNlbGVjdGVkU2xpZGVzaG93XCJcclxuICAoc2VsZWN0U2xpZGVzaG93KT1cInNlbGVjdFNsaWRlc2hvdygkZXZlbnQpXCJcclxuPjwvc29saWQtc2xpZGVzaG93LXNsaWRlc2hvdy1zZWxlY3Q+XHJcbjxzb2xpZC1zbGlkZXNob3dcclxuICAqbmdJZj1cIlNlbGVjdGVkU2xpZGVzaG93XCJcclxuICBbc2VsZWN0U2xpZGVzaG93XT1cIlNsaWRlc2hvdyB8IGFzeW5jXCJcclxuICAoYmFja0J1dHRvbkNsaWNrKT1cImdvQmFjaygpXCJcclxuPjwvc29saWQtc2xpZGVzaG93PlxyXG4iXX0=
