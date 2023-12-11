import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  Input,
  Inject,
  ViewChild,
  OnDestroy,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '../../solid-core-config';
import { MediaErrorDialogComponent } from '../media-error-dialog/media-error-dialog.component';

@Component({
  selector: 'solid-core-audio-toolbar',
  templateUrl: './audio-toolbar.component.html',
  styleUrls: ['./audio-toolbar.component.scss'],
})
export class AudioToolbarComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public audiosrc!: string;
  @Input() public description!: string;
  @Input() public toolbar!: boolean;
  @ViewChild('audioplayer', { static: false }) player?: {
    nativeElement: HTMLAudioElement;
  };
  public audioLoaded = false;
  public playing = false;
  public playingStarted = false;
  public playPositionString = '0:00/-:--';
  public playPosition = 0;
  public duration = 0;
  public volume = 1;
  public previousVolume = 0;
  public isMuted = false;
  public isMobile = false;
  @Input() public playAudio = false;
  @Output() audioErrorEventEmitter = new EventEmitter();
  @Output() audioEndedEventEmitter = new EventEmitter();

  constructor(
    @Inject(SOLID_CORE_CONFIG) public coreConfig: SolidCoreConfig,
    private _dialog: MatDialog,
    private _breakpointObsever: BreakpointObserver,
  ) {}

  ngOnInit(): void {
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

  isIOS(): boolean {
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

  onPlayerReady(): void {
    if (this.player) {
      this.audioLoaded = true;
      this.duration = this.player.nativeElement.duration;
      this.playPosition = 0;
      this.displayPlayPosition(0);
    }
  }

  public onPlayPauseClick() {
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

  public onReplayClick() {
    if (this.player) {
      this.player.nativeElement.pause();
      this.player.nativeElement.currentTime = 0;
      this.player.nativeElement.play();
      this.playing = true;
    }
  }

  public onPlayerTimeUpdate() {
    if (this.player) {
      this.displayPlayPosition(this.player.nativeElement.currentTime);
    }
  }

  public displayPlayPosition(currentTime: number) {
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

  public onPositionChangeEnd(value: number) {
    if (this.player) {
      this.player.nativeElement.currentTime = value;
    }
  }

  public onVolumeChangeEnd(value: number) {
    if (this.player) {
      this.isMuted = false;
      this.player.nativeElement.volume = value;
      this.volume = value;
      if (value === 0) {
        this.isMuted = true;
      }
    }
  }

  public onVolumeMutingToggle() {
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

  public onPlayerMediaError() {
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

  public onPlayerEnded() {
    if (this.player) {
      this.audioEndedEventEmitter.emit();
      this.playingStarted = false;
      this.playing = false;
      this.player.nativeElement.currentTime = 0;
    }
  }

  ngOnChanges(): void {
    if (this.playingStarted && this.player) {
      this.playing = false;
      this.audioLoaded = false;
      this.playPositionString = '0:00/-:--';
      this.playPosition = 0;
    }
    if (this.playAudio) this.onPlayPauseClick();
  }

  ngOnDestroy(): void {
    if (this.playingStarted && this.player) {
      this.player.nativeElement.pause();
    }
  }
}
