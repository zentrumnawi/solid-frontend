import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {SharedModule} from '../../shared/shared.module';
import {GalleryOverviewComponent} from './components/gallery-overview/gallery-overview.component';
import {PhotographDetailModalComponent} from './components/photograph-detail-modal/photograph-detail-modal.component';

import {GalleryRoutingModule} from './gallery-routing.module';
import {PhotographService} from './services/photograph.service';
import {galleryReducer} from './state/gallery.reducer';

@NgModule({
  declarations: [GalleryOverviewComponent, PhotographDetailModalComponent],
  imports: [
    SharedModule,
    GalleryRoutingModule,
    StoreModule.forFeature('gallery', galleryReducer),
  ],
  providers: [
    PhotographService,
  ],
  entryComponents: [PhotographDetailModalComponent],
})
export class GalleryModule {
}
