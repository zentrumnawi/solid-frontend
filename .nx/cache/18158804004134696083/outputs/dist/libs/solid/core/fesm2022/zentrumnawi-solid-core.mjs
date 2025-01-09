import * as i0 from '@angular/core';
import {
  InjectionToken,
  SecurityContext,
  Injectable,
  Inject,
  Component,
  Input,
  HostBinding,
  EventEmitter,
  Output,
  ViewChild,
  HostListener,
  NgModule,
} from '@angular/core';
import * as i2$2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as MarkdownIt from 'markdown-it';
import * as i1 from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { RouterNavigation, RouterStateSerializer } from '@ngxs/router-plugin';
import { map } from 'rxjs/operators';
import * as i2 from '@ngxs/store';
import { ofActionSuccessful } from '@ngxs/store';
import * as i1$1 from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import * as i5 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i6 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i2$1 from '@angular/cdk/overlay';
import { CloseScrollStrategy, OverlayModule } from '@angular/cdk/overlay';
import * as i3 from '@angular/cdk/layout';
import * as i7 from '@angular/material/slider';
import { MatSliderModule } from '@angular/material/slider';
import OpenSeadragon from 'openseadragon';
import { ScrollingModule } from '@angular/cdk/scrolling';

const SOLID_CORE_CONFIG = new InjectionToken('solid-core-config');

class MarkdownService {
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

class CustomRouteReuseStrategy {
  shouldDetach(route) {
    return false;
  }
  store(
    route,
    detachedTree
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) {}
  shouldAttach(route) {
    return false;
  }
  retrieve(route) {
    return null;
  }
  shouldReuseRoute(future, curr) {
    const reuse = future.routeConfig === curr.routeConfig;
    if (reuse && future.data.noReuse) {
      return false;
    }
    return reuse;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: CustomRouteReuseStrategy,
    deps: [],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: CustomRouteReuseStrategy,
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: CustomRouteReuseStrategy,
  decorators: [
    {
      type: Injectable,
    },
  ],
});

// Map the router snapshot to { url, params, queryParams }
class CustomRouterStateSerializer {
  serialize(routerState) {
    const {
      url,
      root: { queryParams },
    } = routerState;
    let { root: route } = routerState;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const { params, data } = route;
    return { url, params, queryParams, routeData: data };
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: CustomRouterStateSerializer,
    deps: [],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: CustomRouterStateSerializer,
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: CustomRouterStateSerializer,
  decorators: [
    {
      type: Injectable,
    },
  ],
});

class TitleService {
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

class MarkdownComponent {
  _md;
  set inline(value) {
    this._inline = value;
    this.onDataChange();
  }
  innerHTML = '';
  _data = '';
  _inline = false;
  inlineClass = () => this._inline;
  constructor(_md) {
    this._md = _md;
  }
  set data(value) {
    this._data = value;
    this.onDataChange();
  }
  set appendData(value) {
    if (value !== null) {
      this.innerHTML =
        this._md.compile(this._data, this._inline) +
        `<span class="media-object-title"> | ${value}<span>`;
    }
  }
  onDataChange() {
    if (this._data) {
      this.innerHTML = this._md.compile(this._data, this._inline);
    } else {
      this.innerHTML = '';
    }
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MarkdownComponent,
    deps: [{ token: MarkdownService }],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: MarkdownComponent,
    selector: '[markdown]',
    inputs: { inline: 'inline', data: 'data', appendData: 'appendData' },
    host: {
      properties: {
        innerHTML: 'this.innerHTML',
        'class.md-inline': 'this.inlineClass',
      },
      classAttribute: 'md-rendered',
    },
    ngImport: i0,
    template: '<ng-content></ng-content>',
    isInline: true,
    styles: [
      ':host .md-rendered p{margin-bottom:.5em}:host .md-rendered span.md-overline{text-decoration:overline}\n',
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: MarkdownComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: '[markdown]',
          template: '<ng-content></ng-content>',
          host: {
            class: 'md-rendered',
          },
          styles: [
            ':host .md-rendered p{margin-bottom:.5em}:host .md-rendered span.md-overline{text-decoration:overline}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [{ type: MarkdownService }];
  },
  propDecorators: {
    inline: [
      {
        type: Input,
      },
    ],
    innerHTML: [
      {
        type: HostBinding,
        args: ['innerHTML'],
      },
    ],
    inlineClass: [
      {
        type: HostBinding,
        args: ['class.md-inline'],
      },
    ],
    data: [
      {
        type: Input,
      },
    ],
    appendData: [
      {
        type: Input,
      },
    ],
  },
});

class ImageModel {
  _photograph;
  get isLandscape() {
    return (
      this._photograph.img_original_width > this._photograph.img_original_height
    );
  }
  get attributions() {
    const author = this._photograph.author;
    const license = this._photograph.license;
    if (author && license) {
      return `${this._photograph.author} (${this._photograph.license})`;
    }
    if (license) {
      return license;
    }
    if (author) {
      return author;
    }
    return undefined;
  }
  get description() {
    return this._photograph.description;
  }
  get audiosrc() {
    return this._photograph.audio;
  }
  get audioduration() {
    return this._photograph.audio_duration;
  }
  get alt() {
    return this._photograph.img_alt;
  }
  get author() {
    return this._photograph.author;
  }
  get license() {
    return this._photograph.license;
  }
  getRawImage(size) {
    return this._photograph.img[size];
    // return this._photograph.file[size]; // works but should it also be img for questions ?
  }
  get deepZoomLink() {
    if (!this._photograph.dzi_file) {
      return false;
    }
    return this._photograph.dzi_file;
  }
  constructor(_photograph) {
    this._photograph = _photograph;
  }
}

class MediaModel {
  _mediaObject;
  constructor(_mediaObject) {
    this._mediaObject = _mediaObject;
  }
  get mediaType() {
    return this._mediaObject.media_format;
  }
  get isLandscape() {
    return (
      this._mediaObject.img_original_width >
      this._mediaObject.img_original_height
    );
  }
  get attributions() {
    const author = this._mediaObject.author;
    const license = this._mediaObject.license;
    if (author && license) {
      return `${this._mediaObject.author} (${this._mediaObject.license})`;
    }
    if (license) {
      return license;
    }
    if (author) {
      return author;
    }
    return undefined;
  }
  get description() {
    return this._mediaObject.description;
  }
  get audiosrc() {
    return this._mediaObject.audio;
  }
  //   public get audioduration(): string | undefined {
  //     return this._mediaObject.audio_duration;
  //   }
  get alt() {
    return this._mediaObject.img_alt;
  }
  get author() {
    return this._mediaObject.author;
  }
  get license() {
    return this._mediaObject.license;
  }
  getRawImage(size) {
    if (this.mediaType === 'image') {
      return this._mediaObject.file[size];
    }
    if (this.mediaType === 'audio') {
      return 'assets/profile/audio.svg';
    }
    if (this.mediaType === 'video') {
      return 'assets/profile/video.svg';
    }
    return 'assets/profile/no_thumbnail.svg';
  }
  getSrc() {
    if (this.mediaType === 'video' || this.mediaType === 'audio') {
      return this._mediaObject.file['original'];
    }
    return null;
  }
  get deepZoomLink() {
    if (!this._mediaObject.dzi_file) {
      return false;
    }
    return this._mediaObject.dzi_file;
  }
  get getTitle() {
    return this._mediaObject.title;
  }
  get getProfilePosition() {
    return this._mediaObject.profile_position;
  }
}

class MediaErrorDialogComponent {
  data;
  name;
  coreConfig;
  constructor(data, name, coreConfig) {
    this.data = data;
    this.name = name;
    this.coreConfig = coreConfig;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MediaErrorDialogComponent,
    deps: [
      { token: MAT_DIALOG_DATA },
      { token: MAT_DIALOG_DATA },
      { token: SOLID_CORE_CONFIG },
    ],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: MediaErrorDialogComponent,
    selector: 'solid-core-media-error-dialog',
    ngImport: i0,
    template:
      '<div mat-dialog-title class="mat-error-dialog-title">\r\n  <div>{{ data.title }}</div>\r\n  <button mat-icon-button mat-dialog-close>\r\n    <mat-icon>close</mat-icon>\r\n  </button>\r\n</div>\r\n<div class="mat-error-dialog-content">\r\n  <p>{{ data.content }}</p>\r\n</div>\r\n',
    styles: [
      '::ng-deep .solid-core-media-error-dialog mat-dialog-container{overflow:hidden;padding:0}div.mat-error-dialog-title{display:flex;justify-content:space-between;align-items:center;padding-left:15px;margin:0;background-color:#d3d3d3;color:#fff;font-weight:400}@media (max-width: 400px){div.mat-error-dialog-title{font-size:18px}}div.mat-error-dialog-content{margin:0rem 1.3rem 1.4rem;padding:0;max-height:calc(100% - 44px);height:100%;width:-moz-fit-content;width:fit-content;position:relative;font-weight:200}@media (max-width: 400px){div.mat-error-dialog-content{font-size:14px}}::ng-deep .mat-button-focus-overlay{background-color:transparent!important}\n',
    ],
    dependencies: [
      {
        kind: 'component',
        type: i5.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'component',
        type: i6.MatIconButton,
        selector: 'button[mat-icon-button]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'directive',
        type: i1$1.MatDialogClose,
        selector: '[mat-dialog-close], [matDialogClose]',
        inputs: ['aria-label', 'type', 'mat-dialog-close', 'matDialogClose'],
        exportAs: ['matDialogClose'],
      },
      {
        kind: 'directive',
        type: i1$1.MatDialogTitle,
        selector: '[mat-dialog-title], [matDialogTitle]',
        inputs: ['id'],
        exportAs: ['matDialogTitle'],
      },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: MediaErrorDialogComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-core-media-error-dialog',
          template:
            '<div mat-dialog-title class="mat-error-dialog-title">\r\n  <div>{{ data.title }}</div>\r\n  <button mat-icon-button mat-dialog-close>\r\n    <mat-icon>close</mat-icon>\r\n  </button>\r\n</div>\r\n<div class="mat-error-dialog-content">\r\n  <p>{{ data.content }}</p>\r\n</div>\r\n',
          styles: [
            '::ng-deep .solid-core-media-error-dialog mat-dialog-container{overflow:hidden;padding:0}div.mat-error-dialog-title{display:flex;justify-content:space-between;align-items:center;padding-left:15px;margin:0;background-color:#d3d3d3;color:#fff;font-weight:400}@media (max-width: 400px){div.mat-error-dialog-title{font-size:18px}}div.mat-error-dialog-content{margin:0rem 1.3rem 1.4rem;padding:0;max-height:calc(100% - 44px);height:100%;width:-moz-fit-content;width:fit-content;position:relative;font-weight:200}@media (max-width: 400px){div.mat-error-dialog-content{font-size:14px}}::ng-deep .mat-button-focus-overlay{background-color:transparent!important}\n',
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
    ];
  },
});

const MEDIA_DIALOG_TOKEN = new InjectionToken('media_dialog_token');

class MediaToolbarComponent {
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
      { token: i1$1.MatDialog },
      { token: i2$1.ScrollDispatcher },
      { token: i2$1.ViewportRuler },
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
        type: i2$2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i2$1.CdkConnectedOverlay,
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
        type: i2$1.CdkOverlayOrigin,
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
        type: MarkdownComponent,
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
      { type: i1$1.MatDialog },
      { type: i2$1.ScrollDispatcher },
      { type: i2$1.ViewportRuler },
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

class AudioToolbarComponent {
  coreConfig;
  _dialog;
  _breakpointObsever;
  audiosrc;
  description;
  toolbar;
  player;
  audioLoaded = false;
  playing = false;
  playingStarted = false;
  playPositionString = '0:00/-:--';
  playPosition = 0;
  duration = 0;
  volume = 1;
  previousVolume = 0;
  isMuted = false;
  isMobile = false;
  playAudio = false;
  audioErrorEventEmitter = new EventEmitter();
  audioEndedEventEmitter = new EventEmitter();
  constructor(coreConfig, _dialog, _breakpointObsever) {
    this.coreConfig = coreConfig;
    this._dialog = _dialog;
    this._breakpointObsever = _breakpointObsever;
  }
  ngOnInit() {
    this._breakpointObsever
      .observe(['(max-width: 470px)'])
      .subscribe((isMobile) => {
        if (isMobile.matches) {
          this.isMobile = true;
        } else {
          this.isMobile = false;
        }
      });
  }
  isIOS() {
    return (
      [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod',
      ].includes(navigator.platform) ||
      navigator.userAgent.includes('iPad') ||
      navigator.userAgent.includes('iPhone') ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
    );
  }
  onPlayerReady() {
    if (this.player) {
      this.audioLoaded = true;
      this.duration = this.player.nativeElement.duration;
      this.playPosition = 0;
      this.displayPlayPosition(0);
    }
  }
  onPlayPauseClick() {
    if (this.player) {
      if (this.playing) {
        this.player.nativeElement.pause();
      } else {
        this.playingStarted = true;
        this.player.nativeElement.play();
      }
    }
    this.playing = !this.playing;
  }
  onReplayClick() {
    if (this.player) {
      this.player.nativeElement.pause();
      this.player.nativeElement.currentTime = 0;
      this.player.nativeElement.play();
      this.playing = true;
    }
  }
  onPlayerTimeUpdate() {
    if (this.player) {
      this.displayPlayPosition(this.player.nativeElement.currentTime);
    }
  }
  displayPlayPosition(currentTime) {
    if (this.player) {
      const durationSeconds = Math.floor(this.duration % 60);
      const currentTimeSeconds = Math.floor(currentTime % 60);
      this.playPositionString = `${Math.floor(currentTime / 60)}:${
        currentTimeSeconds < 10 ? '0' + currentTimeSeconds : currentTimeSeconds
      }/${Math.floor(this.duration / 60)}:${
        durationSeconds < 10 ? '0' + durationSeconds : durationSeconds
      }`;
      this.playPosition = currentTime;
      return;
    }
    this.playPosition = 0;
  }
  onPositionChangeEnd(change) {
    if (this.player) {
      this.player.nativeElement.currentTime = change.value;
    }
  }
  onVolumeChangeEnd(change) {
    if (this.player) {
      this.isMuted = false;
      this.player.nativeElement.volume = change.value;
      this.volume = change.value;
      if (change.value === 0) {
        this.isMuted = true;
      }
    }
  }
  onVolumeMutingToggle() {
    if (this.player) {
      this.isMuted = !this.isMuted;
      if (this.isMuted) {
        this.player.nativeElement.muted = true;
        this.previousVolume = this.volume;
        this.volume = 0;
      } else {
        this.player.nativeElement.muted = false;
        this.volume = this.previousVolume;
      }
    }
  }
  onPlayerMediaError() {
    this.audioErrorEventEmitter.emit();
    this.audioLoaded = false;
    this._dialog.open(MediaErrorDialogComponent, {
      data: {
        title: 'Fehler',
        content: 'Audiodatei konnte nicht geladen werden.',
      },
      panelClass: 'solid-core-media-error-dialog',
    });
    return;
  }
  onPlayerEnded() {
    if (this.player) {
      this.audioEndedEventEmitter.emit();
      this.playingStarted = false;
      this.playing = false;
      this.player.nativeElement.currentTime = 0;
    }
  }
  ngOnChanges() {
    if (this.playingStarted && this.player) {
      this.playing = false;
      this.audioLoaded = false;
      this.playPositionString = '0:00/-:--';
      this.playPosition = 0;
    }
    if (this.playAudio) this.onPlayPauseClick();
  }
  ngOnDestroy() {
    if (this.playingStarted && this.player) {
      this.player.nativeElement.pause();
    }
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: AudioToolbarComponent,
    deps: [
      { token: SOLID_CORE_CONFIG },
      { token: i1$1.MatDialog },
      { token: i3.BreakpointObserver },
    ],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: AudioToolbarComponent,
    selector: 'solid-core-audio-toolbar',
    inputs: {
      audiosrc: 'audiosrc',
      description: 'description',
      toolbar: 'toolbar',
      playAudio: 'playAudio',
    },
    outputs: {
      audioErrorEventEmitter: 'audioErrorEventEmitter',
      audioEndedEventEmitter: 'audioEndedEventEmitter',
    },
    viewQueries: [
      {
        propertyName: 'player',
        first: true,
        predicate: ['audioplayer'],
        descendants: true,
      },
    ],
    usesOnChanges: true,
    ngImport: i0,
    template:
      '<ng-container *ngIf="!toolbar">\n  <button\n    (click)="onPlayPauseClick()"\n    [disabled]="!audioLoaded"\n    mat-mini-fab\n    color="accent"\n  >\n    <mat-icon>{{ playing ? \'pause\' : \'play_arrow\' }}</mat-icon>\n  </button>\n</ng-container>\n<ng-container *ngIf="toolbar">\n  <div class="toolbar" [class.mobile]="isMobile">\n    <button class="play-btn" mat-icon-button (click)="onPlayPauseClick()">\n      <mat-icon>{{ playing ? \'pause\' : \'play_arrow\' }}</mat-icon>\n    </button>\n    <button\n      mat-icon-button\n      [disabled]="!audioLoaded"\n      (click)="onReplayClick()"\n      class="replay-btn"\n    >\n      <mat-icon>replay</mat-icon>\n    </button>\n    {{ playPositionString }}\n    <mat-slider\n      min="0"\n      [max]="duration"\n      step="1"\n      [(ngModel)]="playPosition"\n      [disabled]="!audioLoaded"\n      (input)="onPositionChangeEnd($event)"\n      class="playingSlider"\n    ></mat-slider>\n    <button\n      mat-icon-button\n      [disabled]="!audioLoaded"\n      (click)="onVolumeMutingToggle()"\n      class="volume-btn"\n    >\n      <mat-icon>{{ isMuted ? \'volume_off\' : \'volume_up\' }}</mat-icon>\n    </button>\n    <mat-slider\n      min="0"\n      max="1"\n      step="0.1"\n      [(ngModel)]="volume"\n      [disabled]="!audioLoaded"\n      (input)="onVolumeChangeEnd($event)"\n      class="volumeSlider"\n      [class.disappear]="isIOS() || isMobile"\n    >\n    </mat-slider>\n  </div>\n</ng-container>\n\n<audio\n  #audioplayer\n  (timeupdate)="onPlayerTimeUpdate()"\n  (ended)="onPlayerEnded()"\n  (loadeddata)="onPlayerReady()"\n  [volume]="volume"\n  (error)="onPlayerMediaError()"\n  [src]="audiosrc"\n></audio>\n',
    styles: [
      'div.audioToolbar button:last-child{margin-left:.95em}div.description{margin:0 0 0 1em}div.description #descriptionContainer{max-height:93px;width:100%;overflow:auto;padding:0 .2em 0 0}span.PlayPosition{vertical-align:middle;padding-left:.5em}.toolbar{width:100%;height:40px;box-shadow:2px 2px 10px #0003;display:flex;align-items:center;overflow:hidden;background-color:#fff}.toolbar .play-btn{margin-left:10px}.toolbar .replay-btn{margin-right:.5em}.toolbar .volumeSlider{margin-right:17px}.toolbar ::ng-deep .mat-slider{padding:0}.toolbar ::ng-deep .mat-slider-horizontal.playingSlider{min-width:100px;flex:1}.toolbar ::ng-deep .mat-slider-horizontal.volumeSlider{min-width:100px;margin-left:-.4em}@media (min-width: 800px) and (max-width: 1200px){.toolbar ::ng-deep .mat-slider-horizontal.playingSlider{min-width:120px}.toolbar ::ng-deep .mat-slider-horizontal.volumeSlider{min-width:80px}}.toolbar ::ng-deep .mat-slider-thumb{width:10px;height:10px;bottom:-5px;background-color:#0000009c}.toolbar ::ng-deep .mat-slider-track-fill{background-color:#0000009c}.mobile .replay-btn{margin-right:.3em!important}.mobile .play-btn{margin-left:3px}.mobile .volumeSlider{margin-right:5px}.disappear{display:none}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i2$2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i4.NgControlStatus,
        selector: '[formControlName],[ngModel],[formControl]',
      },
      {
        kind: 'directive',
        type: i4.NgModel,
        selector: '[ngModel]:not([formControlName]):not([formControl])',
        inputs: ['name', 'disabled', 'ngModel', 'ngModelOptions'],
        outputs: ['ngModelChange'],
        exportAs: ['ngModel'],
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
        type: i6.MatIconButton,
        selector: 'button[mat-icon-button]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
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
        type: i7.MatSlider,
        selector: 'mat-slider',
        inputs: [
          'color',
          'disableRipple',
          'disabled',
          'discrete',
          'showTickMarks',
          'min',
          'max',
          'step',
          'displayWith',
        ],
        exportAs: ['matSlider'],
      },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: AudioToolbarComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-core-audio-toolbar',
          template:
            '<ng-container *ngIf="!toolbar">\n  <button\n    (click)="onPlayPauseClick()"\n    [disabled]="!audioLoaded"\n    mat-mini-fab\n    color="accent"\n  >\n    <mat-icon>{{ playing ? \'pause\' : \'play_arrow\' }}</mat-icon>\n  </button>\n</ng-container>\n<ng-container *ngIf="toolbar">\n  <div class="toolbar" [class.mobile]="isMobile">\n    <button class="play-btn" mat-icon-button (click)="onPlayPauseClick()">\n      <mat-icon>{{ playing ? \'pause\' : \'play_arrow\' }}</mat-icon>\n    </button>\n    <button\n      mat-icon-button\n      [disabled]="!audioLoaded"\n      (click)="onReplayClick()"\n      class="replay-btn"\n    >\n      <mat-icon>replay</mat-icon>\n    </button>\n    {{ playPositionString }}\n    <mat-slider\n      min="0"\n      [max]="duration"\n      step="1"\n      [(ngModel)]="playPosition"\n      [disabled]="!audioLoaded"\n      (input)="onPositionChangeEnd($event)"\n      class="playingSlider"\n    ></mat-slider>\n    <button\n      mat-icon-button\n      [disabled]="!audioLoaded"\n      (click)="onVolumeMutingToggle()"\n      class="volume-btn"\n    >\n      <mat-icon>{{ isMuted ? \'volume_off\' : \'volume_up\' }}</mat-icon>\n    </button>\n    <mat-slider\n      min="0"\n      max="1"\n      step="0.1"\n      [(ngModel)]="volume"\n      [disabled]="!audioLoaded"\n      (input)="onVolumeChangeEnd($event)"\n      class="volumeSlider"\n      [class.disappear]="isIOS() || isMobile"\n    >\n    </mat-slider>\n  </div>\n</ng-container>\n\n<audio\n  #audioplayer\n  (timeupdate)="onPlayerTimeUpdate()"\n  (ended)="onPlayerEnded()"\n  (loadeddata)="onPlayerReady()"\n  [volume]="volume"\n  (error)="onPlayerMediaError()"\n  [src]="audiosrc"\n></audio>\n',
          styles: [
            'div.audioToolbar button:last-child{margin-left:.95em}div.description{margin:0 0 0 1em}div.description #descriptionContainer{max-height:93px;width:100%;overflow:auto;padding:0 .2em 0 0}span.PlayPosition{vertical-align:middle;padding-left:.5em}.toolbar{width:100%;height:40px;box-shadow:2px 2px 10px #0003;display:flex;align-items:center;overflow:hidden;background-color:#fff}.toolbar .play-btn{margin-left:10px}.toolbar .replay-btn{margin-right:.5em}.toolbar .volumeSlider{margin-right:17px}.toolbar ::ng-deep .mat-slider{padding:0}.toolbar ::ng-deep .mat-slider-horizontal.playingSlider{min-width:100px;flex:1}.toolbar ::ng-deep .mat-slider-horizontal.volumeSlider{min-width:100px;margin-left:-.4em}@media (min-width: 800px) and (max-width: 1200px){.toolbar ::ng-deep .mat-slider-horizontal.playingSlider{min-width:120px}.toolbar ::ng-deep .mat-slider-horizontal.volumeSlider{min-width:80px}}.toolbar ::ng-deep .mat-slider-thumb{width:10px;height:10px;bottom:-5px;background-color:#0000009c}.toolbar ::ng-deep .mat-slider-track-fill{background-color:#0000009c}.mobile .replay-btn{margin-right:.3em!important}.mobile .play-btn{margin-left:3px}.mobile .volumeSlider{margin-right:5px}.disappear{display:none}\n',
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
            args: [SOLID_CORE_CONFIG],
          },
        ],
      },
      { type: i1$1.MatDialog },
      { type: i3.BreakpointObserver },
    ];
  },
  propDecorators: {
    audiosrc: [
      {
        type: Input,
      },
    ],
    description: [
      {
        type: Input,
      },
    ],
    toolbar: [
      {
        type: Input,
      },
    ],
    player: [
      {
        type: ViewChild,
        args: ['audioplayer', { static: false }],
      },
    ],
    playAudio: [
      {
        type: Input,
      },
    ],
    audioErrorEventEmitter: [
      {
        type: Output,
      },
    ],
    audioEndedEventEmitter: [
      {
        type: Output,
      },
    ],
  },
});

class AudioIconComponent {
  title;
  ngOnChanges() {
    this.shortenTitle();
  }
  shortenTitle() {
    if (this.title.length > 14) {
      this.title = this.title.slice(0, 14) + '...';
    }
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: AudioIconComponent,
    deps: [],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: AudioIconComponent,
    selector: 'solid-core-audio-icon',
    inputs: { title: 'title' },
    usesOnChanges: true,
    ngImport: i0,
    template:
      '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\r\n<svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\r\n\t viewBox="0 0 500 500" enable-background="new 0 0 500 500" xml:space="preserve">\r\n<path d="M213.246,313.818c-1.962,0-3.553-1.592-3.553-3.553v-65.138c0-1.962,1.591-3.553,3.553-3.553s3.553,1.591,3.553,3.553\r\n\tv65.138C216.799,312.229,215.208,313.818,213.246,313.818z M231.124,298.88v-42.364c0-1.962-1.591-3.553-3.553-3.553\r\n\tc-1.962,0-3.553,1.592-3.553,3.553v42.364c0,1.962,1.591,3.554,3.553,3.554C229.533,302.434,231.124,300.842,231.124,298.88z\r\n\t M245.448,287.42v-19.445c0-1.961-1.591-3.553-3.553-3.553s-3.553,1.592-3.553,3.553v19.445c0,1.962,1.591,3.553,3.553,3.553\r\n\tS245.448,289.382,245.448,287.42z M188.149,287.42v-19.445c0-1.961-1.591-3.553-3.553-3.553c-1.962,0-3.553,1.592-3.553,3.553\r\n\tv19.445c0,1.962,1.591,3.553,3.553,3.553C186.558,290.973,188.149,289.382,188.149,287.42z M202.474,298.88v-42.364\r\n\tc0-1.962-1.591-3.553-3.553-3.553s-3.553,1.592-3.553,3.553v42.364c0,1.962,1.591,3.554,3.553,3.554S202.474,300.842,202.474,298.88\r\n\tz M288.31,307.25v-59.105c0-1.962-1.591-3.553-3.553-3.553s-3.553,1.591-3.553,3.553v59.105c0,1.962,1.591,3.553,3.553,3.553\r\n\tS288.31,309.212,288.31,307.25z M274.211,286.52v-17.645c0-1.962-1.591-3.553-3.553-3.553s-3.554,1.591-3.554,3.553v17.645\r\n\tc0,1.963,1.592,3.554,3.554,3.554S274.211,288.48,274.211,286.52z M302.747,299.41v-43.426c0-1.961-1.591-3.553-3.553-3.553\r\n\tc-1.963,0-3.553,1.592-3.553,3.553v43.426c0,1.962,1.59,3.553,3.553,3.553C301.156,302.963,302.747,301.372,302.747,299.41z\r\n\t M317.072,286.52v-17.645c0-1.962-1.591-3.553-3.554-3.553c-1.962,0-3.553,1.591-3.553,3.553v17.645\r\n\tc0,1.963,1.591,3.554,3.553,3.554C315.481,290.073,317.072,288.48,317.072,286.52z M259.772,296.918v-38.441\r\n\tc0-1.961-1.59-3.553-3.553-3.553c-1.962,0-3.553,1.592-3.553,3.553v38.441c0,1.962,1.591,3.553,3.553,3.553\r\n\tC258.183,300.471,259.772,298.88,259.772,296.918z M377.768,181.514c0.704,2.544,3.183,4.258,5.882,3.928\r\n\tc2.972-0.362,5.087-3.066,4.723-6.038c-2.013-16.485-7.404-32.657-15.391-47.5c-8.083-14.795-18.816-28.276-31.697-39.436\r\n\tc-12.85-11.185-27.789-20.078-43.857-26.078c-8.031-3.012-16.354-5.255-24.8-6.799c-8.454-1.507-17.039-2.255-25.615-2.288\r\n\tc-8.575,0.033-17.161,0.781-25.614,2.288c-8.446,1.544-16.768,3.787-24.799,6.799c-16.07,6-31.01,14.893-43.859,26.078\r\n\tc-12.88,11.16-23.613,24.641-31.697,39.436c-7.987,14.843-13.378,31.015-15.391,47.5c-0.323,2.619,1.309,5.152,3.929,5.881\r\n\tc2.885,0.801,5.873-0.888,6.675-3.773l0.009-0.03c4.11-14.792,10.268-28.821,18.587-41.36c8.194-12.606,18.505-23.676,30.166-32.842\r\n\tc11.681-9.152,24.795-16.349,38.705-21.156c6.953-2.399,14.089-4.255,21.341-5.444c7.242-1.226,14.59-1.846,21.948-1.832\r\n\tc7.358-0.014,14.706,0.606,21.949,1.832c7.251,1.189,14.388,3.045,21.343,5.444c13.908,4.807,27.021,12.004,38.703,21.156\r\n\tc11.661,9.166,21.974,20.236,30.165,32.842c8.318,12.539,14.479,26.568,18.589,41.36L377.768,181.514z M111.659,324.891\r\n\tc14.29,0,25.982-11.691,25.982-25.982v-71.019c0-14.291-11.692-25.983-25.982-25.983h-1.099c-14.291,0-25.983,11.692-25.983,25.983\r\n\tv71.019c0,14.291,11.692,25.982,25.983,25.982H111.659 M74.674,231.492c-11.672,7.548-19.052,18.59-19.052,30.908\r\n\tc0,12.317,7.382,23.354,19.052,30.904V231.492z M383.605,324.891h1.099c14.291,0,25.983-11.691,25.983-25.982v-71.019\r\n\tc0-14.291-11.692-25.983-25.983-25.983h-1.099c-14.29,0-25.982,11.692-25.982,25.983v71.019\r\n\tC357.623,313.198,369.315,324.891,383.605,324.891 M420.59,293.305c11.67-7.549,19.052-18.586,19.052-30.902\r\n\tc0-12.319-7.38-23.361-19.052-30.909V293.305z"/>\r\n<rect id="rect" y="383" width="439.642" height="81"/>\r\n<rect id="rect" x="469.004" y="383" width="30.67" height="81"/>\r\n<text transform="matrix(1 0 0 1 95.478 437.6035)" font-family="\'Roboto\'" font-weight="500" font-size="45.0291">{{title}}</text>\r\n<path d="M56.632,441.751c-0.718,0-1.417-0.213-2.02-0.616c-0.063-0.041-0.124-0.086-0.182-0.134l-13.398-10.949h-8.298\r\n\tc-2.012,0-3.648-1.637-3.648-3.647v-8.495c0-2.013,1.636-3.648,3.648-3.648h7.886l13.846-11.006\r\n\tc0.057-0.046,0.117-0.089,0.178-0.128c0.596-0.389,1.284-0.595,1.989-0.595c2.014,0,3.652,1.638,3.652,3.649V438.1\r\n\tC60.284,440.112,58.646,441.751,56.632,441.751z M33.751,425.386h7.654c0.725,0,1.426,0.213,2.028,0.616\r\n\tc0.062,0.041,0.121,0.085,0.178,0.132l12.007,9.813v-27.648l-12.463,9.907c-0.057,0.045-0.115,0.088-0.176,0.127\r\n\tc-0.594,0.39-1.284,0.594-1.994,0.594h-7.233L33.751,425.386L33.751,425.386z M70.037,434.06c2.917-1.646,7.257-6.179,7.257-11.919\r\n\tc0-5.738-4.34-10.271-7.257-11.918c-0.722-0.404-1.636-0.15-2.042,0.569c-0.406,0.72-0.152,1.635,0.569,2.042\r\n\tc2.217,1.251,5.733,4.883,5.733,9.307c0,4.425-3.516,8.059-5.733,9.309c-0.721,0.407-0.976,1.32-0.569,2.042\r\n\tc0.275,0.487,0.784,0.763,1.307,0.763C69.552,434.253,69.804,434.19,70.037,434.06z M67.86,426.431\r\n\tc1.497-0.698,3.108-2.508,3.108-4.825c0-2.316-1.611-4.125-3.108-4.824c-0.683-0.321-1.494-0.024-1.813,0.658\r\n\tc-0.319,0.683-0.024,1.494,0.658,1.813c0.638,0.298,1.536,1.227,1.536,2.354c0,1.129-0.898,2.058-1.536,2.354\r\n\tc-0.682,0.318-0.977,1.13-0.658,1.813c0.232,0.495,0.724,0.786,1.237,0.786C67.476,426.56,67.673,426.519,67.86,426.431z\r\n\t M72.032,439.202c5.273-2.466,10.611-9.118,10.611-17.063s-5.338-14.595-10.611-17.061c-0.682-0.32-1.495-0.024-1.813,0.657\r\n\tc-0.319,0.683-0.025,1.494,0.658,1.813c4.492,2.102,9.039,7.786,9.039,14.59c0,6.805-4.547,12.49-9.039,14.592\r\n\tc-0.683,0.318-0.977,1.131-0.658,1.813c0.231,0.495,0.723,0.786,1.236,0.786C71.648,439.331,71.845,439.29,72.032,439.202z"/>\r\n</svg>\r\n',
    styles: ['svg{margin:0 auto;height:100%}\n'],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: AudioIconComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-core-audio-icon',
          template:
            '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\r\n<svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\r\n\t viewBox="0 0 500 500" enable-background="new 0 0 500 500" xml:space="preserve">\r\n<path d="M213.246,313.818c-1.962,0-3.553-1.592-3.553-3.553v-65.138c0-1.962,1.591-3.553,3.553-3.553s3.553,1.591,3.553,3.553\r\n\tv65.138C216.799,312.229,215.208,313.818,213.246,313.818z M231.124,298.88v-42.364c0-1.962-1.591-3.553-3.553-3.553\r\n\tc-1.962,0-3.553,1.592-3.553,3.553v42.364c0,1.962,1.591,3.554,3.553,3.554C229.533,302.434,231.124,300.842,231.124,298.88z\r\n\t M245.448,287.42v-19.445c0-1.961-1.591-3.553-3.553-3.553s-3.553,1.592-3.553,3.553v19.445c0,1.962,1.591,3.553,3.553,3.553\r\n\tS245.448,289.382,245.448,287.42z M188.149,287.42v-19.445c0-1.961-1.591-3.553-3.553-3.553c-1.962,0-3.553,1.592-3.553,3.553\r\n\tv19.445c0,1.962,1.591,3.553,3.553,3.553C186.558,290.973,188.149,289.382,188.149,287.42z M202.474,298.88v-42.364\r\n\tc0-1.962-1.591-3.553-3.553-3.553s-3.553,1.592-3.553,3.553v42.364c0,1.962,1.591,3.554,3.553,3.554S202.474,300.842,202.474,298.88\r\n\tz M288.31,307.25v-59.105c0-1.962-1.591-3.553-3.553-3.553s-3.553,1.591-3.553,3.553v59.105c0,1.962,1.591,3.553,3.553,3.553\r\n\tS288.31,309.212,288.31,307.25z M274.211,286.52v-17.645c0-1.962-1.591-3.553-3.553-3.553s-3.554,1.591-3.554,3.553v17.645\r\n\tc0,1.963,1.592,3.554,3.554,3.554S274.211,288.48,274.211,286.52z M302.747,299.41v-43.426c0-1.961-1.591-3.553-3.553-3.553\r\n\tc-1.963,0-3.553,1.592-3.553,3.553v43.426c0,1.962,1.59,3.553,3.553,3.553C301.156,302.963,302.747,301.372,302.747,299.41z\r\n\t M317.072,286.52v-17.645c0-1.962-1.591-3.553-3.554-3.553c-1.962,0-3.553,1.591-3.553,3.553v17.645\r\n\tc0,1.963,1.591,3.554,3.553,3.554C315.481,290.073,317.072,288.48,317.072,286.52z M259.772,296.918v-38.441\r\n\tc0-1.961-1.59-3.553-3.553-3.553c-1.962,0-3.553,1.592-3.553,3.553v38.441c0,1.962,1.591,3.553,3.553,3.553\r\n\tC258.183,300.471,259.772,298.88,259.772,296.918z M377.768,181.514c0.704,2.544,3.183,4.258,5.882,3.928\r\n\tc2.972-0.362,5.087-3.066,4.723-6.038c-2.013-16.485-7.404-32.657-15.391-47.5c-8.083-14.795-18.816-28.276-31.697-39.436\r\n\tc-12.85-11.185-27.789-20.078-43.857-26.078c-8.031-3.012-16.354-5.255-24.8-6.799c-8.454-1.507-17.039-2.255-25.615-2.288\r\n\tc-8.575,0.033-17.161,0.781-25.614,2.288c-8.446,1.544-16.768,3.787-24.799,6.799c-16.07,6-31.01,14.893-43.859,26.078\r\n\tc-12.88,11.16-23.613,24.641-31.697,39.436c-7.987,14.843-13.378,31.015-15.391,47.5c-0.323,2.619,1.309,5.152,3.929,5.881\r\n\tc2.885,0.801,5.873-0.888,6.675-3.773l0.009-0.03c4.11-14.792,10.268-28.821,18.587-41.36c8.194-12.606,18.505-23.676,30.166-32.842\r\n\tc11.681-9.152,24.795-16.349,38.705-21.156c6.953-2.399,14.089-4.255,21.341-5.444c7.242-1.226,14.59-1.846,21.948-1.832\r\n\tc7.358-0.014,14.706,0.606,21.949,1.832c7.251,1.189,14.388,3.045,21.343,5.444c13.908,4.807,27.021,12.004,38.703,21.156\r\n\tc11.661,9.166,21.974,20.236,30.165,32.842c8.318,12.539,14.479,26.568,18.589,41.36L377.768,181.514z M111.659,324.891\r\n\tc14.29,0,25.982-11.691,25.982-25.982v-71.019c0-14.291-11.692-25.983-25.982-25.983h-1.099c-14.291,0-25.983,11.692-25.983,25.983\r\n\tv71.019c0,14.291,11.692,25.982,25.983,25.982H111.659 M74.674,231.492c-11.672,7.548-19.052,18.59-19.052,30.908\r\n\tc0,12.317,7.382,23.354,19.052,30.904V231.492z M383.605,324.891h1.099c14.291,0,25.983-11.691,25.983-25.982v-71.019\r\n\tc0-14.291-11.692-25.983-25.983-25.983h-1.099c-14.29,0-25.982,11.692-25.982,25.983v71.019\r\n\tC357.623,313.198,369.315,324.891,383.605,324.891 M420.59,293.305c11.67-7.549,19.052-18.586,19.052-30.902\r\n\tc0-12.319-7.38-23.361-19.052-30.909V293.305z"/>\r\n<rect id="rect" y="383" width="439.642" height="81"/>\r\n<rect id="rect" x="469.004" y="383" width="30.67" height="81"/>\r\n<text transform="matrix(1 0 0 1 95.478 437.6035)" font-family="\'Roboto\'" font-weight="500" font-size="45.0291">{{title}}</text>\r\n<path d="M56.632,441.751c-0.718,0-1.417-0.213-2.02-0.616c-0.063-0.041-0.124-0.086-0.182-0.134l-13.398-10.949h-8.298\r\n\tc-2.012,0-3.648-1.637-3.648-3.647v-8.495c0-2.013,1.636-3.648,3.648-3.648h7.886l13.846-11.006\r\n\tc0.057-0.046,0.117-0.089,0.178-0.128c0.596-0.389,1.284-0.595,1.989-0.595c2.014,0,3.652,1.638,3.652,3.649V438.1\r\n\tC60.284,440.112,58.646,441.751,56.632,441.751z M33.751,425.386h7.654c0.725,0,1.426,0.213,2.028,0.616\r\n\tc0.062,0.041,0.121,0.085,0.178,0.132l12.007,9.813v-27.648l-12.463,9.907c-0.057,0.045-0.115,0.088-0.176,0.127\r\n\tc-0.594,0.39-1.284,0.594-1.994,0.594h-7.233L33.751,425.386L33.751,425.386z M70.037,434.06c2.917-1.646,7.257-6.179,7.257-11.919\r\n\tc0-5.738-4.34-10.271-7.257-11.918c-0.722-0.404-1.636-0.15-2.042,0.569c-0.406,0.72-0.152,1.635,0.569,2.042\r\n\tc2.217,1.251,5.733,4.883,5.733,9.307c0,4.425-3.516,8.059-5.733,9.309c-0.721,0.407-0.976,1.32-0.569,2.042\r\n\tc0.275,0.487,0.784,0.763,1.307,0.763C69.552,434.253,69.804,434.19,70.037,434.06z M67.86,426.431\r\n\tc1.497-0.698,3.108-2.508,3.108-4.825c0-2.316-1.611-4.125-3.108-4.824c-0.683-0.321-1.494-0.024-1.813,0.658\r\n\tc-0.319,0.683-0.024,1.494,0.658,1.813c0.638,0.298,1.536,1.227,1.536,2.354c0,1.129-0.898,2.058-1.536,2.354\r\n\tc-0.682,0.318-0.977,1.13-0.658,1.813c0.232,0.495,0.724,0.786,1.237,0.786C67.476,426.56,67.673,426.519,67.86,426.431z\r\n\t M72.032,439.202c5.273-2.466,10.611-9.118,10.611-17.063s-5.338-14.595-10.611-17.061c-0.682-0.32-1.495-0.024-1.813,0.657\r\n\tc-0.319,0.683-0.025,1.494,0.658,1.813c4.492,2.102,9.039,7.786,9.039,14.59c0,6.805-4.547,12.49-9.039,14.592\r\n\tc-0.683,0.318-0.977,1.131-0.658,1.813c0.231,0.495,0.723,0.786,1.236,0.786C71.648,439.331,71.845,439.29,72.032,439.202z"/>\r\n</svg>\r\n',
          styles: ['svg{margin:0 auto;height:100%}\n'],
        },
      ],
    },
  ],
  propDecorators: {
    title: [
      {
        type: Input,
      },
    ],
  },
});

class MediaDetailComponent {
  _dialog;
  image;
  mediaObject;
  hasDialog;
  hasAttributions;
  name;
  view;
  hasControlPanel;
  hasAudio;
  hasDescription;
  hasDescriptionToggle;
  slideshowPageChanged;
  hasNavigationInDialog;
  openDialogRequest;
  videoplayer;
  loadError = false;
  playButtonIsShown;
  descriptionShow = false;
  NextDialogEmitter = new EventEmitter();
  PrevDialogEmitter = new EventEmitter();
  constructor(_dialog) {
    this._dialog = _dialog;
  }
  ngOnChanges() {
    this.descriptionShow = false;
  }
  togglePlay() {
    if (this.loadError) {
      this._dialog.open(MediaErrorDialogComponent, {
        data: {
          title: 'Fehler',
          content: 'Datei konnte nicht geladen werden.',
        },
      });
      return;
    }
    if (this.videoplayer) {
      if (
        this.videoplayer.nativeElement.paused ||
        this.videoplayer.nativeElement.ended
      ) {
        this.videoplayer.nativeElement.play();
      } else {
        this.videoplayer.nativeElement.pause();
      }
    }
  }
  setInvisible() {
    this.playButtonIsShown = 0;
  }
  setVisible() {
    this.playButtonIsShown = 1;
  }
  onPlayerEnded() {
    if (this.videoplayer) {
      this.playButtonIsShown = 1;
      this.videoplayer.nativeElement.currentTime = 0;
    }
  }
  toggleDescription(descriptionToggle) {
    descriptionToggle
      ? (this.descriptionShow = true)
      : (this.descriptionShow = false);
  }
  handleOpenDialogClick() {
    this.openDialogRequest = true;
  }
  handleCloseDialogEvent() {
    this.openDialogRequest = false;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MediaDetailComponent,
    deps: [{ token: i1$1.MatDialog }],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: MediaDetailComponent,
    selector: 'solid-core-media-detail',
    inputs: {
      image: 'image',
      mediaObject: 'mediaObject',
      hasDialog: 'hasDialog',
      hasAttributions: 'hasAttributions',
      name: 'name',
      view: 'view',
      hasControlPanel: 'hasControlPanel',
      hasAudio: 'hasAudio',
      hasDescription: 'hasDescription',
      hasDescriptionToggle: 'hasDescriptionToggle',
      slideshowPageChanged: 'slideshowPageChanged',
      hasNavigationInDialog: 'hasNavigationInDialog',
    },
    outputs: {
      NextDialogEmitter: 'NextDialogEmitter',
      PrevDialogEmitter: 'PrevDialogEmitter',
    },
    viewQueries: [
      {
        propertyName: 'videoplayer',
        first: true,
        predicate: ['videoplayer'],
        descendants: true,
      },
    ],
    usesOnChanges: true,
    ngImport: i0,
    template:
      '<!-- For quiz image because the quiz question doesn\'t\r\ncontain any media object now. It is just a temporary solution.\r\nIt is not possible to use a image toolbar here, because quiz image\r\nuse the ImageModel, but now the image toolbar uses the MediaObjectModel -->\r\n<ng-container *ngIf="image">\r\n  <div class="img-container">\r\n    <img\r\n      [src]="image.getRawImage(\'large\')"\r\n      [alt]="image.alt"\r\n      [class.landscape]="image.isLandscape"\r\n      (click)="handleOpenDialogClick()"\r\n    />\r\n  </div>\r\n  <solid-core-media-toolbar\r\n    *ngIf="view !== \'grid\'"\r\n    [image]="image"\r\n    [name]="name"\r\n    [hasAttributions]="hasAttributions"\r\n    [hasDialog]="hasDialog"\r\n    [hasDziTools]="false"\r\n    [hasAudio]="hasAudio"\r\n    [hasDescription]="hasDescription"\r\n    [slideshowPageChanged]="slideshowPageChanged"\r\n    [openDialogRequest]="openDialogRequest"\r\n    (closeDialogEventEmitter)="handleCloseDialogEvent()"\r\n  ></solid-core-media-toolbar>\r\n</ng-container>\r\n\r\n<!-- For media object in Profile -->\r\n<ng-container *ngIf="mediaObject">\r\n  <ng-container [ngSwitch]="mediaObject.mediaType">\r\n    <div class="media-container" *ngSwitchCase="\'image\'">\r\n      <div class="image-container">\r\n        <img\r\n          *ngIf="view !== \'grid\'; else grid"\r\n          [src]="mediaObject.getRawImage(\'large\')"\r\n          [alt]="mediaObject.alt"\r\n          [class.landscape]="mediaObject.isLandscape"\r\n          (click)="handleOpenDialogClick()"\r\n        />\r\n      </div>\r\n    </div>\r\n    <div class="media-container" *ngSwitchCase="\'audio\'">\r\n      <!-- <img\r\n        *ngIf="view != \'grid\'; else grid"\r\n        [src]="\'assets/profile/planty_audio.svg\'"\r\n        [alt]="mediaObject.alt"\r\n        [class.landscape]="mediaObject.isLandscape"\r\n      /> -->\r\n      <div class="audio-container">\r\n        <solid-core-audio-toolbar\r\n          *ngIf="view !== \'grid\'"\r\n          [audiosrc]="mediaObject.getSrc()!"\r\n          [toolbar]="true"\r\n        ></solid-core-audio-toolbar>\r\n      </div>\r\n      <div id="svg-description-container">\r\n        <solid-core-audio-icon\r\n          *ngIf="!descriptionShow"\r\n          [title]="mediaObject.getTitle"\r\n        ></solid-core-audio-icon>\r\n        <div *ngIf="descriptionShow" id="description-container">\r\n          <div *ngIf="mediaObject.description" id="description">\r\n            <p markdown [data]="mediaObject.description!"></p>\r\n          </div>\r\n          <div *ngIf="!mediaObject.description" id="description">\r\n            <p>Leider haben wir keine Beschreibung</p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class="media-container" *ngSwitchCase="\'video\'">\r\n      <div class="video-container">\r\n        <video\r\n          #videoplayer\r\n          id="video"\r\n          preload="metadata"\r\n          [src]="mediaObject.getSrc()"\r\n          controls\r\n          (ended)="onPlayerEnded()"\r\n          (playing)="setInvisible()"\r\n          (pause)="setVisible()"\r\n        >\r\n          Your browser does not support the video tag.\r\n        </video>\r\n        <div class="play-button-wrapper" (click)="togglePlay()">\r\n          <div id="play-button-circle" [style.opacity]="playButtonIsShown">\r\n            <!-- SVG Play Button -->\r\n            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">\r\n              <path\r\n                d="M40 0a40 40 0 1040 40A40 40 0 0040 0zM26 61.56V18.44L64 40z"\r\n              />\r\n            </svg>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </ng-container>\r\n\r\n  <solid-core-media-toolbar\r\n    *ngIf="view !== \'grid\'"\r\n    [mediaObject]="mediaObject"\r\n    [name]="name"\r\n    [hasAttributions]="hasAttributions"\r\n    [hasDialog]="hasDialog"\r\n    [hasDziTools]="false"\r\n    [hasAudio]="hasAudio"\r\n    [hasDescription]="hasDescription"\r\n    [hasDescriptionToggle]="hasDescriptionToggle"\r\n    (descriptionToggle)="toggleDescription($event)"\r\n    [slideshowPageChanged]="slideshowPageChanged"\r\n    [openDialogRequest]="openDialogRequest"\r\n    (closeDialogEventEmitter)="handleCloseDialogEvent()"\r\n    (NextDialogEmitter)="NextDialogEmitter.emit()"\r\n    (PrevDialogEmitter)="PrevDialogEmitter.emit()"\r\n    [hasNavigationInDialog]="hasNavigationInDialog"\r\n  ></solid-core-media-toolbar>\r\n  <ng-template #grid>\r\n    <img\r\n      *ngIf="mediaObject.mediaType === \'image\'"\r\n      [src]="mediaObject.getRawImage(\'thumbnail\')"\r\n      [alt]="mediaObject.alt"\r\n      [class.landscape]="mediaObject.isLandscape"\r\n    />\r\n    <img\r\n      *ngIf="mediaObject.mediaType === \'audio\'"\r\n      [src]="\'assets/profile/audio.svg\'"\r\n      [alt]="mediaObject.alt"\r\n    />\r\n  </ng-template>\r\n</ng-container>\r\n',
    styles: [
      ':host{display:block;height:100%;border-radius:inherit}.img-container{height:100%;width:100%;display:flex;align-items:center;justify-content:center}img{max-height:100%;max-width:100%;display:block}img.landscape{max-width:100%;max-height:100%;height:auto;border-radius:inherit}.media-container{display:block;height:100%;border-radius:inherit;position:relative;box-sizing:border-box}.media-container .image-container{display:flex;height:100%;align-items:center;justify-content:center}.media-container .audio-container{text-align:center}.media-container .audio-container solid-core-audio-toolbar ::ng-deep .toolbar{height:48px}.media-container #svg-description-container{text-align:center;margin-top:0;height:75%}.media-container #svg-description-container #description-container{padding:2em 0 2em 2em;text-align:justify;height:100%}.media-container #svg-description-container #description-container #description{height:100%;overflow:auto;padding-right:2em}.media-container .video-container{display:flex;height:100%;justify-content:center;align-items:center}.media-container .video-container #video{max-height:100%;max-width:100%;display:block;height:auto}.media-container .play-button-wrapper{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;width:100%;height:auto;pointer-events:none}.media-container .play-button-wrapper #play-button-circle{cursor:pointer;pointer-events:auto}.media-container .play-button-wrapper #play-button-circle svg{width:60px;height:60px;fill:#fff;stroke:#fff;cursor:pointer;background-color:#0003;border-radius:50%;opacity:.9}solid-core-media-toolbar{position:absolute;bottom:0;right:0}video::-webkit-media-controls{visibility:hidden}video::-webkit-media-controls-enclosure{visibility:visible}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i2$2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i2$2.NgSwitch,
        selector: '[ngSwitch]',
        inputs: ['ngSwitch'],
      },
      {
        kind: 'directive',
        type: i2$2.NgSwitchCase,
        selector: '[ngSwitchCase]',
        inputs: ['ngSwitchCase'],
      },
      {
        kind: 'component',
        type: MarkdownComponent,
        selector: '[markdown]',
        inputs: ['inline', 'data', 'appendData'],
      },
      {
        kind: 'component',
        type: MediaToolbarComponent,
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
        type: AudioToolbarComponent,
        selector: 'solid-core-audio-toolbar',
        inputs: ['audiosrc', 'description', 'toolbar', 'playAudio'],
        outputs: ['audioErrorEventEmitter', 'audioEndedEventEmitter'],
      },
      {
        kind: 'component',
        type: AudioIconComponent,
        selector: 'solid-core-audio-icon',
        inputs: ['title'],
      },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: MediaDetailComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-core-media-detail',
          template:
            '<!-- For quiz image because the quiz question doesn\'t\r\ncontain any media object now. It is just a temporary solution.\r\nIt is not possible to use a image toolbar here, because quiz image\r\nuse the ImageModel, but now the image toolbar uses the MediaObjectModel -->\r\n<ng-container *ngIf="image">\r\n  <div class="img-container">\r\n    <img\r\n      [src]="image.getRawImage(\'large\')"\r\n      [alt]="image.alt"\r\n      [class.landscape]="image.isLandscape"\r\n      (click)="handleOpenDialogClick()"\r\n    />\r\n  </div>\r\n  <solid-core-media-toolbar\r\n    *ngIf="view !== \'grid\'"\r\n    [image]="image"\r\n    [name]="name"\r\n    [hasAttributions]="hasAttributions"\r\n    [hasDialog]="hasDialog"\r\n    [hasDziTools]="false"\r\n    [hasAudio]="hasAudio"\r\n    [hasDescription]="hasDescription"\r\n    [slideshowPageChanged]="slideshowPageChanged"\r\n    [openDialogRequest]="openDialogRequest"\r\n    (closeDialogEventEmitter)="handleCloseDialogEvent()"\r\n  ></solid-core-media-toolbar>\r\n</ng-container>\r\n\r\n<!-- For media object in Profile -->\r\n<ng-container *ngIf="mediaObject">\r\n  <ng-container [ngSwitch]="mediaObject.mediaType">\r\n    <div class="media-container" *ngSwitchCase="\'image\'">\r\n      <div class="image-container">\r\n        <img\r\n          *ngIf="view !== \'grid\'; else grid"\r\n          [src]="mediaObject.getRawImage(\'large\')"\r\n          [alt]="mediaObject.alt"\r\n          [class.landscape]="mediaObject.isLandscape"\r\n          (click)="handleOpenDialogClick()"\r\n        />\r\n      </div>\r\n    </div>\r\n    <div class="media-container" *ngSwitchCase="\'audio\'">\r\n      <!-- <img\r\n        *ngIf="view != \'grid\'; else grid"\r\n        [src]="\'assets/profile/planty_audio.svg\'"\r\n        [alt]="mediaObject.alt"\r\n        [class.landscape]="mediaObject.isLandscape"\r\n      /> -->\r\n      <div class="audio-container">\r\n        <solid-core-audio-toolbar\r\n          *ngIf="view !== \'grid\'"\r\n          [audiosrc]="mediaObject.getSrc()!"\r\n          [toolbar]="true"\r\n        ></solid-core-audio-toolbar>\r\n      </div>\r\n      <div id="svg-description-container">\r\n        <solid-core-audio-icon\r\n          *ngIf="!descriptionShow"\r\n          [title]="mediaObject.getTitle"\r\n        ></solid-core-audio-icon>\r\n        <div *ngIf="descriptionShow" id="description-container">\r\n          <div *ngIf="mediaObject.description" id="description">\r\n            <p markdown [data]="mediaObject.description!"></p>\r\n          </div>\r\n          <div *ngIf="!mediaObject.description" id="description">\r\n            <p>Leider haben wir keine Beschreibung</p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class="media-container" *ngSwitchCase="\'video\'">\r\n      <div class="video-container">\r\n        <video\r\n          #videoplayer\r\n          id="video"\r\n          preload="metadata"\r\n          [src]="mediaObject.getSrc()"\r\n          controls\r\n          (ended)="onPlayerEnded()"\r\n          (playing)="setInvisible()"\r\n          (pause)="setVisible()"\r\n        >\r\n          Your browser does not support the video tag.\r\n        </video>\r\n        <div class="play-button-wrapper" (click)="togglePlay()">\r\n          <div id="play-button-circle" [style.opacity]="playButtonIsShown">\r\n            <!-- SVG Play Button -->\r\n            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">\r\n              <path\r\n                d="M40 0a40 40 0 1040 40A40 40 0 0040 0zM26 61.56V18.44L64 40z"\r\n              />\r\n            </svg>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </ng-container>\r\n\r\n  <solid-core-media-toolbar\r\n    *ngIf="view !== \'grid\'"\r\n    [mediaObject]="mediaObject"\r\n    [name]="name"\r\n    [hasAttributions]="hasAttributions"\r\n    [hasDialog]="hasDialog"\r\n    [hasDziTools]="false"\r\n    [hasAudio]="hasAudio"\r\n    [hasDescription]="hasDescription"\r\n    [hasDescriptionToggle]="hasDescriptionToggle"\r\n    (descriptionToggle)="toggleDescription($event)"\r\n    [slideshowPageChanged]="slideshowPageChanged"\r\n    [openDialogRequest]="openDialogRequest"\r\n    (closeDialogEventEmitter)="handleCloseDialogEvent()"\r\n    (NextDialogEmitter)="NextDialogEmitter.emit()"\r\n    (PrevDialogEmitter)="PrevDialogEmitter.emit()"\r\n    [hasNavigationInDialog]="hasNavigationInDialog"\r\n  ></solid-core-media-toolbar>\r\n  <ng-template #grid>\r\n    <img\r\n      *ngIf="mediaObject.mediaType === \'image\'"\r\n      [src]="mediaObject.getRawImage(\'thumbnail\')"\r\n      [alt]="mediaObject.alt"\r\n      [class.landscape]="mediaObject.isLandscape"\r\n    />\r\n    <img\r\n      *ngIf="mediaObject.mediaType === \'audio\'"\r\n      [src]="\'assets/profile/audio.svg\'"\r\n      [alt]="mediaObject.alt"\r\n    />\r\n  </ng-template>\r\n</ng-container>\r\n',
          styles: [
            ':host{display:block;height:100%;border-radius:inherit}.img-container{height:100%;width:100%;display:flex;align-items:center;justify-content:center}img{max-height:100%;max-width:100%;display:block}img.landscape{max-width:100%;max-height:100%;height:auto;border-radius:inherit}.media-container{display:block;height:100%;border-radius:inherit;position:relative;box-sizing:border-box}.media-container .image-container{display:flex;height:100%;align-items:center;justify-content:center}.media-container .audio-container{text-align:center}.media-container .audio-container solid-core-audio-toolbar ::ng-deep .toolbar{height:48px}.media-container #svg-description-container{text-align:center;margin-top:0;height:75%}.media-container #svg-description-container #description-container{padding:2em 0 2em 2em;text-align:justify;height:100%}.media-container #svg-description-container #description-container #description{height:100%;overflow:auto;padding-right:2em}.media-container .video-container{display:flex;height:100%;justify-content:center;align-items:center}.media-container .video-container #video{max-height:100%;max-width:100%;display:block;height:auto}.media-container .play-button-wrapper{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;width:100%;height:auto;pointer-events:none}.media-container .play-button-wrapper #play-button-circle{cursor:pointer;pointer-events:auto}.media-container .play-button-wrapper #play-button-circle svg{width:60px;height:60px;fill:#fff;stroke:#fff;cursor:pointer;background-color:#0003;border-radius:50%;opacity:.9}solid-core-media-toolbar{position:absolute;bottom:0;right:0}video::-webkit-media-controls{visibility:hidden}video::-webkit-media-controls-enclosure{visibility:visible}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [{ type: i1$1.MatDialog }];
  },
  propDecorators: {
    image: [
      {
        type: Input,
      },
    ],
    mediaObject: [
      {
        type: Input,
      },
    ],
    hasDialog: [
      {
        type: Input,
      },
    ],
    hasAttributions: [
      {
        type: Input,
      },
    ],
    name: [
      {
        type: Input,
      },
    ],
    view: [
      {
        type: Input,
      },
    ],
    hasControlPanel: [
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
    slideshowPageChanged: [
      {
        type: Input,
      },
    ],
    hasNavigationInDialog: [
      {
        type: Input,
      },
    ],
    videoplayer: [
      {
        type: ViewChild,
        args: ['videoplayer', { static: false }],
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

class MediaComponent {
  image;
  mediaObject;
  hasDialog = true;
  hasAttributions = true;
  name;
  view;
  hasAudio;
  hasControlPanel = true;
  hasDescription;
  hasDescriptionToggle;
  slideshowPageChanged;
  hasNavigationInDialog;
  NextDialogEmitter = new EventEmitter();
  PrevDialogEmitter = new EventEmitter();
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MediaComponent,
    deps: [],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: MediaComponent,
    selector: 'solid-core-media',
    inputs: {
      image: 'image',
      mediaObject: 'mediaObject',
      hasDialog: 'hasDialog',
      hasAttributions: 'hasAttributions',
      name: 'name',
      view: 'view',
      hasAudio: 'hasAudio',
      hasControlPanel: 'hasControlPanel',
      hasDescription: 'hasDescription',
      hasDescriptionToggle: 'hasDescriptionToggle',
      slideshowPageChanged: 'slideshowPageChanged',
      hasNavigationInDialog: 'hasNavigationInDialog',
    },
    outputs: {
      NextDialogEmitter: 'NextDialogEmitter',
      PrevDialogEmitter: 'PrevDialogEmitter',
    },
    ngImport: i0,
    template:
      '<solid-core-media-detail\r\n  [mediaObject]="mediaObject"\r\n  [image]="image"\r\n  [name]="name"\r\n  [hasDialog]="hasDialog"\r\n  [hasAttributions]="hasAttributions"\r\n  [view]="view"\r\n  [hasAudio]="hasAudio"\r\n  [hasControlPanel]="hasControlPanel"\r\n  [hasDescription]="hasDescription"\r\n  [hasDescriptionToggle]="hasDescriptionToggle"\r\n  [slideshowPageChanged]="slideshowPageChanged"\r\n  (NextDialogEmitter)="NextDialogEmitter.emit()"\r\n  (PrevDialogEmitter)="PrevDialogEmitter.emit()"\r\n  [hasNavigationInDialog]="hasNavigationInDialog"\r\n></solid-core-media-detail>\r\n',
    styles: [
      ':host{display:block}solid-core-media-detail{height:100%;width:100%;position:relative}\n',
    ],
    dependencies: [
      {
        kind: 'component',
        type: MediaDetailComponent,
        selector: 'solid-core-media-detail',
        inputs: [
          'image',
          'mediaObject',
          'hasDialog',
          'hasAttributions',
          'name',
          'view',
          'hasControlPanel',
          'hasAudio',
          'hasDescription',
          'hasDescriptionToggle',
          'slideshowPageChanged',
          'hasNavigationInDialog',
        ],
        outputs: ['NextDialogEmitter', 'PrevDialogEmitter'],
      },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: MediaComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-core-media',
          template:
            '<solid-core-media-detail\r\n  [mediaObject]="mediaObject"\r\n  [image]="image"\r\n  [name]="name"\r\n  [hasDialog]="hasDialog"\r\n  [hasAttributions]="hasAttributions"\r\n  [view]="view"\r\n  [hasAudio]="hasAudio"\r\n  [hasControlPanel]="hasControlPanel"\r\n  [hasDescription]="hasDescription"\r\n  [hasDescriptionToggle]="hasDescriptionToggle"\r\n  [slideshowPageChanged]="slideshowPageChanged"\r\n  (NextDialogEmitter)="NextDialogEmitter.emit()"\r\n  (PrevDialogEmitter)="PrevDialogEmitter.emit()"\r\n  [hasNavigationInDialog]="hasNavigationInDialog"\r\n></solid-core-media-detail>\r\n',
          styles: [
            ':host{display:block}solid-core-media-detail{height:100%;width:100%;position:relative}\n',
          ],
        },
      ],
    },
  ],
  propDecorators: {
    image: [
      {
        type: Input,
      },
    ],
    mediaObject: [
      {
        type: Input,
      },
    ],
    hasDialog: [
      {
        type: Input,
      },
    ],
    hasAttributions: [
      {
        type: Input,
      },
    ],
    name: [
      {
        type: Input,
      },
    ],
    view: [
      {
        type: Input,
      },
    ],
    hasAudio: [
      {
        type: Input,
      },
    ],
    hasControlPanel: [
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
    slideshowPageChanged: [
      {
        type: Input,
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

var APP;
(function (APP) {
  APP['DIVE'] = 'Div-e';
})(APP || (APP = {}));
class MediaDialogComponent {
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
      { token: i3.BreakpointObserver },
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
        type: i2$2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
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
        type: i6.MatIconButton,
        selector: 'button[mat-icon-button]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'component',
        type: i6.MatMiniFabButton,
        selector: 'button[mat-mini-fab]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'directive',
        type: i1$1.MatDialogClose,
        selector: '[mat-dialog-close], [matDialogClose]',
        inputs: ['aria-label', 'type', 'mat-dialog-close', 'matDialogClose'],
        exportAs: ['matDialogClose'],
      },
      {
        kind: 'directive',
        type: i1$1.MatDialogTitle,
        selector: '[mat-dialog-title], [matDialogTitle]',
        inputs: ['id'],
        exportAs: ['matDialogTitle'],
      },
      {
        kind: 'directive',
        type: i1$1.MatDialogContent,
        selector:
          '[mat-dialog-content], mat-dialog-content, [matDialogContent]',
      },
      {
        kind: 'component',
        type: MarkdownComponent,
        selector: '[markdown]',
        inputs: ['inline', 'data', 'appendData'],
      },
      {
        kind: 'component',
        type: MediaToolbarComponent,
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
        type: AudioToolbarComponent,
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
      { type: i3.BreakpointObserver },
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

class SolidCoreModule {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(title) {}
  static forRoot(config) {
    return {
      ngModule: SolidCoreModule,
      providers: [
        {
          provide: SOLID_CORE_CONFIG,
          useValue: config,
        },
        {
          provide: RouteReuseStrategy,
          useClass: CustomRouteReuseStrategy,
        },
        {
          provide: RouterStateSerializer,
          useClass: CustomRouterStateSerializer,
        },
        {
          provide: MEDIA_DIALOG_TOKEN,
          useValue: MediaDialogComponent,
        },
      ],
    };
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidCoreModule,
    deps: [{ token: TitleService }],
    target: i0.ɵɵFactoryTarget.NgModule,
  });
  static ɵmod = i0.ɵɵngDeclareNgModule({
    minVersion: '14.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidCoreModule,
    declarations: [
      MarkdownComponent,
      MediaComponent,
      MediaDialogComponent,
      MediaErrorDialogComponent,
      MediaDetailComponent,
      MediaToolbarComponent,
      AudioToolbarComponent,
      AudioIconComponent,
    ],
    imports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
      OverlayModule,
      MatIconModule,
      MatButtonModule,
      MatDialogModule,
      ScrollingModule,
      MatSliderModule,
    ],
    exports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
      MarkdownComponent,
      MediaComponent,
      ScrollingModule,
    ],
  });
  static ɵinj = i0.ɵɵngDeclareInjector({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidCoreModule,
    providers: [MarkdownService, TitleService],
    imports: [
      CommonModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
      OverlayModule,
      MatIconModule,
      MatButtonModule,
      MatDialogModule,
      ScrollingModule,
      MatSliderModule,
      CommonModule,
      FormsModule,
      HttpClientModule,
      ReactiveFormsModule,
      ScrollingModule,
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: SolidCoreModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          declarations: [
            MarkdownComponent,
            MediaComponent,
            MediaDialogComponent,
            MediaErrorDialogComponent,
            MediaDetailComponent,
            MediaToolbarComponent,
            AudioToolbarComponent,
            AudioIconComponent,
          ],
          imports: [
            CommonModule,
            FormsModule,
            HttpClientModule,
            ReactiveFormsModule,
            OverlayModule,
            MatIconModule,
            MatButtonModule,
            MatDialogModule,
            ScrollingModule,
            MatSliderModule,
          ],
          exports: [
            CommonModule,
            FormsModule,
            HttpClientModule,
            ReactiveFormsModule,
            MarkdownComponent,
            MediaComponent,
            ScrollingModule,
          ],
          providers: [MarkdownService, TitleService],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [{ type: TitleService }];
  },
});

// Process $overline$
// same as UNESCAPE_MD_RE plus a space
const UNESCAPE_RE = /\\([ \\!"#$%&'()*+,./:;<=>?@[\]^_`{|}$-])/g;
function subscript(state, silent) {
  let found, token;
  const max = state.posMax,
    start = state.pos;
  if (state.src.charCodeAt(start) !== 0x24 /* $ */) {
    return false;
  }
  if (silent) {
    return false;
  } // don't run any pairs in validation mode
  if (start + 2 >= max) {
    return false;
  }
  state.pos = start + 1;
  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === 0x24 /* $ */) {
      found = true;
      break;
    }
    state.md.inline.skipToken(state);
  }
  if (!found || start + 1 === state.pos) {
    state.pos = start;
    return false;
  }
  const content = state.src.slice(start + 1, state.pos);
  // don't allow unescaped spaces/newlines inside
  if (content.match(/(^|[^\\])(\\\\)*\s/)) {
    state.pos = start;
    return false;
  }
  // found!
  state.posMax = state.pos;
  state.pos = start + 1;
  // Earlier we checked !silent, but this implementation does not need it
  token = state.push('over_open', 'span', 1);
  token.attrPush(['class', 'md-overline']);
  token.markup = '$';
  token = state.push('text', '', 0);
  token.content = content.replace(UNESCAPE_RE, '$1');
  token = state.push('over_close', 'span', -1);
  token.markup = '$';
  state.pos = state.posMax + 1;
  state.posMax = max;
  return true;
}
function overlinePlugin(md) {
  md.inline.ruler.after('emphasis', 'over', subscript);
}

/**
 * Generated bundle index. Do not edit.
 */

export {
  ImageModel,
  MarkdownComponent,
  MediaComponent,
  MediaModel,
  SOLID_CORE_CONFIG,
  SolidCoreModule,
  overlinePlugin,
};
//# sourceMappingURL=zentrumnawi-solid-core.mjs.map
