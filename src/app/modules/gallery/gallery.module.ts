import {InjectionToken, NgModule} from '@angular/core';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {SharedModule} from '../../shared/shared.module';
import {AppState} from '../../state/app.model';
import {GalleryOverviewComponent} from './components/gallery-overview/gallery-overview.component';
import {PhotographDetailModalComponent} from './components/photograph-detail-modal/photograph-detail-modal.component';

import {GalleryRoutingModule} from './gallery-routing.module';
import {PhotographService} from './services/photograph.service';
import {galleryReducer} from './state/gallery.reducer';

export const GALLERY_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('Gallery reducer');

export function getReducers() {
  return galleryReducer;
}

@NgModule({
  declarations: [GalleryOverviewComponent, PhotographDetailModalComponent],
  imports: [
    SharedModule,
    GalleryRoutingModule,
    StoreModule.forFeature('gallery', GALLERY_REDUCER_TOKEN),
  ],
  providers: [
    PhotographService,
    {
      provide: GALLERY_REDUCER_TOKEN,
      useFactory: getReducers,
    },
  ],
  entryComponents: [PhotographDetailModalComponent],
})
export class GalleryModule {
}
