import { Component, Input, NgZone, OnInit } from '@angular/core';
import { MediaModel } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import {
  CloseScrollStrategy,
  ConnectedPosition,
  ScrollDispatcher,
  ViewportRuler,
} from '@angular/cdk/overlay';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'solid-core-image-toolbar',
  templateUrl: './image-toolbar.component.html',
  styleUrls: ['./image-toolbar.component.scss'],
})
export class ImageToolbarComponent implements OnInit {
  @Input() public mediaObject!: MediaModel;
  @Input() public name!: string;
  @Input() hasAttributions!: boolean;
  @Input() hasDialog!: boolean;
  @Input() hasDziTools = false;
  @Input() hasAudio!: boolean;
  @Input() hasDescription!: boolean;
  @Input() data!: any;
  private length = 90;

  attributionsPositions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
    },
  ];
  attributionsScrollStrategy: CloseScrollStrategy;
  descriptionScrollStrategy: CloseScrollStrategy;
  attributionsIsOpen = false;
  descriptionIsOpen = false;

  constructor(
    private _dialog: MatDialog,
    scrollDispatcher: ScrollDispatcher,
    viewportRuler: ViewportRuler,
    zone: NgZone,
    private _breakpointObserver: BreakpointObserver
  ) {
    this.attributionsScrollStrategy = new CloseScrollStrategy(
      scrollDispatcher,
      zone,
      viewportRuler
    );
    this.descriptionScrollStrategy = new CloseScrollStrategy(
      scrollDispatcher,
      zone,
      viewportRuler
    );
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
    console.log(this.hasDialog);
  }

  public openDialog() {
    this._dialog.open(ImageDialogComponent, {
      maxWidth: this.length + 'vw',
      width: '100%',
      height: '100%',
      maxHeight: this.length + 'vh',
      panelClass: 'solid-core-image-dialog',
      data: {
        mediaObject: this.mediaObject,
        name: this.name,
      },
    });
  }

  attributionsOpenClose() {
    this.attributionsIsOpen = !this.attributionsIsOpen;
  }

  descriptionOpenClose() {
    this.descriptionIsOpen = !this.descriptionIsOpen;
  }
}
