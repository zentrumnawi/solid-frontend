import { Component, Input, ViewChild } from '@angular/core';
import { ImageModel, MediaModel } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import { MediaErrorDialogComponent } from '../media-error-dialog/media-error-dialog.component';

@Component({
  selector: 'solid-core-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss'],
})
export class ImageDetailComponent {
  @Input() image?: ImageModel;
  @Input() mediaObject?: MediaModel;
  @Input() hasDialog!: boolean;
  @Input() hasAttributions!: boolean;
  @Input() name!: string;
  @Input() view?: string;
  @Input() hasControlPanel!: boolean;
  @Input() hasAudio!: boolean;
  @Input() hasDescription!: boolean;
  @Input() isAudioAndVideo!: boolean;

  @ViewChild('videoplayer', { static: false }) videoplayer!: {
    nativeElement: HTMLVideoElement;
  };
  private loadError = false;
  public isShown!: number;

  constructor(private _dialog: MatDialog) {}

  public togglePlay() {
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

  public setInvisible() {
    this.isShown = 0;
  }
  public setVisible() {
    this.isShown = 1;
  }
  public onPlayerEnded() {
    if (this.videoplayer) {
      this.isShown = 1;
      this.videoplayer.nativeElement.currentTime = 0;
    }
  }
}
