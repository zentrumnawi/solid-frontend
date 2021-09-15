import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  Input,
  Inject,
  ViewChild,
  OnDestroy,
  OnChanges,
  OnInit,
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
  public descriptionToggle = false;
  public isMuted = false;
  public isMobile = false;

  constructor(
    @Inject(SOLID_CORE_CONFIG) public coreConfig: SolidCoreConfig,
    private _dialog: MatDialog,
    private _breakpointObsever: BreakpointObserver
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

  onPlayerReady(): void {
    if (this.player) {
      this.audioLoaded = true;
      this.duration = this.player.nativeElement.duration;
      this.playPosition = 0;
      this.displayPlayPosition(0);
    }
  }

  public onPlayPauseClick() {
    // where does this belong? This should be done somewhere else.
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

  // shouldn't we work with EventEmitter<> somehow? It works, though.
  onPositionChangeEnd(change: any) {
    if (this.player) {
      this.player.nativeElement.currentTime = change.value;
    }
  }
  // same here
  public onVolumeChangeEnd(change: any) {
    if (this.player) {
      this.isMuted = false;
      this.player.nativeElement.volume = change.value;
      this.volume = change.value;
    }
  }

  public onVolumeMutingToggle() {
    if (this.player) {
      this.isMuted = !this.isMuted;
      if (this.isMuted) {
        this.player.nativeElement.volume = 0;
        this.previousVolume = this.volume;
        this.volume = 0;
      } else {
        this.player.nativeElement.volume = this.previousVolume;
        this.volume = this.previousVolume;
      }
    }
  }

  public onPlayerMediaError() {
    this.audioLoaded = false;
    this._dialog.open(MediaErrorDialogComponent, {
      data: {
        title: 'Fehler',
        content: 'Audiodatei konnte nicht geladen werden.',
      },
    });
    return;
  }

  public onPlayerEnded() {
    if (this.player) {
      this.playingStarted = false;
      this.playing = false;
      this.player.nativeElement.currentTime = 0;
    }
  }

  public toggleDescription() {
    this.descriptionToggle = !this.descriptionToggle;
  }

  ngOnChanges(): void {
    if (this.playingStarted && this.player) {
      this.playing = false;
    }
  }

  ngOnDestroy(): void {
    if (this.playingStarted && this.player) {
      this.player.nativeElement.pause();
    }
  }
}
