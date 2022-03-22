import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
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
  audioStarted = false;
  audioLoadError = false;
  audioEnded = false;
  expandUpDown = false;
  audioCollapsed = false;
  dziInitialized = false;
  public onNextEmitter = new EventEmitter();
  public onPrevEmitter = new EventEmitter();
  @ViewChild('title_container', { static: false })
  public title_container?: ElementRef;
  title_container_width = 0;
  title_width = 0;
  public firstMovingAnimation = true;
  public timeOut_1: any;
  public timeOut_2: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public name: string,
    @Inject(SOLID_CORE_CONFIG) public coreConfig: SolidCoreConfig,
    private _breakpointObserver: BreakpointObserver
  ) {}

  public ngOnInit() {
    this._breakpointObserver
      .observe(['(max-width: 680px)'])
      .subscribe((isMobile) => {
        if (isMobile.matches) {
          this.isOverlayAbove = true;
        } else {
          this.isOverlayAbove = false;
        }
      });
    this._breakpointObserver
      .observe(['(max-width: 680px)'])
      .subscribe((expandUpDown) => {
        if (expandUpDown.matches) {
          this.expandUpDown = true;
        } else {
          this.expandUpDown = false;
        }
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.data.type === 'mediaObject') {
        let dzi = this.data.mediaObject.deepZoomLink;
        if (this.dziInitialized) {
          this._viewer?.open(dzi);
        } else {
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
        }
        if (this.data.mediaObject.audiosrc) {
          this.hasAudio = true;
        } else {
          this.hasAudio = false;
        }
        if (this.data.mediaObject.description) {
          this.hasDescription = true;
        } else {
          this.hasDescription = false;
        }
        if (this.data.mediaObject.deepZoomLink) {
          this.dziInitialized = true;
        } else {
          this.dziInitialized = false;
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
        } else {
          this.hasAudio = false;
        }
        if (this.data.image.description) {
          this.hasDescription = true;
        } else {
          this.hasDescription = false;
        }
      }
    }, 0);
    this.handleLongTitle();
  }

  public handleLongTitle() {
    clearTimeout(this.timeOut_1);
    clearTimeout(this.timeOut_2);
    this.timeOut_1 = setTimeout(() => {
      this.firstMovingAnimation = true;
      this.title_container_width =
        this.title_container?.nativeElement.offsetWidth;
      this.title_width =
        this.title_container?.nativeElement.firstChild.offsetWidth;
      if (this.title_container?.nativeElement.firstChild) {
        this.timeOut_2 = setTimeout(() => {
          this.firstMovingAnimation = false;
        }, 10500);
      }
    }, 0);
  }

  @HostListener('window:resize', ['$event'])
  public onResize() {
    this.handleLongTitle();
  }

  handleAudioErrorEvent() {
    this.audioLoadError = true;
  }
  handleAudioEndedEvent() {
    this.audioStarted = false;
    this.audioCollapsed = false;
    this.audioEnded = true;
  }

  onNext() {
    this.onNextEmitter.emit();
    this.audioLoadError = false;
    this.audioStarted = false;
    this.audioCollapsed = false;
    this.firstMovingAnimation = false;
    this.ngAfterViewInit();
  }

  onPrev() {
    this.onPrevEmitter.emit();
    this.audioLoadError = false;
    this.audioStarted = false;
    this.audioCollapsed = false;
    this.firstMovingAnimation = false;
    this.ngAfterViewInit();
  }

  onPlayClick() {
    this.audioEnded = false;
    this.audioStarted = true;
  }

  onExpandCollapse() {
    this.audioCollapsed = !this.audioCollapsed;
  }

  ngOnDestroy(): void {
    if (this._viewer) {
      this._viewer.destroy();
    }
  }
}
