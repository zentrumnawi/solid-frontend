import {
  Component,
  Input,
  Inject,
  ViewChild,
  OnDestroy,
  NgZone,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '../../solid-core-config';
import { MediaErrorDialogComponent } from '../media-error-dialog/media-error-dialog.component';
import {
  CloseScrollStrategy,
  ConnectedPosition,
  ScrollDispatcher,
  ViewportRuler,
} from '@angular/cdk/overlay';

@Component({
  selector: 'solid-core-audio-toolbar',
  templateUrl: './audio-toolbar.component.html',
  styleUrls: ['./audio-toolbar.component.scss'],
})
export class AudioToolbarComponent implements OnDestroy {
  @Input() public audiosrc!: string;
  @Input() public description!: string;
  @ViewChild('audioplayer', { static: false }) player?: {
    nativeElement: HTMLAudioElement;
  };
  public Playing = false;
  public PlayingStarted = false;
  public PlayPosition = '';
  private loadError = false;
  public descriptionToggle = false;

  attributionsPositions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
    },
  ];
  attributionsScrollStrategy: CloseScrollStrategy;
  attributionsIsOpen = false;

  constructor(
    @Inject(SOLID_CORE_CONFIG) public coreConfig: SolidCoreConfig,
    private _dialog: MatDialog,
    scrollDispatcher: ScrollDispatcher,
    viewportRuler: ViewportRuler,
    zone: NgZone
  ) {
    this.attributionsScrollStrategy = new CloseScrollStrategy(
      scrollDispatcher,
      zone,
      viewportRuler
    );
  }

  public onPlayPauseClick() {
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

  public toggleDescription() {
    this.descriptionToggle = !this.descriptionToggle;
  }

  // attributionsOpenClose() {
  //   if (this.player) {
  //     if (this.player.nativeElement.currentTime === 0) {
  //       this.attributionsIsOpen = !this.attributionsIsOpen;
  //     }
  //   }
  // }

  ngOnDestroy(): void {
    if (this.PlayingStarted && this.player) {
      this.player.nativeElement.pause();
    }
  }
}
