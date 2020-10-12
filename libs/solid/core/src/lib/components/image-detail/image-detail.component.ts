import { Component, Input, NgZone } from '@angular/core';
import { ImageModel } from '../../models';
import {
  CloseScrollStrategy,
  ConnectedPosition,
  ScrollDispatcher,
  ViewportRuler,
} from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'solid-core-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss'],
})
export class ImageDetailComponent {
  @Input() image?: ImageModel;
  @Input() dialogDisabled = false;
  @Input() attributionsDisabled = false;

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

  public openDialog() {
    this._dialog.open(ImageDialogComponent, {
      width: '100%',
      height: 'auto',
      maxHeight: '100%',
      panelClass: 'solid-core-image-dialog',
      data: {
        image: this.image,
      },
    });
  }

  attributionsOpenClose() {
    this.attributionsIsOpen = !this.attributionsIsOpen;
  }
}
