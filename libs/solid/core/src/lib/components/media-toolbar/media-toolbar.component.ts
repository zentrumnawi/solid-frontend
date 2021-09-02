import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { MediaModel } from '../../models';
import { MatDialog } from '@angular/material/dialog';
import {
  CloseScrollStrategy,
  ConnectedPosition,
  ScrollDispatcher,
  ViewportRuler,
} from '@angular/cdk/overlay';
import { MediaDialogComponent } from '../media-dialog/media-dialog.component';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'solid-core-media-toolbar',
  templateUrl: './media-toolbar.component.html',
  styleUrls: ['./media-toolbar.component.scss'],
})
export class MediaToolbarComponent implements OnInit, OnChanges {
  @Input() public mediaObject!: MediaModel;
  @Input() public name!: string;
  @Input() hasAttributions!: boolean;
  @Input() hasDialog!: boolean;
  @Input() hasDziTools = false;
  @Input() hasAudio!: boolean;
  @Input() hasDescription!: boolean;
  @Input() hasDescriptionToggle!: boolean;
  @Input() data!: any;
  private length = 90;

  @Input() isAttributionsOverlayAbove!: boolean;
  attributionsPositions: ConnectedPosition[] = [];
  attributionsScrollStrategy: CloseScrollStrategy;
  descriptionScrollStrategy: CloseScrollStrategy;
  attributionsIsOpen = false;
  descriptionIsOpen = false;

  @Output() descriptionToggle = new EventEmitter<boolean>();
  descriptionToggled = false;

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

  ngOnChanges(): void {
    this.descriptionToggled = false;
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
    this._dialog.open(MediaDialogComponent, {
      maxWidth: this.length + 'vw',
      width: '100%',
      height: '100%',
      maxHeight: this.length + 'vh',
      panelClass: 'solid-core-media-dialog',
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

  toggleDescription() {
    this.descriptionToggled = !this.descriptionToggled;
    this.descriptionToggle.emit(this.descriptionToggled);
  }
}