import { Component, Input, NgZone } from '@angular/core';
import { ImageModel } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import {
  CloseScrollStrategy,
  ConnectedPosition,
  ScrollDispatcher,
  ViewportRuler,
} from '@angular/cdk/overlay';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'solid-core-image-toolbar',
  templateUrl: './image-toolbar.component.html',
  styleUrls: ['./image-toolbar.component.scss'],
})
export class ImageToolbarComponent {
  @Input() public image!: ImageModel;
  @Input() public name!: string;
  @Input() hasAttributions!: boolean;
  @Input() hasDialog!: boolean;
  @Input() hasDziTools = false;
  @Input() hasAudio!: boolean;
  @Input() hasDescription!: boolean;
  @Input() data!: any;

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
        name: this.name,
      },
    });
  }

  attributionsOpenClose() {
    this.attributionsIsOpen = !this.attributionsIsOpen;
  }
}
