import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '../../solid-core-config';
import { Viewer } from 'openseadragon';
import OpenSeadragon from 'openseadragon';

@Component({
  selector: 'solid-core-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
})
export class ImageDialogComponent implements AfterViewInit, OnDestroy {
  private _viewer: Viewer | null = null;
  public hasAudio = false;

  constructor(
    private _dialogRef: MatDialogRef<ImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(SOLID_CORE_CONFIG) public coreConfig: SolidCoreConfig
  ) {}

  ngAfterViewInit(): void {
    let dzi = this.data.image.deepZoomLink;
    let audio = this.data.image.audiosrc;
    console.log(dzi);
    console.log(audio);
    if (dzi) {
      if (!this.coreConfig.production) {
        // TODO: This workaround is required for deepzoom in dev environments. It will not work with other cdn domains.
        dzi = dzi.replace('https://cdn.geomat.uni-frankfurt.de', '');
      }
      console.log(dzi);
      this._viewer = OpenSeadragon({
        id: 'dzi-container',
        tileSources: dzi,
        zoomInButton: 'zoom-in-button',
        zoomOutButton: 'zoom-out-button',
        homeButton: 'home-button',
        showFullPageControl: false,
      });
    }
    if (audio) {
      this.hasAudio = true;
      console.log(audio);
    }
  }

  ngOnDestroy(): void {
    if (this._viewer) {
      this._viewer.destroy();
    }
  }
}
