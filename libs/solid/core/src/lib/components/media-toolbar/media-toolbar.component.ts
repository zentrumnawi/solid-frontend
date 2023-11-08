/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  @Input() openDialogRequest?: boolean;
  @Input() isToolbarInDialog = false;

  @Input() isOverlayAboveOfDziZoomToolbar!: boolean;
  @Input() isOverlayAboveOfNonDziZoomToolbar!: boolean;
  attributionsPositions: ConnectedPosition[] = [];
  attributionsScrollStrategy: CloseScrollStrategy;
  descriptionScrollStrategy: CloseScrollStrategy;
  attributionsIsOpen = false;
  descriptionIsOpen = false;
  dialogRef?: MatDialogRef<any>;

  @Output() descriptionToggle = new EventEmitter<boolean>();
  @Output() closeDialogEventEmitter = new EventEmitter();
  descriptionToggled = false;
  @Input() hasNavigationInDialog!: boolean;
  @Output() NextDialogEmitter = new EventEmitter();
  @Output() PrevDialogEmitter = new EventEmitter();
  isMobile = false;

  constructor(
    private _dialog: MatDialog,
    private scrollDispatcher: ScrollDispatcher,
    viewportRuler: ViewportRuler,
    private ngZone: NgZone,
    private _breakpointObserver: BreakpointObserver,
    @Inject(MEDIA_DIALOG_TOKEN)
    private matDialogComponent: ComponentType<MediaDialogComponent>,
  ) {
    this.attributionsScrollStrategy = new CloseScrollStrategy(
      scrollDispatcher,
      ngZone,
      viewportRuler,
    );
    this.descriptionScrollStrategy = new CloseScrollStrategy(
      scrollDispatcher,
      ngZone,
      viewportRuler,
    );
  }

  ngOnChanges(): void {
    this.descriptionToggled = false;
    this.attributionsIsOpen = false;
    if (this.openDialogRequest) {
      if (this.mediaObject) {
        this.openDialog();
      }
      if (this.image) {
        this.openDialogImage();
      }
    }
    if (
      this.dialogRef &&
      this.dialogRef.componentInstance &&
      this.mediaObject
    ) {
      this.dialogRef.componentInstance.data = {
        mediaObject: this.mediaObject,
        name: this.name,
        type: 'mediaObject',
        hasNavigationInDialog: this.hasNavigationInDialog,
      };
    }
    if (this.isOverlayAboveOfDziZoomToolbar) {
      this.attributionsPositions = [
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
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
    if (this.isOverlayAboveOfNonDziZoomToolbar) {
      this.attributionsPositions = [
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
        },
      ];
    }
  }

  ngOnInit(): void {
    this._breakpointObserver
      .observe(['(max-width: 440px)'])
      .subscribe((isMobile) => {
        if (isMobile.matches) {
          this.length = 100;
          this.isMobile = true;
          this.dialogRef?.updateSize('100%', '100%');
        } else {
          this.length = 90;
          this.isMobile = false;
          this.dialogRef?.updateSize('90%', '90%');
        }
      });
  }

  public openDialog() {
    if (this.mediaObject?.mediaType === 'image') {
      this.dialogRef = this._dialog.open(this.matDialogComponent, {
        maxWidth: '100vw',
        width: this.length + '%',
        height: this.length + '%',
        maxHeight: '100vh',
        panelClass: 'solid-core-media-dialog',
        data: {
          mediaObject: this.mediaObject,
          name: this.name,
          type: 'mediaObject',
          hasNavigationInDialog: this.hasNavigationInDialog,
        },
      });
      this.dialogRef.afterClosed().subscribe(() => {
        this.closeDialogEventEmitter.emit();
        if (this.dialogRef) {
          this.dialogRef.close();
        }
      });
      this.dialogRef.componentInstance.onNextEmitter.subscribe(() => {
        this.NextDialogEmitter.emit();
        this.openDialogRequest = false;
      });
      this.dialogRef.componentInstance.onPrevEmitter.subscribe(() => {
        this.PrevDialogEmitter.emit();
        this.openDialogRequest = false;
      });
    }
  }

  public openDialogImage() {
    this.dialogRef = this._dialog.open(this.matDialogComponent, {
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
    this.dialogRef.afterClosed().subscribe(() => {
      this.closeDialogEventEmitter.emit();
      if (this.dialogRef) {
        this.dialogRef.close();
      }
    });
  }

  attributionsOpenClose() {
    this.attributionsIsOpen = !this.attributionsIsOpen;
    this.descriptionIsOpen = false;
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
    this.attributionsIsOpen = false;
  }

  toggleDescription() {
    this.descriptionToggled = !this.descriptionToggled;
    this.descriptionToggle.emit(this.descriptionToggled);
  }
}
