import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApiHttpClient} from '../../../shared/abstract/api-http-client';
import {GallerySetAction} from '../state/gallery.actions';
import {GalleryAppState, PhotographModel} from '../state/gallery.model';

@Injectable()
export class PhotographService extends ApiHttpClient {
  constructor(
    private _store: Store<GalleryAppState>,
    httpClient: HttpClient,
  ) {
    super(httpClient, 'photograph');
  }

  public loadGallery(): void {
    this.list<PhotographModel>().subscribe(photographs => {
      this._store.dispatch(new GallerySetAction(photographs));
    });
  }

  public loadSmallImage(photographModel: PhotographModel) {
    // this._store.dispatch(new GalleryImageLoadState(photographModel.id, 'small', 'loading'));
    const sub = this._http.get(photographModel.image_file.small, {responseType: 'blob'}).subscribe(() => {
      // this._store.dispatch(new GalleryImageLoadState(photographModel.id, 'small', true));
      sub.unsubscribe();
    });
  }
}
