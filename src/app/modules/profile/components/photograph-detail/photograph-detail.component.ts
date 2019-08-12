import {BreakpointObserver} from '@angular/cdk/layout';
import {Component, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {BaseComponent} from '../../../../shared/abstract/base.component';
import {GalleryAppState, PhotographModel} from '../../state/gallery.model';
import {selectPhotograph, selectSurroundingPhotographs} from '../../state/selectors';
import {ActivatedRoute, ResolveEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {GalleryService} from "../../services/gallery.service";
import {MatDialog} from "@angular/material";
import {MediaErrorDialogComponent} from "../media-error-dialog/media-error-dialog.component";

@Component({
  selector: 'gallery-photograph-detail-modal',
  templateUrl: './photograph-detail.component.html',
  styleUrls: ['./photograph-detail.component.scss'],
})
export class PhotographDetailComponent extends BaseComponent {
  @ViewChild('audioplayer') player!: { nativeElement: HTMLAudioElement };
  public Playing = false;
  public PlayingStarted = false;
  public PlayPosition = '';
  public Entry: PhotographModel | null = null;
  public ImageLoaded = false;
  private _storeSub: Subscription | null = null;
  private _storeSub2: Subscription | null = null;
  public Surrounding: { before: number | null; after: number | null } = {before: null, after: null};

  constructor(
    service: GalleryService,
    store: Store<GalleryAppState>,
    breakpointObserver: BreakpointObserver,
    route: ActivatedRoute,
    private _router: Router,
    private _dialog: MatDialog,
  ) {
    super();
    service.loadGallery();
    route.params.subscribe(params => {
      const entryId = parseInt(params.id, 10);
      if (this._storeSub) {
        this._storeSub.unsubscribe();
      }
      this._storeSub = store.pipe(select(selectPhotograph, entryId)).subscribe(photograph => {
        this.Entry = photograph;
      });
      if (this._storeSub2) {
        this._storeSub2.unsubscribe();
      }
      this._storeSub2 = store.pipe(select(selectSurroundingPhotographs, entryId)).subscribe(surrounding => {
        this.Surrounding = surrounding;
      })
    });
    this.addOnDestroy(() => {
      if (this.PlayingStarted && this.Entry && this.Entry.audio_file) {
        this.player.nativeElement.pause();
      }
    })
  }

  public imageLoaded() {
    this.ImageLoaded = true;
  }

  public onCloseClick() {
    this._router.navigateByUrl('/profile/img');
  }

  public onPrevClick() {
    this._router.navigateByUrl(`/profile/img/${this.Surrounding.before}`);
  }

  public onNextClick() {
    this._router.navigateByUrl(`/profile/img/${this.Surrounding.after}`);
  }

  public onPanEnd($event: any) {
    if ($event.deltaX > 100 && this.Surrounding.before) {
      this.onPrevClick();
    } else if ($event.deltaX < -100 && this.Surrounding.after) {
      this.onNextClick();
    }
  }

  public onPlayPauseClick() {
    if (this.Playing) {
      this.player.nativeElement.pause();
    } else {
      this.PlayingStarted = true;
      this.player.nativeElement.play();
    }
    this.Playing = !this.Playing;
  }

  public onReplayClick() {
    this.player.nativeElement.pause();
    this.player.nativeElement.currentTime = 0;
    this.player.nativeElement.play();
    this.Playing = true;
  }

  private onPlayerTimeUpdate() {
    const duration = this.player.nativeElement.duration;
    const currentTime = this.player.nativeElement.currentTime;
    const durationSeconds = Math.floor(duration % 60);
    const currentTimeSeconds = Math.floor(currentTime % 60);
    if (currentTime > 0) {
      this.PlayPosition = `${Math.floor(currentTime / 60)}:${currentTimeSeconds < 10 ? '0' + currentTimeSeconds : currentTimeSeconds}/${Math.floor(duration / 60)}:${durationSeconds < 10 ? '0' + durationSeconds : durationSeconds}`
    } else {
      this.PlayPosition = '';
    }
  }

  private onPlayerWaiting() {
    this._dialog.open(MediaErrorDialogComponent, {
      data: {
        title: 'Fehler',
        content: 'Audiodatei konnte nicht geladen werden.'
      }
    });
    this.onPlayPauseClick();
    this.Entry!.audio_file = null;
  }

  private onPlayerEnded() {
    this.PlayingStarted = false;
    this.Playing = false;
    this.player.nativeElement.currentTime = 0;
  }
}
