import { BreakpointObserver } from '@angular/cdk/layout';
import { OnDestroy, OnChanges, OnInit, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SolidCoreConfig } from '../../solid-core-config';
import * as i0 from '@angular/core';
export declare class AudioToolbarComponent
  implements OnInit, OnDestroy, OnChanges
{
  coreConfig: SolidCoreConfig;
  private _dialog;
  private _breakpointObsever;
  audiosrc: string;
  description: string;
  toolbar: boolean;
  player?: {
    nativeElement: HTMLAudioElement;
  };
  audioLoaded: boolean;
  playing: boolean;
  playingStarted: boolean;
  playPositionString: string;
  playPosition: number;
  duration: number;
  volume: number;
  previousVolume: number;
  isMuted: boolean;
  isMobile: boolean;
  playAudio: boolean;
  audioErrorEventEmitter: EventEmitter<any>;
  audioEndedEventEmitter: EventEmitter<any>;
  constructor(
    coreConfig: SolidCoreConfig,
    _dialog: MatDialog,
    _breakpointObsever: BreakpointObserver
  );
  ngOnInit(): void;
  isIOS(): boolean;
  onPlayerReady(): void;
  onPlayPauseClick(): void;
  onReplayClick(): void;
  onPlayerTimeUpdate(): void;
  displayPlayPosition(currentTime: number): void;
  onPositionChangeEnd(change: any): void;
  onVolumeChangeEnd(change: any): void;
  onVolumeMutingToggle(): void;
  onPlayerMediaError(): void;
  onPlayerEnded(): void;
  ngOnChanges(): void;
  ngOnDestroy(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<AudioToolbarComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    AudioToolbarComponent,
    'solid-core-audio-toolbar',
    never,
    {
      audiosrc: { alias: 'audiosrc'; required: false };
      description: { alias: 'description'; required: false };
      toolbar: { alias: 'toolbar'; required: false };
      playAudio: { alias: 'playAudio'; required: false };
    },
    {
      audioErrorEventEmitter: 'audioErrorEventEmitter';
      audioEndedEventEmitter: 'audioEndedEventEmitter';
    },
    never,
    never,
    false,
    never
  >;
}
