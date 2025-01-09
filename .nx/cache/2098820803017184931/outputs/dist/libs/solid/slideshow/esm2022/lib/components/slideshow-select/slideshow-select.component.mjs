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
import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Select } from '@ngxs/store';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { GetSlideshowSelect } from '../../state/slideshow-select.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesState } from '../../state/categories.state';
import { GetCategories } from '../../state/categories.actions';
import { SlideshowSelectState } from '../../state/slideshow-select.state';
import { SOLID_SLIDESHOW_APP_ROUTING_CONFIG } from '../../app-config';
import * as i0 from '@angular/core';
import * as i1 from '@angular/router';
import * as i2 from '@angular/common';
import * as i3 from '@angular/material/icon';
import * as i4 from '@angular/material/card';
import * as i5 from '@angular/material/button';
import * as i6 from '@angular/material/expansion';
export class SlideshowSelectComponent {
  routingConfig;
  route;
  router;
  $destroyed = new Subject();
  slideshow_select_container;
  Toolbar;
  Categories;
  SlideshowSelect;
  selectSlideshow = new EventEmitter();
  lastScrollTop = 0;
  toolbar_up = false;
  toolbar_down = false;
  hasOnlyOneCategory = false;
  category_name;
  step;
  constructor(routingConfig, route, router) {
    this.routingConfig = routingConfig;
    this.route = route;
    this.router = router;
  }
  ngOnInit() {
    this.GetSlideshowSelect();
    this.GetSlideshowCategories();
  }
  async GetSlideshowSelect() {
    return new GetSlideshowSelect();
  }
  GetSlideshowCategories() {
    return new GetCategories();
  }
  SelectSlideshow(slug, slideshowid, pageid) {
    this.selectSlideshow.emit({ slug, slideshowid, pageid });
    this.router.navigate([slug, slideshowid, pageid], {
      relativeTo: this.route,
    });
  }
  hideAndShowToolbar() {
    const delta = 5;
    const scrollTop = this.slideshow_select_container?.nativeElement.scrollTop;
    const toolbarHeight = this.Toolbar?.nativeElement.offsetHeight;
    if (Math.abs(this.lastScrollTop - scrollTop) <= delta) {
      return;
    }
    if (scrollTop > this.lastScrollTop && scrollTop > toolbarHeight) {
      // Scroll Down
      this.toolbar_down = false;
      this.toolbar_up = true;
    } else {
      // Scroll Up
      this.toolbar_up = false;
      this.toolbar_down = true;
    }
    this.lastScrollTop = scrollTop;
  }
  ngOnDestroy() {
    this.$destroyed.next(true);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SlideshowSelectComponent,
    deps: [
      { token: SOLID_SLIDESHOW_APP_ROUTING_CONFIG },
      { token: i1.ActivatedRoute },
      { token: i1.Router },
    ],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: SlideshowSelectComponent,
    selector: 'solid-slideshow-slideshow-select',
    outputs: { selectSlideshow: 'selectSlideshow' },
    viewQueries: [
      {
        propertyName: 'slideshow_select_container',
        first: true,
        predicate: ['slideshow_select_container'],
        descendants: true,
      },
      {
        propertyName: 'Toolbar',
        first: true,
        predicate: ['toolbar'],
        descendants: true,
      },
    ],
    ngImport: i0,
    template:
      '<div class="container">\r\n  <div class="back-button-toolbar">\r\n    <button mat-icon-button class="button-back" routerLink="">\r\n      <mat-icon>arrow_back</mat-icon>\r\n    </button>\r\n    <h2>{{ routingConfig.title }}</h2>\r\n  </div>\r\n  <div class="select-container">\r\n    <mat-accordion class="slideshow-select-container" multi>\r\n      <mat-expansion-panel\r\n        *ngFor="let category of Categories | async; let i = index"\r\n      >\r\n        <mat-expansion-panel-header>\r\n          <mat-panel-title> {{ category.name }} </mat-panel-title>\r\n        </mat-expansion-panel-header>\r\n        <div\r\n          *ngFor="let slideshowselect of SlideshowSelect | async"\r\n          class="mat-card-container"\r\n        >\r\n          <mat-card\r\n            *ngIf="slideshowselect.categories.includes(category.name)"\r\n            (click)="\r\n              SelectSlideshow(\r\n                category.slug,\r\n                slideshowselect.id,\r\n                slideshowselect.pages[0]\r\n              )\r\n            "\r\n          >\r\n            <div class="mat-card-child">\r\n              <img\r\n                class="slideshowImg"\r\n                [src]="\r\n                  slideshowselect.title_image\r\n                    ? slideshowselect.title_image.img.thumbnail\r\n                    : \'assets/icons/icon.svg\'\r\n                "\r\n                [alt]="\r\n                  slideshowselect.title_image\r\n                    ? slideshowselect.title_image.img_alt\r\n                    : \'Kein Bild vorhanden\'\r\n                "\r\n              />\r\n              <span class="slideshowTitle">{{ slideshowselect.title }}</span>\r\n            </div>\r\n          </mat-card>\r\n        </div>\r\n      </mat-expansion-panel>\r\n    </mat-accordion>\r\n  </div>\r\n</div>\r\n',
    styles: [
      ':host{display:block}.container{height:calc(100vh - 60px);overflow:hidden}.container .back-button-toolbar{background-color:#fff;box-shadow:0 4px 2px -2px #0003;min-height:56px;display:grid;grid-template-areas:"front middle last";grid-template-columns:40px auto 40px;place-items:center;padding:0 16px}.container .back-button-toolbar h2{margin-bottom:0}.container .select-container{height:calc(100% - 56px);overflow-y:auto;padding-top:.6rem;margin-top:3px}.slideshow-select-container ::ng-deep .mat-expansion-panel{border-radius:0!important;box-shadow:none;background:#fafafa}.slideshow-select-container ::ng-deep .mat-expansion-panel-header{height:40px;margin:0 7px}.slideshow-select-container ::ng-deep .mat-expansion-panel-header.mat-expanded{height:40px}.slideshow-select-container ::ng-deep .mat-expansion-panel-spacing{margin:0}.slideshow-select-container ::ng-deep .mat-expansion-panel-body{display:flex;flex-wrap:wrap;padding-top:16px}.slideshow-select-container ::ng-deep mat-expansion-panel:not(:last-child){margin-bottom:10px}.slideshow-select-container .mat-card-container{display:flex;justify-content:center;flex-wrap:wrap}.slideshow-select-container mat-card{width:170px;height:170px;border-radius:.25rem;cursor:pointer;transition:background-color .05s linear .05s;text-align:center;margin:.6rem;display:flex;justify-content:center}.slideshow-select-container mat-card .mat-card-child{margin-top:auto;margin-bottom:auto;display:flex;flex-direction:column;align-items:center}.slideshow-select-container mat-card .mat-card-child .slideshowImg{width:100px;height:100px}.slideshow-select-container mat-card:hover{cursor:pointer}@media (max-width: 500px){.slideshow-select-container mat-card{margin:.4rem}}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i2.NgForOf,
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
      },
      {
        kind: 'directive',
        type: i2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i1.RouterLink,
        selector: '[routerLink]',
        inputs: [
          'target',
          'queryParams',
          'fragment',
          'queryParamsHandling',
          'state',
          'relativeTo',
          'preserveFragment',
          'skipLocationChange',
          'replaceUrl',
          'routerLink',
        ],
      },
      {
        kind: 'component',
        type: i3.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'component',
        type: i4.MatCard,
        selector: 'mat-card',
        inputs: ['appearance'],
        exportAs: ['matCard'],
      },
      {
        kind: 'component',
        type: i5.MatIconButton,
        selector: 'button[mat-icon-button]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'directive',
        type: i6.MatAccordion,
        selector: 'mat-accordion',
        inputs: ['multi', 'hideToggle', 'displayMode', 'togglePosition'],
        exportAs: ['matAccordion'],
      },
      {
        kind: 'component',
        type: i6.MatExpansionPanel,
        selector: 'mat-expansion-panel',
        inputs: ['disabled', 'expanded', 'hideToggle', 'togglePosition'],
        outputs: [
          'opened',
          'closed',
          'expandedChange',
          'afterExpand',
          'afterCollapse',
        ],
        exportAs: ['matExpansionPanel'],
      },
      {
        kind: 'component',
        type: i6.MatExpansionPanelHeader,
        selector: 'mat-expansion-panel-header',
        inputs: ['tabIndex', 'expandedHeight', 'collapsedHeight'],
      },
      {
        kind: 'directive',
        type: i6.MatExpansionPanelTitle,
        selector: 'mat-panel-title',
      },
      { kind: 'pipe', type: i2.AsyncPipe, name: 'async' },
    ],
  });
}
__decorate(
  [
    Select(CategoriesState.getSlideshowCategoriesItems),
    __metadata('design:type', Observable),
  ],
  SlideshowSelectComponent.prototype,
  'Categories',
  void 0
);
__decorate(
  [
    Select(SlideshowSelectState.getSlideshowSelect),
    __metadata('design:type', Observable),
  ],
  SlideshowSelectComponent.prototype,
  'SlideshowSelect',
  void 0
);
__decorate(
  [
    Dispatch(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', Promise),
  ],
  SlideshowSelectComponent.prototype,
  'GetSlideshowSelect',
  null
);
__decorate(
  [
    Dispatch(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', void 0),
  ],
  SlideshowSelectComponent.prototype,
  'GetSlideshowCategories',
  null
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: SlideshowSelectComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-slideshow-slideshow-select',
          template:
            '<div class="container">\r\n  <div class="back-button-toolbar">\r\n    <button mat-icon-button class="button-back" routerLink="">\r\n      <mat-icon>arrow_back</mat-icon>\r\n    </button>\r\n    <h2>{{ routingConfig.title }}</h2>\r\n  </div>\r\n  <div class="select-container">\r\n    <mat-accordion class="slideshow-select-container" multi>\r\n      <mat-expansion-panel\r\n        *ngFor="let category of Categories | async; let i = index"\r\n      >\r\n        <mat-expansion-panel-header>\r\n          <mat-panel-title> {{ category.name }} </mat-panel-title>\r\n        </mat-expansion-panel-header>\r\n        <div\r\n          *ngFor="let slideshowselect of SlideshowSelect | async"\r\n          class="mat-card-container"\r\n        >\r\n          <mat-card\r\n            *ngIf="slideshowselect.categories.includes(category.name)"\r\n            (click)="\r\n              SelectSlideshow(\r\n                category.slug,\r\n                slideshowselect.id,\r\n                slideshowselect.pages[0]\r\n              )\r\n            "\r\n          >\r\n            <div class="mat-card-child">\r\n              <img\r\n                class="slideshowImg"\r\n                [src]="\r\n                  slideshowselect.title_image\r\n                    ? slideshowselect.title_image.img.thumbnail\r\n                    : \'assets/icons/icon.svg\'\r\n                "\r\n                [alt]="\r\n                  slideshowselect.title_image\r\n                    ? slideshowselect.title_image.img_alt\r\n                    : \'Kein Bild vorhanden\'\r\n                "\r\n              />\r\n              <span class="slideshowTitle">{{ slideshowselect.title }}</span>\r\n            </div>\r\n          </mat-card>\r\n        </div>\r\n      </mat-expansion-panel>\r\n    </mat-accordion>\r\n  </div>\r\n</div>\r\n',
          styles: [
            ':host{display:block}.container{height:calc(100vh - 60px);overflow:hidden}.container .back-button-toolbar{background-color:#fff;box-shadow:0 4px 2px -2px #0003;min-height:56px;display:grid;grid-template-areas:"front middle last";grid-template-columns:40px auto 40px;place-items:center;padding:0 16px}.container .back-button-toolbar h2{margin-bottom:0}.container .select-container{height:calc(100% - 56px);overflow-y:auto;padding-top:.6rem;margin-top:3px}.slideshow-select-container ::ng-deep .mat-expansion-panel{border-radius:0!important;box-shadow:none;background:#fafafa}.slideshow-select-container ::ng-deep .mat-expansion-panel-header{height:40px;margin:0 7px}.slideshow-select-container ::ng-deep .mat-expansion-panel-header.mat-expanded{height:40px}.slideshow-select-container ::ng-deep .mat-expansion-panel-spacing{margin:0}.slideshow-select-container ::ng-deep .mat-expansion-panel-body{display:flex;flex-wrap:wrap;padding-top:16px}.slideshow-select-container ::ng-deep mat-expansion-panel:not(:last-child){margin-bottom:10px}.slideshow-select-container .mat-card-container{display:flex;justify-content:center;flex-wrap:wrap}.slideshow-select-container mat-card{width:170px;height:170px;border-radius:.25rem;cursor:pointer;transition:background-color .05s linear .05s;text-align:center;margin:.6rem;display:flex;justify-content:center}.slideshow-select-container mat-card .mat-card-child{margin-top:auto;margin-bottom:auto;display:flex;flex-direction:column;align-items:center}.slideshow-select-container mat-card .mat-card-child .slideshowImg{width:100px;height:100px}.slideshow-select-container mat-card:hover{cursor:pointer}@media (max-width: 500px){.slideshow-select-container mat-card{margin:.4rem}}\n',
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
      { type: i1.ActivatedRoute },
      { type: i1.Router },
    ];
  },
  propDecorators: {
    slideshow_select_container: [
      {
        type: ViewChild,
        args: ['slideshow_select_container'],
      },
    ],
    Toolbar: [
      {
        type: ViewChild,
        args: ['toolbar'],
      },
    ],
    Categories: [],
    SlideshowSelect: [],
    selectSlideshow: [
      {
        type: Output,
      },
    ],
    GetSlideshowSelect: [],
    GetSlideshowCategories: [],
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVzaG93LXNlbGVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3NsaWRlc2hvdy9zcmMvbGliL2NvbXBvbmVudHMvc2xpZGVzaG93LXNlbGVjdC9zbGlkZXNob3ctc2VsZWN0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvc2xpZGVzaG93L3NyYy9saWIvY29tcG9uZW50cy9zbGlkZXNob3ctc2VsZWN0L3NsaWRlc2hvdy1zZWxlY3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFHTixNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDckMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRS9ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMvRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0NBQWtDLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7Ozs7QUFRdEUsTUFBTSxPQUFPLHdCQUF3QjtJQW9Ca0I7SUFDM0M7SUFDQTtJQXJCRixVQUFVLEdB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MEJBQTBCO3NCQURoQyxTQUFTO3VCQUFDLDRCQUE0QjtnQkFFVixPQUFPO3NCQUFuQyxTQUFTO3VCQUFDLFNBQVM7Z0JBRWIsVUFBVSxNQUVWLGVBQWUsTUFDWixlQUFlO3NCQUF4QixNQUFNO2dCQXFCTyxrQkFBa0IsTUFLeEIsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSW5qZWN0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdDaGlsZCxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBTZWxlY3QgfSBmcm9tICdAbmd4cy9zdG9yZSc7XHJcbmltcG9ydCB7IERpc3BhdGNoIH0gZnJvbSAnQG5neHMtbGFicy9kaXNwYXRjaC1kZWNvcmF0b3InO1xyXG5pbXBvcnQgeyBHZXRTbGlkZXNob3dTZWxlY3QgfSBmcm9tICcuLi8uLi9zdGF0ZS9zbGlkZXNob3ctc2VsZWN0LmFjdGlvbnMnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgQ2F0ZWdvcmllc1N0YXRlIH0gZnJvbSAnLi4vLi4vc3RhdGUvY2F0ZWdvcmllcy5zdGF0ZSc7XHJcbmltcG9ydCB7IFNsaWRlc2hvd0NhdGVnb3J5IH0gZnJvbSAnLi4vLi4vc3RhdGUvY2F0ZWdvcmllcy5tb2RlbCc7XHJcbmltcG9ydCB7IEdldENhdGVnb3JpZXMgfSBmcm9tICcuLi8uLi9zdGF0ZS9jYXRlZ29yaWVzLmFjdGlvbnMnO1xyXG5pbXBvcnQgeyBTbGlkZXNob3dTZWxlY3RTdGF0ZSB9IGZyb20gJy4uLy4uL3N0YXRlL3NsaWRlc2hvdy1zZWxlY3Quc3RhdGUnO1xyXG5pbXBvcnQgeyBTT0xJRF9TTElERVNIT1dfQVBQX1JPVVRJTkdfQ09ORklHIH0gZnJvbSAnLi4vLi4vYXBwLWNvbmZpZyc7XHJcbmltcG9ydCB7IFNsaWRlc2hvd1NlbGVjdEFwaSB9IGZyb20gJy4uLy4uL3N0YXRlL3NsaWRlc2hvdy1zZWxlY3QubW9kZWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzb2xpZC1zbGlkZXNob3ctc2xpZGVzaG93LXNlbGVjdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NsaWRlc2hvdy1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NsaWRlc2hvdy1zZWxlY3QuY29tcG9uZW50LnNjc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFNsaWRlc2hvd1NlbGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICBwcml2YXRlICRkZXN0cm95ZWQgPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICBAVmlld0NoaWxkKCdzbGlkZXNob3dfc2VsZWN0X2NvbnRhaW5lcicpXHJcbiAgcHVibGljIHNsaWRlc2hvd19zZWxlY3RfY29udGFpbmVyPzogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCd0b29sYmFyJykgcHVibGljIFRvb2xiYXI/OiBFbGVtZW50UmVmO1xyXG4gIEBTZWxlY3QoQ2F0ZWdvcmllc1N0YXRlLmdldFNsaWRlc2hvd0NhdGVnb3JpZXNJdGVtcylcclxuICBwdWJsaWMgQ2F0ZWdvcmllcyE6IE9ic2VydmFibGU8U2xpZGVzaG93Q2F0ZWdvcnlbXT47XHJcbiAgQFNlbGVjdChTbGlkZXNob3dTZWxlY3RTdGF0ZS5nZXRTbGlkZXNob3dTZWxlY3QpXHJcbiAgcHVibGljIFNsaWRlc2hvd1NlbGVjdCE6IE9ic2VydmFibGU8U2xpZGVzaG93U2VsZWN0QXBpW10+O1xyXG4gIEBPdXRwdXQoKSBzZWxlY3RTbGlkZXNob3cgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgcHVibGljIGxhc3RTY3JvbGxUb3AgPSAwO1xyXG4gIHB1YmxpYyB0b29sYmFyX3VwID0gZmFsc2U7XHJcbiAgcHVibGljIHRvb2xiYXJfZG93biA9IGZhbHNlO1xyXG4gIHB1YmxpYyBoYXNPbmx5T25lQ2F0ZWdvcnkgPSBmYWxzZTtcclxuICBwdWJsaWMgY2F0ZWdvcnlfbmFtZT86IHN0cmluZztcclxuICBwdWJsaWMgc3RlcD86IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KFNPTElEX1NMSURFU0hPV19BUFBfUk9VVElOR19DT05GSUcpIHB1YmxpYyByb3V0aW5nQ29uZmlnOiBhbnksXHJcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXJcclxuICApIHt9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5HZXRTbGlkZXNob3dTZWxlY3QoKTtcclxuICAgIHRoaXMuR2V0U2xpZGVzaG93Q2F0ZWdvcmllcygpO1xyXG4gIH1cclxuXHJcbiAgQERpc3BhdGNoKClcclxuICBwcml2YXRlIGFzeW5jIEdldFNsaWRlc2hvd1NlbGVjdCgpIHtcclxuICAgIHJldHVybiBuZXcgR2V0U2xpZGVzaG93U2VsZWN0KCk7XHJcbiAgfVxyXG5cclxuICBARGlzcGF0Y2goKVxyXG4gIHByaXZhdGUgR2V0U2xpZGVzaG93Q2F0ZWdvcmllcygpIHtcclxuICAgIHJldHVybiBuZXcgR2V0Q2F0ZWdvcmllcygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIFNlbGVjdFNsaWRlc2hvdyhzbHVnOiBzdHJpbmcsIHNsaWRlc2hvd2lkOiBudW1iZXIsIHBhZ2VpZDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLnNlbGVjdFNsaWRlc2hvdy5lbWl0KHsgc2x1Zywgc2xpZGVzaG93aWQsIHBhZ2VpZCB9KTtcclxuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtzbHVnLCBzbGlkZXNob3dpZCwgcGFnZWlkXSwge1xyXG4gICAgICByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGlkZUFuZFNob3dUb29sYmFyKCkge1xyXG4gICAgY29uc3QgZGVsdGEgPSA1O1xyXG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gdGhpcy5zbGlkZXNob3dfc2VsZWN0X2NvbnRhaW5lcj8ubmF0aXZlRWxlbWVudC5zY3JvbGxUb3A7XHJcbiAgICBjb25zdCB0b29sYmFySGVpZ2h0ID0gdGhpcy5Ub29sYmFyPy5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgIGlmIChNYXRoLmFicyh0aGlzLmxhc3RTY3JvbGxUb3AgLSBzY3JvbGxUb3ApIDw9IGRlbHRhKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc2Nyb2xsVG9wID4gdGhpcy5sYXN0U2Nyb2xsVG9wICYmIHNjcm9sbFRvcCA+IHRvb2xiYXJIZWlnaHQpIHtcclxuICAgICAgLy8gU2Nyb2xsIERvd25cclxuICAgICAgdGhpcy50b29sYmFyX2Rvd24gPSBmYWxzZTtcclxuICAgICAgdGhpcy50b29sYmFyX3VwID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFNjcm9sbCBVcFxyXG4gICAgICB0aGlzLnRvb2xiYXJfdXAgPSBmYWxzZTtcclxuICAgICAgdGhpcy50b29sYmFyX2Rvd24gPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5sYXN0U2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLiRkZXN0cm95ZWQubmV4dCh0cnVlKTtcclxuICB9XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gIDxkaXYgY2xhc3M9XCJiYWNrLWJ1dHRvbi10b29sYmFyXCI+XHJcbiAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBjbGFzcz1cImJ1dHRvbi1iYWNrXCIgcm91dGVyTGluaz1cIlwiPlxyXG4gICAgICA8bWF0LWljb24+YXJyb3dfYmFjazwvbWF0LWljb24+XHJcbiAgICA8L2J1dHRvbj5cclxuICAgIDxoMj57eyByb3V0aW5nQ29uZmlnLnRpdGxlIH19PC9oMj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwic2VsZWN0LWNvbnRhaW5lclwiPlxyXG4gICAgPG1hdC1hY2NvcmRpb24gY2xhc3M9XCJzbGlkZXNob3ctc2VsZWN0LWNvbnRhaW5lclwiIG11bHRpPlxyXG4gICAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbFxyXG4gICAgICAgICpuZ0Zvcj1cImxldCBjYXRlZ29yeSBvZiBDYXRlZ29yaWVzIHwgYXN5bmM7IGxldCBpID0gaW5kZXhcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPG1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxyXG4gICAgICAgICAgPG1hdC1wYW5lbC10aXRsZT4ge3sgY2F0ZWdvcnkubmFtZSB9fSA8L21hdC1wYW5lbC10aXRsZT5cclxuICAgICAgICA8L21hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgICpuZ0Zvcj1cImxldCBzbGlkZXNob3dzZWxlY3Qgb2YgU2xpZGVzaG93U2VsZWN0IHwgYXN5bmNcIlxyXG4gICAgICAgICAgY2xhc3M9XCJtYXQtY2FyZC1jb250YWluZXJcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxtYXQtY2FyZFxyXG4gICAgICAgICAgICAqbmdJZj1cInNsaWRlc2hvd3NlbGVjdC5jYXRlZ29yaWVzLmluY2x1ZGVzKGNhdGVnb3J5Lm5hbWUpXCJcclxuICAgICAgICAgICAgKGNsaWNrKT1cIlxyXG4gICAgICAgICAgICAgIFNlbGVjdFNsaWRlc2hvdyhcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5LnNsdWcsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXNob3dzZWxlY3QuaWQsXHJcbiAgICAgICAgICAgICAgICBzbGlkZXNob3dzZWxlY3QucGFnZXNbMF1cclxuICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgIFwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXQtY2FyZC1jaGlsZFwiPlxyXG4gICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgIGNsYXNzPVwic2xpZGVzaG93SW1nXCJcclxuICAgICAgICAgICAgICAgIFtzcmNdPVwiXHJcbiAgICAgICAgICAgICAgICAgIHNsaWRlc2hvd3NlbGVjdC50aXRsZV9pbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgID8gc2xpZGVzaG93c2VsZWN0LnRpdGxlX2ltYWdlLmltZy50aHVtYm5haWxcclxuICAgICAgICAgICAgICAgICAgICA6ICdhc3NldHMvaWNvbnMvaWNvbi5zdmcnXHJcbiAgICAgICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICAgICAgW2FsdF09XCJcclxuICAgICAgICAgICAgICAgICAgc2xpZGVzaG93c2VsZWN0LnRpdGxlX2ltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgPyBzbGlkZXNob3dzZWxlY3QudGl0bGVfaW1hZ2UuaW1nX2FsdFxyXG4gICAgICAgICAgICAgICAgICAgIDogJ0tlaW4gQmlsZCB2b3JoYW5kZW4nXHJcbiAgICAgICAgICAgICAgICBcIlxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzbGlkZXNob3dUaXRsZVwiPnt7IHNsaWRlc2hvd3NlbGVjdC50aXRsZSB9fTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L21hdC1jYXJkPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L21hdC1leHBhbnNpb24tcGFuZWw+XHJcbiAgICA8L21hdC1hY2NvcmRpb24+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=
