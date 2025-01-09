import {
  Component,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  Output,
} from '@angular/core';
import { ImageModel, MediaModel } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import {
  CloseScrollStrategy,
  ScrollDispatcher,
  ViewportRuler,
} from '@angular/cdk/overlay';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MEDIA_DIALOG_TOKEN } from '../../media-dialog-token';
import * as i0 from '@angular/core';
import * as i1 from '@angular/material/dialog';
import * as i2 from '@angular/cdk/overlay';
import * as i3 from '@angular/cdk/layout';
import * as i4 from '@angular/common';
import * as i5 from '@angular/material/icon';
import * as i6 from '@angular/material/button';
import * as i7 from '../markdown/markdown.component';
export class MediaToolbarComponent {
  _dialog;
  scrollDispatcher;
  ngZone;
  _breakpointObserver;
  matDialogComponent;
  mediaObject;
  image;
  name;
  hasAttributions;
  hasDialog;
  hasDziTools = false;
  hasAudio;
  hasDescription;
  hasDescriptionToggle;
  data;
  length = 90;
  slideshowPageChanged;
  openDialogRequest;
  isToolbarInDialog = false;
  isOverlayAboveOfDziZoomToolbar;
  isOverlayAboveOfNonDziZoomToolbar;
  attributionsPositions = [];
  attributionsScrollStrategy;
  descriptionScrollStrategy;
  attributionsIsOpen = false;
  descriptionIsOpen = false;
  dialogRef;
  descriptionToggle = new EventEmitter();
  closeDialogEventEmitter = new EventEmitter();
  descriptionToggled = false;
  hasNavigationInDialog;
  NextDialogEmitter = new EventEmitter();
  PrevDialogEmitter = new EventEmitter();
  isMobile = false;
  constructor(
    _dialog,
    scrollDispatcher,
    viewportRuler,
    ngZone,
    _breakpointObserver,
    matDialogComponent
  ) {
    this._dialog = _dialog;
    this.scrollDispatcher = scrollDispatcher;
    this.ngZone = ngZone;
    this._breakpointObserver = _breakpointObserver;
    this.matDialogComponent = matDialogComponent;
    this.attributionsScrollStrategy = new CloseScrollStrategy(
      scrollDispatcher,
      ngZone,
      viewportRuler
    );
    this.descriptionScrollStrategy = new CloseScrollStrategy(
      scrollDispatcher,
      ngZone,
      viewportRuler
    );
  }
  ngOnChanges() {
    this.descriptionToggled = false;
    this.attributionsIsOpen = false;
    if (this.openDialogRequest) {
      if (this.mediaObject) {
        this.openDialog();
      }
      if (this.image) {
        this.openDialogImage();
      }
    }
    if (
      this.dialogRef &&
      this.dialogRef.componentInstance &&
      this.mediaObject
    ) {
      this.dialogRef.componentInstance.data = {
        mediaObject: this.mediaObject,
        name: this.name,
        type: 'mediaObject',
        hasNavigationInDialog: this.hasNavigationInDialog,
      };
    }
    if (this.isOverlayAboveOfDziZoomToolbar) {
      this.attributionsPositions = [
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
        },
      ];
    } else {
      this.attributionsPositions = [
        {
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
        },
      ];
    }
    if (this.isOverlayAboveOfNonDziZoomToolbar) {
      this.attributionsPositions = [
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
        },
      ];
    }
  }
  ngOnInit() {
    this._breakpointObserver
      .observe(['(max-width: 440px)'])
      .subscribe((isMobile) => {
        if (isMobile.matches) {
          this.length = 100;
          this.isMobile = true;
          this.dialogRef?.updateSize('100%', '100%');
        } else {
          this.length = 90;
          this.isMobile = false;
          this.dialogRef?.updateSize('90%', '90%');
        }
      });
  }
  openDialog() {
    if (this.mediaObject?.mediaType === 'image') {
      this.dialogRef = this._dialog.open(this.matDialogComponent, {
        maxWidth: '100vw',
        width: this.length + '%',
        height: this.length + '%',
        maxHeight: '100vh',
        panelClass: 'solid-core-media-dialog',
        data: {
          mediaObject: this.mediaObject,
          name: this.name,
          type: 'mediaObject',
          hasNavigationInDialog: this.hasNavigationInDialog,
        },
      });
      this.dialogRef.afterClosed().subscribe(() => {
        this.closeDialogEventEmitter.emit();
        if (this.dialogRef) {
          this.dialogRef.close();
        }
      });
      this.dialogRef.componentInstance.onNextEmitter.subscribe(() => {
        this.NextDialogEmitter.emit();
        this.openDialogRequest = false;
      });
      this.dialogRef.componentInstance.onPrevEmitter.subscribe(() => {
        this.PrevDialogEmitter.emit();
        this.openDialogRequest = false;
      });
    }
  }
  openDialogImage() {
    this.dialogRef = this._dialog.open(this.matDialogComponent, {
      maxWidth: this.length + 'vw',
      width: '100%',
      height: '100%',
      maxHeight: this.length + 'vh',
      panelClass: 'solid-core-media-dialog',
      data: {
        image: this.image,
        name: this.name,
        type: 'photograph',
      },
    });
    this.dialogRef.afterClosed().subscribe(() => {
      this.closeDialogEventEmitter.emit();
      if (this.dialogRef) {
        this.dialogRef.close();
      }
    });
  }
  attributionsOpenClose() {
    this.attributionsIsOpen = !this.attributionsIsOpen;
    this.descriptionIsOpen = false;
    if (this.attributionsIsOpen === true) {
      this.scrollDispatcher.scrolled().subscribe(() => {
        this.ngZone.run(() => {
          this.attributionsIsOpen = false;
        });
      });
    }
  }
  descriptionOpenClose() {
    this.descriptionIsOpen = !this.descriptionIsOpen;
    this.attributionsIsOpen = false;
  }
  toggleDescription() {
    this.descriptionToggled = !this.descriptionToggled;
    this.descriptionToggle.emit(this.descriptionToggled);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MediaToolbarComponent,
    deps: [
      { token: i1.MatDialog },
      { token: i2.ScrollDispatcher },
      { token: i2.ViewportRuler },
      { token: i0.NgZone },
      { token: i3.BreakpointObserver },
      { token: MEDIA_DIALOG_TOKEN },
    ],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: MediaToolbarComponent,
    selector: 'solid-core-media-toolbar',
    inputs: {
      mediaObject: 'mediaObject',
      image: 'image',
      name: 'name',
      hasAttributions: 'hasAttributions',
      hasDialog: 'hasDialog',
      hasDziTools: 'hasDziTools',
      hasAudio: 'hasAudio',
      hasDescription: 'hasDescription',
      hasDescriptionToggle: 'hasDescriptionToggle',
      data: 'data',
      slideshowPageChanged: 'slideshowPageChanged',
      openDialogRequest: 'openDialogRequest',
      isToolbarInDialog: 'isToolbarInDialog',
      isOverlayAboveOfDziZoomToolbar: 'isOverlayAboveOfDziZoomToolbar',
      isOverlayAboveOfNonDziZoomToolbar: 'isOverlayAboveOfNonDziZoomToolbar',
      hasNavigationInDialog: 'hasNavigationInDialog',
    },
    outputs: {
      descriptionToggle: 'descriptionToggle',
      closeDialogEventEmitter: 'closeDialogEventEmitter',
      NextDialogEmitter: 'NextDialogEmitter',
      PrevDialogEmitter: 'PrevDialogEmitter',
    },
    usesOnChanges: true,
    ngImport: i0,
    template:
      '<div\r\n  class="toolbar-container"\r\n  [class.dzi]="hasDziTools"\r\n  [class.isToolbarInDialog]="isToolbarInDialog"\r\n>\r\n  <!-- <ng-container *ngIf="hasAudio">\r\n    <solid-core-audio-toolbar\r\n      *ngIf="hasAudio"\r\n      [audiosrc]="data.mediaObject.audiosrc"\r\n      [description]="data.mediaObject.description"\r\n    >\r\n    </solid-core-audio-toolbar>\r\n  </ng-container> -->\r\n  <div class="toolbar" *ngIf="mediaObject">\r\n    <button\r\n      *ngIf="hasDescription && mediaObject.description"\r\n      mat-mini-fab\r\n      color="accent"\r\n      cdkOverlayOrigin\r\n      #attributionsOverlayOrigin="cdkOverlayOrigin"\r\n      (click)="descriptionOpenClose()"\r\n    >\r\n      <mat-icon>description</mat-icon>\r\n      <ng-template\r\n        cdkConnectedOverlay\r\n        [cdkConnectedOverlayOrigin]="attributionsOverlayOrigin"\r\n        [cdkConnectedOverlayOpen]="descriptionIsOpen"\r\n        [cdkConnectedOverlayPositions]="attributionsPositions"\r\n        [cdkConnectedOverlayScrollStrategy]="descriptionScrollStrategy"\r\n        [cdkConnectedOverlayHasBackdrop]="true"\r\n        (backdropClick)="descriptionOpenClose()"\r\n      >\r\n        <div class="description-overlay">\r\n          <div\r\n            class="description-container"\r\n            markdown\r\n            [data]="mediaObject.description"\r\n          ></div>\r\n        </div>\r\n      </ng-template>\r\n    </button>\r\n    <button\r\n      *ngIf="hasAttributions && mediaObject.attributions as attributions"\r\n      mat-mini-fab\r\n      color="accent"\r\n      cdkOverlayOrigin\r\n      #attributionsOverlayOrigin="cdkOverlayOrigin"\r\n      (click)="attributionsOpenClose()"\r\n      id="profile-copyright-btn"\r\n    >\r\n      <mat-icon>copyright</mat-icon>\r\n      <ng-template\r\n        cdkConnectedOverlay\r\n        [cdkConnectedOverlayOrigin]="attributionsOverlayOrigin"\r\n        [cdkConnectedOverlayOpen]="attributionsIsOpen"\r\n        [cdkConnectedOverlayPositions]="attributionsPositions"\r\n        [cdkConnectedOverlayScrollStrategy]="attributionsScrollStrategy"\r\n        [cdkConnectedOverlayHasBackdrop]="true"\r\n        (backdropClick)="attributionsOpenClose()"\r\n      >\r\n        <div class="attributions-overlay">{{ attributions }}</div>\r\n      </ng-template>\r\n    </button>\r\n    <!-- <button\r\n      *ngIf="hasDescriptionToggle"\r\n      id=""\r\n      mat-mini-fab\r\n      color="accent"\r\n      (click)="toggleDescription()"\r\n    >\r\n      <mat-icon>description</mat-icon>\r\n    </button> -->\r\n    <ng-container *ngIf="hasDziTools">\r\n      <button id="zoom-in-button" mat-mini-fab color="accent">\r\n        <mat-icon>zoom_in</mat-icon>\r\n      </button>\r\n      <button id="zoom-out-button" mat-mini-fab color="accent">\r\n        <mat-icon>zoom_out</mat-icon>\r\n      </button>\r\n      <button id="home-button" mat-mini-fab color="accent">\r\n        <mat-icon>home</mat-icon>\r\n      </button>\r\n    </ng-container>\r\n    <button\r\n      *ngIf="hasDialog"\r\n      mat-mini-fab\r\n      color="accent"\r\n      (click)="openDialog()"\r\n      id="profile-detail-btn"\r\n    >\r\n      <mat-icon>more_horiz</mat-icon>\r\n    </button>\r\n  </div>\r\n\r\n  <!-- For Image in quiz -->\r\n  <div class="toolbar" *ngIf="image">\r\n    <button\r\n      *ngIf="hasDescription && image.description"\r\n      mat-mini-fab\r\n      color="accent"\r\n      cdkOverlayOrigin\r\n      #attributionsOverlayOrigin="cdkOverlayOrigin"\r\n      (click)="descriptionOpenClose()"\r\n    >\r\n      <mat-icon>description</mat-icon>\r\n      <ng-template\r\n        cdkConnectedOverlay\r\n        [cdkConnectedOverlayOrigin]="attributionsOverlayOrigin"\r\n        [cdkConnectedOverlayOpen]="descriptionIsOpen"\r\n        [cdkConnectedOverlayPositions]="attributionsPositions"\r\n        [cdkConnectedOverlayScrollStrategy]="descriptionScrollStrategy"\r\n        [cdkConnectedOverlayHasBackdrop]="true"\r\n        (backdropClick)="descriptionOpenClose()"\r\n      >\r\n        <div class="description-overlay">\r\n          <div\r\n            class="description-container"\r\n            markdown\r\n            [data]="image.description"\r\n          ></div>\r\n        </div>\r\n      </ng-template>\r\n    </button>\r\n    <button\r\n      *ngIf="hasAttributions && image.attributions as attributions"\r\n      mat-mini-fab\r\n      color="accent"\r\n      cdkOverlayOrigin\r\n      #attributionsOverlayOrigin="cdkOverlayOrigin"\r\n      (click)="attributionsOpenClose()"\r\n      id="profile-copyright-btn"\r\n    >\r\n      <mat-icon>copyright</mat-icon>\r\n      <ng-template\r\n        cdkConnectedOverlay\r\n        [cdkConnectedOverlayOrigin]="attributionsOverlayOrigin"\r\n        [cdkConnectedOverlayOpen]="attributionsIsOpen"\r\n        [cdkConnectedOverlayPositions]="attributionsPositions"\r\n        [cdkConnectedOverlayScrollStrategy]="attributionsScrollStrategy"\r\n        [cdkConnectedOverlayHasBackdrop]="true"\r\n        (backdropClick)="attributionsOpenClose()"\r\n      >\r\n        <div class="attributions-overlay">{{ attributions }}</div>\r\n      </ng-template>\r\n    </button>\r\n    <!-- <button\r\n      *ngIf="hasDescriptionToggle"\r\n      id=""\r\n      mat-mini-fab\r\n      color="accent"\r\n      (click)="toggleDescription()"\r\n    >\r\n      <mat-icon>description</mat-icon>\r\n    </button> -->\r\n    <ng-container *ngIf="hasDziTools">\r\n      <button id="zoom-in-button" mat-mini-fab color="accent">\r\n        <mat-icon>zoom_in</mat-icon>\r\n      </button>\r\n      <button id="zoom-out-button" mat-mini-fab color="accent">\r\n        <mat-icon>zoom_out</mat-icon>\r\n      </button>\r\n      <button id="home-button" mat-mini-fab color="accent">\r\n        <mat-icon>home</mat-icon>\r\n      </button>\r\n    </ng-container>\r\n    <button\r\n      *ngIf="hasDialog"\r\n      mat-mini-fab\r\n      color="accent"\r\n      (click)="openDialogImage()"\r\n      id="profile-detail-btn"\r\n    >\r\n      <mat-icon>more_horiz</mat-icon>\r\n    </button>\r\n  </div>\r\n</div>\r\n',
    styles: [
      'div.toolbar-container{display:flex;right:0}div.toolbar-container.dzi,div.toolbar-container.isToolbarInDialog{bottom:.9em}div.toolbar-container solid-core-audio-toolbar{position:absolute;left:0}div.toolbar{display:flex;margin-right:.85em;justify-content:flex-end;margin-bottom:.5em}div.toolbar button{margin-left:.5em}::ng-deep div.cdk-overlay-container div.attributions-overlay{font-size:1em;margin-right:.5em;padding:.25em;border-radius:.5em;margin-bottom:.5em}::ng-deep div.cdk-overlay-container div.description-overlay{font-size:1em;margin-right:.5em;padding:.25em 0 .25em .4em;border-radius:.5em;margin-left:1em;margin-bottom:.5em;max-width:700px;max-height:110px}::ng-deep div.cdk-overlay-container div.description-overlay div.description-container{width:99%;height:100%;overflow:auto;padding-right:.4em}::ng-deep div.cdk-overlay-container div.description-overlay div.description-container p{margin:0}@media (max-width: 680px){::ng-deep div.cdk-overlay-container div.description-overlay{max-width:90%}}@media (max-width: 400px){::ng-deep div.cdk-overlay-container div.description-overlay{max-width:290px}}@media (max-width: 360px){::ng-deep div.cdk-overlay-container div.description-overlay{max-width:220px}}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i4.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i2.CdkConnectedOverlay,
        selector:
          '[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]',
        inputs: [
          'cdkConnectedOverlayOrigin',
          'cdkConnectedOverlayPositions',
          'cdkConnectedOverlayPositionStrategy',
          'cdkConnectedOverlayOffsetX',
          'cdkConnectedOverlayOffsetY',
          'cdkConnectedOverlayWidth',
          'cdkConnectedOverlayHeight',
          'cdkConnectedOverlayMinWidth',
          'cdkConnectedOverlayMinHeight',
          'cdkConnectedOverlayBackdropClass',
          'cdkConnectedOverlayPanelClass',
          'cdkConnectedOverlayViewportMargin',
          'cdkConnectedOverlayScrollStrategy',
          'cdkConnectedOverlayOpen',
          'cdkConnectedOverlayDisableClose',
          'cdkConnectedOverlayTransformOriginOn',
          'cdkConnectedOverlayHasBackdrop',
          'cdkConnectedOverlayLockPosition',
          'cdkConnectedOverlayFlexibleDimensions',
          'cdkConnectedOverlayGrowAfterOpen',
          'cdkConnectedOverlayPush',
        ],
        outputs: [
          'backdropClick',
          'positionChange',
          'attach',
          'detach',
          'overlayKeydown',
          'overlayOutsideClick',
        ],
        exportAs: ['cdkConnectedOverlay'],
      },
      {
        kind: 'directive',
        type: i2.CdkOverlayOrigin,
        selector: '[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]',
        exportAs: ['cdkOverlayOrigin'],
      },
      {
        kind: 'component',
        type: i5.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'component',
        type: i6.MatMiniFabButton,
        selector: 'button[mat-mini-fab]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'component',
        type: i7.MarkdownComponent,
        selector: '[markdown]',
        inputs: ['inline', 'data', 'appendData'],
      },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: MediaToolbarComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-core-media-toolbar',
          template:
            '<div\r\n  class="toolbar-container"\r\n  [class.dzi]="hasDziTools"\r\n  [class.isToolbarInDialog]="isToolbarInDialog"\r\n>\r\n  <!-- <ng-container *ngIf="hasAudio">\r\n    <solid-core-audio-toolbar\r\n      *ngIf="hasAudio"\r\n      [audiosrc]="data.mediaObject.audiosrc"\r\n      [description]="data.mediaObject.description"\r\n    >\r\n    </solid-core-audio-toolbar>\r\n  </ng-container> -->\r\n  <div class="toolbar" *ngIf="mediaObject">\r\n    <button\r\n      *ngIf="hasDescription && mediaObject.description"\r\n      mat-mini-fab\r\n      color="accent"\r\n      cdkOverlayOrigin\r\n      #attributionsOverlayOrigin="cdkOverlayOrigin"\r\n      (click)="descriptionOpenClose()"\r\n    >\r\n      <mat-icon>description</mat-icon>\r\n      <ng-template\r\n        cdkConnectedOverlay\r\n        [cdkConnectedOverlayOrigin]="attributionsOverlayOrigin"\r\n        [cdkConnectedOverlayOpen]="descriptionIsOpen"\r\n        [cdkConnectedOverlayPositions]="attributionsPositions"\r\n        [cdkConnectedOverlayScrollStrategy]="descriptionScrollStrategy"\r\n        [cdkConnectedOverlayHasBackdrop]="true"\r\n        (backdropClick)="descriptionOpenClose()"\r\n      >\r\n        <div class="description-overlay">\r\n          <div\r\n            class="description-container"\r\n            markdown\r\n            [data]="mediaObject.description"\r\n          ></div>\r\n        </div>\r\n      </ng-template>\r\n    </button>\r\n    <button\r\n      *ngIf="hasAttributions && mediaObject.attributions as attributions"\r\n      mat-mini-fab\r\n      color="accent"\r\n      cdkOverlayOrigin\r\n      #attributionsOverlayOrigin="cdkOverlayOrigin"\r\n      (click)="attributionsOpenClose()"\r\n      id="profile-copyright-btn"\r\n    >\r\n      <mat-icon>copyright</mat-icon>\r\n      <ng-template\r\n        cdkConnectedOverlay\r\n        [cdkConnectedOverlayOrigin]="attributionsOverlayOrigin"\r\n        [cdkConnectedOverlayOpen]="attributionsIsOpen"\r\n        [cdkConnectedOverlayPositions]="attributionsPositions"\r\n        [cdkConnectedOverlayScrollStrategy]="attributionsScrollStrategy"\r\n        [cdkConnectedOverlayHasBackdrop]="true"\r\n        (backdropClick)="attributionsOpenClose()"\r\n      >\r\n        <div class="attributions-overlay">{{ attributions }}</div>\r\n      </ng-template>\r\n    </button>\r\n    <!-- <button\r\n      *ngIf="hasDescriptionToggle"\r\n      id=""\r\n      mat-mini-fab\r\n      color="accent"\r\n      (click)="toggleDescription()"\r\n    >\r\n      <mat-icon>description</mat-icon>\r\n    </button> -->\r\n    <ng-container *ngIf="hasDziTools">\r\n      <button id="zoom-in-button" mat-mini-fab color="accent">\r\n        <mat-icon>zoom_in</mat-icon>\r\n      </button>\r\n      <button id="zoom-out-button" mat-mini-fab color="accent">\r\n        <mat-icon>zoom_out</mat-icon>\r\n      </button>\r\n      <button id="home-button" mat-mini-fab color="accent">\r\n        <mat-icon>home</mat-icon>\r\n      </button>\r\n    </ng-container>\r\n    <button\r\n      *ngIf="hasDialog"\r\n      mat-mini-fab\r\n      color="accent"\r\n      (click)="openDialog()"\r\n      id="profile-detail-btn"\r\n    >\r\n      <mat-icon>more_horiz</mat-icon>\r\n    </button>\r\n  </div>\r\n\r\n  <!-- For Image in quiz -->\r\n  <div class="toolbar" *ngIf="image">\r\n    <button\r\n      *ngIf="hasDescription && image.description"\r\n      mat-mini-fab\r\n      color="accent"\r\n      cdkOverlayOrigin\r\n      #attributionsOverlayOrigin="cdkOverlayOrigin"\r\n      (click)="descriptionOpenClose()"\r\n    >\r\n      <mat-icon>description</mat-icon>\r\n      <ng-template\r\n        cdkConnectedOverlay\r\n        [cdkConnectedOverlayOrigin]="attributionsOverlayOrigin"\r\n        [cdkConnectedOverlayOpen]="descriptionIsOpen"\r\n        [cdkConnectedOverlayPositions]="attributionsPositions"\r\n        [cdkConnectedOverlayScrollStrategy]="descriptionScrollStrategy"\r\n        [cdkConnectedOverlayHasBackdrop]="true"\r\n        (backdropClick)="descriptionOpenClose()"\r\n      >\r\n        <div class="description-overlay">\r\n          <div\r\n            class="description-container"\r\n            markdown\r\n            [data]="image.description"\r\n          ></div>\r\n        </div>\r\n      </ng-template>\r\n    </button>\r\n    <button\r\n      *ngIf="hasAttributions && image.attributions as attributions"\r\n      mat-mini-fab\r\n      color="accent"\r\n      cdkOverlayOrigin\r\n      #attributionsOverlayOrigin="cdkOverlayOrigin"\r\n      (click)="attributionsOpenClose()"\r\n      id="profile-copyright-btn"\r\n    >\r\n      <mat-icon>copyright</mat-icon>\r\n      <ng-template\r\n        cdkConnectedOverlay\r\n        [cdkConnectedOverlayOrigin]="attributionsOverlayOrigin"\r\n        [cdkConnectedOverlayOpen]="attributionsIsOpen"\r\n        [cdkConnectedOverlayPositions]="attributionsPositions"\r\n        [cdkConnectedOverlayScrollStrategy]="attributionsScrollStrategy"\r\n        [cdkConnectedOverlayHasBackdrop]="true"\r\n        (backdropClick)="attributionsOpenClose()"\r\n      >\r\n        <div class="attributions-overlay">{{ attributions }}</div>\r\n      </ng-template>\r\n    </button>\r\n    <!-- <button\r\n      *ngIf="hasDescriptionToggle"\r\n      id=""\r\n      mat-mini-fab\r\n      color="accent"\r\n      (click)="toggleDescription()"\r\n    >\r\n      <mat-icon>description</mat-icon>\r\n    </button> -->\r\n    <ng-container *ngIf="hasDziTools">\r\n      <button id="zoom-in-button" mat-mini-fab color="accent">\r\n        <mat-icon>zoom_in</mat-icon>\r\n      </button>\r\n      <button id="zoom-out-button" mat-mini-fab color="accent">\r\n        <mat-icon>zoom_out</mat-icon>\r\n      </button>\r\n      <button id="home-button" mat-mini-fab color="accent">\r\n        <mat-icon>home</mat-icon>\r\n      </button>\r\n    </ng-container>\r\n    <button\r\n      *ngIf="hasDialog"\r\n      mat-mini-fab\r\n      color="accent"\r\n      (click)="openDialogImage()"\r\n      id="profile-detail-btn"\r\n    >\r\n      <mat-icon>more_horiz</mat-icon>\r\n    </button>\r\n  </div>\r\n</div>\r\n',
          styles: [
            'div.toolbar-container{display:flex;right:0}div.toolbar-container.dzi,div.toolbar-container.isToolbarInDialog{bottom:.9em}div.toolbar-container solid-core-audio-toolbar{position:absolute;left:0}div.toolbar{display:flex;margin-right:.85em;justify-content:flex-end;margin-bottom:.5em}div.toolbar button{margin-left:.5em}::ng-deep div.cdk-overlay-container div.attributions-overlay{font-size:1em;margin-right:.5em;padding:.25em;border-radius:.5em;margin-bottom:.5em}::ng-deep div.cdk-overlay-container div.description-overlay{font-size:1em;margin-right:.5em;padding:.25em 0 .25em .4em;border-radius:.5em;margin-left:1em;margin-bottom:.5em;max-width:700px;max-height:110px}::ng-deep div.cdk-overlay-container div.description-overlay div.description-container{width:99%;height:100%;overflow:auto;padding-right:.4em}::ng-deep div.cdk-overlay-container div.description-overlay div.description-container p{margin:0}@media (max-width: 680px){::ng-deep div.cdk-overlay-container div.description-overlay{max-width:90%}}@media (max-width: 400px){::ng-deep div.cdk-overlay-container div.description-overlay{max-width:290px}}@media (max-width: 360px){::ng-deep div.cdk-overlay-container div.description-overlay{max-width:220px}}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i1.MatDialog },
      { type: i2.ScrollDispatcher },
      { type: i2.ViewportRuler },
      { type: i0.NgZone },
      { type: i3.BreakpointObserver },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [MEDIA_DIALOG_TOKEN],
          },
        ],
      },
    ];
  },
  propDecorators: {
    mediaObject: [
      {
        type: Input,
      },
    ],
    image: [
      {
        type: Input,
      },
    ],
    name: [
      {
        type: Input,
      },
    ],
    hasAttributions: [
      {
        type: Input,
      },
    ],
    hasDialog: [
      {
        type: Input,
      },
    ],
    hasDziTools: [
      {
        type: Input,
      },
    ],
    hasAudio: [
      {
        type: Input,
      },
    ],
    hasDescription: [
      {
        type: Input,
      },
    ],
    hasDescriptionToggle: [
      {
        type: Input,
      },
    ],
    data: [
      {
        type: Input,
      },
    ],
    slideshowPageChanged: [
      {
        type: Input,
      },
    ],
    openDialogRequest: [
      {
        type: Input,
      },
    ],
    isToolbarInDialog: [
      {
        type: Input,
      },
    ],
    isOverlayAboveOfDziZoomToolbar: [
      {
        type: Input,
      },
    ],
    isOverlayAboveOfNonDziZoomToolbar: [
      {
        type: Input,
      },
    ],
    descriptionToggle: [
      {
        type: Output,
      },
    ],
    closeDialogEventEmitter: [
      {
        type: Output,
      },
    ],
    hasNavigationInDialog: [
      {
        type: Input,
      },
    ],
    NextDialogEmitter: [
      {
        type: Output,
      },
    ],
    PrevDialogEmitter: [
      {
        type: Output,
      },
    ],
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtdG9vbGJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL2NvcmUvc3JjL2xpYi9jb21wb25lbnRzL21lZGlhLXRvb2xiYXIvbWVkaWEtdG9vbGJhci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL2NvcmUvc3JjL2xpYi9jb21wb25lbnRzL21lZGlhLXRvb2xiYXIvbWVkaWEtdG9vbGJhci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFFWixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sRUFHTixNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdEQsT0FBTyxFQUFFLFNBQVMsRUFBZ0IsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRSxPQUFPLEVBQ0wsbUJBQW1CLEVBR25CLGdCQUFnQixFQUNoQixhQUFhLEdBQ2QsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7Ozs7O0FBUTlELE1BQU0sT0FBTyxxQkFBcUI7SUFrQ3RCO0lBQ0E7SUFFQTtJQUNBO0lBRUE7SUF2Q00sV0FBVyxDQUFjO0lBQ3pCLEtBQUssQ0FBYztJQUNuQixJQUFJLENBQVU7SUFDckIsZUFBZSxDQUFXO0lBQzFCLFNBQVMsQ0FBVztJQUNwQixXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLFFBQVEsQ0FBVztJQUNuQixjQUFjLENBQVc7SUFDekIsb0JBQW9CLENBQVc7SUFDL0IsSUFBSSxDQUFPO0lBQ1osTUFBTSxHQUFHLEVBQUUs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QUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN2RCxDQUFDO3VHQXJNVSxxQkFBcUIsZ0tBdUN0QixrQkFBa0I7MkZBdkNqQixxQkFBcUIsdzFCQzdCbEMsaW5NQWdMQTs7MkZEbkphLHFCQUFxQjtrQkFMakMsU0FBUzsrQkFDRSwwQkFBMEI7OzBCQTJDakMsTUFBTTsyQkFBQyxrQkFBa0I7NENBdENaLFdBQVc7c0JBQTFCLEtBQUs7Z0JBQ1UsS0FBSztzQkFBcEIsS0FBSztnQkFDVSxJQUFJO3NCQUFuQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFDRyxvQkFBb0I7c0JBQTVCLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUVHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFDRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBQ0csaUJBQWlCO3NCQUF6QixLQUFLO2dCQUVHLDhCQUE4QjtzQkFBdEMsS0FBSztnQkFDRyxpQ0FBaUM7c0JBQXpDLEtBQUs7Z0JBUUksaUJBQWlCO3NCQUExQixNQUFNO2dCQUNHLHVCQUF1QjtzQkFBaEMsTUFBTTtnQkFFRSxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBQ0ksaUJBQWlCO3NCQUExQixNQUFNO2dCQUNHLGlCQUFpQjtzQkFBMUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5qZWN0LFxyXG4gIElucHV0LFxyXG4gIE5nWm9uZSxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSW1hZ2VNb2RlbCwgTWVkaWFNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscyc7XHJcbmltcG9ydCB7IE1hdERpYWxvZywgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcclxuaW1wb3J0IHtcclxuICBDbG9zZVNjcm9sbFN0cmF0ZWd5LFxyXG4gIENvbXBvbmVudFR5cGUsXHJcbiAgQ29ubmVjdGVkUG9zaXRpb24sXHJcbiAgU2Nyb2xsRGlzcGF0Y2hlcixcclxuICBWaWV3cG9ydFJ1bGVyLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcclxuaW1wb3J0IHsgQnJlYWtwb2ludE9ic2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2xheW91dCc7XHJcbmltcG9ydCB7IE1FRElBX0RJQUxPR19UT0tFTiB9IGZyb20gJy4uLy4uL21lZGlhLWRpYWxvZy10b2tlbic7XHJcbmltcG9ydCB0eXBlIHsgTWVkaWFEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuLi9tZWRpYS1kaWFsb2cvbWVkaWEtZGlhbG9nLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NvbGlkLWNvcmUtbWVkaWEtdG9vbGJhcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21lZGlhLXRvb2xiYXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21lZGlhLXRvb2xiYXIuY29tcG9uZW50LnNjc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1lZGlhVG9vbGJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBwdWJsaWMgbWVkaWFPYmplY3Q/OiBNZWRpYU1vZGVsO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBpbWFnZT86IEltYWdlTW9kZWw7XHJcbiAgQElucHV0KCkgcHVibGljIG5hbWUhOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgaGFzQXR0cmlidXRpb25zITogYm9vbGVhbjtcclxuICBASW5wdXQoKSBoYXNEaWFsb2chOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGhhc0R6aVRvb2xzID0gZmFsc2U7XHJcbiAgQElucHV0KCkgaGFzQXVkaW8hOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGhhc0Rlc2NyaXB0aW9uITogYm9vbGVhbjtcclxuICBASW5wdXQoKSBoYXNEZXNjcmlwdGlvblRvZ2dsZSE6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgZGF0YSE6IGFueTtcclxuICBwcml2YXRlIGxlbmd0aCA9IDkwO1xyXG4gIEBJbnB1dCgpIHNsaWRlc2hvd1BhZ2VDaGFuZ2VkITogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIG9wZW5EaWFsb2dSZXF1ZXN0PzogYm9vbGVhbjtcclxuICBASW5wdXQoKSBpc1Rvb2xiYXJJbkRpYWxvZyA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSBpc092ZXJsYXlBYm92ZU9mRHppWm9vbVRvb2xiYXIhOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGlzT3ZlcmxheUFib3ZlT2ZOb25Eemlab29tVG9vbGJhciE6IGJvb2xlYW47XHJcbiAgYXR0cmlidXRpb25zUG9zaXRpb25zOiBDb25uZWN0ZWRQb3NpdGlvbltdID0gW107XHJcbiAgYXR0cmlidXRpb25zU2Nyb2xsU3RyYXRlZ3k6IENsb3NlU2Nyb2xsU3RyYXRlZ3k7XHJcbiAgZGVzY3JpcHRpb25TY3JvbGxTdHJhdGVneTogQ2xvc2VTY3JvbGxTdHJhdGVneTtcclxuICBhdHRyaWJ1dGlvbnNJc09wZW4gPSBmYWxzZTtcclxuICBkZXNjcmlwdGlvbklzT3BlbiA9IGZhbHNlO1xyXG4gIGRpYWxvZ1JlZj86IE1hdERpYWxvZ1JlZjxhbnk+O1xyXG5cclxuICBAT3V0cHV0KCkgZGVzY3JpcHRpb25Ub2dnbGUgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgQE91dHB1dCgpIGNsb3NlRGlhbG9nRXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIGRlc2NyaXB0aW9uVG9nZ2xlZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGhhc05hdmlnYXRpb25JbkRpYWxvZyE6IGJvb2xlYW47XHJcbiAgQE91dHB1dCgpIE5leHREaWFsb2dFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBQcmV2RGlhbG9nRW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBpc01vYmlsZSA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX2RpYWxvZzogTWF0RGlhbG9nLFxyXG4gICAgcHJpdmF0ZSBzY3JvbGxEaXNwYXRjaGVyOiBTY3JvbGxEaXNwYXRjaGVyLFxyXG4gICAgdmlld3BvcnRSdWxlcjogVmlld3BvcnRSdWxlcixcclxuICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICBwcml2YXRlIF9icmVha3BvaW50T2JzZXJ2ZXI6IEJyZWFrcG9pbnRPYnNlcnZlcixcclxuICAgIEBJbmplY3QoTUVESUFfRElBTE9HX1RPS0VOKVxyXG4gICAgcHJpdmF0ZSBtYXREaWFsb2dDb21wb25lbnQ6IENvbXBvbmVudFR5cGU8TWVkaWFEaWFsb2dDb21wb25lbnQ+XHJcbiAgKSB7XHJcbiAgICB0aGlzLmF0dHJpYnV0aW9uc1Njcm9sbFN0cmF0ZWd5ID0gbmV3IENsb3NlU2Nyb2xsU3RyYXRlZ3koXHJcbiAgICAgIHNjcm9sbERpc3BhdGNoZXIsXHJcbiAgICAgIG5nWm9uZSxcclxuICAgICAgdmlld3BvcnRSdWxlclxyXG4gICAgKTtcclxuICAgIHRoaXMuZGVzY3JpcHRpb25TY3JvbGxTdHJhdGVneSA9IG5ldyBDbG9zZVNjcm9sbFN0cmF0ZWd5KFxyXG4gICAgICBzY3JvbGxEaXNwYXRjaGVyLFxyXG4gICAgICBuZ1pvbmUsXHJcbiAgICAgIHZpZXdwb3J0UnVsZXJcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcclxuICAgIHRoaXMuZGVzY3JpcHRpb25Ub2dnbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmF0dHJpYnV0aW9uc0lzT3BlbiA9IGZhbHNlO1xyXG4gICAgaWYgKHRoaXMub3BlbkRpYWxvZ1JlcXVlc3QpIHtcclxuICAgICAgaWYgKHRoaXMubWVkaWFPYmplY3QpIHtcclxuICAgICAgICB0aGlzLm9wZW5EaWFsb2coKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5pbWFnZSkge1xyXG4gICAgICAgIHRoaXMub3BlbkRpYWxvZ0ltYWdlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgdGhpcy5kaWFsb2dSZWYgJiZcclxuICAgICAgdGhpcy5kaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UgJiZcclxuICAgICAgdGhpcy5tZWRpYU9iamVjdFxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLmRhdGEgPSB7XHJcbiAgICAgICAgbWVkaWFPYmplY3Q6IHRoaXMubWVkaWFPYmplY3QsXHJcbiAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxyXG4gICAgICAgIHR5cGU6ICdtZWRpYU9iamVjdCcsXHJcbiAgICAgICAgaGFzTmF2aWdhdGlvbkluRGlhbG9nOiB0aGlzLmhhc05hdmlnYXRpb25JbkRpYWxvZyxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlzT3ZlcmxheUFib3ZlT2ZEemlab29tVG9vbGJhcikge1xyXG4gICAgICB0aGlzLmF0dHJpYnV0aW9uc1Bvc2l0aW9ucyA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBvcmlnaW5YOiAnZW5kJyxcclxuICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICAgICAgb3ZlcmxheVg6ICdjZW50ZXInLFxyXG4gICAgICAgICAgb3ZlcmxheVk6ICdib3R0b20nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF07XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmF0dHJpYnV0aW9uc1Bvc2l0aW9ucyA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBvcmlnaW5YOiAnc3RhcnQnLFxyXG4gICAgICAgICAgb3JpZ2luWTogJ2NlbnRlcicsXHJcbiAgICAgICAgICBvdmVybGF5WDogJ2VuZCcsXHJcbiAgICAgICAgICBvdmVybGF5WTogJ2NlbnRlcicsXHJcbiAgICAgICAgfSxcclxuICAgICAgXTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlzT3ZlcmxheUFib3ZlT2ZOb25Eemlab29tVG9vbGJhcikge1xyXG4gICAgICB0aGlzLmF0dHJpYnV0aW9uc1Bvc2l0aW9ucyA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBvcmlnaW5YOiAnZW5kJyxcclxuICAgICAgICAgIG9yaWdpblk6ICd0b3AnLFxyXG4gICAgICAgICAgb3ZlcmxheVg6ICdlbmQnLFxyXG4gICAgICAgICAgb3ZlcmxheVk6ICdib3R0b20nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuX2JyZWFrcG9pbnRPYnNlcnZlclxyXG4gICAgICAub2JzZXJ2ZShbJyhtYXgtd2lkdGg6IDQ0MHB4KSddKVxyXG4gICAgICAuc3Vic2NyaWJlKChpc01vYmlsZSkgPT4ge1xyXG4gICAgICAgIGlmIChpc01vYmlsZS5tYXRjaGVzKSB7XHJcbiAgICAgICAgICB0aGlzLmxlbmd0aCA9IDEwMDtcclxuICAgICAgICAgIHRoaXMuaXNNb2JpbGUgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5kaWFsb2dSZWY/LnVwZGF0ZVNpemUoJzEwMCUnLCAnMTAwJScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmxlbmd0aCA9IDkwO1xyXG4gICAgICAgICAgdGhpcy5pc01vYmlsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy5kaWFsb2dSZWY/LnVwZGF0ZVNpemUoJzkwJScsICc5MCUnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9wZW5EaWFsb2coKSB7XHJcbiAgICBpZiAodGhpcy5tZWRpYU9iamVjdD8ubWVkaWFUeXBlID09PSAnaW1hZ2UnKSB7XHJcbiAgICAgIHRoaXMuZGlhbG9nUmVmID0gdGhpcy5fZGlhbG9nLm9wZW4odGhpcy5tYXREaWFsb2dDb21wb25lbnQsIHtcclxuICAgICAgICBtYXhXaWR0aDogJzEwMHZ3JyxcclxuICAgICAgICB3aWR0aDogdGhpcy5sZW5ndGggKyAnJScsXHJcbiAgICAgICAgaGVpZ2h0OiB0aGlzLmxlbmd0aCArICclJyxcclxuICAgICAgICBtYXhIZWlnaHQ6ICcxMDB2aCcsXHJcbiAgICAgICAgcGFuZWxDbGFzczogJ3NvbGlkLWNvcmUtbWVkaWEtZGlhbG9nJyxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICBtZWRpYU9iamVjdDogdGhpcy5tZWRpYU9iamVjdCxcclxuICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgICAgIHR5cGU6ICdtZWRpYU9iamVjdCcsXHJcbiAgICAgICAgICBoYXNOYXZpZ2F0aW9uSW5EaWFsb2c6IHRoaXMuaGFzTmF2aWdhdGlvbkluRGlhbG9nLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jbG9zZURpYWxvZ0V2ZW50RW1pdHRlci5lbWl0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlhbG9nUmVmKSB7XHJcbiAgICAgICAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLm9uTmV4dEVtaXR0ZXIuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLk5leHREaWFsb2dFbWl0dGVyLmVtaXQoKTtcclxuICAgICAgICB0aGlzLm9wZW5EaWFsb2dSZXF1ZXN0ID0gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5vblByZXZFbWl0dGVyLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5QcmV2RGlhbG9nRW1pdHRlci5lbWl0KCk7XHJcbiAgICAgICAgdGhpcy5vcGVuRGlhbG9nUmVxdWVzdCA9IGZhbHNlO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvcGVuRGlhbG9nSW1hZ2UoKSB7XHJcbiAgICB0aGlzLmRpYWxvZ1JlZiA9IHRoaXMuX2RpYWxvZy5vcGVuKHRoaXMubWF0RGlhbG9nQ29tcG9uZW50LCB7XHJcbiAgICAgIG1heFdpZHRoOiB0aGlzLmxlbmd0aCArICd2dycsXHJcbiAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgIGhlaWdodDogJzEwMCUnLFxyXG4gICAgICBtYXhIZWlnaHQ6IHRoaXMubGVuZ3RoICsgJ3ZoJyxcclxuICAgICAgcGFuZWxDbGFzczogJ3NvbGlkLWNvcmUtbWVkaWEtZGlhbG9nJyxcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIGltYWdlOiB0aGlzLmltYWdlLFxyXG4gICAgICAgIG5hbWU6IHRoaXMubmFtZSxcclxuICAgICAgICB0eXBlOiAncGhvdG9ncmFwaCcsXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICAgIHRoaXMuZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5jbG9zZURpYWxvZ0V2ZW50RW1pdHRlci5lbWl0KCk7XHJcbiAgICAgIGlmICh0aGlzLmRpYWxvZ1JlZikge1xyXG4gICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXR0cmlidXRpb25zT3BlbkNsb3NlKCkge1xyXG4gICAgdGhpcy5hdHRyaWJ1dGlvbnNJc09wZW4gPSAhdGhpcy5hdHRyaWJ1dGlvbnNJc09wZW47XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uSXNPcGVuID0gZmFsc2U7XHJcbiAgICBpZiAodGhpcy5hdHRyaWJ1dGlvbnNJc09wZW4gPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5zY3JvbGxEaXNwYXRjaGVyLnNjcm9sbGVkKCkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5hdHRyaWJ1dGlvbnNJc09wZW4gPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBkZXNjcmlwdGlvbk9wZW5DbG9zZSgpIHtcclxuICAgIHRoaXMuZGVzY3JpcHRpb25Jc09wZW4gPSAhdGhpcy5kZXNjcmlwdGlvbklzT3BlbjtcclxuICAgIHRoaXMuYXR0cmlidXRpb25zSXNPcGVuID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVEZXNjcmlwdGlvbigpIHtcclxuICAgIHRoaXMuZGVzY3JpcHRpb25Ub2dnbGVkID0gIXRoaXMuZGVzY3JpcHRpb25Ub2dnbGVkO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvblRvZ2dsZS5lbWl0KHRoaXMuZGVzY3JpcHRpb25Ub2dnbGVkKTtcclxuICB9XHJcbn1cclxuIiwiPGRpdlxyXG4gIGNsYXNzPVwidG9vbGJhci1jb250YWluZXJcIlxyXG4gIFtjbGFzcy5kemldPVwiaGFzRHppVG9vbHNcIlxyXG4gIFtjbGFzcy5pc1Rvb2xiYXJJbkRpYWxvZ109XCJpc1Rvb2xiYXJJbkRpYWxvZ1wiXHJcbj5cclxuICA8IS0tIDxuZy1jb250YWluZXIgKm5nSWY9XCJoYXNBdWRpb1wiPlxyXG4gICAgPHNvbGlkLWNvcmUtYXVkaW8tdG9vbGJhclxyXG4gICAgICAqbmdJZj1cImhhc0F1ZGlvXCJcclxuICAgICAgW2F1ZGlvc3JjXT1cImRhdGEubWVkaWFPYmplY3QuYXVkaW9zcmNcIlxyXG4gICAgICBbZGVzY3JpcHRpb25dPVwiZGF0YS5tZWRpYU9iamVjdC5kZXNjcmlwdGlvblwiXHJcbiAgICA+XHJcbiAgICA8L3NvbGlkLWNvcmUtYXVkaW8tdG9vbGJhcj5cclxuICA8L25nLWNvbnRhaW5lcj4gLS0+XHJcbiAgPGRpdiBjbGFzcz1cInRvb2xiYXJcIiAqbmdJZj1cIm1lZGlhT2JqZWN0XCI+XHJcbiAgICA8YnV0dG9uXHJcbiAgICAgICpuZ0lmPVwiaGFzRGVzY3JpcHRpb24gJiYgbWVkaWFPYmplY3QuZGVzY3JpcHRpb25cIlxyXG4gICAgICBtYXQtbWluaS1mYWJcclxuICAgICAgY29sb3I9XCJhY2NlbnRcIlxyXG4gICAgICBjZGtPdmVybGF5T3JpZ2luXHJcbiAgICAgICNhdHRyaWJ1dGlvbnNPdmVybGF5T3JpZ2luPVwiY2RrT3ZlcmxheU9yaWdpblwiXHJcbiAgICAgIChjbGljayk9XCJkZXNjcmlwdGlvbk9wZW5DbG9zZSgpXCJcclxuICAgID5cclxuICAgICAgPG1hdC1pY29uPmRlc2NyaXB0aW9uPC9tYXQtaWNvbj5cclxuICAgICAgPG5nLXRlbXBsYXRlXHJcbiAgICAgICAgY2RrQ29ubmVjdGVkT3ZlcmxheVxyXG4gICAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3JpZ2luXT1cImF0dHJpYnV0aW9uc092ZXJsYXlPcmlnaW5cIlxyXG4gICAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3Blbl09XCJkZXNjcmlwdGlvbklzT3BlblwiXHJcbiAgICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbnNdPVwiYXR0cmlidXRpb25zUG9zaXRpb25zXCJcclxuICAgICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheVNjcm9sbFN0cmF0ZWd5XT1cImRlc2NyaXB0aW9uU2Nyb2xsU3RyYXRlZ3lcIlxyXG4gICAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5SGFzQmFja2Ryb3BdPVwidHJ1ZVwiXHJcbiAgICAgICAgKGJhY2tkcm9wQ2xpY2spPVwiZGVzY3JpcHRpb25PcGVuQ2xvc2UoKVwiXHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb24tb3ZlcmxheVwiPlxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICBjbGFzcz1cImRlc2NyaXB0aW9uLWNvbnRhaW5lclwiXHJcbiAgICAgICAgICAgIG1hcmtkb3duXHJcbiAgICAgICAgICAgIFtkYXRhXT1cIm1lZGlhT2JqZWN0LmRlc2NyaXB0aW9uXCJcclxuICAgICAgICAgID48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDwvYnV0dG9uPlxyXG4gICAgPGJ1dHRvblxyXG4gICAgICAqbmdJZj1cImhhc0F0dHJpYnV0aW9ucyAmJiBtZWRpYU9iamVjdC5hdHRyaWJ1dGlvbnMgYXMgYXR0cmlidXRpb25zXCJcclxuICAgICAgbWF0LW1pbmktZmFiXHJcbiAgICAgIGNvbG9yPVwiYWNjZW50XCJcclxuICAgICAgY2RrT3ZlcmxheU9yaWdpblxyXG4gICAgICAjYXR0cmlidXRpb25zT3ZlcmxheU9yaWdpbj1cImNka092ZXJsYXlPcmlnaW5cIlxyXG4gICAgICAoY2xpY2spPVwiYXR0cmlidXRpb25zT3BlbkNsb3NlKClcIlxyXG4gICAgICBpZD1cInByb2ZpbGUtY29weXJpZ2h0LWJ0blwiXHJcbiAgICA+XHJcbiAgICAgIDxtYXQtaWNvbj5jb3B5cmlnaHQ8L21hdC1pY29uPlxyXG4gICAgICA8bmctdGVtcGxhdGVcclxuICAgICAgICBjZGtDb25uZWN0ZWRPdmVybGF5XHJcbiAgICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcmlnaW5dPVwiYXR0cmlidXRpb25zT3ZlcmxheU9yaWdpblwiXHJcbiAgICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlPcGVuXT1cImF0dHJpYnV0aW9uc0lzT3BlblwiXHJcbiAgICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlQb3NpdGlvbnNdPVwiYXR0cmlidXRpb25zUG9zaXRpb25zXCJcclxuICAgICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheVNjcm9sbFN0cmF0ZWd5XT1cImF0dHJpYnV0aW9uc1Njcm9sbFN0cmF0ZWd5XCJcclxuICAgICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheUhhc0JhY2tkcm9wXT1cInRydWVcIlxyXG4gICAgICAgIChiYWNrZHJvcENsaWNrKT1cImF0dHJpYnV0aW9uc09wZW5DbG9zZSgpXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhdHRyaWJ1dGlvbnMtb3ZlcmxheVwiPnt7IGF0dHJpYnV0aW9ucyB9fTwvZGl2PlxyXG4gICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPC9idXR0b24+XHJcbiAgICA8IS0tIDxidXR0b25cclxuICAgICAgKm5nSWY9XCJoYXNEZXNjcmlwdGlvblRvZ2dsZVwiXHJcbiAgICAgIGlkPVwiXCJcclxuICAgICAgbWF0LW1pbmktZmFiXHJcbiAgICAgIGNvbG9yPVwiYWNjZW50XCJcclxuICAgICAgKGNsaWNrKT1cInRvZ2dsZURlc2NyaXB0aW9uKClcIlxyXG4gICAgPlxyXG4gICAgICA8bWF0LWljb24+ZGVzY3JpcHRpb248L21hdC1pY29uPlxyXG4gICAgPC9idXR0b24+IC0tPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImhhc0R6aVRvb2xzXCI+XHJcbiAgICAgIDxidXR0b24gaWQ9XCJ6b29tLWluLWJ1dHRvblwiIG1hdC1taW5pLWZhYiBjb2xvcj1cImFjY2VudFwiPlxyXG4gICAgICAgIDxtYXQtaWNvbj56b29tX2luPC9tYXQtaWNvbj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICAgIDxidXR0b24gaWQ9XCJ6b29tLW91dC1idXR0b25cIiBtYXQtbWluaS1mYWIgY29sb3I9XCJhY2NlbnRcIj5cclxuICAgICAgICA8bWF0LWljb24+em9vbV9vdXQ8L21hdC1pY29uPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvbiBpZD1cImhvbWUtYnV0dG9uXCIgbWF0LW1pbmktZmFiIGNvbG9yPVwiYWNjZW50XCI+XHJcbiAgICAgICAgPG1hdC1pY29uPmhvbWU8L21hdC1pY29uPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPGJ1dHRvblxyXG4gICAgICAqbmdJZj1cImhhc0RpYWxvZ1wiXHJcbiAgICAgIG1hdC1taW5pLWZhYlxyXG4gICAgICBjb2xvcj1cImFjY2VudFwiXHJcbiAgICAgIChjbGljayk9XCJvcGVuRGlhbG9nKClcIlxyXG4gICAgICBpZD1cInByb2ZpbGUtZGV0YWlsLWJ0blwiXHJcbiAgICA+XHJcbiAgICAgIDxtYXQtaWNvbj5tb3JlX2hvcml6PC9tYXQtaWNvbj5cclxuICAgIDwvYnV0dG9uPlxyXG4gIDwvZGl2PlxyXG5cclxuICA8IS0tIEZvciBJbWFnZSBpbiBxdWl6IC0tPlxyXG4gIDxkaXYgY2xhc3M9XCJ0b29sYmFyXCIgKm5nSWY9XCJpbWFnZVwiPlxyXG4gICAgPGJ1dHRvblxyXG4gICAgICAqbmdJZj1cImhhc0Rlc2NyaXB0aW9uICYmIGltYWdlLmRlc2NyaXB0aW9uXCJcclxuICAgICAgbWF0LW1pbmktZmFiXHJcbiAgICAgIGNvbG9yPVwiYWNjZW50XCJcclxuICAgICAgY2RrT3ZlcmxheU9yaWdpblxyXG4gICAgICAjYXR0cmlidXRpb25zT3ZlcmxheU9yaWdpbj1cImNka092ZXJsYXlPcmlnaW5cIlxyXG4gICAgICAoY2xpY2spPVwiZGVzY3JpcHRpb25PcGVuQ2xvc2UoKVwiXHJcbiAgICA+XHJcbiAgICAgIDxtYXQtaWNvbj5kZXNjcmlwdGlvbjwvbWF0LWljb24+XHJcbiAgICAgIDxuZy10ZW1wbGF0ZVxyXG4gICAgICAgIGNka0Nvbm5lY3RlZE92ZXJsYXlcclxuICAgICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9yaWdpbl09XCJhdHRyaWJ1dGlvbnNPdmVybGF5T3JpZ2luXCJcclxuICAgICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheU9wZW5dPVwiZGVzY3JpcHRpb25Jc09wZW5cIlxyXG4gICAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25zXT1cImF0dHJpYnV0aW9uc1Bvc2l0aW9uc1wiXHJcbiAgICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlTY3JvbGxTdHJhdGVneV09XCJkZXNjcmlwdGlvblNjcm9sbFN0cmF0ZWd5XCJcclxuICAgICAgICBbY2RrQ29ubmVjdGVkT3ZlcmxheUhhc0JhY2tkcm9wXT1cInRydWVcIlxyXG4gICAgICAgIChiYWNrZHJvcENsaWNrKT1cImRlc2NyaXB0aW9uT3BlbkNsb3NlKClcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImRlc2NyaXB0aW9uLW92ZXJsYXlcIj5cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgY2xhc3M9XCJkZXNjcmlwdGlvbi1jb250YWluZXJcIlxyXG4gICAgICAgICAgICBtYXJrZG93blxyXG4gICAgICAgICAgICBbZGF0YV09XCJpbWFnZS5kZXNjcmlwdGlvblwiXHJcbiAgICAgICAgICA+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICA8L2J1dHRvbj5cclxuICAgIDxidXR0b25cclxuICAgICAgKm5nSWY9XCJoYXNBdHRyaWJ1dGlvbnMgJiYgaW1hZ2UuYXR0cmlidXRpb25zIGFzIGF0dHJpYnV0aW9uc1wiXHJcbiAgICAgIG1hdC1taW5pLWZhYlxyXG4gICAgICBjb2xvcj1cImFjY2VudFwiXHJcbiAgICAgIGNka092ZXJsYXlPcmlnaW5cclxuICAgICAgI2F0dHJpYnV0aW9uc092ZXJsYXlPcmlnaW49XCJjZGtPdmVybGF5T3JpZ2luXCJcclxuICAgICAgKGNsaWNrKT1cImF0dHJpYnV0aW9uc09wZW5DbG9zZSgpXCJcclxuICAgICAgaWQ9XCJwcm9maWxlLWNvcHlyaWdodC1idG5cIlxyXG4gICAgPlxyXG4gICAgICA8bWF0LWljb24+Y29weXJpZ2h0PC9tYXQtaWNvbj5cclxuICAgICAgPG5nLXRlbXBsYXRlXHJcbiAgICAgICAgY2RrQ29ubmVjdGVkT3ZlcmxheVxyXG4gICAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3JpZ2luXT1cImF0dHJpYnV0aW9uc092ZXJsYXlPcmlnaW5cIlxyXG4gICAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5T3Blbl09XCJhdHRyaWJ1dGlvbnNJc09wZW5cIlxyXG4gICAgICAgIFtjZGtDb25uZWN0ZWRPdmVybGF5UG9zaXRpb25zXT1cImF0dHJpYnV0aW9uc1Bvc2l0aW9uc1wiXHJcbiAgICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlTY3JvbGxTdHJhdGVneV09XCJhdHRyaWJ1dGlvbnNTY3JvbGxTdHJhdGVneVwiXHJcbiAgICAgICAgW2Nka0Nvbm5lY3RlZE92ZXJsYXlIYXNCYWNrZHJvcF09XCJ0cnVlXCJcclxuICAgICAgICAoYmFja2Ryb3BDbGljayk9XCJhdHRyaWJ1dGlvbnNPcGVuQ2xvc2UoKVwiXHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXR0cmlidXRpb25zLW92ZXJsYXlcIj57eyBhdHRyaWJ1dGlvbnMgfX08L2Rpdj5cclxuICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDwvYnV0dG9uPlxyXG4gICAgPCEtLSA8YnV0dG9uXHJcbiAgICAgICpuZ0lmPVwiaGFzRGVzY3JpcHRpb25Ub2dnbGVcIlxyXG4gICAgICBpZD1cIlwiXHJcbiAgICAgIG1hdC1taW5pLWZhYlxyXG4gICAgICBjb2xvcj1cImFjY2VudFwiXHJcbiAgICAgIChjbGljayk9XCJ0b2dnbGVEZXNjcmlwdGlvbigpXCJcclxuICAgID5cclxuICAgICAgPG1hdC1pY29uPmRlc2NyaXB0aW9uPC9tYXQtaWNvbj5cclxuICAgIDwvYnV0dG9uPiAtLT5cclxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJoYXNEemlUb29sc1wiPlxyXG4gICAgICA8YnV0dG9uIGlkPVwiem9vbS1pbi1idXR0b25cIiBtYXQtbWluaS1mYWIgY29sb3I9XCJhY2NlbnRcIj5cclxuICAgICAgICA8bWF0LWljb24+em9vbV9pbjwvbWF0LWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uIGlkPVwiem9vbS1vdXQtYnV0dG9uXCIgbWF0LW1pbmktZmFiIGNvbG9yPVwiYWNjZW50XCI+XHJcbiAgICAgICAgPG1hdC1pY29uPnpvb21fb3V0PC9tYXQtaWNvbj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICAgIDxidXR0b24gaWQ9XCJob21lLWJ1dHRvblwiIG1hdC1taW5pLWZhYiBjb2xvcj1cImFjY2VudFwiPlxyXG4gICAgICAgIDxtYXQtaWNvbj5ob21lPC9tYXQtaWNvbj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDxidXR0b25cclxuICAgICAgKm5nSWY9XCJoYXNEaWFsb2dcIlxyXG4gICAgICBtYXQtbWluaS1mYWJcclxuICAgICAgY29sb3I9XCJhY2NlbnRcIlxyXG4gICAgICAoY2xpY2spPVwib3BlbkRpYWxvZ0ltYWdlKClcIlxyXG4gICAgICBpZD1cInByb2ZpbGUtZGV0YWlsLWJ0blwiXHJcbiAgICA+XHJcbiAgICAgIDxtYXQtaWNvbj5tb3JlX2hvcml6PC9tYXQtaWNvbj5cclxuICAgIDwvYnV0dG9uPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19
