import {BreakpointObserver} from '@angular/cdk/layout';
import {Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {BaseComponent} from '../../../../shared/abstract/base.component';
import {GalleryAppState, PhotographModel} from '../../state/gallery.model';
import {selectPhotograph, selectSurroundingPhotographs} from '../../state/selectors';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {GalleryService} from "../../services/gallery.service";

@Component({
  selector: 'gallery-photograph-detail-modal',
  templateUrl: './photograph-detail.component.html',
  styleUrls: ['./photograph-detail.component.scss'],
})
export class PhotographDetailComponent extends BaseComponent {
  public Entry: PhotographModel | null = null;
  public ImageLoaded = false;
  private _storeSub: Subscription | null = null;
  private _storeSub2: Subscription | null = null;
  public Surrounding: { before: number | null; after: number | null } = { before: null, after: null};

  constructor(
    service: GalleryService,
    store: Store<GalleryAppState>,
    breakpointObserver: BreakpointObserver,
    route: ActivatedRoute,
    private _router: Router,
  ) {
    super();
    service.loadGallery();
    this.addSub(route.params.subscribe(params => {
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
      }),
      breakpointObserver.observe(['(min-width: 600px)']).subscribe(matcher => {
        // TODO: update
        // this._dialogRef.updateSize(matcher.matches ? '80%' : '100%');
        // this._dialogRef.updatePosition();
      }),
    );
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
}
