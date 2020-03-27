import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Image } from '../../state/profile.model';
const OpenSeadragon = require('openseadragon/build/openseadragon/openseadragon.js');

interface OpenSeadragonViewer {
  destroy: () => void;
}

@Component({
  selector: 'solid-profile-image-overlay',
  templateUrl: './image-overlay.component.html',
  styleUrls: ['./image-overlay.component.scss']
})
export class ImageOverlayComponent implements OnInit, OnDestroy {
  private _viewer: OpenSeadragonViewer | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public image: Image,
    private _ref: MatDialogRef<ImageOverlayComponent>,
  ) { }

  ngOnInit(): void {
    this._viewer = OpenSeadragon({
      id: 'seadragon-container',
      zoomInButton: 'zoom-in-button',
      zoomOutButton: 'zoom-out-button',
      homeButton: 'home-button',
      fullPageButton: 'fullscreen-button',
      prefixUrl: './assets/',
      tileSources: './assets/tiling-test.dzi'
    });
  }

  close() {
    this._ref.close();
  }

  ngOnDestroy(): void {
    if (this._viewer) {
      this._viewer.destroy();
    }
  }
}
