import {
  AfterViewInit,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SolidCoreConfig } from '../../solid-core-config';
import { BreakpointObserver } from '@angular/cdk/layout';
import * as i0 from '@angular/core';
export declare enum APP {
  DIVE = 'Div-e',
}
export declare class MediaDialogComponent
  implements AfterViewInit, OnDestroy, OnInit
{
  data: any;
  name: string;
  coreConfig: SolidCoreConfig;
  private _breakpointObserver;
  APP_NAME_DIVE: APP;
  private _viewer;
  hasAudio: boolean;
  hasDescription: boolean;
  isOverlayAbove: boolean;
  audioStarted: boolean;
  audioLoadError: boolean;
  audioEnded: boolean;
  expandUpDown: boolean;
  audioCollapsed: boolean;
  dziInitialized: boolean;
  onNextEmitter: EventEmitter<any>;
  onPrevEmitter: EventEmitter<any>;
  title_container?: ElementRef;
  title_container_width: number;
  title_width: number;
  firstMovingAnimation: boolean;
  timeOut_1: any;
  timeOut_2: any;
  constructor(
    data: any,
    name: string,
    coreConfig: SolidCoreConfig,
    _breakpointObserver: BreakpointObserver
  );
  ngOnInit(): void;
  ngAfterViewInit(): void;
  handleLongTitle(): void;
  onResize(): void;
  handleAudioErrorEvent(): void;
  handleAudioEndedEvent(): void;
  onNext(): void;
  onPrev(): void;
  onPlayClick(): void;
  onExpandCollapse(): void;
  ngOnDestroy(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<MediaDialogComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    MediaDialogComponent,
    'solid-core-media-dialog',
    never,
    {},
    {},
    never,
    never,
    false,
    never
  >;
}
