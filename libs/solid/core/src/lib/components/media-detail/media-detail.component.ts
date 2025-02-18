import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { ImageModel, MediaModel } from '../../models';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MediaErrorDialogComponent } from '../media-error-dialog/media-error-dialog.component';

@Component({
  selector: 'solid-core-media-detail',
  templateUrl: './media-detail.component.html',
  styleUrls: ['./media-detail.component.scss'],
})
export class MediaDetailComponent implements OnChanges {
  @Input() image?: ImageModel;
  @Input() mediaObject?: MediaModel;
  @Input() hasDialog!: boolean;
  @Input() hasAttributions!: boolean;
  @Input() name!: string;
  @Input() view?: string;
  @Input() hasControlPanel!: boolean;
  @Input() hasAudio!: boolean;
  @Input() hasDescription!: boolean;
  @Input() hasDescriptionToggle!: boolean;
  @Input() slideshowPageChanged!: number;
  @Input() hasNavigationInDialog!: boolean;
  openDialogRequest?: boolean;

  @ViewChild('videoplayer', { static: false }) videoplayer!: {
    nativeElement: HTMLVideoElement;
  };
  private loadError = false;
  public playButtonIsShown!: number;
  public descriptionShow = false;

  @Output() NextDialogEmitter = new EventEmitter();
  @Output() PrevDialogEmitter = new EventEmitter();

  constructor(private _dialog: MatDialog) {}

  ngOnChanges(): void {
    this.descriptionShow = false;
  }

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
    this.playButtonIsShown = 0;
  }
  public setVisible() {
    this.playButtonIsShown = 1;
  }
  public onPlayerEnded() {
    if (this.videoplayer) {
      this.playButtonIsShown = 1;
      this.videoplayer.nativeElement.currentTime = 0;
    }
  }

  public toggleDescription(descriptionToggle: boolean) {
    descriptionToggle
      ? (this.descriptionShow = true)
      : (this.descriptionShow = false);
  }

  public handleOpenDialogClick() {
    this.openDialogRequest = true;
  }

  handleCloseDialogEvent() {
    this.openDialogRequest = false;
  }
}
