import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ImageModel, MediaModel } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import { MediaErrorDialogComponent } from '../media-error-dialog/media-error-dialog.component';
import * as i0 from '@angular/core';
import * as i1 from '@angular/material/dialog';
import * as i2 from '@angular/common';
import * as i3 from '../markdown/markdown.component';
import * as i4 from '../media-toolbar/media-toolbar.component';
import * as i5 from '../audio-toolbar/audio-toolbar.component';
import * as i6 from '../audio-icon/audio-icon.component';
export class MediaDetailComponent {
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
    deps: [{ token: i1.MatDialog }],
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
        type: i2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i2.NgSwitch,
        selector: '[ngSwitch]',
        inputs: ['ngSwitch'],
      },
      {
        kind: 'directive',
        type: i2.NgSwitchCase,
        selector: '[ngSwitchCase]',
        inputs: ['ngSwitchCase'],
      },
      {
        kind: 'component',
        type: i3.MarkdownComponent,
        selector: '[markdown]',
        inputs: ['inline', 'data', 'appendData'],
      },
      {
        kind: 'component',
        type: i4.MediaToolbarComponent,
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
        type: i5.AudioToolbarComponent,
        selector: 'solid-core-audio-toolbar',
        inputs: ['audiosrc', 'description', 'toolbar', 'playAudio'],
        outputs: ['audioErrorEventEmitter', 'audioEndedEventEmitter'],
      },
      {
        kind: 'component',
        type: i6.AudioIconComponent,
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
    return [{ type: i1.MatDialog }];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtZGV0YWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvY29yZS9zcmMvbGliL2NvbXBvbmVudHMvbWVkaWEtZGV0YWlsL21lZGlhLWRldGFpbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL2NvcmUvc3JjL2xpYi9jb21wb25lbnRzL21lZGlhLWRldGFpbC9tZWRpYS1kZXRhaWwuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG9EQUFvRCxDQUFDOzs7Ozs7OztBQU8vRixNQUFNLE9BQU8sb0JBQW9CO0lBeUJYO0lBeEJYLEtBQUssQ0FBYztJQUNuQixXQUFXLENBQWM7SUFDekIsU0FBUyxDQUFXO0lBQ3BCLGVBQWUsQ0FBVztJQUMxQixJQUFJLENBQVU7SUFDZCxJQUFJLENBQVU7SUFDZCxlQUFlLENBQVc7SUFDMUIsUUFBUSxDQUFXO0lBQ25CLGNBQWMsQ0FBVztJQUN6QixvQkFBb0IsQ0FBVztJQUMvQixvQkFBb0IsQ0FBVTtJQUM5QixxQkFBcUIsQ0FBVztJQUN6QyxpQkFBaUIsQ0FBVztJQUVpQixXQUFXLENBRXREO0lBQ00sU0FBUyxHQUFHLEtBQUssQ0FBQztJQUNuQixpQkFBaUIsQ0FBVTtJQUMzQixlQUFlLEdBQUcsS0FBSyxDQUFDO0lBRXJCLGlCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDdkMsaUJBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUVqRCxZQUFvQixPQUFrQjtRQUFsQixZQUFPLEdBQVAsT0FBTyxDQUFXO0lBQUcsQ0FBQztJQUUxQyxXQUFXO1FBQ1QsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FBQztJQUVNLFVBQVU7UUFDZixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMseUJBQXlCLEVBQUU7Z0JBQzNDLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsUUFBUTtvQkFDZixPQUFPLEVBQUUsb0NBQW9DO2lCQUM5QzthQUNGLENBQUMsQ0FBQztZQUNILE9BQU87U0FDUjtRQUNELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLE1BQU07Z0JBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFDcEM7Z0JBQ0EsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDdkM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDeEM7U0FDRjtJQUNILENBQUM7SUFFTSxZQUFZO1FBQ2pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNNLFVBQVU7UUFDZixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDTSxhQUFhO1FBQ2xCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7U0FDaEQ7SUFDSCxDQUFDO0lBRU0saUJBQWlCLENBQUMsaUJBQTBCO1FBQ2pELGlCQUFpQjtZQUNmLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1lBQy9CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVNLHFCQUFxQjtRQUMxQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxzQkFBc0I7UUFDcEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUNqQyxDQUFDO3VHQTlFVSxvQkFBb0I7MkZBQXBCLG9CQUFvQixxcEJDakJqQyxrN0pBbUlBOzsyRkRsSGEsb0JBQW9CO2tCQUxoQyxTQUFTOytCQUNFLHlCQUF5QjtnR0FLMUIsS0FBSztzQkFBYixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csb0JBQW9CO3NCQUE1QixLQUFLO2dCQUNHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFDRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBR3VDLFdBQVc7c0JBQXZELFNBQVM7dUJBQUMsYUFBYSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtnQkFPakMsaUJBQWlCO3NCQUExQixNQUFNO2dCQUNHLGlCQUFpQjtzQkFBMUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT3V0cHV0LFxyXG4gIFZpZXdDaGlsZCxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSW1hZ2VNb2RlbCwgTWVkaWFNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscyc7XHJcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XHJcbmltcG9ydCB7IE1lZGlhRXJyb3JEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuLi9tZWRpYS1lcnJvci1kaWFsb2cvbWVkaWEtZXJyb3ItZGlhbG9nLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NvbGlkLWNvcmUtbWVkaWEtZGV0YWlsJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbWVkaWEtZGV0YWlsLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9tZWRpYS1kZXRhaWwuY29tcG9uZW50LnNjc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1lZGlhRGV0YWlsQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBpbWFnZT86IEltYWdlTW9kZWw7XHJcbiAgQElucHV0KCkgbWVkaWFPYmplY3Q/OiBNZWRpYU1vZGVsO1xyXG4gIEBJbnB1dCgpIGhhc0RpYWxvZyE6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgaGFzQXR0cmlidXRpb25zITogYm9vbGVhbjtcclxuICBASW5wdXQoKSBuYW1lITogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHZpZXc/OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgaGFzQ29udHJvbFBhbmVsITogYm9vbGVhbjtcclxuICBASW5wdXQoKSBoYXNBdWRpbyE6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgaGFzRGVzY3JpcHRpb24hOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGhhc0Rlc2NyaXB0aW9uVG9nZ2xlITogYm9vbGVhbjtcclxuICBASW5wdXQoKSBzbGlkZXNob3dQYWdlQ2hhbmdlZCE6IG51bWJlcjtcclxuICBASW5wdXQoKSBoYXNOYXZpZ2F0aW9uSW5EaWFsb2chOiBib29sZWFuO1xyXG4gIG9wZW5EaWFsb2dSZXF1ZXN0PzogYm9vbGVhbjtcclxuXHJcbiAgQFZpZXdDaGlsZCgndmlkZW9wbGF5ZXInLCB7IHN0YXRpYzogZmFsc2UgfSkgdmlkZW9wbGF5ZXIhOiB7XHJcbiAgICBuYXRpdmVFbGVtZW50OiBIVE1MVmlkZW9FbGVtZW50O1xyXG4gIH07XHJcbiAgcHJpdmF0ZSBsb2FkRXJyb3IgPSBmYWxzZTtcclxuICBwdWJsaWMgcGxheUJ1dHRvbklzU2hvd24hOiBudW1iZXI7XHJcbiAgcHVibGljIGRlc2NyaXB0aW9uU2hvdyA9IGZhbHNlO1xyXG5cclxuICBAT3V0cHV0KCkgTmV4dERpYWxvZ0VtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIFByZXZEaWFsb2dFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9kaWFsb2c6IE1hdERpYWxvZykge31cclxuXHJcbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uU2hvdyA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvZ2dsZVBsYXkoKSB7XHJcbiAgICBpZiAodGhpcy5sb2FkRXJyb3IpIHtcclxuICAgICAgdGhpcy5fZGlhbG9nLm9wZW4oTWVkaWFFcnJvckRpYWxvZ0NvbXBvbmVudCwge1xyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgIHRpdGxlOiAnRmVobGVyJyxcclxuICAgICAgICAgIGNvbnRlbnQ6ICdEYXRlaSBrb25udGUgbmljaHQgZ2VsYWRlbiB3ZXJkZW4uJyxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMudmlkZW9wbGF5ZXIpIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMudmlkZW9wbGF5ZXIubmF0aXZlRWxlbWVudC5wYXVzZWQgfHxcclxuICAgICAgICB0aGlzLnZpZGVvcGxheWVyLm5hdGl2ZUVsZW1lbnQuZW5kZWRcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy52aWRlb3BsYXllci5uYXRpdmVFbGVtZW50LnBsYXkoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnZpZGVvcGxheWVyLm5hdGl2ZUVsZW1lbnQucGF1c2UoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldEludmlzaWJsZSgpIHtcclxuICAgIHRoaXMucGxheUJ1dHRvbklzU2hvd24gPSAwO1xyXG4gIH1cclxuICBwdWJsaWMgc2V0VmlzaWJsZSgpIHtcclxuICAgIHRoaXMucGxheUJ1dHRvbklzU2hvd24gPSAxO1xyXG4gIH1cclxuICBwdWJsaWMgb25QbGF5ZXJFbmRlZCgpIHtcclxuICAgIGlmICh0aGlzLnZpZGVvcGxheWVyKSB7XHJcbiAgICAgIHRoaXMucGxheUJ1dHRvbklzU2hvd24gPSAxO1xyXG4gICAgICB0aGlzLnZpZGVvcGxheWVyLm5hdGl2ZUVsZW1lbnQuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHRvZ2dsZURlc2NyaXB0aW9uKGRlc2NyaXB0aW9uVG9nZ2xlOiBib29sZWFuKSB7XHJcbiAgICBkZXNjcmlwdGlvblRvZ2dsZVxyXG4gICAgICA/ICh0aGlzLmRlc2NyaXB0aW9uU2hvdyA9IHRydWUpXHJcbiAgICAgIDogKHRoaXMuZGVzY3JpcHRpb25TaG93ID0gZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhhbmRsZU9wZW5EaWFsb2dDbGljaygpIHtcclxuICAgIHRoaXMub3BlbkRpYWxvZ1JlcXVlc3QgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlQ2xvc2VEaWFsb2dFdmVudCgpIHtcclxuICAgIHRoaXMub3BlbkRpYWxvZ1JlcXVlc3QgPSBmYWxzZTtcclxuICB9XHJcbn1cclxuIiwiPCEtLSBGb3IgcXVpeiBpbWFnZSBiZWNhdXNlIHRoZSBxdWl6IHF1ZXN0aW9uIGRvZXNuJ3RcclxuY29udGFpbiBhbnkgbWVkaWEgb2JqZWN0IG5vdy4gSXQgaXMganVzdCBhIHRlbXBvcmFyeSBzb2x1dGlvbi5cclxuSXQgaXMgbm90IHBvc3NpYmxlIHRvIHVzZSBhIGltYWdlIHRvb2xiYXIgaGVyZSwgYmVjYXVzZSBxdWl6IGltYWdlXHJcbnVzZSB0aGUgSW1hZ2VNb2RlbCwgYnV0IG5vdyB0aGUgaW1hZ2UgdG9vbGJhciB1c2VzIHRoZSBNZWRpYU9iamVjdE1vZGVsIC0tPlxyXG48bmctY29udGFpbmVyICpuZ0lmPVwiaW1hZ2VcIj5cclxuICA8ZGl2IGNsYXNzPVwiaW1nLWNvbnRhaW5lclwiPlxyXG4gICAgPGltZ1xyXG4gICAgICBbc3JjXT1cImltYWdlLmdldFJhd0ltYWdlKCdsYXJnZScpXCJcclxuICAgICAgW2FsdF09XCJpbWFnZS5hbHRcIlxyXG4gICAgICBbY2xhc3MubGFuZHNjYXBlXT1cImltYWdlLmlzTGFuZHNjYXBlXCJcclxuICAgICAgKGNsaWNrKT1cImhhbmRsZU9wZW5EaWFsb2dDbGljaygpXCJcclxuICAgIC8+XHJcbiAgPC9kaXY+XHJcbiAgPHNvbGlkLWNvcmUtbWVkaWEtdG9vbGJhclxyXG4gICAgKm5nSWY9XCJ2aWV3ICE9PSAnZ3JpZCdcIlxyXG4gICAgW2ltYWdlXT1cImltYWdlXCJcclxuICAgIFtuYW1lXT1cIm5hbWVcIlxyXG4gICAgW2hhc0F0dHJpYnV0aW9uc109XCJoYXNBdHRyaWJ1dGlvbnNcIlxyXG4gICAgW2hhc0RpYWxvZ109XCJoYXNEaWFsb2dcIlxyXG4gICAgW2hhc0R6aVRvb2xzXT1cImZhbHNlXCJcclxuICAgIFtoYXNBdWRpb109XCJoYXNBdWRpb1wiXHJcbiAgICBbaGFzRGVzY3JpcHRpb25dPVwiaGFzRGVzY3JpcHRpb25cIlxyXG4gICAgW3NsaWRlc2hvd1BhZ2VDaGFuZ2VkXT1cInNsaWRlc2hvd1BhZ2VDaGFuZ2VkXCJcclxuICAgIFtvcGVuRGlhbG9nUmVxdWVzdF09XCJvcGVuRGlhbG9nUmVxdWVzdFwiXHJcbiAgICAoY2xvc2VEaWFsb2dFdmVudEVtaXR0ZXIpPVwiaGFuZGxlQ2xvc2VEaWFsb2dFdmVudCgpXCJcclxuICA+PC9zb2xpZC1jb3JlLW1lZGlhLXRvb2xiYXI+XHJcbjwvbmctY29udGFpbmVyPlxyXG5cclxuPCEtLSBGb3IgbWVkaWEgb2JqZWN0IGluIFByb2ZpbGUgLS0+XHJcbjxuZy1jb250YWluZXIgKm5nSWY9XCJtZWRpYU9iamVjdFwiPlxyXG4gIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIm1lZGlhT2JqZWN0Lm1lZGlhVHlwZVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cIm1lZGlhLWNvbnRhaW5lclwiICpuZ1N3aXRjaENhc2U9XCInaW1hZ2UnXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZS1jb250YWluZXJcIj5cclxuICAgICAgICA8aW1nXHJcbiAgICAgICAgICAqbmdJZj1cInZpZXcgIT09ICdncmlkJzsgZWxzZSBncmlkXCJcclxuICAgICAgICAgIFtzcmNdPVwibWVkaWFPYmplY3QuZ2V0UmF3SW1hZ2UoJ2xhcmdlJylcIlxyXG4gICAgICAgICAgW2FsdF09XCJtZWRpYU9iamVjdC5hbHRcIlxyXG4gICAgICAgICAgW2NsYXNzLmxhbmRzY2FwZV09XCJtZWRpYU9iamVjdC5pc0xhbmRzY2FwZVwiXHJcbiAgICAgICAgICAoY2xpY2spPVwiaGFuZGxlT3BlbkRpYWxvZ0NsaWNrKClcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwibWVkaWEtY29udGFpbmVyXCIgKm5nU3dpdGNoQ2FzZT1cIidhdWRpbydcIj5cclxuICAgICAgPCEtLSA8aW1nXHJcbiAgICAgICAgKm5nSWY9XCJ2aWV3ICE9ICdncmlkJzsgZWxzZSBncmlkXCJcclxuICAgICAgICBbc3JjXT1cIidhc3NldHMvcHJvZmlsZS9wbGFudHlfYXVkaW8uc3ZnJ1wiXHJcbiAgICAgICAgW2FsdF09XCJtZWRpYU9iamVjdC5hbHRcIlxyXG4gICAgICAgIFtjbGFzcy5sYW5kc2NhcGVdPVwibWVkaWFPYmplY3QuaXNMYW5kc2NhcGVcIlxyXG4gICAgICAvPiAtLT5cclxuICAgICAgPGRpdiBjbGFzcz1cImF1ZGlvLWNvbnRhaW5lclwiPlxyXG4gICAgICAgIDxzb2xpZC1jb3JlLWF1ZGlvLXRvb2xiYXJcclxuICAgICAgICAgICpuZ0lmPVwidmlldyAhPT0gJ2dyaWQnXCJcclxuICAgICAgICAgIFthdWRpb3NyY109XCJtZWRpYU9iamVjdC5nZXRTcmMoKSFcIlxyXG4gICAgICAgICAgW3Rvb2xiYXJdPVwidHJ1ZVwiXHJcbiAgICAgICAgPjwvc29saWQtY29yZS1hdWRpby10b29sYmFyPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBpZD1cInN2Zy1kZXNjcmlwdGlvbi1jb250YWluZXJcIj5cclxuICAgICAgICA8c29saWQtY29yZS1hdWRpby1pY29uXHJcbiAgICAgICAgICAqbmdJZj1cIiFkZXNjcmlwdGlvblNob3dcIlxyXG4gICAgICAgICAgW3RpdGxlXT1cIm1lZGlhT2JqZWN0LmdldFRpdGxlXCJcclxuICAgICAgICA+PC9zb2xpZC1jb3JlLWF1ZGlvLWljb24+XHJcbiAgICAgICAgPGRpdiAqbmdJZj1cImRlc2NyaXB0aW9uU2hvd1wiIGlkPVwiZGVzY3JpcHRpb24tY29udGFpbmVyXCI+XHJcbiAgICAgICAgICA8ZGl2ICpuZ0lmPVwibWVkaWFPYmplY3QuZGVzY3JpcHRpb25cIiBpZD1cImRlc2NyaXB0aW9uXCI+XHJcbiAgICAgICAgICAgIDxwIG1hcmtkb3duIFtkYXRhXT1cIm1lZGlhT2JqZWN0LmRlc2NyaXB0aW9uIVwiPjwvcD5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiAqbmdJZj1cIiFtZWRpYU9iamVjdC5kZXNjcmlwdGlvblwiIGlkPVwiZGVzY3JpcHRpb25cIj5cclxuICAgICAgICAgICAgPHA+TGVpZGVyIGhhYmVuIHdpciBrZWluZSBCZXNjaHJlaWJ1bmc8L3A+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJtZWRpYS1jb250YWluZXJcIiAqbmdTd2l0Y2hDYXNlPVwiJ3ZpZGVvJ1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwidmlkZW8tY29udGFpbmVyXCI+XHJcbiAgICAgICAgPHZpZGVvXHJcbiAgICAgICAgICAjdmlkZW9wbGF5ZXJcclxuICAgICAgICAgIGlkPVwidmlkZW9cIlxyXG4gICAgICAgICAgcHJlbG9hZD1cIm1ldGFkYXRhXCJcclxuICAgICAgICAgIFtzcmNdPVwibWVkaWFPYmplY3QuZ2V0U3JjKClcIlxyXG4gICAgICAgICAgY29udHJvbHNcclxuICAgICAgICAgIChlbmRlZCk9XCJvblBsYXllckVuZGVkKClcIlxyXG4gICAgICAgICAgKHBsYXlpbmcpPVwic2V0SW52aXNpYmxlKClcIlxyXG4gICAgICAgICAgKHBhdXNlKT1cInNldFZpc2libGUoKVwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIHZpZGVvIHRhZy5cclxuICAgICAgICA8L3ZpZGVvPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwbGF5LWJ1dHRvbi13cmFwcGVyXCIgKGNsaWNrKT1cInRvZ2dsZVBsYXkoKVwiPlxyXG4gICAgICAgICAgPGRpdiBpZD1cInBsYXktYnV0dG9uLWNpcmNsZVwiIFtzdHlsZS5vcGFjaXR5XT1cInBsYXlCdXR0b25Jc1Nob3duXCI+XHJcbiAgICAgICAgICAgIDwhLS0gU1ZHIFBsYXkgQnV0dG9uIC0tPlxyXG4gICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDgwIDgwXCI+XHJcbiAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgIGQ9XCJNNDAgMGE0MCA0MCAwIDEwNDAgNDBBNDAgNDAgMCAwMDQwIDB6TTI2IDYxLjU2VjE4LjQ0TDY0IDQwelwiXHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgPHNvbGlkLWNvcmUtbWVkaWEtdG9vbGJhclxyXG4gICAgKm5nSWY9XCJ2aWV3ICE9PSAnZ3JpZCdcIlxyXG4gICAgW21lZGlhT2JqZWN0XT1cIm1lZGlhT2JqZWN0XCJcclxuICAgIFtuYW1lXT1cIm5hbWVcIlxyXG4gICAgW2hhc0F0dHJpYnV0aW9uc109XCJoYXNBdHRyaWJ1dGlvbnNcIlxyXG4gICAgW2hhc0RpYWxvZ109XCJoYXNEaWFsb2dcIlxyXG4gICAgW2hhc0R6aVRvb2xzXT1cImZhbHNlXCJcclxuICAgIFtoYXNBdWRpb109XCJoYXNBdWRpb1wiXHJcbiAgICBbaGFzRGVzY3JpcHRpb25dPVwiaGFzRGVzY3JpcHRpb25cIlxyXG4gICAgW2hhc0Rlc2NyaXB0aW9uVG9nZ2xlXT1cImhhc0Rlc2NyaXB0aW9uVG9nZ2xlXCJcclxuICAgIChkZXNjcmlwdGlvblRvZ2dsZSk9XCJ0b2dnbGVEZXNjcmlwdGlvbigkZXZlbnQpXCJcclxuICAgIFtzbGlkZXNob3dQYWdlQ2hhbmdlZF09XCJzbGlkZXNob3dQYWdlQ2hhbmdlZFwiXHJcbiAgICBbb3BlbkRpYWxvZ1JlcXVlc3RdPVwib3BlbkRpYWxvZ1JlcXVlc3RcIlxyXG4gICAgKGNsb3NlRGlhbG9nRXZlbnRFbWl0dGVyKT1cImhhbmRsZUNsb3NlRGlhbG9nRXZlbnQoKVwiXHJcbiAgICAoTmV4dERpYWxvZ0VtaXR0ZXIpPVwiTmV4dERpYWxvZ0VtaXR0ZXIuZW1pdCgpXCJcclxuICAgIChQcmV2RGlhbG9nRW1pdHRlcik9XCJQcmV2RGlhbG9nRW1pdHRlci5lbWl0KClcIlxyXG4gICAgW2hhc05hdmlnYXRpb25JbkRpYWxvZ109XCJoYXNOYXZpZ2F0aW9uSW5EaWFsb2dcIlxyXG4gID48L3NvbGlkLWNvcmUtbWVkaWEtdG9vbGJhcj5cclxuICA8bmctdGVtcGxhdGUgI2dyaWQ+XHJcbiAgICA8aW1nXHJcbiAgICAgICpuZ0lmPVwibWVkaWFPYmplY3QubWVkaWFUeXBlID09PSAnaW1hZ2UnXCJcclxuICAgICAgW3NyY109XCJtZWRpYU9iamVjdC5nZXRSYXdJbWFnZSgndGh1bWJuYWlsJylcIlxyXG4gICAgICBbYWx0XT1cIm1lZGlhT2JqZWN0LmFsdFwiXHJcbiAgICAgIFtjbGFzcy5sYW5kc2NhcGVdPVwibWVkaWFPYmplY3QuaXNMYW5kc2NhcGVcIlxyXG4gICAgLz5cclxuICAgIDxpbWdcclxuICAgICAgKm5nSWY9XCJtZWRpYU9iamVjdC5tZWRpYVR5cGUgPT09ICdhdWRpbydcIlxyXG4gICAgICBbc3JjXT1cIidhc3NldHMvcHJvZmlsZS9hdWRpby5zdmcnXCJcclxuICAgICAgW2FsdF09XCJtZWRpYU9iamVjdC5hbHRcIlxyXG4gICAgLz5cclxuICA8L25nLXRlbXBsYXRlPlxyXG48L25nLWNvbnRhaW5lcj5cclxuIl19
