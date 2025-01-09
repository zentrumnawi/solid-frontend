import { EventEmitter, OnChanges } from '@angular/core';
import { ImageModel, MediaModel } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import * as i0 from '@angular/core';
export declare class MediaDetailComponent implements OnChanges {
  private _dialog;
  image?: ImageModel;
  mediaObject?: MediaModel;
  hasDialog: boolean;
  hasAttributions: boolean;
  name: string;
  view?: string;
  hasControlPanel: boolean;
  hasAudio: boolean;
  hasDescription: boolean;
  hasDescriptionToggle: boolean;
  slideshowPageChanged: number;
  hasNavigationInDialog: boolean;
  openDialogRequest?: boolean;
  videoplayer: {
    nativeElement: HTMLVideoElement;
  };
  private loadError;
  playButtonIsShown: number;
  descriptionShow: boolean;
  NextDialogEmitter: EventEmitter<any>;
  PrevDialogEmitter: EventEmitter<any>;
  constructor(_dialog: MatDialog);
  ngOnChanges(): void;
  togglePlay(): void;
  setInvisible(): void;
  setVisible(): void;
  onPlayerEnded(): void;
  toggleDescription(descriptionToggle: boolean): void;
  handleOpenDialogClick(): void;
  handleCloseDialogEvent(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<MediaDetailComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    MediaDetailComponent,
    'solid-core-media-detail',
    never,
    {
      image: { alias: 'image'; required: false };
      mediaObject: { alias: 'mediaObject'; required: false };
      hasDialog: { alias: 'hasDialog'; required: false };
      hasAttributions: { alias: 'hasAttributions'; required: false };
      name: { alias: 'name'; required: false };
      view: { alias: 'view'; required: false };
      hasControlPanel: { alias: 'hasControlPanel'; required: false };
      hasAudio: { alias: 'hasAudio'; required: false };
      hasDescription: { alias: 'hasDescription'; required: false };
      hasDescriptionToggle: { alias: 'hasDescriptionToggle'; required: false };
      slideshowPageChanged: { alias: 'slideshowPageChanged'; required: false };
      hasNavigationInDialog: {
        alias: 'hasNavigationInDialog';
        required: false;
      };
    },
    {
      NextDialogEmitter: 'NextDialogEmitter';
      PrevDialogEmitter: 'PrevDialogEmitter';
    },
    never,
    never,
    false,
    never
  >;
}
