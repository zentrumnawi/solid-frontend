import {
  Component,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { ImageModel, MediaModel } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import {
  CloseScrollStrategy,
  ComponentType,
  ConnectedPosition,
  ScrollDispatcher,
  ViewportRuler,
} from '@angular/cdk/overlay';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MEDIA_DIALOG_TOKEN } from '../../media-dialog-token';
import type { MediaDialogComponent } from '../media-dialog/media-dialog.component';

@Component({
  selector: 'solid-core-media-toolbar',
  templateUrl: './media-toolbar.component.html',
  styleUrls: ['./media-toolbar.component.scss'],
})
export class MediaToolbarComponent implements OnInit, OnChanges {
  @Input() public mediaObject?: MediaModel;
  @Input() public image?: ImageModel;
  @Input() public name!: string;
  @Input() hasAttributions!: boolean;
  @Input() hasDialog!: boolean;
  @Input() hasDziTools = false;
  @Input() hasAudio!: boolean;
  @Input() hasDescription!: boolean;
  @Input() hasDescriptionToggle!: boolean;
  @Input() data!: any;
  private length = 90;
  @Input() slideshowPageChanged!: number;
  @Input() dialogOpened!: boolean;
  @Input() isToolbarInDialog = false;

  @Input() isAttributionsOverlayAbove!: boolean;
  attributionsPositions: ConnectedPosition[] = [];
  attributionsScrollStrategy: CloseScrollStrategy;
  descriptionScrollStrategy: CloseScrollStrategy;
  attributionsIsOpen = false;
  descriptionIsOpen = false;

  @Output() descriptionToggle = new EventEmitter<boolean>();
  @Output() closeDialogEventEmitter = new EventEmitter<boolean>();
  descriptionToggled = false;
  // dialogRef: any;

  constructor(
    private _dialog: MatDialog,
    private scrollDispatcher: ScrollDispatcher,
    viewportRuler: ViewportRuler,
    private ngZone: NgZone,
    private _breakpointObserver: BreakpointObserver,
    @Inject(MEDIA_DIALOG_TOKEN)
    private matDialogComponent: ComponentType<MediaDialogComponent>
  ) {
    this.attributionsScrollStrategy = new CloseScrollStrategy(
      scrollDispatcher,
      ngZone,
      viewportRuler
    );
    this.descriptionScrollStrategy = new CloseScrollStrategy(
      scrollDispatcher,
      ngZone,
      viewportRuler
    );
  }

  ngOnChanges(): void {
    this.descriptionToggled = false;
    this.attributionsIsOpen = false;
    if (this.dialogOpened) {
      if (this.mediaObject) {
        this.openDialog();
      }
      if (this.image) {
        this.openDialogImage();
      }
    }
  }

  ngOnInit(): void {
    this._breakpointObserver
      .observe(['(max-width: 400px)'])
      .subscribe((isMobile) => {
        if (isMobile.matches) {
          this.length = 100;
        }
      });
    this._breakpointObserver
      .observe(['(min-width: 400px)'])
      .subscribe((isLarge) => {
        if (isLarge.matches) {
          this.length = 90;
        }
      });
    if (this.isAttributionsOverlayAbove) {
      this.attributionsPositions = [
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetX: 10,
        },
      ];
    } else {
      this.attributionsPositions = [
        {
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
        },
      ];
    }
  }

  public openDialog() {
    const dialogRef = this._dialog.open(this.matDialogComponent, {
      maxWidth: this.length + 'vw',
      width: '100%',
      height: '100%',
      maxHeight: this.length + 'vh',
      panelClass: 'solid-core-media-dialog',
      data: {
        mediaObject: this.mediaObject,
        name: this.name,
        type: 'mediaObject',
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.emitCloseDialogEvent();
      dialogRef.close();
    });
  }

  public openDialogImage() {
    const dialogRef = this._dialog.open(this.matDialogComponent, {
      maxWidth: this.length + 'vw',
      width: '100%',
      height: '100%',
      maxHeight: this.length + 'vh',
      panelClass: 'solid-core-media-dialog',
      data: {
        image: this.image,
        name: this.name,
        type: 'photograph',
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.emitCloseDialogEvent();
      dialogRef.close();
    });
  }

  attributionsOpenClose() {
    this.attributionsIsOpen = !this.attributionsIsOpen;
    if (this.attributionsIsOpen === true) {
      this.scrollDispatcher.scrolled().subscribe(() => {
        this.ngZone.run(() => {
          this.attributionsIsOpen = false;
        });
      });
    }
  }

  descriptionOpenClose() {
    this.descriptionIsOpen = !this.descriptionIsOpen;
  }

  toggleDescription() {
    this.descriptionToggled = !this.descriptionToggled;
    this.descriptionToggle.emit(this.descriptionToggled);
  }

  emitCloseDialogEvent() {
    this.closeDialogEventEmitter.emit(true);
  }
}
