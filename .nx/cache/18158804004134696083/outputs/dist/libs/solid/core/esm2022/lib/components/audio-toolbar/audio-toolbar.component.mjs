import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  Input,
  Inject,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SOLID_CORE_CONFIG } from '../../solid-core-config';
import { MediaErrorDialogComponent } from '../media-error-dialog/media-error-dialog.component';
import * as i0 from '@angular/core';
import * as i1 from '@angular/material/dialog';
import * as i2 from '@angular/cdk/layout';
import * as i3 from '@angular/common';
import * as i4 from '@angular/forms';
import * as i5 from '@angular/material/icon';
import * as i6 from '@angular/material/button';
import * as i7 from '@angular/material/slider';
export class AudioToolbarComponent {
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
      { token: i1.MatDialog },
      { token: i2.BreakpointObserver },
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
        type: i3.NgIf,
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
      { type: i1.MatDialog },
      { type: i2.BreakpointObserver },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW8tdG9vbGJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL2NvcmUvc3JjL2xpYi9jb21wb25lbnRzL2F1ZGlvLXRvb2xiYXIvYXVkaW8tdG9vbGJhci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL2NvcmUvc3JjL2xpYi9jb21wb25lbnRzL2F1ZGlvLXRvb2xiYXIvYXVkaW8tdG9vbGJhci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN6RCxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUlULE1BQU0sRUFDTixZQUFZLEdBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxpQkFBaUIsRUFBbUIsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQzs7Ozs7Ozs7O0FBTy9GLE1BQU0sT0FBTyxxQkFBcUI7SUFzQkk7SUFDMUI7SUFDQTtJQXZCTSxRQUFRLENBQVU7SUFDbEIsV0FBVyxDQUFVO0lBQ3JCLE9BQU8sQ0FBVztJQUNXLE1BQU0sQ0FFakQ7SUFDSyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDaEIsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUN2QixrQkFBa0IsR0FBRyxXQUFXLENBQUM7SUFDakMsWUFBWSxHQUFHLENBQUMsQ0FBQztJQUNqQixRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNYLGNBQWMsR0FBRyxDQUFDLENBQUM7SUFDbkIs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Z3VsYXIvY2RrL2xheW91dCc7XHJcbmltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIElucHV0LFxyXG4gIEluamVjdCxcclxuICBWaWV3Q2hpbGQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcclxuaW1wb3J0IHsgU09MSURfQ09SRV9DT05GSUcsIFNvbGlkQ29yZUNvbmZpZyB9IGZyb20gJy4uLy4uL3NvbGlkLWNvcmUtY29uZmlnJztcclxuaW1wb3J0IHsgTWVkaWFFcnJvckRpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4uL21lZGlhLWVycm9yLWRpYWxvZy9tZWRpYS1lcnJvci1kaWFsb2cuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc29saWQtY29yZS1hdWRpby10b29sYmFyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYXVkaW8tdG9vbGJhci5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vYXVkaW8tdG9vbGJhci5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXVkaW9Ub29sYmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgcHVibGljIGF1ZGlvc3JjITogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBkZXNjcmlwdGlvbiE6IHN0cmluZztcclxuICBASW5wdXQoKSBwdWJsaWMgdG9vbGJhciE6IGJvb2xlYW47XHJcbiAgQFZpZXdDaGlsZCgnYXVkaW9wbGF5ZXInLCB7IHN0YXRpYzogZmFsc2UgfSkgcGxheWVyPzoge1xyXG4gICAgbmF0aXZlRWxlbWVudDogSFRNTEF1ZGlvRWxlbWVudDtcclxuICB9O1xyXG4gIHB1YmxpYyBhdWRpb0xvYWRlZCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBwbGF5aW5nID0gZmFsc2U7XHJcbiAgcHVibGljIHBsYXlpbmdTdGFydGVkID0gZmFsc2U7XHJcbiAgcHVibGljIHBsYXlQb3NpdGlvblN0cmluZyA9ICcwOjAwLy06LS0nO1xyXG4gIHB1YmxpYyBwbGF5UG9zaXRpb24gPSAwO1xyXG4gIHB1YmxpYyBkdXJhdGlvbiA9IDA7XHJcbiAgcHVibGljIHZvbHVtZSA9IDE7XHJcbiAgcHVibGljIHByZXZpb3VzVm9sdW1lID0gMDtcclxuICBwdWJsaWMgaXNNdXRlZCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBpc01vYmlsZSA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIHB1YmxpYyBwbGF5QXVkaW8gPSBmYWxzZTtcclxuICBAT3V0cHV0KCkgYXVkaW9FcnJvckV2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgYXVkaW9FbmRlZEV2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KFNPTElEX0NPUkVfQ09ORklHKSBwdWJsaWMgY29yZUNvbmZpZzogU29saWRDb3JlQ29uZmlnLFxyXG4gICAgcHJpdmF0ZSBfZGlhbG9nOiBNYXREaWFsb2csXHJcbiAgICBwcml2YXRlIF9icmVha3BvaW50T2JzZXZlcjogQnJlYWtwb2ludE9ic2VydmVyXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuX2JyZWFrcG9pbnRPYnNldmVyXHJcbiAgICAgIC5vYnNlcnZlKFsnKG1heC13aWR0aDogNDcwcHgpJ10pXHJcbiAgICAgIC5zdWJzY3JpYmUoKGlzTW9iaWxlKSA9PiB7XHJcbiAgICAgICAgaWYgKGlzTW9iaWxlLm1hdGNoZXMpIHtcclxuICAgICAgICAgIHRoaXMuaXNNb2JpbGUgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmlzTW9iaWxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIGlzSU9TKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgW1xyXG4gICAgICAgICdpUGFkIFNpbXVsYXRvcicsXHJcbiAgICAgICAgJ2lQaG9uZSBTaW11bGF0b3InLFxyXG4gICAgICAgICdpUG9kIFNpbXVsYXRvcicsXHJcbiAgICAgICAgJ2lQYWQnLFxyXG4gICAgICAgICdpUGhvbmUnLFxyXG4gICAgICAgICdpUG9kJyxcclxuICAgICAgXS5pbmNsdWRlcyhuYXZpZ2F0b3IucGxhdGZvcm0pIHx8XHJcbiAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoJ2lQYWQnKSB8fFxyXG4gICAgICBuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKCdpUGhvbmUnKSB8fFxyXG4gICAgICAvLyBpUGFkIG9uIGlPUyAxMyBkZXRlY3Rpb25cclxuICAgICAgKG5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoJ01hYycpICYmICdvbnRvdWNoZW5kJyBpbiBkb2N1bWVudClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBvblBsYXllclJlYWR5KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucGxheWVyKSB7XHJcbiAgICAgIHRoaXMuYXVkaW9Mb2FkZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmR1cmF0aW9uID0gdGhpcy5wbGF5ZXIubmF0aXZlRWxlbWVudC5kdXJhdGlvbjtcclxuICAgICAgdGhpcy5wbGF5UG9zaXRpb24gPSAwO1xyXG4gICAgICB0aGlzLmRpc3BsYXlQbGF5UG9zaXRpb24oMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25QbGF5UGF1c2VDbGljaygpIHtcclxuICAgIGlmICh0aGlzLnBsYXllcikge1xyXG4gICAgICBpZiAodGhpcy5wbGF5aW5nKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIubmF0aXZlRWxlbWVudC5wYXVzZSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGxheWluZ1N0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucGxheWVyLm5hdGl2ZUVsZW1lbnQucGxheSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnBsYXlpbmcgPSAhdGhpcy5wbGF5aW5nO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uUmVwbGF5Q2xpY2soKSB7XHJcbiAgICBpZiAodGhpcy5wbGF5ZXIpIHtcclxuICAgICAgdGhpcy5wbGF5ZXIubmF0aXZlRWxlbWVudC5wYXVzZSgpO1xyXG4gICAgICB0aGlzLnBsYXllci5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgdGhpcy5wbGF5ZXIubmF0aXZlRWxlbWVudC5wbGF5KCk7XHJcbiAgICAgIHRoaXMucGxheWluZyA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25QbGF5ZXJUaW1lVXBkYXRlKCkge1xyXG4gICAgaWYgKHRoaXMucGxheWVyKSB7XHJcbiAgICAgIHRoaXMuZGlzcGxheVBsYXlQb3NpdGlvbih0aGlzLnBsYXllci5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXNwbGF5UGxheVBvc2l0aW9uKGN1cnJlbnRUaW1lOiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLnBsYXllcikge1xyXG4gICAgICBjb25zdCBkdXJhdGlvblNlY29uZHMgPSBNYXRoLmZsb29yKHRoaXMuZHVyYXRpb24gJSA2MCk7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRUaW1lU2Vjb25kcyA9IE1hdGguZmxvb3IoY3VycmVudFRpbWUgJSA2MCk7XHJcbiAgICAgIHRoaXMucGxheVBvc2l0aW9uU3RyaW5nID0gYCR7TWF0aC5mbG9vcihjdXJyZW50VGltZSAvIDYwKX06JHtcclxuICAgICAgICBjdXJyZW50VGltZVNlY29uZHMgPCAxMCA/ICcwJyArIGN1cnJlbnRUaW1lU2Vjb25kcyA6IGN1cnJlbnRUaW1lU2Vjb25kc1xyXG4gICAgICB9LyR7TWF0aC5mbG9vcih0aGlzLmR1cmF0aW9uIC8gNjApfToke1xyXG4gICAgICAgIGR1cmF0aW9uU2Vjb25kcyA8IDEwID8gJzAnICsgZHVyYXRpb25TZWNvbmRzIDogZHVyYXRpb25TZWNvbmRzXHJcbiAgICAgIH1gO1xyXG4gICAgICB0aGlzLnBsYXlQb3NpdGlvbiA9IGN1cnJlbnRUaW1lO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnBsYXlQb3NpdGlvbiA9IDA7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25Qb3NpdGlvbkNoYW5nZUVuZChjaGFuZ2U6IGFueSkge1xyXG4gICAgaWYgKHRoaXMucGxheWVyKSB7XHJcbiAgICAgIHRoaXMucGxheWVyLm5hdGl2ZUVsZW1lbnQuY3VycmVudFRpbWUgPSBjaGFuZ2UudmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25Wb2x1bWVDaGFuZ2VFbmQoY2hhbmdlOiBhbnkpIHtcclxuICAgIGlmICh0aGlzLnBsYXllcikge1xyXG4gICAgICB0aGlzLmlzTXV0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5wbGF5ZXIubmF0aXZlRWxlbWVudC52b2x1bWUgPSBjaGFuZ2UudmFsdWU7XHJcbiAgICAgIHRoaXMudm9sdW1lID0gY2hhbmdlLnZhbHVlO1xyXG4gICAgICBpZiAoY2hhbmdlLnZhbHVlID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy5pc011dGVkID0gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVm9sdW1lTXV0aW5nVG9nZ2xlKCkge1xyXG4gICAgaWYgKHRoaXMucGxheWVyKSB7XHJcbiAgICAgIHRoaXMuaXNNdXRlZCA9ICF0aGlzLmlzTXV0ZWQ7XHJcbiAgICAgIGlmICh0aGlzLmlzTXV0ZWQpIHtcclxuICAgICAgICB0aGlzLnBsYXllci5uYXRpdmVFbGVtZW50Lm11dGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnByZXZpb3VzVm9sdW1lID0gdGhpcy52b2x1bWU7XHJcbiAgICAgICAgdGhpcy52b2x1bWUgPSAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGxheWVyLm5hdGl2ZUVsZW1lbnQubXV0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnZvbHVtZSA9IHRoaXMucHJldmlvdXNWb2x1bWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblBsYXllck1lZGlhRXJyb3IoKSB7XHJcbiAgICB0aGlzLmF1ZGlvRXJyb3JFdmVudEVtaXR0ZXIuZW1pdCgpO1xyXG4gICAgdGhpcy5hdWRpb0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5fZGlhbG9nLm9wZW4oTWVkaWFFcnJvckRpYWxvZ0NvbXBvbmVudCwge1xyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgdGl0bGU6ICdGZWhsZXInLFxyXG4gICAgICAgIGNvbnRlbnQ6ICdBdWRpb2RhdGVpIGtvbm50ZSBuaWNodCBnZWxhZGVuIHdlcmRlbi4nLFxyXG4gICAgICB9LFxyXG4gICAgICBwYW5lbENsYXNzOiAnc29saWQtY29yZS1tZWRpYS1lcnJvci1kaWFsb2cnLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25QbGF5ZXJFbmRlZCgpIHtcclxuICAgIGlmICh0aGlzLnBsYXllcikge1xyXG4gICAgICB0aGlzLmF1ZGlvRW5kZWRFdmVudEVtaXR0ZXIuZW1pdCgpO1xyXG4gICAgICB0aGlzLnBsYXlpbmdTdGFydGVkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMucGxheWluZyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnBsYXllci5uYXRpdmVFbGVtZW50LmN1cnJlbnRUaW1lID0gMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucGxheWluZ1N0YXJ0ZWQgJiYgdGhpcy5wbGF5ZXIpIHtcclxuICAgICAgdGhpcy5wbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuYXVkaW9Mb2FkZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5wbGF5UG9zaXRpb25TdHJpbmcgPSAnMDowMC8tOi0tJztcclxuICAgICAgdGhpcy5wbGF5UG9zaXRpb24gPSAwO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucGxheUF1ZGlvKSB0aGlzLm9uUGxheVBhdXNlQ2xpY2soKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucGxheWluZ1N0YXJ0ZWQgJiYgdGhpcy5wbGF5ZXIpIHtcclxuICAgICAgdGhpcy5wbGF5ZXIubmF0aXZlRWxlbWVudC5wYXVzZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiIXRvb2xiYXJcIj5cbiAgPGJ1dHRvblxuICAgIChjbGljayk9XCJvblBsYXlQYXVzZUNsaWNrKClcIlxuICAgIFtkaXNhYmxlZF09XCIhYXVkaW9Mb2FkZWRcIlxuICAgIG1hdC1taW5pLWZhYlxuICAgIGNvbG9yPVwiYWNjZW50XCJcbiAgPlxuICAgIDxtYXQtaWNvbj57eyBwbGF5aW5nID8gJ3BhdXNlJyA6ICdwbGF5X2Fycm93JyB9fTwvbWF0LWljb24+XG4gIDwvYnV0dG9uPlxuPC9uZy1jb250YWluZXI+XG48bmctY29udGFpbmVyICpuZ0lmPVwidG9vbGJhclwiPlxuICA8ZGl2IGNsYXNzPVwidG9vbGJhclwiIFtjbGFzcy5tb2JpbGVdPVwiaXNNb2JpbGVcIj5cbiAgICA8YnV0dG9uIGNsYXNzPVwicGxheS1idG5cIiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cIm9uUGxheVBhdXNlQ2xpY2soKVwiPlxuICAgICAgPG1hdC1pY29uPnt7IHBsYXlpbmcgPyAncGF1c2UnIDogJ3BsYXlfYXJyb3cnIH19PC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8YnV0dG9uXG4gICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgIFtkaXNhYmxlZF09XCIhYXVkaW9Mb2FkZWRcIlxuICAgICAgKGNsaWNrKT1cIm9uUmVwbGF5Q2xpY2soKVwiXG4gICAgICBjbGFzcz1cInJlcGxheS1idG5cIlxuICAgID5cbiAgICAgIDxtYXQtaWNvbj5yZXBsYXk8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuICAgIHt7IHBsYXlQb3NpdGlvblN0cmluZyB9fVxuICAgIDxtYXQtc2xpZGVyXG4gICAgICBtaW49XCIwXCJcbiAgICAgIFttYXhdPVwiZHVyYXRpb25cIlxuICAgICAgc3RlcD1cIjFcIlxuICAgICAgWyhuZ01vZGVsKV09XCJwbGF5UG9zaXRpb25cIlxuICAgICAgW2Rpc2FibGVkXT1cIiFhdWRpb0xvYWRlZFwiXG4gICAgICAoaW5wdXQpPVwib25Qb3NpdGlvbkNoYW5nZUVuZCgkZXZlbnQpXCJcbiAgICAgIGNsYXNzPVwicGxheWluZ1NsaWRlclwiXG4gICAgPjwvbWF0LXNsaWRlcj5cbiAgICA8YnV0dG9uXG4gICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgIFtkaXNhYmxlZF09XCIhYXVkaW9Mb2FkZWRcIlxuICAgICAgKGNsaWNrKT1cIm9uVm9sdW1lTXV0aW5nVG9nZ2xlKClcIlxuICAgICAgY2xhc3M9XCJ2b2x1bWUtYnRuXCJcbiAgICA+XG4gICAgICA8bWF0LWljb24+e3sgaXNNdXRlZCA/ICd2b2x1bWVfb2ZmJyA6ICd2b2x1bWVfdXAnIH19PC9tYXQtaWNvbj5cbiAgICA8L2J1dHRvbj5cbiAgICA8bWF0LXNsaWRlclxuICAgICAgbWluPVwiMFwiXG4gICAgICBtYXg9XCIxXCJcbiAgICAgIHN0ZXA9XCIwLjFcIlxuICAgICAgWyhuZ01vZGVsKV09XCJ2b2x1bWVcIlxuICAgICAgW2Rpc2FibGVkXT1cIiFhdWRpb0xvYWRlZFwiXG4gICAgICAoaW5wdXQpPVwib25Wb2x1bWVDaGFuZ2VFbmQoJGV2ZW50KVwiXG4gICAgICBjbGFzcz1cInZvbHVtZVNsaWRlclwiXG4gICAgICBbY2xhc3MuZGlzYXBwZWFyXT1cImlzSU9TKCkgfHwgaXNNb2JpbGVcIlxuICAgID5cbiAgICA8L21hdC1zbGlkZXI+XG4gIDwvZGl2PlxuPC9uZy1jb250YWluZXI+XG5cbjxhdWRpb1xuICAjYXVkaW9wbGF5ZXJcbiAgKHRpbWV1cGRhdGUpPVwib25QbGF5ZXJUaW1lVXBkYXRlKClcIlxuICAoZW5kZWQpPVwib25QbGF5ZXJFbmRlZCgpXCJcbiAgKGxvYWRlZGRhdGEpPVwib25QbGF5ZXJSZWFkeSgpXCJcbiAgW3ZvbHVtZV09XCJ2b2x1bWVcIlxuICAoZXJyb3IpPVwib25QbGF5ZXJNZWRpYUVycm9yKClcIlxuICBbc3JjXT1cImF1ZGlvc3JjXCJcbj48L2F1ZGlvPlxuIl19
