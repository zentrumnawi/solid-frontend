import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SOLID_CORE_CONFIG } from '../../solid-core-config';
import OpenSeadragon from 'openseadragon';
import { BreakpointObserver } from '@angular/cdk/layout';
import * as i0 from '@angular/core';
import * as i1 from '@angular/cdk/layout';
import * as i2 from '@angular/common';
import * as i3 from '@angular/material/icon';
import * as i4 from '@angular/material/button';
import * as i5 from '@angular/material/dialog';
import * as i6 from '../markdown/markdown.component';
import * as i7 from '../media-toolbar/media-toolbar.component';
import * as i8 from '../audio-toolbar/audio-toolbar.component';
export var APP;
(function (APP) {
  APP['DIVE'] = 'Div-e';
})(APP || (APP = {}));
export class MediaDialogComponent {
  data;
  name;
  coreConfig;
  _breakpointObserver;
  APP_NAME_DIVE = APP.DIVE;
  _viewer = null;
  hasAudio = false;
  hasDescription = false;
  isOverlayAbove = false;
  audioStarted = false;
  audioLoadError = false;
  audioEnded = false;
  expandUpDown = false;
  audioCollapsed = false;
  dziInitialized = false;
  onNextEmitter = new EventEmitter();
  onPrevEmitter = new EventEmitter();
  title_container;
  title_container_width = 0;
  title_width = 0;
  firstMovingAnimation = true;
  timeOut_1;
  timeOut_2;
  constructor(data, name, coreConfig, _breakpointObserver) {
    this.data = data;
    this.name = name;
    this.coreConfig = coreConfig;
    this._breakpointObserver = _breakpointObserver;
  }
  ngOnInit() {
    this._breakpointObserver
      .observe(['(max-width: 680px)'])
      .subscribe((isMobile) => {
        if (isMobile.matches) {
          this.isOverlayAbove = true;
        } else {
          this.isOverlayAbove = false;
        }
      });
    this._breakpointObserver
      .observe(['(max-width: 680px)'])
      .subscribe((expandUpDown) => {
        if (expandUpDown.matches) {
          this.expandUpDown = true;
        } else {
          this.expandUpDown = false;
        }
      });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.data.type === 'mediaObject') {
        let dzi = this.data.mediaObject.deepZoomLink;
        if (this.dziInitialized) {
          this._viewer?.open(dzi);
        } else {
          if (dzi) {
            if (!this.coreConfig.production) {
              // TODO: This workaround is required for deepzoom in dev environments. It will not work with other cdn domains.
              dzi = dzi.replace('https://cdn.geomat.uni-frankfurt.de', '');
            }
            this._viewer = OpenSeadragon({
              id: 'dzi-container',
              tileSources: dzi,
              zoomInButton: 'zoom-in-button',
              zoomOutButton: 'zoom-out-button',
              homeButton: 'home-button',
              showFullPageControl: false,
              visibilityRatio: 1.0,
              constrainDuringPan: true,
            });
          }
        }
        if (this.data.mediaObject.audiosrc) {
          this.hasAudio = true;
        } else {
          this.hasAudio = false;
        }
        if (this.data.mediaObject.description) {
          this.hasDescription = true;
        } else {
          this.hasDescription = false;
        }
        if (this.data.mediaObject.deepZoomLink) {
          this.dziInitialized = true;
        } else {
          this.dziInitialized = false;
        }
      } else {
        let dzi = this.data.image.deepZoomLink;
        if (dzi) {
          if (!this.coreConfig.production) {
            // TODO: This workaround is required for deepzoom in dev environments. It will not work with other cdn domains.
            dzi = dzi.replace('https://cdn.geomat.uni-frankfurt.de', '');
          }
          this._viewer = OpenSeadragon({
            id: 'dzi-container',
            tileSources: dzi,
            zoomInButton: 'zoom-in-button',
            zoomOutButton: 'zoom-out-button',
            homeButton: 'home-button',
            showFullPageControl: false,
            visibilityRatio: 1.0,
            constrainDuringPan: true,
          });
        }
        if (this.data.image.audiosrc) {
          this.hasAudio = true;
        } else {
          this.hasAudio = false;
        }
        if (this.data.image.description) {
          this.hasDescription = true;
        } else {
          this.hasDescription = false;
        }
      }
    }, 0);
    this.handleLongTitle();
  }
  handleLongTitle() {
    clearTimeout(this.timeOut_1);
    clearTimeout(this.timeOut_2);
    this.timeOut_1 = setTimeout(() => {
      this.firstMovingAnimation = true;
      this.title_container_width =
        this.title_container?.nativeElement.offsetWidth;
      this.title_width =
        this.title_container?.nativeElement.firstElementChild.offsetWidth;
      if (this.title_container?.nativeElement.firstElementChild) {
        this.timeOut_2 = setTimeout(() => {
          this.firstMovingAnimation = false;
        }, 10500);
      }
    }, 0);
  }
  onResize() {
    this.handleLongTitle();
  }
  handleAudioErrorEvent() {
    this.audioLoadError = true;
  }
  handleAudioEndedEvent() {
    this.audioStarted = false;
    this.audioCollapsed = false;
    this.audioEnded = true;
  }
  onNext() {
    this.onNextEmitter.emit();
    this.audioLoadError = false;
    this.audioStarted = false;
    this.audioCollapsed = false;
    this.firstMovingAnimation = false;
    this.ngAfterViewInit();
  }
  onPrev() {
    this.onPrevEmitter.emit();
    this.audioLoadError = false;
    this.audioStarted = false;
    this.audioCollapsed = false;
    this.firstMovingAnimation = false;
    this.ngAfterViewInit();
  }
  onPlayClick() {
    this.audioEnded = false;
    this.audioStarted = true;
  }
  onExpandCollapse() {
    this.audioCollapsed = !this.audioCollapsed;
  }
  ngOnDestroy() {
    if (this._viewer) {
      this._viewer.destroy();
    }
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MediaDialogComponent,
    deps: [
      { token: MAT_DIALOG_DATA },
      { token: MAT_DIALOG_DATA },
      { token: SOLID_CORE_CONFIG },
      { token: i1.BreakpointObserver },
    ],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: MediaDialogComponent,
    selector: 'solid-core-media-dialog',
    host: { listeners: { 'window:resize': 'onResize($event)' } },
    viewQueries: [
      {
        propertyName: 'title_container',
        first: true,
        predicate: ['title_container'],
        descendants: true,
      },
    ],
    ngImport: i0,
    template:
      '<ng-container *ngIf="data.type === \'mediaObject\'">\r\n  <div mat-dialog-title class="mat-media-dialog-title">\r\n    <div class="title-container" #title_container>\r\n      <div\r\n        *ngIf="coreConfig.appName === this.APP_NAME_DIVE"\r\n        class="title"\r\n        [class.long-title]="\r\n          title_width >= title_container_width && firstMovingAnimation\r\n        "\r\n        [class.long-title-1]="\r\n          title_width >= title_container_width && !firstMovingAnimation\r\n        "\r\n      >\r\n        <div [data]="data.name" style="display: inline" markdown></div>\r\n        <span *ngIf="data.mediaObject.getTitle" class="media-object-title">\r\n          | {{ data.mediaObject.getTitle }}</span\r\n        >\r\n      </div>\r\n      <div\r\n        *ngIf="coreConfig.appName !== this.APP_NAME_DIVE"\r\n        class="title"\r\n        [class.long-title]="\r\n          title_width >= title_container_width && firstMovingAnimation\r\n        "\r\n        [class.long-title-1]="\r\n          title_width >= title_container_width && !firstMovingAnimation\r\n        "\r\n      >\r\n        {{ data.name }}\r\n        <span *ngIf="data.mediaObject.getTitle" class="media-object-title">\r\n          | {{ data.mediaObject.getTitle }}</span\r\n        >\r\n      </div>\r\n    </div>\r\n    <div>\r\n      <button class="closeBtn" mat-icon-button mat-dialog-close>\r\n        <mat-icon>close</mat-icon>\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <ng-container\r\n    *ngIf="data.mediaObject.deepZoomLink as dziFile; then deepZoom; else noZoom"\r\n  ></ng-container>\r\n  <!-- I decide to keep it bcs we maybe need it in the future -->\r\n  <!-- <div id="description-container" *ngIf="hasDescription">\r\n  <span markdown [data]="data.mediaObject.description"></span>\r\n  </div> -->\r\n  <ng-template #deepZoom>\r\n    <div mat-dialog-content>\r\n      <div id="dzi-container"></div>\r\n      <button\r\n        *ngIf="data.hasNavigationInDialog"\r\n        mat-mini-fab\r\n        color="accent"\r\n        class="button-before"\r\n        (click)="onPrev()"\r\n      >\r\n        <mat-icon aria-label="Vorheriger Schritt">navigate_before</mat-icon>\r\n      </button>\r\n      <button\r\n        *ngIf="data.hasNavigationInDialog"\r\n        class="button-next"\r\n        mat-mini-fab\r\n        color="accent"\r\n        (click)="onNext()"\r\n      >\r\n        <mat-icon aria-label="N\u00E4chster Schritt">navigate_next</mat-icon>\r\n      </button>\r\n      <div class="toolbar-container">\r\n        <div class="spacer"></div>\r\n        <solid-core-audio-toolbar\r\n          *ngIf="hasAudio"\r\n          [audiosrc]="data.mediaObject.audiosrc"\r\n          [toolbar]="true"\r\n          [class.openAudioToolbar]="\r\n            audioStarted && !audioEnded && !audioCollapsed\r\n          "\r\n          [playAudio]="audioStarted"\r\n          (audioErrorEventEmitter)="handleAudioErrorEvent()"\r\n          (audioEndedEventEmitter)="handleAudioEndedEvent()"\r\n        ></solid-core-audio-toolbar>\r\n        <div class="dialog-toolbar">\r\n          <button\r\n            *ngIf="hasAudio"\r\n            (click)="onPlayClick()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n            [class.disappear]="audioStarted && !audioEnded"\r\n          >\r\n            <mat-icon>headphones</mat-icon>\r\n          </button>\r\n          <button\r\n            *ngIf="audioStarted && expandUpDown"\r\n            (click)="onExpandCollapse()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n          >\r\n            <mat-icon>{{\r\n              audioCollapsed ? \'headphones\' : \'expand_less\'\r\n            }}</mat-icon>\r\n          </button>\r\n          <button\r\n            *ngIf="audioStarted && !expandUpDown"\r\n            (click)="onExpandCollapse()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n          >\r\n            <mat-icon>{{\r\n              audioCollapsed ? \'headphones\' : \'chevron_right\'\r\n            }}</mat-icon>\r\n          </button>\r\n          <solid-core-media-toolbar\r\n            [mediaObject]="data.mediaObject"\r\n            [hasAttributions]="true"\r\n            [hasDialog]="false"\r\n            [hasDziTools]="true"\r\n            [data]="data"\r\n            [isOverlayAboveOfDziZoomToolbar]="isOverlayAbove"\r\n            [hasDescription]="hasDescription"\r\n          ></solid-core-media-toolbar>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </ng-template>\r\n\r\n  <ng-template #noZoom>\r\n    <div mat-dialog-content>\r\n      <div class="image">\r\n        <img\r\n          [src]="data.mediaObject.getRawImage(\'large\')"\r\n          [alt]="data.mediaObject.alt"\r\n          [class.landscape]="data.mediaObject.isLandscape"\r\n        />\r\n      </div>\r\n      <button\r\n        *ngIf="data.hasNavigationInDialog"\r\n        mat-mini-fab\r\n        color="accent"\r\n        class="button-before"\r\n        (click)="onPrev()"\r\n      >\r\n        <mat-icon aria-label="Vorheriger Schritt">navigate_before</mat-icon>\r\n      </button>\r\n      <button\r\n        *ngIf="data.hasNavigationInDialog"\r\n        class="button-next"\r\n        mat-mini-fab\r\n        color="accent"\r\n        (click)="onNext()"\r\n      >\r\n        <mat-icon aria-label="N\u00E4chster Schritt">navigate_next</mat-icon>\r\n      </button>\r\n      <div class="toolbar-container">\r\n        <div class="spacer"></div>\r\n        <solid-core-audio-toolbar\r\n          class="audio-toolbar"\r\n          *ngIf="hasAudio"\r\n          [audiosrc]="data.mediaObject.audiosrc"\r\n          [toolbar]="true"\r\n          [class.openAudioToolbar]="\r\n            audioStarted && !audioEnded && !audioCollapsed\r\n          "\r\n          [playAudio]="audioStarted"\r\n          (audioErrorEventEmitter)="handleAudioErrorEvent()"\r\n          (audioEndedEventEmitter)="handleAudioEndedEvent()"\r\n        ></solid-core-audio-toolbar>\r\n        <div class="dialog-toolbar">\r\n          <button\r\n            *ngIf="hasAudio"\r\n            (click)="onPlayClick()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n            [class.disappear]="audioStarted && !audioEnded"\r\n          >\r\n            <mat-icon>headphones</mat-icon>\r\n          </button>\r\n          <button\r\n            *ngIf="audioStarted && expandUpDown"\r\n            (click)="onExpandCollapse()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n          >\r\n            <mat-icon>{{\r\n              audioCollapsed ? \'headphones\' : \'expand_less\'\r\n            }}</mat-icon>\r\n          </button>\r\n          <button\r\n            *ngIf="audioStarted && !expandUpDown"\r\n            (click)="onExpandCollapse()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n          >\r\n            <mat-icon>{{\r\n              audioCollapsed ? \'headphones\' : \'chevron_right\'\r\n            }}</mat-icon>\r\n          </button>\r\n          <solid-core-media-toolbar\r\n            [mediaObject]="data.mediaObject"\r\n            [hasAttributions]="true"\r\n            [hasDialog]="false"\r\n            [hasDziTools]="false"\r\n            [data]="data"\r\n            [isOverlayAboveOfNonDziZoomToolbar]="isOverlayAbove"\r\n            [hasDescription]="hasDescription"\r\n            [isToolbarInDialog]="true"\r\n          ></solid-core-media-toolbar>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </ng-template>\r\n</ng-container>\r\n\r\n<ng-container *ngIf="data.type === \'photograph\'">\r\n  <div mat-dialog-title class="mat-dialog-title">\r\n    <div class="title-container" #title_container>\r\n      <div\r\n        [class.long-title]="\r\n          title_width >= title_container_width && firstMovingAnimation\r\n        "\r\n        [class.long-title-1]="\r\n          title_width >= title_container_width && !firstMovingAnimation\r\n        "\r\n      >\r\n        {{ data.name }}\r\n        <span *ngIf="data.image.getTitle" class="media-object-title">\r\n          - {{ data.image.getTitle }}</span\r\n        >\r\n      </div>\r\n    </div>\r\n    <button mat-icon-button mat-dialog-close>\r\n      <mat-icon>close</mat-icon>\r\n    </button>\r\n  </div>\r\n  <ng-container\r\n    *ngIf="data.image.deepZoomLink as dziFile; then deepZoom; else noZoom"\r\n  ></ng-container>\r\n  <ng-template #deepZoom>\r\n    <div mat-dialog-content>\r\n      <div id="dzi-container"></div>\r\n      <div class="toolbar-container">\r\n        <div class="spacer"></div>\r\n        <solid-core-audio-toolbar\r\n          *ngIf="hasAudio"\r\n          [audiosrc]="data.image.audiosrc"\r\n          [toolbar]="true"\r\n          [class.openAudioToolbar]="\r\n            audioStarted && !audioEnded && !audioCollapsed\r\n          "\r\n          [playAudio]="audioStarted"\r\n          (audioErrorEventEmitter)="handleAudioErrorEvent()"\r\n          (audioEndedEventEmitter)="handleAudioEndedEvent()"\r\n        >\r\n        </solid-core-audio-toolbar>\r\n        <div class="dialog-toolbar">\r\n          <button\r\n            *ngIf="hasAudio"\r\n            (click)="onPlayClick()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n            [class.disappear]="audioStarted && !audioEnded"\r\n          >\r\n            <mat-icon>headphones</mat-icon>\r\n          </button>\r\n          <button\r\n            *ngIf="audioStarted && expandUpDown"\r\n            (click)="onExpandCollapse()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n          >\r\n            <mat-icon>{{\r\n              audioCollapsed ? \'headphones\' : \'expand_less\'\r\n            }}</mat-icon>\r\n          </button>\r\n          <button\r\n            *ngIf="audioStarted && !expandUpDown"\r\n            (click)="onExpandCollapse()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n          >\r\n            <mat-icon>{{\r\n              audioCollapsed ? \'headphones\' : \'chevron_right\'\r\n            }}</mat-icon>\r\n          </button>\r\n          <solid-core-media-toolbar\r\n            [image]="data.image"\r\n            [hasAttributions]="true"\r\n            [hasDialog]="false"\r\n            [hasDziTools]="true"\r\n            [data]="data"\r\n            [isOverlayAboveOfDziZoomToolbar]="isOverlayAbove"\r\n            [hasDescription]="hasDescription"\r\n          ></solid-core-media-toolbar>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </ng-template>\r\n  <ng-template #noZoom>\r\n    <div mat-dialog-content>\r\n      <div class="image">\r\n        <img\r\n          [src]="data.image.getRawImage(\'large\')"\r\n          [alt]="data.image.alt"\r\n          [class.landscape]="data.image.isLandscape"\r\n        />\r\n      </div>\r\n      <div class="toolbar-container">\r\n        <solid-core-audio-toolbar\r\n          *ngIf="hasAudio"\r\n          [audiosrc]="data.image.audiosrc"\r\n          [toolbar]="true"\r\n          [class.openAudioToolbar]="\r\n            audioStarted && !audioEnded && !audioCollapsed\r\n          "\r\n          [playAudio]="audioStarted"\r\n          (audioErrorEventEmitter)="handleAudioErrorEvent()"\r\n          (audioEndedEventEmitter)="handleAudioEndedEvent()"\r\n        >\r\n        </solid-core-audio-toolbar>\r\n        <div class="spacer"></div>\r\n        <div class="dialog-toolbar">\r\n          <button\r\n            *ngIf="hasAudio"\r\n            (click)="onPlayClick()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n            [class.disappear]="audioStarted && !audioEnded"\r\n          >\r\n            <mat-icon>headphones</mat-icon>\r\n          </button>\r\n          <button\r\n            *ngIf="audioStarted && expandUpDown"\r\n            (click)="onExpandCollapse()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n          >\r\n            <mat-icon>{{\r\n              audioCollapsed ? \'headphones\' : \'expand_less\'\r\n            }}</mat-icon>\r\n          </button>\r\n          <button\r\n            *ngIf="audioStarted && !expandUpDown"\r\n            (click)="onExpandCollapse()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n          >\r\n            <mat-icon>{{\r\n              audioCollapsed ? \'headphones\' : \'chevron_right\'\r\n            }}</mat-icon>\r\n          </button>\r\n          <solid-core-media-toolbar\r\n            [image]="data.image"\r\n            [hasAttributions]="true"\r\n            [hasDialog]="false"\r\n            [hasDziTools]="false"\r\n            [data]="data"\r\n            [isOverlayAboveOfNonDziZoomToolbar]="isOverlayAbove"\r\n            [hasDescription]="hasDescription"\r\n            [isToolbarInDialog]="true"\r\n          ></solid-core-media-toolbar>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </ng-template>\r\n</ng-container>\r\n',
    styles: [
      ':host{width:100%;height:100%;display:block}div.mat-media-dialog-title{display:flex;justify-content:space-between;align-items:center;padding-left:20px;height:42px;margin:0}div.mat-media-dialog-title ::ng-deep .mat-button-focus-overlay{background-color:transparent!important}div.mat-media-dialog-title div.title-container{overflow:hidden;white-space:nowrap;flex:1;margin-right:.5em}div.mat-media-dialog-title div.title{display:inline-block}div.mat-media-dialog-title div.title ::ng-deep p{display:inline-block;margin-bottom:0;margin-top:0}div.mat-media-dialog-title div.title ::ng-deep span.media-object-title{font-weight:400}div.long-title{display:inline-block;animation:text-moving-1 12s linear infinite}div.long-title-1{display:inline-block;animation:text-moving-2 11s linear infinite}@keyframes text-moving-1{0%{transform:translate(0)}20%{transform:translate(0)}80%{transform:translate(-100%)}to{transform:translate(-150%)}}@keyframes text-moving-2{0%{transform:translate(100%)}to{transform:translate(-100%)}}div.mat-dialog-content{margin:0;padding:0;max-height:calc(100% - 64px);height:100%;position:relative;display:flex;flex-direction:column;overflow:hidden}div.mat-dialog-content div#dzi-container{width:100%;margin-bottom:-53px;flex:1;z-index:0}div.mat-dialog-content .image{flex:1;display:flex;max-height:100%;width:100%;margin-bottom:-53px}div.mat-dialog-content .image img{margin:auto}img{max-height:100%;max-width:100%;display:block}img.landscape{max-width:100%;max-height:100%;height:auto;border-radius:inherit}#description-container{max-height:10%;overflow:auto;padding:0 .5em 0 .8em;margin:.3em 0}::ng-deep .solid-core-media-dialog mat-dialog-container{overflow:hidden;padding:0}.toolbar-container{width:100%;display:flex}.toolbar-container div.dialog-toolbar{display:flex;margin-bottom:5px}solid-core-audio-toolbar{padding:0;z-index:1;margin-left:1.3em}@media (min-width: 681px){solid-core-audio-toolbar ::ng-deep .toolbar{border-radius:20px}}@media (min-width: 681px) and (max-width: 839px){solid-core-audio-toolbar{margin-left:.85em}solid-core-audio-toolbar ::ng-deep .mat-slider-horizontal.volumeSlider{display:none}solid-core-audio-toolbar ::ng-deep .toolbar .play-btn{margin-left:0!important}}@media (min-width: 470px) and (max-width: 680px){solid-core-audio-toolbar ::ng-deep .mat-slider-horizontal.volumeSlider{display:block}}@media (min-width: 681px){solid-core-audio-toolbar{width:0;margin-right:.5em;transition:width .8s cubic-bezier(.45,.05,.55,.95)}.openAudioToolbar{width:100%}}div.spacer{flex:1}@media (max-width: 680px){.toolbar-container{flex-direction:column-reverse}.toolbar-container .dialog-toolbar{justify-content:flex-end}solid-core-audio-toolbar{height:0;margin-left:0;margin-right:0;transition:height .5s cubic-bezier(.45,.05,.55,.95)}.openAudioToolbar{height:40px}}.disappear{display:none!important}.button-before{position:absolute;top:50%;transform:translateY(-50%);left:.5em}.button-next{position:absolute;top:50%;transform:translateY(-50%);right:.5em}@media (min-width: 681px){.button-before{left:.85em}.button-next{right:.85em}}.closeBtn{width:23px;margin-top:16px;margin-right:8px}.closeBtn mat-icon{vertical-align:top;font-size:25px;font-weight:600}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
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
        type: i4.MatIconButton,
        selector: 'button[mat-icon-button]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'component',
        type: i4.MatMiniFabButton,
        selector: 'button[mat-mini-fab]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'directive',
        type: i5.MatDialogClose,
        selector: '[mat-dialog-close], [matDialogClose]',
        inputs: ['aria-label', 'type', 'mat-dialog-close', 'matDialogClose'],
        exportAs: ['matDialogClose'],
      },
      {
        kind: 'directive',
        type: i5.MatDialogTitle,
        selector: '[mat-dialog-title], [matDialogTitle]',
        inputs: ['id'],
        exportAs: ['matDialogTitle'],
      },
      {
        kind: 'directive',
        type: i5.MatDialogContent,
        selector:
          '[mat-dialog-content], mat-dialog-content, [matDialogContent]',
      },
      {
        kind: 'component',
        type: i6.MarkdownComponent,
        selector: '[markdown]',
        inputs: ['inline', 'data', 'appendData'],
      },
      {
        kind: 'component',
        type: i7.MediaToolbarComponent,
        selector: 'solid-core-media-toolbar',
        inputs: [
          'mediaObject',
          'image',
          'name',
          'hasAttributions',
          'hasDialog',
          'hasDziTools',
          'hasAudio',
          'hasDescription',
          'hasDescriptionToggle',
          'data',
          'slideshowPageChanged',
          'openDialogRequest',
          'isToolbarInDialog',
          'isOverlayAboveOfDziZoomToolbar',
          'isOverlayAboveOfNonDziZoomToolbar',
          'hasNavigationInDialog',
        ],
        outputs: [
          'descriptionToggle',
          'closeDialogEventEmitter',
          'NextDialogEmitter',
          'PrevDialogEmitter',
        ],
      },
      {
        kind: 'component',
        type: i8.AudioToolbarComponent,
        selector: 'solid-core-audio-toolbar',
        inputs: ['audiosrc', 'description', 'toolbar', 'playAudio'],
        outputs: ['audioErrorEventEmitter', 'audioEndedEventEmitter'],
      },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: MediaDialogComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-core-media-dialog',
          template:
            '<ng-container *ngIf="data.type === \'mediaObject\'">\r\n  <div mat-dialog-title class="mat-media-dialog-title">\r\n    <div class="title-container" #title_container>\r\n      <div\r\n        *ngIf="coreConfig.appName === this.APP_NAME_DIVE"\r\n        class="title"\r\n        [class.long-title]="\r\n          title_width >= title_container_width && firstMovingAnimation\r\n        "\r\n        [class.long-title-1]="\r\n          title_width >= title_container_width && !firstMovingAnimation\r\n        "\r\n      >\r\n        <div [data]="data.name" style="display: inline" markdown></div>\r\n        <span *ngIf="data.mediaObject.getTitle" class="media-object-title">\r\n          | {{ data.mediaObject.getTitle }}</span\r\n        >\r\n      </div>\r\n      <div\r\n        *ngIf="coreConfig.appName !== this.APP_NAME_DIVE"\r\n        class="title"\r\n        [class.long-title]="\r\n          title_width >= title_container_width && firstMovingAnimation\r\n        "\r\n        [class.long-title-1]="\r\n          title_width >= title_container_width && !firstMovingAnimation\r\n        "\r\n      >\r\n        {{ data.name }}\r\n        <span *ngIf="data.mediaObject.getTitle" class="media-object-title">\r\n          | {{ data.mediaObject.getTitle }}</span\r\n        >\r\n      </div>\r\n    </div>\r\n    <div>\r\n      <button class="closeBtn" mat-icon-button mat-dialog-close>\r\n        <mat-icon>close</mat-icon>\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <ng-container\r\n    *ngIf="data.mediaObject.deepZoomLink as dziFile; then deepZoom; else noZoom"\r\n  ></ng-container>\r\n  <!-- I decide to keep it bcs we maybe need it in the future -->\r\n  <!-- <div id="description-container" *ngIf="hasDescription">\r\n  <span markdown [data]="data.mediaObject.description"></span>\r\n  </div> -->\r\n  <ng-template #deepZoom>\r\n    <div mat-dialog-content>\r\n      <div id="dzi-container"></div>\r\n      <button\r\n        *ngIf="data.hasNavigationInDialog"\r\n        mat-mini-fab\r\n        color="accent"\r\n        class="button-before"\r\n        (click)="onPrev()"\r\n      >\r\n        <mat-icon aria-label="Vorheriger Schritt">navigate_before</mat-icon>\r\n      </button>\r\n      <button\r\n        *ngIf="data.hasNavigationInDialog"\r\n        class="button-next"\r\n        mat-mini-fab\r\n        color="accent"\r\n        (click)="onNext()"\r\n      >\r\n        <mat-icon aria-label="N\u00E4chster Schritt">navigate_next</mat-icon>\r\n      </button>\r\n      <div class="toolbar-container">\r\n        <div class="spacer"></div>\r\n        <solid-core-audio-toolbar\r\n          *ngIf="hasAudio"\r\n          [audiosrc]="data.mediaObject.audiosrc"\r\n          [toolbar]="true"\r\n          [class.openAudioToolbar]="\r\n            audioStarted && !audioEnded && !audioCollapsed\r\n          "\r\n          [playAudio]="audioStarted"\r\n          (audioErrorEventEmitter)="handleAudioErrorEvent()"\r\n          (audioEndedEventEmitter)="handleAudioEndedEvent()"\r\n        ></solid-core-audio-toolbar>\r\n        <div class="dialog-toolbar">\r\n          <button\r\n            *ngIf="hasAudio"\r\n            (click)="onPlayClick()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n            [class.disappear]="audioStarted && !audioEnded"\r\n          >\r\n            <mat-icon>headphones</mat-icon>\r\n          </button>\r\n          <button\r\n            *ngIf="audioStarted && expandUpDown"\r\n            (click)="onExpandCollapse()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n          >\r\n            <mat-icon>{{\r\n              audioCollapsed ? \'headphones\' : \'expand_less\'\r\n            }}</mat-icon>\r\n          </button>\r\n          <button\r\n            *ngIf="audioStarted && !expandUpDown"\r\n            (click)="onExpandCollapse()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n          >\r\n            <mat-icon>{{\r\n              audioCollapsed ? \'headphones\' : \'chevron_right\'\r\n            }}</mat-icon>\r\n          </button>\r\n          <solid-core-media-toolbar\r\n            [mediaObject]="data.mediaObject"\r\n            [hasAttributions]="true"\r\n            [hasDialog]="false"\r\n            [hasDziTools]="true"\r\n            [data]="data"\r\n            [isOverlayAboveOfDziZoomToolbar]="isOverlayAbove"\r\n            [hasDescription]="hasDescription"\r\n          ></solid-core-media-toolbar>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </ng-template>\r\n\r\n  <ng-template #noZoom>\r\n    <div mat-dialog-content>\r\n      <div class="image">\r\n        <img\r\n          [src]="data.mediaObject.getRawImage(\'large\')"\r\n          [alt]="data.mediaObject.alt"\r\n          [class.landscape]="data.mediaObject.isLandscape"\r\n        />\r\n      </div>\r\n      <button\r\n        *ngIf="data.hasNavigationInDialog"\r\n        mat-mini-fab\r\n        color="accent"\r\n        class="button-before"\r\n        (click)="onPrev()"\r\n      >\r\n        <mat-icon aria-label="Vorheriger Schritt">navigate_before</mat-icon>\r\n      </button>\r\n      <button\r\n        *ngIf="data.hasNavigationInDialog"\r\n        class="button-next"\r\n        mat-mini-fab\r\n        color="accent"\r\n        (click)="onNext()"\r\n      >\r\n        <mat-icon aria-label="N\u00E4chster Schritt">navigate_next</mat-icon>\r\n      </button>\r\n      <div class="toolbar-container">\r\n        <div class="spacer"></div>\r\n        <solid-core-audio-toolbar\r\n          class="audio-toolbar"\r\n          *ngIf="hasAudio"\r\n          [audiosrc]="data.mediaObject.audiosrc"\r\n          [toolbar]="true"\r\n          [class.openAudioToolbar]="\r\n            audioStarted && !audioEnded && !audioCollapsed\r\n          "\r\n          [playAudio]="audioStarted"\r\n          (audioErrorEventEmitter)="handleAudioErrorEvent()"\r\n          (audioEndedEventEmitter)="handleAudioEndedEvent()"\r\n        ></solid-core-audio-toolbar>\r\n        <div class="dialog-toolbar">\r\n          <button\r\n            *ngIf="hasAudio"\r\n            (click)="onPlayClick()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n            [class.disappear]="audioStarted && !audioEnded"\r\n          >\r\n            <mat-icon>headphones</mat-icon>\r\n          </button>\r\n          <button\r\n            *ngIf="audioStarted && expandUpDown"\r\n            (click)="onExpandCollapse()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n          >\r\n            <mat-icon>{{\r\n              audioCollapsed ? \'headphones\' : \'expand_less\'\r\n            }}</mat-icon>\r\n          </button>\r\n          <button\r\n            *ngIf="audioStarted && !expandUpDown"\r\n            (click)="onExpandCollapse()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n          >\r\n            <mat-icon>{{\r\n              audioCollapsed ? \'headphones\' : \'chevron_right\'\r\n            }}</mat-icon>\r\n          </button>\r\n          <solid-core-media-toolbar\r\n            [mediaObject]="data.mediaObject"\r\n            [hasAttributions]="true"\r\n            [hasDialog]="false"\r\n            [hasDziTools]="false"\r\n            [data]="data"\r\n            [isOverlayAboveOfNonDziZoomToolbar]="isOverlayAbove"\r\n            [hasDescription]="hasDescription"\r\n            [isToolbarInDialog]="true"\r\n          ></solid-core-media-toolbar>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </ng-template>\r\n</ng-container>\r\n\r\n<ng-container *ngIf="data.type === \'photograph\'">\r\n  <div mat-dialog-title class="mat-dialog-title">\r\n    <div class="title-container" #title_container>\r\n      <div\r\n        [class.long-title]="\r\n          title_width >= title_container_width && firstMovingAnimation\r\n        "\r\n        [class.long-title-1]="\r\n          title_width >= title_container_width && !firstMovingAnimation\r\n        "\r\n      >\r\n        {{ data.name }}\r\n        <span *ngIf="data.image.getTitle" class="media-object-title">\r\n          - {{ data.image.getTitle }}</span\r\n        >\r\n      </div>\r\n    </div>\r\n    <button mat-icon-button mat-dialog-close>\r\n      <mat-icon>close</mat-icon>\r\n    </button>\r\n  </div>\r\n  <ng-container\r\n    *ngIf="data.image.deepZoomLink as dziFile; then deepZoom; else noZoom"\r\n  ></ng-container>\r\n  <ng-template #deepZoom>\r\n    <div mat-dialog-content>\r\n      <div id="dzi-container"></div>\r\n      <div class="toolbar-container">\r\n        <div class="spacer"></div>\r\n        <solid-core-audio-toolbar\r\n          *ngIf="hasAudio"\r\n          [audiosrc]="data.image.audiosrc"\r\n          [toolbar]="true"\r\n          [class.openAudioToolbar]="\r\n            audioStarted && !audioEnded && !audioCollapsed\r\n          "\r\n          [playAudio]="audioStarted"\r\n          (audioErrorEventEmitter)="handleAudioErrorEvent()"\r\n          (audioEndedEventEmitter)="handleAudioEndedEvent()"\r\n        >\r\n        </solid-core-audio-toolbar>\r\n        <div class="dialog-toolbar">\r\n          <button\r\n            *ngIf="hasAudio"\r\n            (click)="onPlayClick()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n            [class.disappear]="audioStarted && !audioEnded"\r\n          >\r\n            <mat-icon>headphones</mat-icon>\r\n          </button>\r\n          <button\r\n            *ngIf="audioStarted && expandUpDown"\r\n            (click)="onExpandCollapse()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n          >\r\n            <mat-icon>{{\r\n              audioCollapsed ? \'headphones\' : \'expand_less\'\r\n            }}</mat-icon>\r\n          </button>\r\n          <button\r\n            *ngIf="audioStarted && !expandUpDown"\r\n            (click)="onExpandCollapse()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n          >\r\n            <mat-icon>{{\r\n              audioCollapsed ? \'headphones\' : \'chevron_right\'\r\n            }}</mat-icon>\r\n          </button>\r\n          <solid-core-media-toolbar\r\n            [image]="data.image"\r\n            [hasAttributions]="true"\r\n            [hasDialog]="false"\r\n            [hasDziTools]="true"\r\n            [data]="data"\r\n            [isOverlayAboveOfDziZoomToolbar]="isOverlayAbove"\r\n            [hasDescription]="hasDescription"\r\n          ></solid-core-media-toolbar>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </ng-template>\r\n  <ng-template #noZoom>\r\n    <div mat-dialog-content>\r\n      <div class="image">\r\n        <img\r\n          [src]="data.image.getRawImage(\'large\')"\r\n          [alt]="data.image.alt"\r\n          [class.landscape]="data.image.isLandscape"\r\n        />\r\n      </div>\r\n      <div class="toolbar-container">\r\n        <solid-core-audio-toolbar\r\n          *ngIf="hasAudio"\r\n          [audiosrc]="data.image.audiosrc"\r\n          [toolbar]="true"\r\n          [class.openAudioToolbar]="\r\n            audioStarted && !audioEnded && !audioCollapsed\r\n          "\r\n          [playAudio]="audioStarted"\r\n          (audioErrorEventEmitter)="handleAudioErrorEvent()"\r\n          (audioEndedEventEmitter)="handleAudioEndedEvent()"\r\n        >\r\n        </solid-core-audio-toolbar>\r\n        <div class="spacer"></div>\r\n        <div class="dialog-toolbar">\r\n          <button\r\n            *ngIf="hasAudio"\r\n            (click)="onPlayClick()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n            [class.disappear]="audioStarted && !audioEnded"\r\n          >\r\n            <mat-icon>headphones</mat-icon>\r\n          </button>\r\n          <button\r\n            *ngIf="audioStarted && expandUpDown"\r\n            (click)="onExpandCollapse()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n          >\r\n            <mat-icon>{{\r\n              audioCollapsed ? \'headphones\' : \'expand_less\'\r\n            }}</mat-icon>\r\n          </button>\r\n          <button\r\n            *ngIf="audioStarted && !expandUpDown"\r\n            (click)="onExpandCollapse()"\r\n            mat-mini-fab\r\n            color="accent"\r\n            [disabled]="audioLoadError"\r\n          >\r\n            <mat-icon>{{\r\n              audioCollapsed ? \'headphones\' : \'chevron_right\'\r\n            }}</mat-icon>\r\n          </button>\r\n          <solid-core-media-toolbar\r\n            [image]="data.image"\r\n            [hasAttributions]="true"\r\n            [hasDialog]="false"\r\n            [hasDziTools]="false"\r\n            [data]="data"\r\n            [isOverlayAboveOfNonDziZoomToolbar]="isOverlayAbove"\r\n            [hasDescription]="hasDescription"\r\n            [isToolbarInDialog]="true"\r\n          ></solid-core-media-toolbar>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </ng-template>\r\n</ng-container>\r\n',
          styles: [
            ':host{width:100%;height:100%;display:block}div.mat-media-dialog-title{display:flex;justify-content:space-between;align-items:center;padding-left:20px;height:42px;margin:0}div.mat-media-dialog-title ::ng-deep .mat-button-focus-overlay{background-color:transparent!important}div.mat-media-dialog-title div.title-container{overflow:hidden;white-space:nowrap;flex:1;margin-right:.5em}div.mat-media-dialog-title div.title{display:inline-block}div.mat-media-dialog-title div.title ::ng-deep p{display:inline-block;margin-bottom:0;margin-top:0}div.mat-media-dialog-title div.title ::ng-deep span.media-object-title{font-weight:400}div.long-title{display:inline-block;animation:text-moving-1 12s linear infinite}div.long-title-1{display:inline-block;animation:text-moving-2 11s linear infinite}@keyframes text-moving-1{0%{transform:translate(0)}20%{transform:translate(0)}80%{transform:translate(-100%)}to{transform:translate(-150%)}}@keyframes text-moving-2{0%{transform:translate(100%)}to{transform:translate(-100%)}}div.mat-dialog-content{margin:0;padding:0;max-height:calc(100% - 64px);height:100%;position:relative;display:flex;flex-direction:column;overflow:hidden}div.mat-dialog-content div#dzi-container{width:100%;margin-bottom:-53px;flex:1;z-index:0}div.mat-dialog-content .image{flex:1;display:flex;max-height:100%;width:100%;margin-bottom:-53px}div.mat-dialog-content .image img{margin:auto}img{max-height:100%;max-width:100%;display:block}img.landscape{max-width:100%;max-height:100%;height:auto;border-radius:inherit}#description-container{max-height:10%;overflow:auto;padding:0 .5em 0 .8em;margin:.3em 0}::ng-deep .solid-core-media-dialog mat-dialog-container{overflow:hidden;padding:0}.toolbar-container{width:100%;display:flex}.toolbar-container div.dialog-toolbar{display:flex;margin-bottom:5px}solid-core-audio-toolbar{padding:0;z-index:1;margin-left:1.3em}@media (min-width: 681px){solid-core-audio-toolbar ::ng-deep .toolbar{border-radius:20px}}@media (min-width: 681px) and (max-width: 839px){solid-core-audio-toolbar{margin-left:.85em}solid-core-audio-toolbar ::ng-deep .mat-slider-horizontal.volumeSlider{display:none}solid-core-audio-toolbar ::ng-deep .toolbar .play-btn{margin-left:0!important}}@media (min-width: 470px) and (max-width: 680px){solid-core-audio-toolbar ::ng-deep .mat-slider-horizontal.volumeSlider{display:block}}@media (min-width: 681px){solid-core-audio-toolbar{width:0;margin-right:.5em;transition:width .8s cubic-bezier(.45,.05,.55,.95)}.openAudioToolbar{width:100%}}div.spacer{flex:1}@media (max-width: 680px){.toolbar-container{flex-direction:column-reverse}.toolbar-container .dialog-toolbar{justify-content:flex-end}solid-core-audio-toolbar{height:0;margin-left:0;margin-right:0;transition:height .5s cubic-bezier(.45,.05,.55,.95)}.openAudioToolbar{height:40px}}.disappear{display:none!important}.button-before{position:absolute;top:50%;transform:translateY(-50%);left:.5em}.button-next{position:absolute;top:50%;transform:translateY(-50%);right:.5em}@media (min-width: 681px){.button-before{left:.85em}.button-next{right:.85em}}.closeBtn{width:23px;margin-top:16px;margin-right:8px}.closeBtn mat-icon{vertical-align:top;font-size:25px;font-weight:600}\n',
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
            args: [MAT_DIALOG_DATA],
          },
        ],
      },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [MAT_DIALOG_DATA],
          },
        ],
      },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [SOLID_CORE_CONFIG],
          },
        ],
      },
      { type: i1.BreakpointObserver },
    ];
  },
  propDecorators: {
    title_container: [
      {
        type: ViewChild,
        args: ['title_container', { static: false }],
      },
    ],
    onResize: [
      {
        type: HostListener,
        args: ['window:resize', ['$event']],
      },
    ],
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvY29yZS9zcmMvbGliL2NvbXBvbmVudHMvbWVkaWEtZGlhbG9nL21lZGlhLWRpYWxvZy5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL2NvcmUvc3JjL2xpYi9jb21wb25lbnRzL21lZGlhLWRpYWxvZy9tZWRpYS1kaWFsb2cuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEVBR04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsaUJBQWlCLEVBQW1CLE1BQU0seUJBQXlCLENBQUM7QUFFN0UsT0FBTyxhQUFhLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDOzs7Ozs7Ozs7O0FBRXpELE1BQU0sQ0FBTixJQUFZLEdBRVg7QUFGRCxXQUFZLEdBQUc7SUFDYixxQkFBYyxDQUFBO0FBQ2hCLENBQUMsRUFGVyxHQUFHLEtBQUgsR0FBRyxRQUVkO0FBT0QsTUFBTSxPQUFPLG9CQUFvQjtJQXdCRztJQUNBO0lBQ0U7SUFDMUI7SUExQkgsYUFBYSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFFeEIsT0FBTyxHQUFrQixJQUFJLENBQUM7SUFDL0IsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUNqQixjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQzlCLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDdkIsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUNyQixjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQ3ZC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OytCQUNFLHlCQUF5Qjs7MEJBNEJoQyxNQUFNOzJCQUFDLGVBQWU7OzBCQUN0QixNQUFNOzJCQUFDLGVBQWU7OzBCQUN0QixNQUFNOzJCQUFDLGlCQUFpQjs2RUFWcEIsZUFBZTtzQkFEckIsU0FBUzt1QkFBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBK0h4QyxRQUFRO3NCQURkLFlBQVk7dUJBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5qZWN0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgVmlld0NoaWxkLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNQVRfRElBTE9HX0RBVEEgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xyXG5pbXBvcnQgeyBTT0xJRF9DT1JFX0NPTkZJRywgU29saWRDb3JlQ29uZmlnIH0gZnJvbSAnLi4vLi4vc29saWQtY29yZS1jb25maWcnO1xyXG5pbXBvcnQgeyBWaWV3ZXIgfSBmcm9tICdvcGVuc2VhZHJhZ29uJztcclxuaW1wb3J0IE9wZW5TZWFkcmFnb24gZnJvbSAnb3BlbnNlYWRyYWdvbic7XHJcbmltcG9ydCB7IEJyZWFrcG9pbnRPYnNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9sYXlvdXQnO1xyXG5cclxuZXhwb3J0IGVudW0gQVBQIHtcclxuICBESVZFID0gJ0Rpdi1lJyxcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzb2xpZC1jb3JlLW1lZGlhLWRpYWxvZycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21lZGlhLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbWVkaWEtZGlhbG9nLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZWRpYURpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25Jbml0IHtcclxuICBwdWJsaWMgQVBQX05BTUVfRElWRSA9IEFQUC5ESVZFO1xyXG5cclxuICBwcml2YXRlIF92aWV3ZXI6IFZpZXdlciB8IG51bGwgPSBudWxsO1xyXG4gIHB1YmxpYyBoYXNBdWRpbyA9IGZhbHNlO1xyXG4gIHB1YmxpYyBoYXNEZXNjcmlwdGlvbiA9IGZhbHNlO1xyXG4gIGlzT3ZlcmxheUFib3ZlID0gZmFsc2U7XHJcbiAgYXVkaW9TdGFydGVkID0gZmFsc2U7XHJcbiAgYXVkaW9Mb2FkRXJyb3IgPSBmYWxzZTtcclxuICBhdWRpb0VuZGVkID0gZmFsc2U7XHJcbiAgZXhwYW5kVXBEb3duID0gZmFsc2U7XHJcbiAgYXVkaW9Db2xsYXBzZWQgPSBmYWxzZTtcclxuICBkemlJbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBvbk5leHRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIHB1YmxpYyBvblByZXZFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBWaWV3Q2hpbGQoJ3RpdGxlX2NvbnRhaW5lcicsIHsgc3RhdGljOiBmYWxzZSB9KVxyXG4gIHB1YmxpYyB0aXRsZV9jb250YWluZXI/OiBFbGVtZW50UmVmO1xyXG4gIHRpdGxlX2NvbnRhaW5lcl93aWR0aCA9IDA7XHJcbiAgdGl0bGVfd2lkdGggPSAwO1xyXG4gIHB1YmxpYyBmaXJzdE1vdmluZ0FuaW1hdGlvbiA9IHRydWU7XHJcbiAgcHVibGljIHRpbWVPdXRfMTogYW55O1xyXG4gIHB1YmxpYyB0aW1lT3V0XzI6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSxcclxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgbmFtZTogc3RyaW5nLFxyXG4gICAgQEluamVjdChTT0xJRF9DT1JFX0NPTkZJRykgcHVibGljIGNvcmVDb25maWc6IFNvbGlkQ29yZUNvbmZpZyxcclxuICAgIHByaXZhdGUgX2JyZWFrcG9pbnRPYnNlcnZlcjogQnJlYWtwb2ludE9ic2VydmVyXHJcbiAgKSB7fVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLl9icmVha3BvaW50T2JzZXJ2ZXJcclxuICAgICAgLm9ic2VydmUoWycobWF4LXdpZHRoOiA2ODBweCknXSlcclxuICAgICAgLnN1YnNjcmliZSgoaXNNb2JpbGUpID0+IHtcclxuICAgICAgICBpZiAoaXNNb2JpbGUubWF0Y2hlcykge1xyXG4gICAgICAgICAgdGhpcy5pc092ZXJsYXlBYm92ZSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuaXNPdmVybGF5QWJvdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5fYnJlYWtwb2ludE9ic2VydmVyXHJcbiAgICAgIC5vYnNlcnZlKFsnKG1heC13aWR0aDogNjgwcHgpJ10pXHJcbiAgICAgIC5zdWJzY3JpYmUoKGV4cGFuZFVwRG93bikgPT4ge1xyXG4gICAgICAgIGlmIChleHBhbmRVcERvd24ubWF0Y2hlcykge1xyXG4gICAgICAgICAgdGhpcy5leHBhbmRVcERvd24gPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmV4cGFuZFVwRG93biA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuZGF0YS50eXBlID09PSAnbWVkaWFPYmplY3QnKSB7XHJcbiAgICAgICAgbGV0IGR6aSA9IHRoaXMuZGF0YS5tZWRpYU9iamVjdC5kZWVwWm9vbUxpbms7XHJcbiAgICAgICAgaWYgKHRoaXMuZHppSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgICAgIHRoaXMuX3ZpZXdlcj8ub3BlbihkemkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoZHppKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jb3JlQ29uZmlnLnByb2R1Y3Rpb24pIHtcclxuICAgICAgICAgICAgICAvLyBUT0RPOiBUaGlzIHdvcmthcm91bmQgaXMgcmVxdWlyZWQgZm9yIGRlZXB6b29tIGluIGRldiBlbnZpcm9ubWVudHMuIEl0IHdpbGwgbm90IHdvcmsgd2l0aCBvdGhlciBjZG4gZG9tYWlucy5cclxuICAgICAgICAgICAgICBkemkgPSBkemkucmVwbGFjZSgnaHR0cHM6Ly9jZG4uZ2VvbWF0LnVuaS1mcmFua2Z1cnQuZGUnLCAnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fdmlld2VyID0gT3BlblNlYWRyYWdvbih7XHJcbiAgICAgICAgICAgICAgaWQ6ICdkemktY29udGFpbmVyJyxcclxuICAgICAgICAgICAgICB0aWxlU291cmNlczogZHppLFxyXG4gICAgICAgICAgICAgIHpvb21JbkJ1dHRvbjogJ3pvb20taW4tYnV0dG9uJyxcclxuICAgICAgICAgICAgICB6b29tT3V0QnV0dG9uOiAnem9vbS1vdXQtYnV0dG9uJyxcclxuICAgICAgICAgICAgICBob21lQnV0dG9uOiAnaG9tZS1idXR0b24nLFxyXG4gICAgICAgICAgICAgIHNob3dGdWxsUGFnZUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICAgIHZpc2liaWxpdHlSYXRpbzogMS4wLFxyXG4gICAgICAgICAgICAgIGNvbnN0cmFpbkR1cmluZ1BhbjogdHJ1ZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEubWVkaWFPYmplY3QuYXVkaW9zcmMpIHtcclxuICAgICAgICAgIHRoaXMuaGFzQXVkaW8gPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmhhc0F1ZGlvID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEubWVkaWFPYmplY3QuZGVzY3JpcHRpb24pIHtcclxuICAgICAgICAgIHRoaXMuaGFzRGVzY3JpcHRpb24gPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmhhc0Rlc2NyaXB0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEubWVkaWFPYmplY3QuZGVlcFpvb21MaW5rKSB7XHJcbiAgICAgICAgICB0aGlzLmR6aUluaXRpYWxpemVkID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5kemlJbml0aWFsaXplZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgZHppID0gdGhpcy5kYXRhLmltYWdlLmRlZXBab29tTGluaztcclxuXHJcbiAgICAgICAgaWYgKGR6aSkge1xyXG4gICAgICAgICAgaWYgKCF0aGlzLmNvcmVDb25maWcucHJvZHVjdGlvbikge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBUaGlzIHdvcmthcm91bmQgaXMgcmVxdWlyZWQgZm9yIGRlZXB6b29tIGluIGRldiBlbnZpcm9ubWVudHMuIEl0IHdpbGwgbm90IHdvcmsgd2l0aCBvdGhlciBjZG4gZG9tYWlucy5cclxuICAgICAgICAgICAgZHppID0gZHppLnJlcGxhY2UoJ2h0dHBzOi8vY2RuLmdlb21hdC51bmktZnJhbmtmdXJ0LmRlJywgJycpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5fdmlld2VyID0gT3BlblNlYWRyYWdvbih7XHJcbiAgICAgICAgICAgIGlkOiAnZHppLWNvbnRhaW5lcicsXHJcbiAgICAgICAgICAgIHRpbGVTb3VyY2VzOiBkemksXHJcbiAgICAgICAgICAgIHpvb21JbkJ1dHRvbjogJ3pvb20taW4tYnV0dG9uJyxcclxuICAgICAgICAgICAgem9vbU91dEJ1dHRvbjogJ3pvb20tb3V0LWJ1dHRvbicsXHJcbiAgICAgICAgICAgIGhvbWVCdXR0b246ICdob21lLWJ1dHRvbicsXHJcbiAgICAgICAgICAgIHNob3dGdWxsUGFnZUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICB2aXNpYmlsaXR5UmF0aW86IDEuMCxcclxuICAgICAgICAgICAgY29uc3RyYWluRHVyaW5nUGFuOiB0cnVlLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEuaW1hZ2UuYXVkaW9zcmMpIHtcclxuICAgICAgICAgIHRoaXMuaGFzQXVkaW8gPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmhhc0F1ZGlvID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEuaW1hZ2UuZGVzY3JpcHRpb24pIHtcclxuICAgICAgICAgIHRoaXMuaGFzRGVzY3JpcHRpb24gPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmhhc0Rlc2NyaXB0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LCAwKTtcclxuICAgIHRoaXMuaGFuZGxlTG9uZ1RpdGxlKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGFuZGxlTG9uZ1RpdGxlKCkge1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZU91dF8xKTtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVPdXRfMik7XHJcbiAgICB0aGlzLnRpbWVPdXRfMSA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmZpcnN0TW92aW5nQW5pbWF0aW9uID0gdHJ1ZTtcclxuICAgICAgdGhpcy50aXRsZV9jb250YWluZXJfd2lkdGggPVxyXG4gICAgICAgIHRoaXMudGl0bGVfY29udGFpbmVyPy5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgICB0aGlzLnRpdGxlX3dpZHRoID1cclxuICAgICAgICB0aGlzLnRpdGxlX2NvbnRhaW5lcj8ubmF0aXZlRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZC5vZmZzZXRXaWR0aDtcclxuICAgICAgaWYgKHRoaXMudGl0bGVfY29udGFpbmVyPy5uYXRpdmVFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkKSB7XHJcbiAgICAgICAgdGhpcy50aW1lT3V0XzIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuZmlyc3RNb3ZpbmdBbmltYXRpb24gPSBmYWxzZTtcclxuICAgICAgICB9LCAxMDUwMCk7XHJcbiAgICAgIH1cclxuICAgIH0sIDApO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXHJcbiAgcHVibGljIG9uUmVzaXplKCkge1xyXG4gICAgdGhpcy5oYW5kbGVMb25nVGl0bGUoKTtcclxuICB9XHJcblxyXG4gIGhhbmRsZUF1ZGlvRXJyb3JFdmVudCgpIHtcclxuICAgIHRoaXMuYXVkaW9Mb2FkRXJyb3IgPSB0cnVlO1xyXG4gIH1cclxuICBoYW5kbGVBdWRpb0VuZGVkRXZlbnQoKSB7XHJcbiAgICB0aGlzLmF1ZGlvU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5hdWRpb0NvbGxhcHNlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5hdWRpb0VuZGVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIG9uTmV4dCgpIHtcclxuICAgIHRoaXMub25OZXh0RW1pdHRlci5lbWl0KCk7XHJcbiAgICB0aGlzLmF1ZGlvTG9hZEVycm9yID0gZmFsc2U7XHJcbiAgICB0aGlzLmF1ZGlvU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5hdWRpb0NvbGxhcHNlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5maXJzdE1vdmluZ0FuaW1hdGlvbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5uZ0FmdGVyVmlld0luaXQoKTtcclxuICB9XHJcblxyXG4gIG9uUHJldigpIHtcclxuICAgIHRoaXMub25QcmV2RW1pdHRlci5lbWl0KCk7XHJcbiAgICB0aGlzLmF1ZGlvTG9hZEVycm9yID0gZmFsc2U7XHJcbiAgICB0aGlzLmF1ZGlvU3RhcnRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5hdWRpb0NvbGxhcHNlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5maXJzdE1vdmluZ0FuaW1hdGlvbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5uZ0FmdGVyVmlld0luaXQoKTtcclxuICB9XHJcblxyXG4gIG9uUGxheUNsaWNrKCkge1xyXG4gICAgdGhpcy5hdWRpb0VuZGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmF1ZGlvU3RhcnRlZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBvbkV4cGFuZENvbGxhcHNlKCkge1xyXG4gICAgdGhpcy5hdWRpb0NvbGxhcHNlZCA9ICF0aGlzLmF1ZGlvQ29sbGFwc2VkO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fdmlld2VyKSB7XHJcbiAgICAgIHRoaXMuX3ZpZXdlci5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRhLnR5cGUgPT09ICdtZWRpYU9iamVjdCdcIj5cclxuICA8ZGl2IG1hdC1kaWFsb2ctdGl0bGUgY2xhc3M9XCJtYXQtbWVkaWEtZGlhbG9nLXRpdGxlXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwidGl0bGUtY29udGFpbmVyXCIgI3RpdGxlX2NvbnRhaW5lcj5cclxuICAgICAgPGRpdlxyXG4gICAgICAgICpuZ0lmPVwiY29yZUNvbmZpZy5hcHBOYW1lID09PSB0aGlzLkFQUF9OQU1FX0RJVkVcIlxyXG4gICAgICAgIGNsYXNzPVwidGl0bGVcIlxyXG4gICAgICAgIFtjbGFzcy5sb25nLXRpdGxlXT1cIlxyXG4gICAgICAgICAgdGl0bGVfd2lkdGggPj0gdGl0bGVfY29udGFpbmVyX3dpZHRoICYmIGZpcnN0TW92aW5nQW5pbWF0aW9uXHJcbiAgICAgICAgXCJcclxuICAgICAgICBbY2xhc3MubG9uZy10aXRsZS0xXT1cIlxyXG4gICAgICAgICAgdGl0bGVfd2lkdGggPj0gdGl0bGVfY29udGFpbmVyX3dpZHRoICYmICFmaXJzdE1vdmluZ0FuaW1hdGlvblxyXG4gICAgICAgIFwiXHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2IFtkYXRhXT1cImRhdGEubmFtZVwiIHN0eWxlPVwiZGlzcGxheTogaW5saW5lXCIgbWFya2Rvd24+PC9kaXY+XHJcbiAgICAgICAgPHNwYW4gKm5nSWY9XCJkYXRhLm1lZGlhT2JqZWN0LmdldFRpdGxlXCIgY2xhc3M9XCJtZWRpYS1vYmplY3QtdGl0bGVcIj5cclxuICAgICAgICAgIHwge3sgZGF0YS5tZWRpYU9iamVjdC5nZXRUaXRsZSB9fTwvc3BhblxyXG4gICAgICAgID5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICAqbmdJZj1cImNvcmVDb25maWcuYXBwTmFtZSAhPT0gdGhpcy5BUFBfTkFNRV9ESVZFXCJcclxuICAgICAgICBjbGFzcz1cInRpdGxlXCJcclxuICAgICAgICBbY2xhc3MubG9uZy10aXRsZV09XCJcclxuICAgICAgICAgIHRpdGxlX3dpZHRoID49IHRpdGxlX2NvbnRhaW5lcl93aWR0aCAmJiBmaXJzdE1vdmluZ0FuaW1hdGlvblxyXG4gICAgICAgIFwiXHJcbiAgICAgICAgW2NsYXNzLmxvbmctdGl0bGUtMV09XCJcclxuICAgICAgICAgIHRpdGxlX3dpZHRoID49IHRpdGxlX2NvbnRhaW5lcl93aWR0aCAmJiAhZmlyc3RNb3ZpbmdBbmltYXRpb25cclxuICAgICAgICBcIlxyXG4gICAgICA+XHJcbiAgICAgICAge3sgZGF0YS5uYW1lIH19XHJcbiAgICAgICAgPHNwYW4gKm5nSWY9XCJkYXRhLm1lZGlhT2JqZWN0LmdldFRpdGxlXCIgY2xhc3M9XCJtZWRpYS1vYmplY3QtdGl0bGVcIj5cclxuICAgICAgICAgIHwge3sgZGF0YS5tZWRpYU9iamVjdC5nZXRUaXRsZSB9fTwvc3BhblxyXG4gICAgICAgID5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXY+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJjbG9zZUJ0blwiIG1hdC1pY29uLWJ1dHRvbiBtYXQtZGlhbG9nLWNsb3NlPlxyXG4gICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPG5nLWNvbnRhaW5lclxyXG4gICAgKm5nSWY9XCJkYXRhLm1lZGlhT2JqZWN0LmRlZXBab29tTGluayBhcyBkemlGaWxlOyB0aGVuIGRlZXBab29tOyBlbHNlIG5vWm9vbVwiXHJcbiAgPjwvbmctY29udGFpbmVyPlxyXG4gIDwhLS0gSSBkZWNpZGUgdG8ga2VlcCBpdCBiY3Mgd2UgbWF5YmUgbmVlZCBpdCBpbiB0aGUgZnV0dXJlIC0tPlxyXG4gIDwhLS0gPGRpdiBpZD1cImRlc2NyaXB0aW9uLWNvbnRhaW5lclwiICpuZ0lmPVwiaGFzRGVzY3JpcHRpb25cIj5cclxuICA8c3BhbiBtYXJrZG93biBbZGF0YV09XCJkYXRhLm1lZGlhT2JqZWN0LmRlc2NyaXB0aW9uXCI+PC9zcGFuPlxyXG4gIDwvZGl2PiAtLT5cclxuICA8bmctdGVtcGxhdGUgI2RlZXBab29tPlxyXG4gICAgPGRpdiBtYXQtZGlhbG9nLWNvbnRlbnQ+XHJcbiAgICAgIDxkaXYgaWQ9XCJkemktY29udGFpbmVyXCI+PC9kaXY+XHJcbiAgICAgIDxidXR0b25cclxuICAgICAgICAqbmdJZj1cImRhdGEuaGFzTmF2aWdhdGlvbkluRGlhbG9nXCJcclxuICAgICAgICBtYXQtbWluaS1mYWJcclxuICAgICAgICBjb2xvcj1cImFjY2VudFwiXHJcbiAgICAgICAgY2xhc3M9XCJidXR0b24tYmVmb3JlXCJcclxuICAgICAgICAoY2xpY2spPVwib25QcmV2KClcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPG1hdC1pY29uIGFyaWEtbGFiZWw9XCJWb3JoZXJpZ2VyIFNjaHJpdHRcIj5uYXZpZ2F0ZV9iZWZvcmU8L21hdC1pY29uPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgICpuZ0lmPVwiZGF0YS5oYXNOYXZpZ2F0aW9uSW5EaWFsb2dcIlxyXG4gICAgICAgIGNsYXNzPVwiYnV0dG9uLW5leHRcIlxyXG4gICAgICAgIG1hdC1taW5pLWZhYlxyXG4gICAgICAgIGNvbG9yPVwiYWNjZW50XCJcclxuICAgICAgICAoY2xpY2spPVwib25OZXh0KClcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPG1hdC1pY29uIGFyaWEtbGFiZWw9XCJOw6RjaHN0ZXIgU2Nocml0dFwiPm5hdmlnYXRlX25leHQ8L21hdC1pY29uPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPGRpdiBjbGFzcz1cInRvb2xiYXItY29udGFpbmVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPjwvZGl2PlxyXG4gICAgICAgIDxzb2xpZC1jb3JlLWF1ZGlvLXRvb2xiYXJcclxuICAgICAgICAgICpuZ0lmPVwiaGFzQXVkaW9cIlxyXG4gICAgICAgICAgW2F1ZGlvc3JjXT1cImRhdGEubWVkaWFPYmplY3QuYXVkaW9zcmNcIlxyXG4gICAgICAgICAgW3Rvb2xiYXJdPVwidHJ1ZVwiXHJcbiAgICAgICAgICBbY2xhc3Mub3BlbkF1ZGlvVG9vbGJhcl09XCJcclxuICAgICAgICAgICAgYXVkaW9TdGFydGVkICYmICFhdWRpb0VuZGVkICYmICFhdWRpb0NvbGxhcHNlZFxyXG4gICAgICAgICAgXCJcclxuICAgICAgICAgIFtwbGF5QXVkaW9dPVwiYXVkaW9TdGFydGVkXCJcclxuICAgICAgICAgIChhdWRpb0Vycm9yRXZlbnRFbWl0dGVyKT1cImhhbmRsZUF1ZGlvRXJyb3JFdmVudCgpXCJcclxuICAgICAgICAgIChhdWRpb0VuZGVkRXZlbnRFbWl0dGVyKT1cImhhbmRsZUF1ZGlvRW5kZWRFdmVudCgpXCJcclxuICAgICAgICA+PC9zb2xpZC1jb3JlLWF1ZGlvLXRvb2xiYXI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZy10b29sYmFyXCI+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICpuZ0lmPVwiaGFzQXVkaW9cIlxyXG4gICAgICAgICAgICAoY2xpY2spPVwib25QbGF5Q2xpY2soKVwiXHJcbiAgICAgICAgICAgIG1hdC1taW5pLWZhYlxyXG4gICAgICAgICAgICBjb2xvcj1cImFjY2VudFwiXHJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJhdWRpb0xvYWRFcnJvclwiXHJcbiAgICAgICAgICAgIFtjbGFzcy5kaXNhcHBlYXJdPVwiYXVkaW9TdGFydGVkICYmICFhdWRpb0VuZGVkXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPG1hdC1pY29uPmhlYWRwaG9uZXM8L21hdC1pY29uPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICpuZ0lmPVwiYXVkaW9TdGFydGVkICYmIGV4cGFuZFVwRG93blwiXHJcbiAgICAgICAgICAgIChjbGljayk9XCJvbkV4cGFuZENvbGxhcHNlKClcIlxyXG4gICAgICAgICAgICBtYXQtbWluaS1mYWJcclxuICAgICAgICAgICAgY29sb3I9XCJhY2NlbnRcIlxyXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiYXVkaW9Mb2FkRXJyb3JcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8bWF0LWljb24+e3tcclxuICAgICAgICAgICAgICBhdWRpb0NvbGxhcHNlZCA/ICdoZWFkcGhvbmVzJyA6ICdleHBhbmRfbGVzcydcclxuICAgICAgICAgICAgfX08L21hdC1pY29uPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICpuZ0lmPVwiYXVkaW9TdGFydGVkICYmICFleHBhbmRVcERvd25cIlxyXG4gICAgICAgICAgICAoY2xpY2spPVwib25FeHBhbmRDb2xsYXBzZSgpXCJcclxuICAgICAgICAgICAgbWF0LW1pbmktZmFiXHJcbiAgICAgICAgICAgIGNvbG9yPVwiYWNjZW50XCJcclxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImF1ZGlvTG9hZEVycm9yXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPG1hdC1pY29uPnt7XHJcbiAgICAgICAgICAgICAgYXVkaW9Db2xsYXBzZWQgPyAnaGVhZHBob25lcycgOiAnY2hldnJvbl9yaWdodCdcclxuICAgICAgICAgICAgfX08L21hdC1pY29uPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8c29saWQtY29yZS1tZWRpYS10b29sYmFyXHJcbiAgICAgICAgICAgIFttZWRpYU9iamVjdF09XCJkYXRhLm1lZGlhT2JqZWN0XCJcclxuICAgICAgICAgICAgW2hhc0F0dHJpYnV0aW9uc109XCJ0cnVlXCJcclxuICAgICAgICAgICAgW2hhc0RpYWxvZ109XCJmYWxzZVwiXHJcbiAgICAgICAgICAgIFtoYXNEemlUb29sc109XCJ0cnVlXCJcclxuICAgICAgICAgICAgW2RhdGFdPVwiZGF0YVwiXHJcbiAgICAgICAgICAgIFtpc092ZXJsYXlBYm92ZU9mRHppWm9vbVRvb2xiYXJdPVwiaXNPdmVybGF5QWJvdmVcIlxyXG4gICAgICAgICAgICBbaGFzRGVzY3JpcHRpb25dPVwiaGFzRGVzY3JpcHRpb25cIlxyXG4gICAgICAgICAgPjwvc29saWQtY29yZS1tZWRpYS10b29sYmFyPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvbmctdGVtcGxhdGU+XHJcblxyXG4gIDxuZy10ZW1wbGF0ZSAjbm9ab29tPlxyXG4gICAgPGRpdiBtYXQtZGlhbG9nLWNvbnRlbnQ+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZVwiPlxyXG4gICAgICAgIDxpbWdcclxuICAgICAgICAgIFtzcmNdPVwiZGF0YS5tZWRpYU9iamVjdC5nZXRSYXdJbWFnZSgnbGFyZ2UnKVwiXHJcbiAgICAgICAgICBbYWx0XT1cImRhdGEubWVkaWFPYmplY3QuYWx0XCJcclxuICAgICAgICAgIFtjbGFzcy5sYW5kc2NhcGVdPVwiZGF0YS5tZWRpYU9iamVjdC5pc0xhbmRzY2FwZVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxidXR0b25cclxuICAgICAgICAqbmdJZj1cImRhdGEuaGFzTmF2aWdhdGlvbkluRGlhbG9nXCJcclxuICAgICAgICBtYXQtbWluaS1mYWJcclxuICAgICAgICBjb2xvcj1cImFjY2VudFwiXHJcbiAgICAgICAgY2xhc3M9XCJidXR0b24tYmVmb3JlXCJcclxuICAgICAgICAoY2xpY2spPVwib25QcmV2KClcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPG1hdC1pY29uIGFyaWEtbGFiZWw9XCJWb3JoZXJpZ2VyIFNjaHJpdHRcIj5uYXZpZ2F0ZV9iZWZvcmU8L21hdC1pY29uPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgICpuZ0lmPVwiZGF0YS5oYXNOYXZpZ2F0aW9uSW5EaWFsb2dcIlxyXG4gICAgICAgIGNsYXNzPVwiYnV0dG9uLW5leHRcIlxyXG4gICAgICAgIG1hdC1taW5pLWZhYlxyXG4gICAgICAgIGNvbG9yPVwiYWNjZW50XCJcclxuICAgICAgICAoY2xpY2spPVwib25OZXh0KClcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPG1hdC1pY29uIGFyaWEtbGFiZWw9XCJOw6RjaHN0ZXIgU2Nocml0dFwiPm5hdmlnYXRlX25leHQ8L21hdC1pY29uPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPGRpdiBjbGFzcz1cInRvb2xiYXItY29udGFpbmVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPjwvZGl2PlxyXG4gICAgICAgIDxzb2xpZC1jb3JlLWF1ZGlvLXRvb2xiYXJcclxuICAgICAgICAgIGNsYXNzPVwiYXVkaW8tdG9vbGJhclwiXHJcbiAgICAgICAgICAqbmdJZj1cImhhc0F1ZGlvXCJcclxuICAgICAgICAgIFthdWRpb3NyY109XCJkYXRhLm1lZGlhT2JqZWN0LmF1ZGlvc3JjXCJcclxuICAgICAgICAgIFt0b29sYmFyXT1cInRydWVcIlxyXG4gICAgICAgICAgW2NsYXNzLm9wZW5BdWRpb1Rvb2xiYXJdPVwiXHJcbiAgICAgICAgICAgIGF1ZGlvU3RhcnRlZCAmJiAhYXVkaW9FbmRlZCAmJiAhYXVkaW9Db2xsYXBzZWRcclxuICAgICAgICAgIFwiXHJcbiAgICAgICAgICBbcGxheUF1ZGlvXT1cImF1ZGlvU3RhcnRlZFwiXHJcbiAgICAgICAgICAoYXVkaW9FcnJvckV2ZW50RW1pdHRlcik9XCJoYW5kbGVBdWRpb0Vycm9yRXZlbnQoKVwiXHJcbiAgICAgICAgICAoYXVkaW9FbmRlZEV2ZW50RW1pdHRlcik9XCJoYW5kbGVBdWRpb0VuZGVkRXZlbnQoKVwiXHJcbiAgICAgICAgPjwvc29saWQtY29yZS1hdWRpby10b29sYmFyPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJkaWFsb2ctdG9vbGJhclwiPlxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAqbmdJZj1cImhhc0F1ZGlvXCJcclxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uUGxheUNsaWNrKClcIlxyXG4gICAgICAgICAgICBtYXQtbWluaS1mYWJcclxuICAgICAgICAgICAgY29sb3I9XCJhY2NlbnRcIlxyXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiYXVkaW9Mb2FkRXJyb3JcIlxyXG4gICAgICAgICAgICBbY2xhc3MuZGlzYXBwZWFyXT1cImF1ZGlvU3RhcnRlZCAmJiAhYXVkaW9FbmRlZFwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbj5oZWFkcGhvbmVzPC9tYXQtaWNvbj5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAqbmdJZj1cImF1ZGlvU3RhcnRlZCAmJiBleHBhbmRVcERvd25cIlxyXG4gICAgICAgICAgICAoY2xpY2spPVwib25FeHBhbmRDb2xsYXBzZSgpXCJcclxuICAgICAgICAgICAgbWF0LW1pbmktZmFiXHJcbiAgICAgICAgICAgIGNvbG9yPVwiYWNjZW50XCJcclxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImF1ZGlvTG9hZEVycm9yXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPG1hdC1pY29uPnt7XHJcbiAgICAgICAgICAgICAgYXVkaW9Db2xsYXBzZWQgPyAnaGVhZHBob25lcycgOiAnZXhwYW5kX2xlc3MnXHJcbiAgICAgICAgICAgIH19PC9tYXQtaWNvbj5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAqbmdJZj1cImF1ZGlvU3RhcnRlZCAmJiAhZXhwYW5kVXBEb3duXCJcclxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uRXhwYW5kQ29sbGFwc2UoKVwiXHJcbiAgICAgICAgICAgIG1hdC1taW5pLWZhYlxyXG4gICAgICAgICAgICBjb2xvcj1cImFjY2VudFwiXHJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJhdWRpb0xvYWRFcnJvclwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbj57e1xyXG4gICAgICAgICAgICAgIGF1ZGlvQ29sbGFwc2VkID8gJ2hlYWRwaG9uZXMnIDogJ2NoZXZyb25fcmlnaHQnXHJcbiAgICAgICAgICAgIH19PC9tYXQtaWNvbj5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPHNvbGlkLWNvcmUtbWVkaWEtdG9vbGJhclxyXG4gICAgICAgICAgICBbbWVkaWFPYmplY3RdPVwiZGF0YS5tZWRpYU9iamVjdFwiXHJcbiAgICAgICAgICAgIFtoYXNBdHRyaWJ1dGlvbnNdPVwidHJ1ZVwiXHJcbiAgICAgICAgICAgIFtoYXNEaWFsb2ddPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICBbaGFzRHppVG9vbHNdPVwiZmFsc2VcIlxyXG4gICAgICAgICAgICBbZGF0YV09XCJkYXRhXCJcclxuICAgICAgICAgICAgW2lzT3ZlcmxheUFib3ZlT2ZOb25Eemlab29tVG9vbGJhcl09XCJpc092ZXJsYXlBYm92ZVwiXHJcbiAgICAgICAgICAgIFtoYXNEZXNjcmlwdGlvbl09XCJoYXNEZXNjcmlwdGlvblwiXHJcbiAgICAgICAgICAgIFtpc1Rvb2xiYXJJbkRpYWxvZ109XCJ0cnVlXCJcclxuICAgICAgICAgID48L3NvbGlkLWNvcmUtbWVkaWEtdG9vbGJhcj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L25nLXRlbXBsYXRlPlxyXG48L25nLWNvbnRhaW5lcj5cclxuXHJcbjxuZy1jb250YWluZXIgKm5nSWY9XCJkYXRhLnR5cGUgPT09ICdwaG90b2dyYXBoJ1wiPlxyXG4gIDxkaXYgbWF0LWRpYWxvZy10aXRsZSBjbGFzcz1cIm1hdC1kaWFsb2ctdGl0bGVcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJ0aXRsZS1jb250YWluZXJcIiAjdGl0bGVfY29udGFpbmVyPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgW2NsYXNzLmxvbmctdGl0bGVdPVwiXHJcbiAgICAgICAgICB0aXRsZV93aWR0aCA+PSB0aXRsZV9jb250YWluZXJfd2lkdGggJiYgZmlyc3RNb3ZpbmdBbmltYXRpb25cclxuICAgICAgICBcIlxyXG4gICAgICAgIFtjbGFzcy5sb25nLXRpdGxlLTFdPVwiXHJcbiAgICAgICAgICB0aXRsZV93aWR0aCA+PSB0aXRsZV9jb250YWluZXJfd2lkdGggJiYgIWZpcnN0TW92aW5nQW5pbWF0aW9uXHJcbiAgICAgICAgXCJcclxuICAgICAgPlxyXG4gICAgICAgIHt7IGRhdGEubmFtZSB9fVxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwiZGF0YS5pbWFnZS5nZXRUaXRsZVwiIGNsYXNzPVwibWVkaWEtb2JqZWN0LXRpdGxlXCI+XHJcbiAgICAgICAgICAtIHt7IGRhdGEuaW1hZ2UuZ2V0VGl0bGUgfX08L3NwYW5cclxuICAgICAgICA+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBtYXQtZGlhbG9nLWNsb3NlPlxyXG4gICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxyXG4gICAgPC9idXR0b24+XHJcbiAgPC9kaXY+XHJcbiAgPG5nLWNvbnRhaW5lclxyXG4gICAgKm5nSWY9XCJkYXRhLmltYWdlLmRlZXBab29tTGluayBhcyBkemlGaWxlOyB0aGVuIGRlZXBab29tOyBlbHNlIG5vWm9vbVwiXHJcbiAgPjwvbmctY29udGFpbmVyPlxyXG4gIDxuZy10ZW1wbGF0ZSAjZGVlcFpvb20+XHJcbiAgICA8ZGl2IG1hdC1kaWFsb2ctY29udGVudD5cclxuICAgICAgPGRpdiBpZD1cImR6aS1jb250YWluZXJcIj48L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInRvb2xiYXItY29udGFpbmVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPjwvZGl2PlxyXG4gICAgICAgIDxzb2xpZC1jb3JlLWF1ZGlvLXRvb2xiYXJcclxuICAgICAgICAgICpuZ0lmPVwiaGFzQXVkaW9cIlxyXG4gICAgICAgICAgW2F1ZGlvc3JjXT1cImRhdGEuaW1hZ2UuYXVkaW9zcmNcIlxyXG4gICAgICAgICAgW3Rvb2xiYXJdPVwidHJ1ZVwiXHJcbiAgICAgICAgICBbY2xhc3Mub3BlbkF1ZGlvVG9vbGJhcl09XCJcclxuICAgICAgICAgICAgYXVkaW9TdGFydGVkICYmICFhdWRpb0VuZGVkICYmICFhdWRpb0NvbGxhcHNlZFxyXG4gICAgICAgICAgXCJcclxuICAgICAgICAgIFtwbGF5QXVkaW9dPVwiYXVkaW9TdGFydGVkXCJcclxuICAgICAgICAgIChhdWRpb0Vycm9yRXZlbnRFbWl0dGVyKT1cImhhbmRsZUF1ZGlvRXJyb3JFdmVudCgpXCJcclxuICAgICAgICAgIChhdWRpb0VuZGVkRXZlbnRFbWl0dGVyKT1cImhhbmRsZUF1ZGlvRW5kZWRFdmVudCgpXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgPC9zb2xpZC1jb3JlLWF1ZGlvLXRvb2xiYXI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZy10b29sYmFyXCI+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICpuZ0lmPVwiaGFzQXVkaW9cIlxyXG4gICAgICAgICAgICAoY2xpY2spPVwib25QbGF5Q2xpY2soKVwiXHJcbiAgICAgICAgICAgIG1hdC1taW5pLWZhYlxyXG4gICAgICAgICAgICBjb2xvcj1cImFjY2VudFwiXHJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJhdWRpb0xvYWRFcnJvclwiXHJcbiAgICAgICAgICAgIFtjbGFzcy5kaXNhcHBlYXJdPVwiYXVkaW9TdGFydGVkICYmICFhdWRpb0VuZGVkXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPG1hdC1pY29uPmhlYWRwaG9uZXM8L21hdC1pY29uPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICpuZ0lmPVwiYXVkaW9TdGFydGVkICYmIGV4cGFuZFVwRG93blwiXHJcbiAgICAgICAgICAgIChjbGljayk9XCJvbkV4cGFuZENvbGxhcHNlKClcIlxyXG4gICAgICAgICAgICBtYXQtbWluaS1mYWJcclxuICAgICAgICAgICAgY29sb3I9XCJhY2NlbnRcIlxyXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiYXVkaW9Mb2FkRXJyb3JcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8bWF0LWljb24+e3tcclxuICAgICAgICAgICAgICBhdWRpb0NvbGxhcHNlZCA/ICdoZWFkcGhvbmVzJyA6ICdleHBhbmRfbGVzcydcclxuICAgICAgICAgICAgfX08L21hdC1pY29uPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICpuZ0lmPVwiYXVkaW9TdGFydGVkICYmICFleHBhbmRVcERvd25cIlxyXG4gICAgICAgICAgICAoY2xpY2spPVwib25FeHBhbmRDb2xsYXBzZSgpXCJcclxuICAgICAgICAgICAgbWF0LW1pbmktZmFiXHJcbiAgICAgICAgICAgIGNvbG9yPVwiYWNjZW50XCJcclxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImF1ZGlvTG9hZEVycm9yXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPG1hdC1pY29uPnt7XHJcbiAgICAgICAgICAgICAgYXVkaW9Db2xsYXBzZWQgPyAnaGVhZHBob25lcycgOiAnY2hldnJvbl9yaWdodCdcclxuICAgICAgICAgICAgfX08L21hdC1pY29uPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8c29saWQtY29yZS1tZWRpYS10b29sYmFyXHJcbiAgICAgICAgICAgIFtpbWFnZV09XCJkYXRhLmltYWdlXCJcclxuICAgICAgICAgICAgW2hhc0F0dHJpYnV0aW9uc109XCJ0cnVlXCJcclxuICAgICAgICAgICAgW2hhc0RpYWxvZ109XCJmYWxzZVwiXHJcbiAgICAgICAgICAgIFtoYXNEemlUb29sc109XCJ0cnVlXCJcclxuICAgICAgICAgICAgW2RhdGFdPVwiZGF0YVwiXHJcbiAgICAgICAgICAgIFtpc092ZXJsYXlBYm92ZU9mRHppWm9vbVRvb2xiYXJdPVwiaXNPdmVybGF5QWJvdmVcIlxyXG4gICAgICAgICAgICBbaGFzRGVzY3JpcHRpb25dPVwiaGFzRGVzY3JpcHRpb25cIlxyXG4gICAgICAgICAgPjwvc29saWQtY29yZS1tZWRpYS10b29sYmFyPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvbmctdGVtcGxhdGU+XHJcbiAgPG5nLXRlbXBsYXRlICNub1pvb20+XHJcbiAgICA8ZGl2IG1hdC1kaWFsb2ctY29udGVudD5cclxuICAgICAgPGRpdiBjbGFzcz1cImltYWdlXCI+XHJcbiAgICAgICAgPGltZ1xyXG4gICAgICAgICAgW3NyY109XCJkYXRhLmltYWdlLmdldFJhd0ltYWdlKCdsYXJnZScpXCJcclxuICAgICAgICAgIFthbHRdPVwiZGF0YS5pbWFnZS5hbHRcIlxyXG4gICAgICAgICAgW2NsYXNzLmxhbmRzY2FwZV09XCJkYXRhLmltYWdlLmlzTGFuZHNjYXBlXCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInRvb2xiYXItY29udGFpbmVyXCI+XHJcbiAgICAgICAgPHNvbGlkLWNvcmUtYXVkaW8tdG9vbGJhclxyXG4gICAgICAgICAgKm5nSWY9XCJoYXNBdWRpb1wiXHJcbiAgICAgICAgICBbYXVkaW9zcmNdPVwiZGF0YS5pbWFnZS5hdWRpb3NyY1wiXHJcbiAgICAgICAgICBbdG9vbGJhcl09XCJ0cnVlXCJcclxuICAgICAgICAgIFtjbGFzcy5vcGVuQXVkaW9Ub29sYmFyXT1cIlxyXG4gICAgICAgICAgICBhdWRpb1N0YXJ0ZWQgJiYgIWF1ZGlvRW5kZWQgJiYgIWF1ZGlvQ29sbGFwc2VkXHJcbiAgICAgICAgICBcIlxyXG4gICAgICAgICAgW3BsYXlBdWRpb109XCJhdWRpb1N0YXJ0ZWRcIlxyXG4gICAgICAgICAgKGF1ZGlvRXJyb3JFdmVudEVtaXR0ZXIpPVwiaGFuZGxlQXVkaW9FcnJvckV2ZW50KClcIlxyXG4gICAgICAgICAgKGF1ZGlvRW5kZWRFdmVudEVtaXR0ZXIpPVwiaGFuZGxlQXVkaW9FbmRlZEV2ZW50KClcIlxyXG4gICAgICAgID5cclxuICAgICAgICA8L3NvbGlkLWNvcmUtYXVkaW8tdG9vbGJhcj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZy10b29sYmFyXCI+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICpuZ0lmPVwiaGFzQXVkaW9cIlxyXG4gICAgICAgICAgICAoY2xpY2spPVwib25QbGF5Q2xpY2soKVwiXHJcbiAgICAgICAgICAgIG1hdC1taW5pLWZhYlxyXG4gICAgICAgICAgICBjb2xvcj1cImFjY2VudFwiXHJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJhdWRpb0xvYWRFcnJvclwiXHJcbiAgICAgICAgICAgIFtjbGFzcy5kaXNhcHBlYXJdPVwiYXVkaW9TdGFydGVkICYmICFhdWRpb0VuZGVkXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPG1hdC1pY29uPmhlYWRwaG9uZXM8L21hdC1pY29uPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICpuZ0lmPVwiYXVkaW9TdGFydGVkICYmIGV4cGFuZFVwRG93blwiXHJcbiAgICAgICAgICAgIChjbGljayk9XCJvbkV4cGFuZENvbGxhcHNlKClcIlxyXG4gICAgICAgICAgICBtYXQtbWluaS1mYWJcclxuICAgICAgICAgICAgY29sb3I9XCJhY2NlbnRcIlxyXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiYXVkaW9Mb2FkRXJyb3JcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8bWF0LWljb24+e3tcclxuICAgICAgICAgICAgICBhdWRpb0NvbGxhcHNlZCA/ICdoZWFkcGhvbmVzJyA6ICdleHBhbmRfbGVzcydcclxuICAgICAgICAgICAgfX08L21hdC1pY29uPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICpuZ0lmPVwiYXVkaW9TdGFydGVkICYmICFleHBhbmRVcERvd25cIlxyXG4gICAgICAgICAgICAoY2xpY2spPVwib25FeHBhbmRDb2xsYXBzZSgpXCJcclxuICAgICAgICAgICAgbWF0LW1pbmktZmFiXHJcbiAgICAgICAgICAgIGNvbG9yPVwiYWNjZW50XCJcclxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImF1ZGlvTG9hZEVycm9yXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPG1hdC1pY29uPnt7XHJcbiAgICAgICAgICAgICAgYXVkaW9Db2xsYXBzZWQgPyAnaGVhZHBob25lcycgOiAnY2hldnJvbl9yaWdodCdcclxuICAgICAgICAgICAgfX08L21hdC1pY29uPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8c29saWQtY29yZS1tZWRpYS10b29sYmFyXHJcbiAgICAgICAgICAgIFtpbWFnZV09XCJkYXRhLmltYWdlXCJcclxuICAgICAgICAgICAgW2hhc0F0dHJpYnV0aW9uc109XCJ0cnVlXCJcclxuICAgICAgICAgICAgW2hhc0RpYWxvZ109XCJmYWxzZVwiXHJcbiAgICAgICAgICAgIFtoYXNEemlUb29sc109XCJmYWxzZVwiXHJcbiAgICAgICAgICAgIFtkYXRhXT1cImRhdGFcIlxyXG4gICAgICAgICAgICBbaXNPdmVybGF5QWJvdmVPZk5vbkR6aVpvb21Ub29sYmFyXT1cImlzT3ZlcmxheUFib3ZlXCJcclxuICAgICAgICAgICAgW2hhc0Rlc2NyaXB0aW9uXT1cImhhc0Rlc2NyaXB0aW9uXCJcclxuICAgICAgICAgICAgW2lzVG9vbGJhckluRGlhbG9nXT1cInRydWVcIlxyXG4gICAgICAgICAgPjwvc29saWQtY29yZS1tZWRpYS10b29sYmFyPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvbmctdGVtcGxhdGU+XHJcbjwvbmctY29udGFpbmVyPlxyXG4iXX0=
