import {
  Component,
  Input,
  Inject,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '../../solid-core-config';
import { MediaErrorDialogComponent } from '../media-error-dialog/media-error-dialog.component';

@Component({
  selector: 'solid-core-audio-toolbar',
  templateUrl: './audio-toolbar.component.html',
  styleUrls: ['./audio-toolbar.component.scss'],
})
export class AudioToolbarComponent implements AfterViewInit, OnDestroy {
  @Input() public audiosrc!: string;
  @ViewChild('audioplayer') player?: { nativeElement: HTMLAudioElement };
  public Playing = false;
  public PlayingStarted = false;
  public PlayPosition = '';
  private loadError = false;
  public hasAudio = false;

  constructor(
    @Inject(SOLID_CORE_CONFIG) public coreConfig: SolidCoreConfig,
    private _dialog: MatDialog
  ) {}
  public audio = this.audiosrc;

  ngAfterViewInit(): void {
    console.log('audio', this.audio);
    if (this.audio) {
      if (!this.coreConfig.production) {
        // TODO: This workaround is required for deepzoom in dev environments. It will not work with other cdn domains.
        this.audio = this.audio.replace(
          'https://cdn.geomat.uni-frankfurt.de',
          ''
        );
      }
      console.log('audio (CDN): ', this.audio);
      this.audio = 'assets/audio/audiotest.mp3';
      console.log('audio (Local): ', this.audio);
    }
  }

  public onPlayPauseClick() {
    console.log('Audio started');
    console.log('player', this.player);
    console.log('Playing', this.Playing);
    console.log('PlayingStarted', this.PlayingStarted);
    console.log('AudioSrc', this.audiosrc);
    if (this.loadError) {
      this._dialog.open(MediaErrorDialogComponent, {
        data: {
          title: 'Fehler',
          content: 'Audiodatei konnte nicht geladen werden.',
        },
      });
      return;
    }
    if (this.player) {
      if (this.Playing) {
        this.player.nativeElement.pause();
      } else {
        this.PlayingStarted = true;
        this.player.nativeElement.play();
      }
    }
    this.Playing = !this.Playing;
  }

  public onReplayClick() {
    if (this.player) {
      this.player.nativeElement.pause();
      this.player.nativeElement.currentTime = 0;
      this.player.nativeElement.play();
      this.Playing = true;
    }
  }

  public onPlayerTimeUpdate() {
    if (this.player) {
      const duration = this.player.nativeElement.duration;
      const currentTime = this.player.nativeElement.currentTime;
      const durationSeconds = Math.floor(duration % 60);
      const currentTimeSeconds = Math.floor(currentTime % 60);
      if (currentTime > 0) {
        this.PlayPosition = `${Math.floor(currentTime / 60)}:${
          currentTimeSeconds < 10
            ? '0' + currentTimeSeconds
            : currentTimeSeconds
        }/${Math.floor(duration / 60)}:${
          durationSeconds < 10 ? '0' + durationSeconds : durationSeconds
        }`;
        return;
      }
    }
    this.PlayPosition = '';
  }

  public onPlayerMediaError() {
    this.loadError = true;
  }

  public onPlayerEnded() {
    if (this.player) {
      this.PlayingStarted = false;
      this.Playing = false;
      this.player.nativeElement.currentTime = 0;
    }
  }

  ngOnDestroy(): void {
    if (this.PlayingStarted && this.hasAudio && this.player) {
      this.player.nativeElement.pause();
    }
  }
}
