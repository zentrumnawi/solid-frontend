import { EventEmitter, NgZone, OnChanges, OnInit } from '@angular/core';
import { ImageModel, MediaModel } from '../../models';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  CloseScrollStrategy,
  ComponentType,
  ConnectedPosition,
  ScrollDispatcher,
  ViewportRuler,
} from '@angular/cdk/overlay';
import { BreakpointObserver } from '@angular/cdk/layout';
import type { MediaDialogComponent } from '../media-dialog/media-dialog.component';
import * as i0 from '@angular/core';
export declare class MediaToolbarComponent implements OnInit, OnChanges {
  private _dialog;
  private scrollDispatcher;
  private ngZone;
  private _breakpointObserver;
  private matDialogComponent;
  mediaObject?: MediaModel;
  image?: ImageModel;
  name: string;
  hasAttributions: boolean;
  hasDialog: boolean;
  hasDziTools: boolean;
  hasAudio: boolean;
  hasDescription: boolean;
  hasDescriptionToggle: boolean;
  data: any;
  private length;
  slideshowPageChanged: number;
  openDialogRequest?: boolean;
  isToolbarInDialog: boolean;
  isOverlayAboveOfDziZoomToolbar: boolean;
  isOverlayAboveOfNonDziZoomToolbar: boolean;
  attributionsPositions: ConnectedPosition[];
  attributionsScrollStrategy: CloseScrollStrategy;
  descriptionScrollStrategy: CloseScrollStrategy;
  attributionsIsOpen: boolean;
  descriptionIsOpen: boolean;
  dialogRef?: MatDialogRef<any>;
  descriptionToggle: EventEmitter<boolean>;
  closeDialogEventEmitter: EventEmitter<any>;
  descriptionToggled: boolean;
  hasNavigationInDialog: boolean;
  NextDialogEmitter: EventEmitter<any>;
  PrevDialogEmitter: EventEmitter<any>;
  isMobile: boolean;
  constructor(
    _dialog: MatDialog,
    scrollDispatcher: ScrollDispatcher,
    viewportRuler: ViewportRuler,
    ngZone: NgZone,
    _breakpointObserver: BreakpointObserver,
    matDialogComponent: ComponentType<MediaDialogComponent>
  );
  ngOnChanges(): void;
  ngOnInit(): void;
  openDialog(): void;
  openDialogImage(): void;
  attributionsOpenClose(): void;
  descriptionOpenClose(): void;
  toggleDescription(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<MediaToolbarComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    MediaToolbarComponent,
    'solid-core-media-toolbar',
    never,
    {
      mediaObject: { alias: 'mediaObject'; required: false };
      image: { alias: 'image'; required: false };
      name: { alias: 'name'; required: false };
      hasAttributions: { alias: 'hasAttributions'; required: false };
      hasDialog: { alias: 'hasDialog'; required: false };
      hasDziTools: { alias: 'hasDziTools'; required: false };
      hasAudio: { alias: 'hasAudio'; required: false };
      hasDescription: { alias: 'hasDescription'; required: false };
      hasDescriptionToggle: { alias: 'hasDescriptionToggle'; required: false };
      data: { alias: 'data'; required: false };
      slideshowPageChanged: { alias: 'slideshowPageChanged'; required: false };
      openDialogRequest: { alias: 'openDialogRequest'; required: false };
      isToolbarInDialog: { alias: 'isToolbarInDialog'; required: false };
      isOverlayAboveOfDziZoomToolbar: {
        alias: 'isOverlayAboveOfDziZoomToolbar';
        required: false;
      };
      isOverlayAboveOfNonDziZoomToolbar: {
        alias: 'isOverlayAboveOfNonDziZoomToolbar';
        required: false;
      };
      hasNavigationInDialog: {
        alias: 'hasNavigationInDialog';
        required: false;
      };
    },
    {
      descriptionToggle: 'descriptionToggle';
      closeDialogEventEmitter: 'closeDialogEventEmitter';
      NextDialogEmitter: 'NextDialogEmitter';
      PrevDialogEmitter: 'PrevDialogEmitter';
    },
    never,
    never,
    false,
    never
  >;
}
