import * as i0 from '@angular/core';
import {
  InjectionToken,
  EventEmitter,
  Component,
  Inject,
  ViewChild,
  Output,
  Input,
  HostListener,
  Injectable,
  NgModule,
} from '@angular/core';
import * as i4 from '@zentrumnawi/solid-core';
import {
  ImageModel,
  SOLID_CORE_CONFIG,
  SolidCoreModule,
} from '@zentrumnawi/solid-core';
import * as i5 from '@angular/material/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { Subject, Observable } from 'rxjs';
import * as i1 from '@angular/cdk/layout';
import * as i2 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i3 from '@angular/common';
import * as i6 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i7 from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import * as i8 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i9 from '@angular/material/progress-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import * as i1$2 from '@ngxs/store';
import { Action, Selector, State, Select, NgxsModule } from '@ngxs/store';
import * as i1$1 from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { map, tap, takeUntil } from 'rxjs/operators';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Navigate } from '@ngxs/router-plugin';
import * as i6$1 from '@angular/material/expansion';
import { MatExpansionModule } from '@angular/material/expansion';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

const SOLID_SLIDESHOW_APP_ROUTING_CONFIG = new InjectionToken(
  'solid-slideshow-app-routing-config'
);

var KEY;
(function (KEY) {
  KEY['RIGHT_ARROW'] = 'ArrowRight';
  KEY['LEFT_ARROW'] = 'ArrowLeft';
})(KEY || (KEY = {}));
class SlideshowComponent {
  _breakpointObserver;
  routingConfig;
  cdr;
  route;
  router;
  $destroyed = new Subject();
  Stepper;
  Toolbar;
  Navigation;
  slideshow_container;
  backButtonClick = new EventEmitter();
  slideshow;
  page_index = 0;
  isMobile = false;
  lastScrollTop = 0;
  toolbar_up = false;
  toolbar_down = false;
  slideshowCount;
  slideshowid;
  slideshowPageid;
  set selectSlideshow(slideshow) {
    this.slideshow = slideshow;
    if (slideshow) {
      setTimeout(() => {
        if (this.Stepper) {
          const pagePosition = this.slideshow?.pages.findIndex(
            (page) => page.id === Number.parseInt(this.slideshowPageid)
          );
          if (pagePosition !== -1) {
            this.Stepper.selectedIndex = pagePosition;
            this.page_index = this.Stepper.selectedIndex;
          }
        }
      }, 0);
    }
  }
  constructor(_breakpointObserver, routingConfig, cdr, route, router) {
    this._breakpointObserver = _breakpointObserver;
    this.routingConfig = routingConfig;
    this.cdr = cdr;
    this.route = route;
    this.router = router;
  }
  ngOnInit() {
    this.slideshowPageid =
      this.route.firstChild?.snapshot.params['slideshowPageId'];
    this._breakpointObserver
      .observe(['(max-width: 450px)'])
      .subscribe((isMobile) => {
        if (isMobile.matches) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }
  goBack() {
    this.backButtonClick.emit();
  }
  keyEvent(event) {
    if (event.key === KEY.LEFT_ARROW) {
      this.onPrevStepClick();
    } else if (event.key === KEY.RIGHT_ARROW) {
      this.onNextStepClick();
    }
  }
  onPrevStepClick() {
    if (this.Stepper) {
      this.Stepper.previous();
      this.page_index = this.Stepper.selectedIndex;
      this.scrollToTop();
      this.router.navigate(
        [`../${this.slideshow?.pages[this.page_index].id}`],
        { relativeTo: this.route.firstChild }
      );
    }
  }
  onNextStepClick() {
    if (this.Stepper) {
      this.Stepper.next();
      this.page_index = this.Stepper.selectedIndex;
      this.scrollToTop();
      this.router.navigate(
        [`../${this.slideshow?.pages[this.page_index].id}`],
        { relativeTo: this.route.firstChild }
      );
    }
  }
  onPanEnd($event) {
    if ($event.deltaX > 100) {
      this.onPrevStepClick();
    } else if ($event.deltaX < -100) {
      this.onNextStepClick();
    }
  }
  hideAndShowToolbar() {
    const delta = 5;
    const scrollTop = this.slideshow_container?.nativeElement.scrollTop;
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
  scrollToTop() {
    const slideshowContainer = this.slideshow_container;
    if (!slideshowContainer) {
      return;
    }
    slideshowContainer.nativeElement.scrollTop = 0;
  }
  ngOnDestroy() {
    this.$destroyed.next(true);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SlideshowComponent,
    deps: [
      { token: i1.BreakpointObserver },
      { token: SOLID_SLIDESHOW_APP_ROUTING_CONFIG },
      { token: i0.ChangeDetectorRef },
      { token: i2.ActivatedRoute },
      { token: i2.Router },
    ],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: SlideshowComponent,
    selector: 'solid-slideshow',
    inputs: { selectSlideshow: 'selectSlideshow' },
    outputs: { backButtonClick: 'backButtonClick' },
    host: { listeners: { 'window:keyup': 'keyEvent($event)' } },
    viewQueries: [
      {
        propertyName: 'Stepper',
        first: true,
        predicate: ['stepper'],
        descendants: true,
      },
      {
        propertyName: 'Toolbar',
        first: true,
        predicate: ['toolbar'],
        descendants: true,
      },
      {
        propertyName: 'Navigation',
        first: true,
        predicate: ['navigation'],
        descendants: true,
      },
      {
        propertyName: 'slideshow_container',
        first: true,
        predicate: ['slideshow_container'],
        descendants: true,
      },
    ],
    ngImport: i0,
    template:
      '<div class="slideshow-container">\r\n  <!-- Slideshow toolbar for big screen version -->\r\n  <div class="toolbar-container" *ngIf="!isMobile && slideshow" #toolbar>\r\n    <div class="toolbar">\r\n      <button mat-icon-button class="button-back" (click)="goBack()">\r\n        <mat-icon>arrow_back</mat-icon>\r\n      </button>\r\n      <div class="step-actions">\r\n        <button\r\n          [disabled]="page_index === 0"\r\n          mat-icon-button\r\n          class="button-left"\r\n          (click)="onPrevStepClick()"\r\n        >\r\n          <mat-icon aria-label="Vorheriger Schritt">navigate_before</mat-icon>\r\n        </button>\r\n        <div class="title">\r\n          <h2>{{ slideshow.title }}</h2>\r\n          <span>\r\n            {{ slideshow.pages[page_index].title }} ({{ page_index + 1 }}/{{\r\n              slideshow.pages.length\r\n            }})\r\n          </span>\r\n        </div>\r\n        <button\r\n          [disabled]="page_index + 1 === slideshow.pages.length"\r\n          (click)="onNextStepClick()"\r\n          class="button-right"\r\n          mat-icon-button\r\n        >\r\n          <mat-icon aria-label="N\u00E4chster Schritt">navigate_next</mat-icon>\r\n        </button>\r\n      </div>\r\n    </div>\r\n    <mat-progress-bar\r\n      mode="determinate"\r\n      value="{{ ((page_index + 1) / slideshow.pages.length) * 100 }}"\r\n    ></mat-progress-bar>\r\n  </div>\r\n\r\n  <!-- Slideshow toolbar for Mobile version -->\r\n  <div\r\n    class="back-button-toolbar-container"\r\n    *ngIf="isMobile && slideshow"\r\n    [class.nav-up]="toolbar_up"\r\n    [class.nav-down]="toolbar_down"\r\n    #toolbar\r\n  >\r\n    <div class="back-button-toolbar">\r\n      <button mat-icon-button class="button-back" (click)="goBack()">\r\n        <mat-icon>arrow_back</mat-icon>\r\n      </button>\r\n      <h2>{{ slideshow.title }}</h2>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Slideshow content for 2 versions -->\r\n  <div\r\n    class="slideshow-content-container"\r\n    (scroll)="hideAndShowToolbar()"\r\n    [style.max-height]="\r\n      \'calc(100% - \' + Navigation?.nativeElement.offsetHeight + \'px)\'\r\n    "\r\n    #slideshow_container\r\n  >\r\n    <mat-horizontal-stepper\r\n      #stepper\r\n      (panend)="onPanEnd($event)"\r\n      *ngIf="slideshow"\r\n      labelPosition="bottom"\r\n      linear="false"\r\n    >\r\n      <mat-step\r\n        *ngFor="let page of slideshow.pages"\r\n        [label]="page.title"\r\n        [state]="slideshow.pages.length >= page_index + 1 ? \'done\' : \'\'"\r\n      >\r\n        <div\r\n          *ngIf="isMobile"\r\n          [style.height]="Toolbar?.nativeElement.offsetHeight - 6 + \'px\'"\r\n        ></div>\r\n        <div [data]="page.text" markdown></div>\r\n        <div class="page-images">\r\n          <div\r\n            [class.equal1Image]="page.images.length === 1"\r\n            [class.lessThan3Images]="page.images.length < 3"\r\n            [class.greaterEqual3Images]="page.images.length >= 3"\r\n          >\r\n            <ng-container *ngFor="let img of page.images">\r\n              <mat-card *ngIf="img.image">\r\n                <mat-card-header>\r\n                  <mat-card-title>{{ img.title }}</mat-card-title>\r\n                </mat-card-header>\r\n                <mat-card-content>\r\n                  <solid-core-media\r\n                    [image]="img.img"\r\n                    [hasDialog]="true"\r\n                    [hasAttributions]="true"\r\n                    [name]="img.title"\r\n                    [slideshowPageChanged]="page_index + 1"\r\n                  ></solid-core-media>\r\n                  <p markdown class="caption" [data]="img.caption"></p>\r\n                </mat-card-content>\r\n              </mat-card>\r\n            </ng-container>\r\n          </div>\r\n        </div>\r\n      </mat-step>\r\n    </mat-horizontal-stepper>\r\n  </div>\r\n\r\n  <!-- Slideshow lower toolbar for Mobile version -->\r\n  <div\r\n    class="navigation-toolbar-container"\r\n    *ngIf="isMobile && slideshow"\r\n    #navigation\r\n  >\r\n    <mat-progress-bar\r\n      mode="determinate"\r\n      value="{{ ((page_index + 1) / slideshow.pages.length) * 100 }}"\r\n    ></mat-progress-bar>\r\n    <div #toolbar class="navigation-toolbar">\r\n      <button\r\n        [disabled]="page_index === 0"\r\n        mat-icon-button\r\n        class="button-left"\r\n        (click)="onPrevStepClick()"\r\n      >\r\n        <mat-icon aria-label="Vorheriger Schritt">navigate_before</mat-icon>\r\n      </button>\r\n      <span>\r\n        {{ slideshow.pages[page_index].title }} ({{ page_index + 1 }}/{{\r\n          slideshow.pages.length\r\n        }})\r\n      </span>\r\n      <button\r\n        [disabled]="page_index + 1 === slideshow.pages.length"\r\n        (click)="onNextStepClick()"\r\n        class="button-right"\r\n        mat-icon-button\r\n      >\r\n        <mat-icon aria-label="N\u00E4chster Schritt">navigate_next</mat-icon>\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n',
    styles: [
      '.slideshow-container{display:flex;flex-direction:column;height:100%}.slideshow-container .slideshow-content-container{overflow:auto}.toolbar{width:100%;position:relative;min-height:52px}.toolbar .button-back{position:absolute;left:16px;top:50%;transform:translateY(-45%)}.toolbar .step-actions{max-width:530px;display:grid;grid-template-areas:"previous header next";grid-template-columns:40px auto 40px;margin-left:auto;margin-right:auto;align-items:center}@media (min-width: 451px) and (max-width: 530px){.toolbar .step-actions{max-width:350px}}@media (min-width: 531px) and (max-width: 645px){.toolbar .step-actions{max-width:400px}}@media (min-width: 646px) and (max-width: 700px){.toolbar .step-actions{max-width:500px}}.toolbar .button-left{grid-area:previous}.toolbar .button-right{grid-area:next}.toolbar .title{display:flex;flex-direction:column;text-align:center;grid-area:header}.toolbar .title h2{margin-bottom:-2px}.toolbar .title span{margin-bottom:0}::ng-deep div.mat-horizontal-stepper-header-container{display:none}::ng-deep .mat-horizontal-content-container{padding-top:24px!important}::ng-deep .md-rendered ul,::ng-deep .md-rendered li{margin-bottom:.5em;margin-left:.5em;padding-left:.25em}::ng-deep .md-rendered ol,::ng-deep .md-rendered li{margin-top:.5em;padding-left:.5em}div.page-images div.greaterEqual3Images{display:grid;grid-template-columns:1fr 1fr}@media (max-width: 800px){div.page-images div.greaterEqual3Images{grid-template-columns:1fr}}@media (min-width: 1000px) and (max-width: 1199px){div.page-images div.greaterEqual3Images{grid-template-columns:1fr}}@media (min-width: 1200px) and (max-width: 1399px){div.page-images div.greaterEqual3Images{grid-template-columns:1fr 1fr}}@media (min-width: 1400px){div.page-images div.greaterEqual3Images{grid-template-columns:1fr 1fr 1fr}}div.page-images div.lessThan3Images{display:grid;grid-template-columns:1fr 1fr}@media (max-width: 800px){div.page-images div.lessThan3Images{grid-template-columns:1fr}}@media (min-width: 1000px) and (max-width: 1199px){div.page-images div.lessThan3Images{grid-template-columns:1fr}}@media (min-width: 1200px){div.page-images div.lessThan3Images{grid-template-columns:1fr 1fr}}div.page-images div.equal1Image{display:flex;justify-content:center}@media (min-width: 801px){div.page-images div.equal1Image mat-card{width:50%}}@media (min-width: 1000px) and (max-width: 1199px){div.page-images div.equal1Image mat-card{width:100%}}div.page-images mat-card{min-width:200px;margin:1em}div.page-images mat-card mat-card-header ::ng-deep div.mat-card-header-text{margin:0}div.page-images mat-card mat-card-header mat-card-title{font-size:16px}div.page-images mat-card mat-card-content{height:calc(100% - 32px);position:relative}div.page-images mat-card solid-core-media ::ng-deep solid-core-media-detail{all:unset}div.page-images mat-card solid-core-media ::ng-deep solid-core-media-toolbar{position:absolute!important;bottom:-.9em!important;right:-1.2em!important}div.page-images mat-card .caption{margin-top:.75em;margin-right:40px}.toolbar-container{left:300px;z-index:2;background-color:#fff;box-shadow:0 4px 2px -2px #0003;transition:top .7s ease-in-out;margin-bottom:3px}.nav-up{top:-30px}.nav-down{top:60px}.back-button-toolbar-container{width:100%;position:fixed;z-index:2;background-color:#fff;box-shadow:0 4px 2px -2px #0003;transition:top .7s ease-in-out}.back-button-toolbar-container .back-button-toolbar{display:grid;grid-template-areas:"front middle last";grid-template-columns:40px auto 40px;padding:0 16px;min-height:56px}.back-button-toolbar-container .back-button-toolbar button{grid-area:front;align-self:center;justify-self:end}.back-button-toolbar-container .back-button-toolbar h2{grid-area:middle;justify-self:center;align-self:center;margin-bottom:0;text-align:center}.navigation-toolbar-container{width:100%;position:fixed;bottom:0;z-index:2;background-color:#fff;box-shadow:0 -3px 2px -2px #0003}.navigation-toolbar-container .navigation-toolbar{padding-top:0;display:grid;grid-template-areas:"previous title next";width:100%;grid-template-columns:45px auto 45px;align-items:center}.navigation-toolbar-container .navigation-toolbar .button-left{grid-area:previous;justify-self:end}.navigation-toolbar-container .navigation-toolbar .button-right{grid-area:next;justify-self:start}.navigation-toolbar-container .navigation-toolbar span{justify-self:center;text-align:center}mat-progress-bar ::ng-deep .mat-progress-bar-buffer{background-color:#fff}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i3.NgForOf,
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
      },
      {
        kind: 'directive',
        type: i3.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'component',
        type: i4.MarkdownComponent,
        selector: '[markdown]',
        inputs: ['inline', 'data', 'appendData'],
      },
      {
        kind: 'component',
        type: i4.MediaComponent,
        selector: 'solid-core-media',
        inputs: [
          'image',
          'mediaObject',
          'hasDialog',
          'hasAttributions',
          'name',
          'view',
          'hasAudio',
          'hasControlPanel',
          'hasDescription',
          'hasDescriptionToggle',
          'slideshowPageChanged',
          'hasNavigationInDialog',
        ],
        outputs: ['NextDialogEmitter', 'PrevDialogEmitter'],
      },
      {
        kind: 'component',
        type: i5.MatStep,
        selector: 'mat-step',
        inputs: ['color'],
        exportAs: ['matStep'],
      },
      {
        kind: 'component',
        type: i5.MatStepper,
        selector:
          'mat-stepper, mat-vertical-stepper, mat-horizontal-stepper, [matStepper]',
        inputs: [
          'selectedIndex',
          'disableRipple',
          'color',
          'labelPosition',
          'headerPosition',
          'animationDuration',
        ],
        outputs: ['animationDone'],
        exportAs: ['matStepper', 'matVerticalStepper', 'matHorizontalStepper'],
      },
      {
        kind: 'component',
        type: i6.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'component',
        type: i7.MatCard,
        selector: 'mat-card',
        inputs: ['appearance'],
        exportAs: ['matCard'],
      },
      {
        kind: 'directive',
        type: i7.MatCardContent,
        selector: 'mat-card-content',
      },
      {
        kind: 'component',
        type: i7.MatCardHeader,
        selector: 'mat-card-header',
      },
      {
        kind: 'directive',
        type: i7.MatCardTitle,
        selector: 'mat-card-title, [mat-card-title], [matCardTitle]',
      },
      {
        kind: 'component',
        type: i8.MatIconButton,
        selector: 'button[mat-icon-button]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'component',
        type: i9.MatProgressBar,
        selector: 'mat-progress-bar',
        inputs: ['color', 'value', 'bufferValue', 'mode'],
        outputs: ['animationEnd'],
        exportAs: ['matProgressBar'],
      },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: SlideshowComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-slideshow',
          template:
            '<div class="slideshow-container">\r\n  <!-- Slideshow toolbar for big screen version -->\r\n  <div class="toolbar-container" *ngIf="!isMobile && slideshow" #toolbar>\r\n    <div class="toolbar">\r\n      <button mat-icon-button class="button-back" (click)="goBack()">\r\n        <mat-icon>arrow_back</mat-icon>\r\n      </button>\r\n      <div class="step-actions">\r\n        <button\r\n          [disabled]="page_index === 0"\r\n          mat-icon-button\r\n          class="button-left"\r\n          (click)="onPrevStepClick()"\r\n        >\r\n          <mat-icon aria-label="Vorheriger Schritt">navigate_before</mat-icon>\r\n        </button>\r\n        <div class="title">\r\n          <h2>{{ slideshow.title }}</h2>\r\n          <span>\r\n            {{ slideshow.pages[page_index].title }} ({{ page_index + 1 }}/{{\r\n              slideshow.pages.length\r\n            }})\r\n          </span>\r\n        </div>\r\n        <button\r\n          [disabled]="page_index + 1 === slideshow.pages.length"\r\n          (click)="onNextStepClick()"\r\n          class="button-right"\r\n          mat-icon-button\r\n        >\r\n          <mat-icon aria-label="N\u00E4chster Schritt">navigate_next</mat-icon>\r\n        </button>\r\n      </div>\r\n    </div>\r\n    <mat-progress-bar\r\n      mode="determinate"\r\n      value="{{ ((page_index + 1) / slideshow.pages.length) * 100 }}"\r\n    ></mat-progress-bar>\r\n  </div>\r\n\r\n  <!-- Slideshow toolbar for Mobile version -->\r\n  <div\r\n    class="back-button-toolbar-container"\r\n    *ngIf="isMobile && slideshow"\r\n    [class.nav-up]="toolbar_up"\r\n    [class.nav-down]="toolbar_down"\r\n    #toolbar\r\n  >\r\n    <div class="back-button-toolbar">\r\n      <button mat-icon-button class="button-back" (click)="goBack()">\r\n        <mat-icon>arrow_back</mat-icon>\r\n      </button>\r\n      <h2>{{ slideshow.title }}</h2>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Slideshow content for 2 versions -->\r\n  <div\r\n    class="slideshow-content-container"\r\n    (scroll)="hideAndShowToolbar()"\r\n    [style.max-height]="\r\n      \'calc(100% - \' + Navigation?.nativeElement.offsetHeight + \'px)\'\r\n    "\r\n    #slideshow_container\r\n  >\r\n    <mat-horizontal-stepper\r\n      #stepper\r\n      (panend)="onPanEnd($event)"\r\n      *ngIf="slideshow"\r\n      labelPosition="bottom"\r\n      linear="false"\r\n    >\r\n      <mat-step\r\n        *ngFor="let page of slideshow.pages"\r\n        [label]="page.title"\r\n        [state]="slideshow.pages.length >= page_index + 1 ? \'done\' : \'\'"\r\n      >\r\n        <div\r\n          *ngIf="isMobile"\r\n          [style.height]="Toolbar?.nativeElement.offsetHeight - 6 + \'px\'"\r\n        ></div>\r\n        <div [data]="page.text" markdown></div>\r\n        <div class="page-images">\r\n          <div\r\n            [class.equal1Image]="page.images.length === 1"\r\n            [class.lessThan3Images]="page.images.length < 3"\r\n            [class.greaterEqual3Images]="page.images.length >= 3"\r\n          >\r\n            <ng-container *ngFor="let img of page.images">\r\n              <mat-card *ngIf="img.image">\r\n                <mat-card-header>\r\n                  <mat-card-title>{{ img.title }}</mat-card-title>\r\n                </mat-card-header>\r\n                <mat-card-content>\r\n                  <solid-core-media\r\n                    [image]="img.img"\r\n                    [hasDialog]="true"\r\n                    [hasAttributions]="true"\r\n                    [name]="img.title"\r\n                    [slideshowPageChanged]="page_index + 1"\r\n                  ></solid-core-media>\r\n                  <p markdown class="caption" [data]="img.caption"></p>\r\n                </mat-card-content>\r\n              </mat-card>\r\n            </ng-container>\r\n          </div>\r\n        </div>\r\n      </mat-step>\r\n    </mat-horizontal-stepper>\r\n  </div>\r\n\r\n  <!-- Slideshow lower toolbar for Mobile version -->\r\n  <div\r\n    class="navigation-toolbar-container"\r\n    *ngIf="isMobile && slideshow"\r\n    #navigation\r\n  >\r\n    <mat-progress-bar\r\n      mode="determinate"\r\n      value="{{ ((page_index + 1) / slideshow.pages.length) * 100 }}"\r\n    ></mat-progress-bar>\r\n    <div #toolbar class="navigation-toolbar">\r\n      <button\r\n        [disabled]="page_index === 0"\r\n        mat-icon-button\r\n        class="button-left"\r\n        (click)="onPrevStepClick()"\r\n      >\r\n        <mat-icon aria-label="Vorheriger Schritt">navigate_before</mat-icon>\r\n      </button>\r\n      <span>\r\n        {{ slideshow.pages[page_index].title }} ({{ page_index + 1 }}/{{\r\n          slideshow.pages.length\r\n        }})\r\n      </span>\r\n      <button\r\n        [disabled]="page_index + 1 === slideshow.pages.length"\r\n        (click)="onNextStepClick()"\r\n        class="button-right"\r\n        mat-icon-button\r\n      >\r\n        <mat-icon aria-label="N\u00E4chster Schritt">navigate_next</mat-icon>\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n',
          styles: [
            '.slideshow-container{display:flex;flex-direction:column;height:100%}.slideshow-container .slideshow-content-container{overflow:auto}.toolbar{width:100%;position:relative;min-height:52px}.toolbar .button-back{position:absolute;left:16px;top:50%;transform:translateY(-45%)}.toolbar .step-actions{max-width:530px;display:grid;grid-template-areas:"previous header next";grid-template-columns:40px auto 40px;margin-left:auto;margin-right:auto;align-items:center}@media (min-width: 451px) and (max-width: 530px){.toolbar .step-actions{max-width:350px}}@media (min-width: 531px) and (max-width: 645px){.toolbar .step-actions{max-width:400px}}@media (min-width: 646px) and (max-width: 700px){.toolbar .step-actions{max-width:500px}}.toolbar .button-left{grid-area:previous}.toolbar .button-right{grid-area:next}.toolbar .title{display:flex;flex-direction:column;text-align:center;grid-area:header}.toolbar .title h2{margin-bottom:-2px}.toolbar .title span{margin-bottom:0}::ng-deep div.mat-horizontal-stepper-header-container{display:none}::ng-deep .mat-horizontal-content-container{padding-top:24px!important}::ng-deep .md-rendered ul,::ng-deep .md-rendered li{margin-bottom:.5em;margin-left:.5em;padding-left:.25em}::ng-deep .md-rendered ol,::ng-deep .md-rendered li{margin-top:.5em;padding-left:.5em}div.page-images div.greaterEqual3Images{display:grid;grid-template-columns:1fr 1fr}@media (max-width: 800px){div.page-images div.greaterEqual3Images{grid-template-columns:1fr}}@media (min-width: 1000px) and (max-width: 1199px){div.page-images div.greaterEqual3Images{grid-template-columns:1fr}}@media (min-width: 1200px) and (max-width: 1399px){div.page-images div.greaterEqual3Images{grid-template-columns:1fr 1fr}}@media (min-width: 1400px){div.page-images div.greaterEqual3Images{grid-template-columns:1fr 1fr 1fr}}div.page-images div.lessThan3Images{display:grid;grid-template-columns:1fr 1fr}@media (max-width: 800px){div.page-images div.lessThan3Images{grid-template-columns:1fr}}@media (min-width: 1000px) and (max-width: 1199px){div.page-images div.lessThan3Images{grid-template-columns:1fr}}@media (min-width: 1200px){div.page-images div.lessThan3Images{grid-template-columns:1fr 1fr}}div.page-images div.equal1Image{display:flex;justify-content:center}@media (min-width: 801px){div.page-images div.equal1Image mat-card{width:50%}}@media (min-width: 1000px) and (max-width: 1199px){div.page-images div.equal1Image mat-card{width:100%}}div.page-images mat-card{min-width:200px;margin:1em}div.page-images mat-card mat-card-header ::ng-deep div.mat-card-header-text{margin:0}div.page-images mat-card mat-card-header mat-card-title{font-size:16px}div.page-images mat-card mat-card-content{height:calc(100% - 32px);position:relative}div.page-images mat-card solid-core-media ::ng-deep solid-core-media-detail{all:unset}div.page-images mat-card solid-core-media ::ng-deep solid-core-media-toolbar{position:absolute!important;bottom:-.9em!important;right:-1.2em!important}div.page-images mat-card .caption{margin-top:.75em;margin-right:40px}.toolbar-container{left:300px;z-index:2;background-color:#fff;box-shadow:0 4px 2px -2px #0003;transition:top .7s ease-in-out;margin-bottom:3px}.nav-up{top:-30px}.nav-down{top:60px}.back-button-toolbar-container{width:100%;position:fixed;z-index:2;background-color:#fff;box-shadow:0 4px 2px -2px #0003;transition:top .7s ease-in-out}.back-button-toolbar-container .back-button-toolbar{display:grid;grid-template-areas:"front middle last";grid-template-columns:40px auto 40px;padding:0 16px;min-height:56px}.back-button-toolbar-container .back-button-toolbar button{grid-area:front;align-self:center;justify-self:end}.back-button-toolbar-container .back-button-toolbar h2{grid-area:middle;justify-self:center;align-self:center;margin-bottom:0;text-align:center}.navigation-toolbar-container{width:100%;position:fixed;bottom:0;z-index:2;background-color:#fff;box-shadow:0 -3px 2px -2px #0003}.navigation-toolbar-container .navigation-toolbar{padding-top:0;display:grid;grid-template-areas:"previous title next";width:100%;grid-template-columns:45px auto 45px;align-items:center}.navigation-toolbar-container .navigation-toolbar .button-left{grid-area:previous;justify-self:end}.navigation-toolbar-container .navigation-toolbar .button-right{grid-area:next;justify-self:start}.navigation-toolbar-container .navigation-toolbar span{justify-self:center;text-align:center}mat-progress-bar ::ng-deep .mat-progress-bar-buffer{background-color:#fff}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i1.BreakpointObserver },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [SOLID_SLIDESHOW_APP_ROUTING_CONFIG],
          },
        ],
      },
      { type: i0.ChangeDetectorRef },
      { type: i2.ActivatedRoute },
      { type: i2.Router },
    ];
  },
  propDecorators: {
    Stepper: [
      {
        type: ViewChild,
        args: ['stepper', { static: false }],
      },
    ],
    Toolbar: [
      {
        type: ViewChild,
        args: ['toolbar'],
      },
    ],
    Navigation: [
      {
        type: ViewChild,
        args: ['navigation'],
      },
    ],
    slideshow_container: [
      {
        type: ViewChild,
        args: ['slideshow_container'],
      },
    ],
    backButtonClick: [
      {
        type: Output,
      },
    ],
    selectSlideshow: [
      {
        type: Input,
      },
    ],
    keyEvent: [
      {
        type: HostListener,
        args: ['window:keyup', ['$event']],
      },
    ],
  },
});

// export class LoadSlideshow {
//   static readonly type = '[Slideshow] load all slideshows';
// }
class AddSlideshow {
  payload;
  static type = '[Slideshow] add slideshow';
  constructor(payload) {
    this.payload = payload;
  }
}

var __decorate$4 =
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
var __metadata$4 =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
let SlideshowState = class SlideshowState {
  _config;
  _http;
  constructor(_config, _http) {
    this._config = _config;
    this._http = _http;
  }
  // @Selector()
  // public static getSlideshowByCategoriesAndId(state: SlideshowStateModel) {
  //   // This redundant variable is required
  //   // https://github.com/ng-packagr/ng-packagr/issues/696
  //   const fn = function (
  //     id: number,
  //     categories: string | undefined
  //   ): Slideshow | undefined {
  //     return state
  //       .filter((slideshow) => slideshow.categories === categories)
  //       .find((slideshow) => slideshow.id === id);
  //   };
  //   return fn;
  // }
  // @Selector()
  // public static getSlideshowByCategories(state: SlideshowStateModel) {
  //   const fn = function (
  //     categories: string | undefined
  //   ): Slideshow[] | undefined {
  //     return state.filter((s) => {
  //       if (!categories) {
  //         return;
  //       } else {
  //         return s.categories === categories;
  //       }
  //     });
  //   };
  //   return fn;
  // }
  // @Selector()
  // public static getSlideshowsByCategories(state: SlideshowStateModel) {
  //   const fn = function (
  //     categories: string | undefined
  //   ): Slideshow[] | undefined {
  //     return state.filter((s) => {
  //       if (!categories) {
  //         return;
  //       } else {
  //         return s.categories === categories;
  //       }
  //     });
  //   };
  //   return fn;
  // }
  // @Selector()
  // public static SlideshowByCategoryCounter(state: SlideshowStateModel) {
  //   const fn = function (categories: string | undefined): number {
  //     return state.filter((s) => s.categories === categories).length;
  //   };
  //   return fn;
  // }
  // @Selector()
  // public static getSlideshows(state: SlideshowStateModel) {
  //   // This redundant variable is required
  //   // https://github.com/ng-packagr/ng-packagr/issues/696
  //   const fn = () =>
  //     state.map((s) => ({
  //       id: s.id,
  //       title: s.title,
  //       title_image: s.title_image,
  //       position: s.position,
  //       categories: s.categories,
  //     }));
  //   return fn();
  // }
  // @Action(LoadSlideshow)
  // public load(ctx: StateContext<SlideshowStateModel>) {
  //   if (ctx.getState().length > 0) {
  //     console.log(ctx.getState());
  //     return;
  //   }
  //   return this._http
  //     .get<Slideshow[]>(`${this._config.apiUrl}/slideshows`)
  //     .pipe(
  //       map((response) => {
  //         const mapit = (input: SlideshowApi[]): Slideshow[] => {
  //           return input.map((slideshow) => {
  //             return {
  //               ...slideshow,
  //               categories: slideshow.categories[0],
  //               pages: slideshow.pages.map((page) => ({
  //                 ...page,
  //                 images: page.images?.map((slideshowImg) => ({
  //                   ...slideshowImg,
  //                   img: new ImageModel(slideshowImg.image),
  //                 })),
  //               })),
  //             };
  //           });
  //         };
  //         return mapit(response);
  //       }),
  //       tap((res) => {
  //         ctx.setState([
  //           ...res.map((slideshow) => {
  //             slideshow.pages = slideshow.pages.sort(
  //               (a, b) => a.position - b.position
  //             );
  //             return slideshow;
  //           }),
  //         ]);
  //       })
  //     );
  // }
  // @Selector()
  // public static getSlideshows(state: SlideshowStateModel) {
  //   return [...state];
  // }
  // @Selector()
  // public static getSlideshow(state: SlideshowStateModel) {
  //   const fn = (slideshowId: number): Slideshow =>
  //     state.filter((s) => s.id === slideshowId)[0];
  //   return fn;
  // }
  // @Action(LoadSlideshow)
  // public loadPage(
  //   ctx: StateContext<SlideshowStateModel>,
  // ) {
  //   if (ctx.getState().length > 0) {
  //     return;
  //   }
  //   return this._http
  //     .get<Slideshow>(`${this._config.apiUrl}/slideshows`)
  //     .pipe(
  //       map((response) => {
  //         const mapit = (slideshow: SlideshowApi): Slideshow => {
  //           // return input.map((slideshow) => {
  //           return {
  //             ...slideshow,
  //             categories: slideshow.categories,
  //             pages: slideshow.pages.map((page) => ({
  //               ...page,
  //               images: page.images?.map((slideshowImg) => ({
  //                 ...slideshowImg,
  //                 img: new ImageModel(slideshowImg.image),
  //               })),
  //             })),
  //           };
  //           // });
  //         };
  //         return mapit(response);
  //       }),
  //       tap((res) => {
  //         // ctx.setState([
  //         //   ...res.map((slideshow) => {
  //         //     slideshow.pages = slideshow.pages.sort(
  //         //       (a, b) => a.position - b.position
  //         //     );
  //         //     return slideshow;
  //         //   }),
  //         // ]);
  //       })
  //     );
  // }
  static getSlideshowById(state) {
    return (slideshowId) =>
      state.filter((s) => s.id === Number.parseInt(slideshowId))[0];
  }
  addSlideshow(ctx, { payload }) {
    const currentState = ctx.getState();
    if (currentState.some((sl) => sl.id === Number.parseInt(payload))) {
      // if slideshow is existed in the state
      // to see the data is taken from state
      console.log('slideshow not call api');
      return;
    }
    return this._http.get(`${this._config.apiUrl}/slideshows/${payload}`).pipe(
      map((response) => {
        // if slideshow is not existed in the state
        // to see the data is taken from API, call API
        console.log('slideshow call api');
        const mapit = (slideshow) => {
          return {
            id: slideshow.id,
            title: slideshow.title,
            position: slideshow.position,
            categories: slideshow.categories,
            pages: slideshow.pages.map((page) => ({
              ...page,
              images: page.images?.map((slideshowImg) => ({
                ...slideshowImg,
                img: new ImageModel(slideshowImg.image),
              })),
            })),
          };
        };
        return mapit(response);
      }),
      tap((res) => {
        res.pages.sort((a, b) => a.position - b.position);
        ctx.setState(
          [...currentState, res].sort((a, b) => a.position - b.position)
        );
      })
    );
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SlideshowState,
    deps: [{ token: SOLID_CORE_CONFIG }, { token: i1$1.HttpClient }],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SlideshowState,
  });
};
__decorate$4(
  [
    Action(AddSlideshow),
    __metadata$4('design:type', Function),
    __metadata$4('design:paramtypes', [Object, AddSlideshow]),
    __metadata$4('design:returntype', void 0),
  ],
  SlideshowState.prototype,
  'addSlideshow',
  null
);
__decorate$4(
  [
    Selector(),
    __metadata$4('design:type', Function),
    __metadata$4('design:paramtypes', [Array]),
    __metadata$4('design:returntype', void 0),
  ],
  SlideshowState,
  'getSlideshowById',
  null
);
SlideshowState = __decorate$4(
  [
    State({
      name: 'slideshow',
      defaults: [],
    }),
    __metadata$4('design:paramtypes', [Object, HttpClient]),
  ],
  SlideshowState
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: SlideshowState,
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
      { type: i1$1.HttpClient },
    ];
  },
  propDecorators: { addSlideshow: [] },
});

class GetSlideshowSelect {
  static type = '[SlideshowSelect] get slideshow select';
}

class GetCategories {
  static type = '[Category] get slideshow categories;';
}

var __decorate$3 =
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
var __metadata$3 =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
let CategoriesState = class CategoriesState {
  _http;
  _config;
  constructor(_http, _config) {
    this._http = _http;
    this._config = _config;
  }
  static getSlideshowCategoriesItems(state) {
    const fn = () =>
      state.map((s) => ({
        id: s.id,
        name: s.name,
        slug: s.slug,
      }));
    return fn();
  }
  GetSlideshowCategories(ctx) {
    if (ctx.getState().length > 0) {
      return;
    }
    return this._http.get(`${this._config.apiUrl}/categories`).pipe(
      map((res) => {
        const mapit = (input) => {
          return input.map((categories) => {
            return {
              ...categories,
            };
          });
        };
        return mapit(res);
      }),
      tap((res) => {
        ctx.setState([...res.map((categories) => categories)]);
      })
    );
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: CategoriesState,
    deps: [{ token: i1$1.HttpClient }, { token: SOLID_CORE_CONFIG }],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: CategoriesState,
  });
};
__decorate$3(
  [
    Action(GetCategories),
    __metadata$3('design:type', Function),
    __metadata$3('design:paramtypes', [Object]),
    __metadata$3('design:returntype', void 0),
  ],
  CategoriesState.prototype,
  'GetSlideshowCategories',
  null
);
__decorate$3(
  [
    Selector(),
    __metadata$3('design:type', Function),
    __metadata$3('design:paramtypes', [Array]),
    __metadata$3('design:returntype', void 0),
  ],
  CategoriesState,
  'getSlideshowCategoriesItems',
  null
);
CategoriesState = __decorate$3(
  [
    State({
      name: 'categories',
      defaults: [],
    }),
    __metadata$3('design:paramtypes', [HttpClient, Object]),
  ],
  CategoriesState
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: CategoriesState,
  decorators: [
    {
      type: Injectable,
    },
  ],
  ctorParameters: function () {
    return [
      { type: i1$1.HttpClient },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [SOLID_CORE_CONFIG],
          },
        ],
      },
    ];
  },
  propDecorators: { GetSlideshowCategories: [] },
});

var __decorate$2 =
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
var __metadata$2 =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
let SlideshowSelectState = class SlideshowSelectState {
  _config;
  _http;
  constructor(_config, _http) {
    this._config = _config;
    this._http = _http;
  }
  static getSlideshowSelect(state) {
    const fn = () =>
      state.map((s) => ({
        id: s.id,
        pages: s.pages,
        title_image: s.title_image,
        categories: s.categories,
        position: s.position,
        title: s.title,
      }));
    return fn();
  }
  load(ctx) {
    if (ctx.getState().length > 0) {
      return;
    }
    return this._http.get(`${this._config.apiUrl}/slideshows`).pipe(
      map((response) => {
        const mapit = (input) => {
          return input.map((slideshow) => {
            return {
              ...slideshow,
              categories: slideshow.categories,
            };
          });
        };
        return mapit(response);
      }),
      tap((res) => {
        ctx.setState([...res].sort((a, b) => a.position - b.position));
      })
    );
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SlideshowSelectState,
    deps: [{ token: SOLID_CORE_CONFIG }, { token: i1$1.HttpClient }],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SlideshowSelectState,
  });
};
__decorate$2(
  [
    Action(GetSlideshowSelect),
    __metadata$2('design:type', Function),
    __metadata$2('design:paramtypes', [Object]),
    __metadata$2('design:returntype', void 0),
  ],
  SlideshowSelectState.prototype,
  'load',
  null
);
__decorate$2(
  [
    Selector(),
    __metadata$2('design:type', Function),
    __metadata$2('design:paramtypes', [Array]),
    __metadata$2('design:returntype', void 0),
  ],
  SlideshowSelectState,
  'getSlideshowSelect',
  null
);
SlideshowSelectState = __decorate$2(
  [
    State({
      name: 'slideshowSelect',
      defaults: [],
    }),
    __metadata$2('design:paramtypes', [Object, HttpClient]),
  ],
  SlideshowSelectState
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: SlideshowSelectState,
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
      { type: i1$1.HttpClient },
    ];
  },
  propDecorators: { load: [] },
});

var __decorate$1 =
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
var __metadata$1 =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
class SlideshowSelectComponent {
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
      { token: i2.ActivatedRoute },
      { token: i2.Router },
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
        type: i3.NgForOf,
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
      },
      {
        kind: 'directive',
        type: i3.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i2.RouterLink,
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
        type: i6.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'component',
        type: i7.MatCard,
        selector: 'mat-card',
        inputs: ['appearance'],
        exportAs: ['matCard'],
      },
      {
        kind: 'component',
        type: i8.MatIconButton,
        selector: 'button[mat-icon-button]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'directive',
        type: i6$1.MatAccordion,
        selector: 'mat-accordion',
        inputs: ['multi', 'hideToggle', 'displayMode', 'togglePosition'],
        exportAs: ['matAccordion'],
      },
      {
        kind: 'component',
        type: i6$1.MatExpansionPanel,
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
        type: i6$1.MatExpansionPanelHeader,
        selector: 'mat-expansion-panel-header',
        inputs: ['tabIndex', 'expandedHeight', 'collapsedHeight'],
      },
      {
        kind: 'directive',
        type: i6$1.MatExpansionPanelTitle,
        selector: 'mat-panel-title',
      },
      { kind: 'pipe', type: i3.AsyncPipe, name: 'async' },
    ],
  });
}
__decorate$1(
  [
    Select(CategoriesState.getSlideshowCategoriesItems),
    __metadata$1('design:type', Observable),
  ],
  SlideshowSelectComponent.prototype,
  'Categories',
  void 0
);
__decorate$1(
  [
    Select(SlideshowSelectState.getSlideshowSelect),
    __metadata$1('design:type', Observable),
  ],
  SlideshowSelectComponent.prototype,
  'SlideshowSelect',
  void 0
);
__decorate$1(
  [
    Dispatch(),
    __metadata$1('design:type', Function),
    __metadata$1('design:paramtypes', []),
    __metadata$1('design:returntype', Promise),
  ],
  SlideshowSelectComponent.prototype,
  'GetSlideshowSelect',
  null
);
__decorate$1(
  [
    Dispatch(),
    __metadata$1('design:type', Function),
    __metadata$1('design:paramtypes', []),
    __metadata$1('design:returntype', void 0),
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
      { type: i2.ActivatedRoute },
      { type: i2.Router },
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
function __internal__selectRouterParam(s) {
  return s.router.state.params;
}
class SlideshowBaseComponent {
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
      { token: i1$2.Store },
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
        type: SlideshowComponent,
        selector: 'solid-slideshow',
        inputs: ['selectSlideshow'],
        outputs: ['backButtonClick'],
      },
      {
        kind: 'component',
        type: SlideshowSelectComponent,
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
      { type: i1$2.Store },
      { type: i2.ActivatedRoute },
    ];
  },
  propDecorators: { params: [], goBack: [] },
});

const routes = [
  {
    path: '',
    component: SlideshowBaseComponent,
    children: [
      {
        path: ':categoriesSlug/:slideshowId/:slideshowPageId',
        component: SlideshowSelectComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
const SolidSlideshowRoutingModule = RouterModule.forChild(routes);

// This workaround is required for the "old" angular compiler in production mode. Ivy library publishing is not supported until angular 10.
// https://github.com/ng-packagr/ng-packagr/issues/767
const ngxsFeatureModule = NgxsModule.forFeature([
  SlideshowState,
  CategoriesState,
  SlideshowSelectState,
]);
class SolidSlideshowModule {
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidSlideshowModule,
    deps: [],
    target: i0.ɵɵFactoryTarget.NgModule,
  });
  static ɵmod = i0.ɵɵngDeclareNgModule({
    minVersion: '14.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidSlideshowModule,
    declarations: [
      SlideshowComponent,
      SlideshowSelectComponent,
      SlideshowBaseComponent,
    ],
    imports: [
      SolidCoreModule,
      i2.RouterModule,
      i1$2.ɵNgxsFeatureModule,
      MatStepperModule,
      MatIconModule,
      MatCardModule,
      MatButtonModule,
      MatProgressBarModule,
      MatExpansionModule,
    ],
  });
  static ɵinj = i0.ɵɵngDeclareInjector({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidSlideshowModule,
    providers: [
      {
        provide: STEPPER_GLOBAL_OPTIONS,
        useValue: { displayDefaultIndicatorType: false },
      },
    ],
    imports: [
      SolidCoreModule,
      SolidSlideshowRoutingModule,
      ngxsFeatureModule,
      MatStepperModule,
      MatIconModule,
      MatCardModule,
      MatButtonModule,
      MatProgressBarModule,
      MatExpansionModule,
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: SolidSlideshowModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          declarations: [
            SlideshowComponent,
            SlideshowSelectComponent,
            SlideshowBaseComponent,
          ],
          imports: [
            SolidCoreModule,
            SolidSlideshowRoutingModule,
            ngxsFeatureModule,
            MatStepperModule,
            MatIconModule,
            MatCardModule,
            MatButtonModule,
            MatProgressBarModule,
            MatExpansionModule,
          ],
          providers: [
            {
              provide: STEPPER_GLOBAL_OPTIONS,
              useValue: { displayDefaultIndicatorType: false },
            },
          ],
        },
      ],
    },
  ],
});

/**
 * Generated bundle index. Do not edit.
 */

export {
  SOLID_SLIDESHOW_APP_ROUTING_CONFIG,
  SolidSlideshowModule,
  ngxsFeatureModule,
};
//# sourceMappingURL=zentrumnawi-solid-slideshow.mjs.map
