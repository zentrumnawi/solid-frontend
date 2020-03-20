import {BreakpointObserver} from '@angular/cdk/layout';
import {Component, HostListener, ViewChild} from '@angular/core';
import {BaseComponent} from '../../../../shared/abstract/base.component';
import {PhotographModel} from '../../state/gallery.model';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {MediaErrorDialogComponent} from "../media-error-dialog/media-error-dialog.component";
import {Store} from "@ngxs/store";
import {GalleryState} from "../../state/gallery.state";
import {map} from "rxjs/operators";
import {Navigate} from "@ngxs/router-plugin";
import {GalleryLoadAction} from "../../state/gallery.actions";

@Component({
  selector: 'gallery-photograph-detail-modal',
  templateUrl: './photograph-detail.component.html',
  styleUrls: ['./photograph-detail.component.scss'],
})
export class PhotographDetailComponent extends BaseComponent {
  @ViewChild('audioplayer', {static: false}) player?: { nativeElement: HTMLAudioElement };
  public Playing = false;
  public PlayingStarted = false;
  public PlayPosition = '';
  private loadError = false;
  public Entry: PhotographModel | null = null;
  public ImageLoaded = false;
  private _storeSub: Subscription | null = null;
  private _storeSub2: Subscription | null = null;
  public Surrounding: { before: number | null; after: number | null } = {before: null, after: null};

  constructor(
    private _store: Store,
    breakpointObserver: BreakpointObserver,
    route: ActivatedRoute,
    private _dialog: MatDialog,
  ) {
    super();
    this._store.dispatch(new GalleryLoadAction());
    this._store.select(v => v.router.state.params).subscribe(params => {
      const entryId = parseInt(params.id, 10);
      if (this._storeSub) {
        this._storeSub.unsubscribe();
      }
      this._storeSub = this._store.select(GalleryState.getGalleryEntry)
        .pipe(map(filter => filter(entryId)))
        .subscribe(photograph => {
          if (!photograph) {
            return;
          }
          this.Entry = Object.assign({}, photograph);
        });
      if (this._storeSub2) {
        this._storeSub2.unsubscribe();
      }
      this._storeSub2 = this._store.select(GalleryState.getSurroundingGalleryEntries)
        .pipe(map(filter => filter(entryId)))
          .subscribe(surrounding => {
        this.Surrounding = surrounding;
      })
    });
    this.addOnDestroy(() => {
      if (this.PlayingStarted && this.Entry && this.Entry.audio_file && this.player) {
        this.player.nativeElement.pause();
      }
    })
  }

  public imageLoaded() {
    this.ImageLoaded = true;
  }

  public onCloseClick() {
    this._store.dispatch(new Navigate(['/profile/img']));
  }

  public onPrevClick() {
    this._store.dispatch(new Navigate(['/profile/img/', this.Surrounding.before]));
  }

  public onNextClick() {
    this._store.dispatch(new Navigate(['/profile/img/', this.Surrounding.after]));
  }

  @HostListener('panend', ['$event'])
  public onPanEnd($event: any) {
    if ($event.deltaX > 100 && this.Surrounding.before) {
      this.onPrevClick();
    } else if ($event.deltaX < -100 && this.Surrounding.after) {
      this.onNextClick();
    }
  }

  public onPlayPauseClick() {
    if (this.loadError) {
      this._dialog.open(MediaErrorDialogComponent, {
        data: {
          title: 'Fehler',
          content: 'Audiodatei konnte nicht geladen werden.'
        }
      });
      this.Entry!.audio_file = null;
      return;
    }
    if (this.player) {
      if (this.Playing) {
        this.player.nativeElement.pause();
      } else {
        this.PlayingStarted = true;
        this.player.nativeElement.play();
      }
    }
    this.Playing = !this.Playing;
  }

  public onReplayClick() {
    if (this.player) {
      this.player.nativeElement.pause();
      this.player.nativeElement.currentTime = 0;
      this.player.nativeElement.play();
      this.Playing = true;
    }
  }

  private onPlayerTimeUpdate() {
    if (this.player) {
      const duration = this.player.nativeElement.duration;
      const currentTime = this.player.nativeElement.currentTime;
      const durationSeconds = Math.floor(duration % 60);
      const currentTimeSeconds = Math.floor(currentTime % 60);
      if (currentTime > 0) {
        this.PlayPosition = `${Math.floor(currentTime / 60)}:${currentTimeSeconds < 10 ? '0' + currentTimeSeconds : currentTimeSeconds}/${Math.floor(duration / 60)}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`;
        return;
      }
    }
    this.PlayPosition = '';
  }

  private onPlayerMediaError() {
    this.loadError = true;
  }

  private onPlayerEnded() {
    if (this.player) {
      this.PlayingStarted = false;
      this.Playing = false;
      this.player.nativeElement.currentTime = 0;
    }
  }
}
