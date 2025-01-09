import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  ViewChild,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Subject } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { SOLID_SLIDESHOW_APP_ROUTING_CONFIG } from '../../app-config';
import * as i0 from '@angular/core';
import * as i1 from '@angular/cdk/layout';
import * as i2 from '@angular/router';
import * as i3 from '@angular/common';
import * as i4 from '@zentrumnawi/solid-core';
import * as i5 from '@angular/material/stepper';
import * as i6 from '@angular/material/icon';
import * as i7 from '@angular/material/card';
import * as i8 from '@angular/material/button';
import * as i9 from '@angular/material/progress-bar';
export var KEY;
(function (KEY) {
  KEY['RIGHT_ARROW'] = 'ArrowRight';
  KEY['LEFT_ARROW'] = 'ArrowLeft';
})(KEY || (KEY = {}));
export class SlideshowComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGVzaG93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvc2xpZGVzaG93L3NyYy9saWIvY29tcG9uZW50cy9zbGlkZXNob3cvc2xpZGVzaG93LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvc2xpZGVzaG93L3NyYy9saWIvY29tcG9uZW50cy9zbGlkZXNob3cvc2xpZGVzaG93LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUdOLFNBQVMsRUFDVCxLQUFLLEVBQ0wsWUFBWSxFQUNaLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDdkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUvQixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQ0FBa0MsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7Ozs7OztBQUV0RSxNQUFNLENBQU4sSUFBWSxHQUdYO0FBSEQsV0FBWSxHQUFHO0lBQ2IsaUNBQTBCLENBQUE7SUFDMUIsK0JBQXdCLENBQUE7QUFDMUIsQ0FBQyxFQUhXLEdBQUcsS0FBSCxHQUFHLFFBR2Q7QUFPRCxNQUFNLE9BQU8sa0JBQWtCO0lBc0NuQjtJQUMyQztJQUMzQztJQUNBO0lBQ0E7SUF6Q0YsVUFBVSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFYSxPQUFPLENBQWM7SUFDeEMsT0FBTyxDQUFjO0lBQ2xCLFVBQVUsQ0FB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O3NCQUEzRCxTQUFTO3VCQUFDLHFCQUFxQjtnQkFDdEIsZUFBZTtzQkFBeEIsTUFBTTtnQkFhSSxlQUFlO3NCQUR6QixLQUFLO2dCQWlEQyxRQUFRO3NCQURkLFlBQVk7dUJBQUMsY0FBYyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbmplY3QsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBWaWV3Q2hpbGQsXHJcbiAgSW5wdXQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIE91dHB1dCxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0U3RlcHBlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3N0ZXBwZXInO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFNsaWRlc2hvdyB9IGZyb20gJy4uLy4uL3N0YXRlL3NsaWRlc2hvdy5tb2RlbCc7XHJcbmltcG9ydCB7IEJyZWFrcG9pbnRPYnNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9sYXlvdXQnO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgU09MSURfU0xJREVTSE9XX0FQUF9ST1VUSU5HX0NPTkZJRyB9IGZyb20gJy4uLy4uL2FwcC1jb25maWcnO1xyXG5cclxuZXhwb3J0IGVudW0gS0VZIHtcclxuICBSSUdIVF9BUlJPVyA9ICdBcnJvd1JpZ2h0JyxcclxuICBMRUZUX0FSUk9XID0gJ0Fycm93TGVmdCcsXHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc29saWQtc2xpZGVzaG93JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vc2xpZGVzaG93LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zbGlkZXNob3cuY29tcG9uZW50LnNjc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFNsaWRlc2hvd0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBBZnRlclZpZXdJbml0IHtcclxuICBwcml2YXRlICRkZXN0cm95ZWQgPSBuZXcgU3ViamVjdCgpO1xyXG5cclxuICBAVmlld0NoaWxkKCdzdGVwcGVyJywgeyBzdGF0aWM6IGZhbHNlIH0pIHB1YmxpYyBTdGVwcGVyPzogTWF0U3RlcHBlcjtcclxuICBAVmlld0NoaWxkKCd0b29sYmFyJykgcHVibGljIFRvb2xiYXI/OiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ25hdmlnYXRpb24nKSBwdWJsaWMgTmF2aWdhdGlvbj86IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnc2xpZGVzaG93X2NvbnRhaW5lcicpIHB1YmxpYyBzbGlkZXNob3dfY29udGFpbmVyPzogRWxlbWVudFJlZjtcclxuICBAT3V0cHV0KCkgYmFja0J1dHRvbkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIHB1YmxpYyBzbGlkZXNob3chOiBTbGlkZXNob3cgfCBudWxsO1xyXG4gIHB1YmxpYyBwYWdlX2luZGV4ID0gMDtcclxuICBwdWJsaWMgaXNNb2JpbGUgPSBmYWxzZTtcclxuICBwdWJsaWMgbGFzdFNjcm9sbFRvcCA9IDA7XHJcbiAgcHVibGljIHRvb2xiYXJfdXAgPSBmYWxzZTtcclxuICBwdWJsaWMgdG9vbGJhcl9kb3duID0gZmFsc2U7XHJcbiAgcHVibGljIHNsaWRlc2hvd0NvdW50ITogbnVtYmVyO1xyXG4gIHB1YmxpYyBzbGlkZXNob3dpZCE6IHN0cmluZztcclxuICBwdWJsaWMgc2xpZGVzaG93UGFnZWlkITogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHB1YmxpYyBzZXQgc2VsZWN0U2xpZGVzaG93KHNsaWRlc2hvdzogU2xpZGVzaG93IHwgbnVsbCkge1xyXG4gICAgdGhpcy5zbGlkZXNob3cgPSBzbGlkZXNob3c7XHJcbiAgICBpZiAoc2xpZGVzaG93KSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLlN0ZXBwZXIpIHtcclxuICAgICAgICAgIGNvbnN0IHBhZ2VQb3NpdGlvbiA9IHRoaXMuc2xpZGVzaG93Py5wYWdlcy5maW5kSW5kZXgoXHJcbiAgICAgICAgICAgIChwYWdlKSA9PiBwYWdlLmlkID09PSBOdW1iZXIucGFyc2VJbnQodGhpcy5zbGlkZXNob3dQYWdlaWQpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgaWYgKHBhZ2VQb3NpdGlvbiAhPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5TdGVwcGVyLnNlbGVjdGVkSW5kZXggPSBwYWdlUG9zaXRpb247XHJcbiAgICAgICAgICAgIHRoaXMucGFnZV9pbmRleCA9IHRoaXMuU3RlcHBlci5zZWxlY3RlZEluZGV4O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSwgMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX2JyZWFrcG9pbnRPYnNlcnZlcjogQnJlYWtwb2ludE9ic2VydmVyLFxyXG4gICAgQEluamVjdChTT0xJRF9TTElERVNIT1dfQVBQX1JPVVRJTkdfQ09ORklHKSBwdWJsaWMgcm91dGluZ0NvbmZpZzogYW55LFxyXG4gICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuc2xpZGVzaG93UGFnZWlkID1cclxuICAgICAgdGhpcy5yb3V0ZS5maXJzdENoaWxkPy5zbmFwc2hvdC5wYXJhbXNbJ3NsaWRlc2hvd1BhZ2VJZCddO1xyXG4gICAgdGhpcy5fYnJlYWtwb2ludE9ic2VydmVyXHJcbiAgICAgIC5vYnNlcnZlKFsnKG1heC13aWR0aDogNDUwcHgpJ10pXHJcbiAgICAgIC5zdWJzY3JpYmUoKGlzTW9iaWxlKSA9PiB7XHJcbiAgICAgICAgaWYgKGlzTW9iaWxlLm1hdGNoZXMpIHtcclxuICAgICAgICAgIHRoaXMuaXNNb2JpbGUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmlzTW9iaWxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnb0JhY2soKSB7XHJcbiAgICB0aGlzLmJhY2tCdXR0b25DbGljay5lbWl0KCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6a2V5dXAnLCBbJyRldmVudCddKVxyXG4gIHB1YmxpYyBrZXlFdmVudChldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgaWYgKGV2ZW50LmtleSA9PT0gS0VZLkxFRlRfQVJST1cpIHtcclxuICAgICAgdGhpcy5vblByZXZTdGVwQ2xpY2soKTtcclxuICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSBLRVkuUklHSFRfQVJST1cpIHtcclxuICAgICAgdGhpcy5vbk5leHRTdGVwQ2xpY2soKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblByZXZTdGVwQ2xpY2soKSB7XHJcbiAgICBpZiAodGhpcy5TdGVwcGVyKSB7XHJcbiAgICAgIHRoaXMuU3RlcHBlci5wcmV2aW91cygpO1xyXG4gICAgICB0aGlzLnBhZ2VfaW5kZXggPSB0aGlzLlN0ZXBwZXIuc2VsZWN0ZWRJbmRleDtcclxuICAgICAgdGhpcy5zY3JvbGxUb1RvcCgpO1xyXG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShcclxuICAgICAgICBbYC4uLyR7dGhpcy5zbGlkZXNob3c/LnBhZ2VzW3RoaXMucGFnZV9pbmRleF0uaWR9YF0sXHJcbiAgICAgICAgeyByZWxhdGl2ZVRvOiB0aGlzLnJvdXRlLmZpcnN0Q2hpbGQgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uTmV4dFN0ZXBDbGljaygpIHtcclxuICAgIGlmICh0aGlzLlN0ZXBwZXIpIHtcclxuICAgICAgdGhpcy5TdGVwcGVyLm5leHQoKTtcclxuICAgICAgdGhpcy5wYWdlX2luZGV4ID0gdGhpcy5TdGVwcGVyLnNlbGVjdGVkSW5kZXg7XHJcbiAgICAgIHRoaXMuc2Nyb2xsVG9Ub3AoKTtcclxuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoXHJcbiAgICAgICAgW2AuLi8ke3RoaXMuc2xpZGVzaG93Py5wYWdlc1t0aGlzLnBhZ2VfaW5kZXhdLmlkfWBdLFxyXG4gICAgICAgIHsgcmVsYXRpdmVUbzogdGhpcy5yb3V0ZS5maXJzdENoaWxkIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblBhbkVuZCgkZXZlbnQ6IGFueSkge1xyXG4gICAgaWYgKCRldmVudC5kZWx0YVggPiAxMDApIHtcclxuICAgICAgdGhpcy5vblByZXZTdGVwQ2xpY2soKTtcclxuICAgIH0gZWxzZSBpZiAoJGV2ZW50LmRlbHRhWCA8IC0xMDApIHtcclxuICAgICAgdGhpcy5vbk5leHRTdGVwQ2xpY2soKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBoaWRlQW5kU2hvd1Rvb2xiYXIoKSB7XHJcbiAgICBjb25zdCBkZWx0YSA9IDU7XHJcbiAgICBjb25zdCBzY3JvbGxUb3AgPSB0aGlzLnNsaWRlc2hvd19jb250YWluZXI/Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wO1xyXG4gICAgY29uc3QgdG9vbGJhckhlaWdodCA9IHRoaXMuVG9vbGJhcj8ubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XHJcbiAgICBpZiAoTWF0aC5hYnModGhpcy5sYXN0U2Nyb2xsVG9wIC0gc2Nyb2xsVG9wKSA8PSBkZWx0YSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoc2Nyb2xsVG9wID4gdGhpcy5sYXN0U2Nyb2xsVG9wICYmIHNjcm9sbFRvcCA+IHRvb2xiYXJIZWlnaHQpIHtcclxuICAgICAgLy8gU2Nyb2xsIERvd25cclxuICAgICAgdGhpcy50b29sYmFyX2Rvd24gPSBmYWxzZTtcclxuICAgICAgdGhpcy50b29sYmFyX3VwID0gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFNjcm9sbCBVcFxyXG4gICAgICB0aGlzLnRvb2xiYXJfdXAgPSBmYWxzZTtcclxuICAgICAgdGhpcy50b29sYmFyX2Rvd24gPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5sYXN0U2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNjcm9sbFRvVG9wKCkge1xyXG4gICAgY29uc3Qgc2xpZGVzaG93Q29udGFpbmVyID0gdGhpcy5zbGlkZXNob3dfY29udGFpbmVyO1xyXG4gICAgaWYgKCFzbGlkZXNob3dDb250YWluZXIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgc2xpZGVzaG93Q29udGFpbmVyLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy4kZGVzdHJveWVkLm5leHQodHJ1ZSk7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJzbGlkZXNob3ctY29udGFpbmVyXCI+XHJcbiAgPCEtLSBTbGlkZXNob3cgdG9vbGJhciBmb3IgYmlnIHNjcmVlbiB2ZXJzaW9uIC0tPlxyXG4gIDxkaXYgY2xhc3M9XCJ0b29sYmFyLWNvbnRhaW5lclwiICpuZ0lmPVwiIWlzTW9iaWxlICYmIHNsaWRlc2hvd1wiICN0b29sYmFyPlxyXG4gICAgPGRpdiBjbGFzcz1cInRvb2xiYXJcIj5cclxuICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gY2xhc3M9XCJidXR0b24tYmFja1wiIChjbGljayk9XCJnb0JhY2soKVwiPlxyXG4gICAgICAgIDxtYXQtaWNvbj5hcnJvd19iYWNrPC9tYXQtaWNvbj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJzdGVwLWFjdGlvbnNcIj5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICBbZGlzYWJsZWRdPVwicGFnZV9pbmRleCA9PT0gMFwiXHJcbiAgICAgICAgICBtYXQtaWNvbi1idXR0b25cclxuICAgICAgICAgIGNsYXNzPVwiYnV0dG9uLWxlZnRcIlxyXG4gICAgICAgICAgKGNsaWNrKT1cIm9uUHJldlN0ZXBDbGljaygpXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8bWF0LWljb24gYXJpYS1sYWJlbD1cIlZvcmhlcmlnZXIgU2Nocml0dFwiPm5hdmlnYXRlX2JlZm9yZTwvbWF0LWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+XHJcbiAgICAgICAgICA8aDI+e3sgc2xpZGVzaG93LnRpdGxlIH19PC9oMj5cclxuICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICB7eyBzbGlkZXNob3cucGFnZXNbcGFnZV9pbmRleF0udGl0bGUgfX0gKHt7IHBhZ2VfaW5kZXggKyAxIH19L3t7XHJcbiAgICAgICAgICAgICAgc2xpZGVzaG93LnBhZ2VzLmxlbmd0aFxyXG4gICAgICAgICAgICB9fSlcclxuICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICBbZGlzYWJsZWRdPVwicGFnZV9pbmRleCArIDEgPT09IHNsaWRlc2hvdy5wYWdlcy5sZW5ndGhcIlxyXG4gICAgICAgICAgKGNsaWNrKT1cIm9uTmV4dFN0ZXBDbGljaygpXCJcclxuICAgICAgICAgIGNsYXNzPVwiYnV0dG9uLXJpZ2h0XCJcclxuICAgICAgICAgIG1hdC1pY29uLWJ1dHRvblxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxtYXQtaWNvbiBhcmlhLWxhYmVsPVwiTsOkY2hzdGVyIFNjaHJpdHRcIj5uYXZpZ2F0ZV9uZXh0PC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxtYXQtcHJvZ3Jlc3MtYmFyXHJcbiAgICAgIG1vZGU9XCJkZXRlcm1pbmF0ZVwiXHJcbiAgICAgIHZhbHVlPVwie3sgKChwYWdlX2luZGV4ICsgMSkgLyBzbGlkZXNob3cucGFnZXMubGVuZ3RoKSAqIDEwMCB9fVwiXHJcbiAgICA+PC9tYXQtcHJvZ3Jlc3MtYmFyPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8IS0tIFNsaWRlc2hvdyB0b29sYmFyIGZvciBNb2JpbGUgdmVyc2lvbiAtLT5cclxuICA8ZGl2XHJcbiAgICBjbGFzcz1cImJhY2stYnV0dG9uLXRvb2xiYXItY29udGFpbmVyXCJcclxuICAgICpuZ0lmPVwiaXNNb2JpbGUgJiYgc2xpZGVzaG93XCJcclxuICAgIFtjbGFzcy5uYXYtdXBdPVwidG9vbGJhcl91cFwiXHJcbiAgICBbY2xhc3MubmF2LWRvd25dPVwidG9vbGJhcl9kb3duXCJcclxuICAgICN0b29sYmFyXHJcbiAgPlxyXG4gICAgPGRpdiBjbGFzcz1cImJhY2stYnV0dG9uLXRvb2xiYXJcIj5cclxuICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gY2xhc3M9XCJidXR0b24tYmFja1wiIChjbGljayk9XCJnb0JhY2soKVwiPlxyXG4gICAgICAgIDxtYXQtaWNvbj5hcnJvd19iYWNrPC9tYXQtaWNvbj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICAgIDxoMj57eyBzbGlkZXNob3cudGl0bGUgfX08L2gyPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDwhLS0gU2xpZGVzaG93IGNvbnRlbnQgZm9yIDIgdmVyc2lvbnMgLS0+XHJcbiAgPGRpdlxyXG4gICAgY2xhc3M9XCJzbGlkZXNob3ctY29udGVudC1jb250YWluZXJcIlxyXG4gICAgKHNjcm9sbCk9XCJoaWRlQW5kU2hvd1Rvb2xiYXIoKVwiXHJcbiAgICBbc3R5bGUubWF4LWhlaWdodF09XCJcclxuICAgICAgJ2NhbGMoMTAwJSAtICcgKyBOYXZpZ2F0aW9uPy5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCArICdweCknXHJcbiAgICBcIlxyXG4gICAgI3NsaWRlc2hvd19jb250YWluZXJcclxuICA+XHJcbiAgICA8bWF0LWhvcml6b250YWwtc3RlcHBlclxyXG4gICAgICAjc3RlcHBlclxyXG4gICAgICAocGFuZW5kKT1cIm9uUGFuRW5kKCRldmVudClcIlxyXG4gICAgICAqbmdJZj1cInNsaWRlc2hvd1wiXHJcbiAgICAgIGxhYmVsUG9zaXRpb249XCJib3R0b21cIlxyXG4gICAgICBsaW5lYXI9XCJmYWxzZVwiXHJcbiAgICA+XHJcbiAgICAgIDxtYXQtc3RlcFxyXG4gICAgICAgICpuZ0Zvcj1cImxldCBwYWdlIG9mIHNsaWRlc2hvdy5wYWdlc1wiXHJcbiAgICAgICAgW2xhYmVsXT1cInBhZ2UudGl0bGVcIlxyXG4gICAgICAgIFtzdGF0ZV09XCJzbGlkZXNob3cucGFnZXMubGVuZ3RoID49IHBhZ2VfaW5kZXggKyAxID8gJ2RvbmUnIDogJydcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgKm5nSWY9XCJpc01vYmlsZVwiXHJcbiAgICAgICAgICBbc3R5bGUuaGVpZ2h0XT1cIlRvb2xiYXI/Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gNiArICdweCdcIlxyXG4gICAgICAgID48L2Rpdj5cclxuICAgICAgICA8ZGl2IFtkYXRhXT1cInBhZ2UudGV4dFwiIG1hcmtkb3duPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwYWdlLWltYWdlc1wiPlxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICBbY2xhc3MuZXF1YWwxSW1hZ2VdPVwicGFnZS5pbWFnZXMubGVuZ3RoID09PSAxXCJcclxuICAgICAgICAgICAgW2NsYXNzLmxlc3NUaGFuM0ltYWdlc109XCJwYWdlLmltYWdlcy5sZW5ndGggPCAzXCJcclxuICAgICAgICAgICAgW2NsYXNzLmdyZWF0ZXJFcXVhbDNJbWFnZXNdPVwicGFnZS5pbWFnZXMubGVuZ3RoID49IDNcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBpbWcgb2YgcGFnZS5pbWFnZXNcIj5cclxuICAgICAgICAgICAgICA8bWF0LWNhcmQgKm5nSWY9XCJpbWcuaW1hZ2VcIj5cclxuICAgICAgICAgICAgICAgIDxtYXQtY2FyZC1oZWFkZXI+XHJcbiAgICAgICAgICAgICAgICAgIDxtYXQtY2FyZC10aXRsZT57eyBpbWcudGl0bGUgfX08L21hdC1jYXJkLXRpdGxlPlxyXG4gICAgICAgICAgICAgICAgPC9tYXQtY2FyZC1oZWFkZXI+XHJcbiAgICAgICAgICAgICAgICA8bWF0LWNhcmQtY29udGVudD5cclxuICAgICAgICAgICAgICAgICAgPHNvbGlkLWNvcmUtbWVkaWFcclxuICAgICAgICAgICAgICAgICAgICBbaW1hZ2VdPVwiaW1nLmltZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgW2hhc0RpYWxvZ109XCJ0cnVlXCJcclxuICAgICAgICAgICAgICAgICAgICBbaGFzQXR0cmlidXRpb25zXT1cInRydWVcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtuYW1lXT1cImltZy50aXRsZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgW3NsaWRlc2hvd1BhZ2VDaGFuZ2VkXT1cInBhZ2VfaW5kZXggKyAxXCJcclxuICAgICAgICAgICAgICAgICAgPjwvc29saWQtY29yZS1tZWRpYT5cclxuICAgICAgICAgICAgICAgICAgPHAgbWFya2Rvd24gY2xhc3M9XCJjYXB0aW9uXCIgW2RhdGFdPVwiaW1nLmNhcHRpb25cIj48L3A+XHJcbiAgICAgICAgICAgICAgICA8L21hdC1jYXJkLWNvbnRlbnQ+XHJcbiAgICAgICAgICAgICAgPC9tYXQtY2FyZD5cclxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9tYXQtc3RlcD5cclxuICAgIDwvbWF0LWhvcml6b250YWwtc3RlcHBlcj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPCEtLSBTbGlkZXNob3cgbG93ZXIgdG9vbGJhciBmb3IgTW9iaWxlIHZlcnNpb24gLS0+XHJcbiAgPGRpdlxyXG4gICAgY2xhc3M9XCJuYXZpZ2F0aW9uLXRvb2xiYXItY29udGFpbmVyXCJcclxuICAgICpuZ0lmPVwiaXNNb2JpbGUgJiYgc2xpZGVzaG93XCJcclxuICAgICNuYXZpZ2F0aW9uXHJcbiAgPlxyXG4gICAgPG1hdC1wcm9ncmVzcy1iYXJcclxuICAgICAgbW9kZT1cImRldGVybWluYXRlXCJcclxuICAgICAgdmFsdWU9XCJ7eyAoKHBhZ2VfaW5kZXggKyAxKSAvIHNsaWRlc2hvdy5wYWdlcy5sZW5ndGgpICogMTAwIH19XCJcclxuICAgID48L21hdC1wcm9ncmVzcy1iYXI+XHJcbiAgICA8ZGl2ICN0b29sYmFyIGNsYXNzPVwibmF2aWdhdGlvbi10b29sYmFyXCI+XHJcbiAgICAgIDxidXR0b25cclxuICAgICAgICBbZGlzYWJsZWRdPVwicGFnZV9pbmRleCA9PT0gMFwiXHJcbiAgICAgICAgbWF0LWljb24tYnV0dG9uXHJcbiAgICAgICAgY2xhc3M9XCJidXR0b24tbGVmdFwiXHJcbiAgICAgICAgKGNsaWNrKT1cIm9uUHJldlN0ZXBDbGljaygpXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxtYXQtaWNvbiBhcmlhLWxhYmVsPVwiVm9yaGVyaWdlciBTY2hyaXR0XCI+bmF2aWdhdGVfYmVmb3JlPC9tYXQtaWNvbj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICAgIDxzcGFuPlxyXG4gICAgICAgIHt7IHNsaWRlc2hvdy5wYWdlc1twYWdlX2luZGV4XS50aXRsZSB9fSAoe3sgcGFnZV9pbmRleCArIDEgfX0ve3tcclxuICAgICAgICAgIHNsaWRlc2hvdy5wYWdlcy5sZW5ndGhcclxuICAgICAgICB9fSlcclxuICAgICAgPC9zcGFuPlxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgW2Rpc2FibGVkXT1cInBhZ2VfaW5kZXggKyAxID09PSBzbGlkZXNob3cucGFnZXMubGVuZ3RoXCJcclxuICAgICAgICAoY2xpY2spPVwib25OZXh0U3RlcENsaWNrKClcIlxyXG4gICAgICAgIGNsYXNzPVwiYnV0dG9uLXJpZ2h0XCJcclxuICAgICAgICBtYXQtaWNvbi1idXR0b25cclxuICAgICAgPlxyXG4gICAgICAgIDxtYXQtaWNvbiBhcmlhLWxhYmVsPVwiTsOkY2hzdGVyIFNjaHJpdHRcIj5uYXZpZ2F0ZV9uZXh0PC9tYXQtaWNvbj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==
