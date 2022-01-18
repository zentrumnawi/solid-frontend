import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '../../solid-core-config';
import { Viewer } from 'openseadragon';
import OpenSeadragon from 'openseadragon';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'solid-core-media-dialog',
  templateUrl: './media-dialog.component.html',
  styleUrls: ['./media-dialog.component.scss'],
})
export class MediaDialogComponent implements AfterViewInit, OnDestroy, OnInit {
  private _viewer: Viewer | null = null;
  public hasAudio = false;
  public hasDescription = false;
  isOverlayAbove = false;
  audioPlayBtnClicked = false;
  audioLoadError = false;
  audioEnded = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public name: string,
    @Inject(SOLID_CORE_CONFIG) public coreConfig: SolidCoreConfig,
    private _breakpointObserver: BreakpointObserver
  ) {}

  public ngOnInit() {
    this._breakpointObserver
      .observe(['(max-width: 440px)'])
      .subscribe((isMobile) => {
        if (isMobile.matches) {
          this.isOverlayAbove = true;
        }
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.data.type === 'mediaObject') {
        let dzi = this.data.mediaObject.deepZoomLink;

        if (dzi) {
          if (!this.coreConfig.production) {
            // TODO: This workaround is required for deepzoom in dev environments. It will not work with other cdn domains.
            dzi = dzi.replace('https://cdn.geomat.uni-frankfurt.de', '');
          }
          this._viewer = OpenSeadragon({
            id: 'dzi-container',
            tileSources: dzi,
            zoomInButton: 'zoom-in-button',
            zoomOutButton: 'zoom-out-button',
            homeButton: 'home-button',
            showFullPageControl: false,
            visibilityRatio: 1.0,
            constrainDuringPan: true,
          });
        }
        if (this.data.mediaObject.audiosrc) {
          this.hasAudio = true;
        }
        if (this.data.mediaObject.description) {
          this.hasDescription = true;
        }
      } else {
        let dzi = this.data.image.deepZoomLink;

        if (dzi) {
          if (!this.coreConfig.production) {
            // TODO: This workaround is required for deepzoom in dev environments. It will not work with other cdn domains.
            dzi = dzi.replace('https://cdn.geomat.uni-frankfurt.de', '');
          }
          this._viewer = OpenSeadragon({
            id: 'dzi-container',
            tileSources: dzi,
            zoomInButton: 'zoom-in-button',
            zoomOutButton: 'zoom-out-button',
            homeButton: 'home-button',
            showFullPageControl: false,
            visibilityRatio: 1.0,
            constrainDuringPan: true,
          });
        }
        if (this.data.image.audiosrc) {
          this.hasAudio = true;
        }
        if (this.data.image.description) {
          this.hasDescription = true;
        }
      }
    }, 0);
  }

  handleAudioErrorEvent(event: any) {
    if (event) {
      this.audioLoadError = true;
    }
  }
  handleAudioEndedEvent(event: any) {
    if (event) {
      this.audioEnded = true;
      setTimeout(() => (this.audioPlayBtnClicked = false), 460);
    }
  }

  onPlayClick() {
    this.audioEnded = false;
    this.audioPlayBtnClicked = true;
  }

  ngOnDestroy(): void {
    if (this._viewer) {
      this._viewer.destroy();
    }
  }
}
