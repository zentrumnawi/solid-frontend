import {InjectionToken, NgModule} from '@angular/core';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {SharedModule} from '../../shared/shared.module';
import {AppState} from '../../state/app.model';
import {ProfileTreeComponent} from './components/profile-tree/profile-tree.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileService} from './services/profile.service';
import {profileReducer} from './state/profile.reducer';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import {galleryReducer} from "./state/gallery.reducer";
import {GalleryOverviewComponent} from "./components/gallery-overview/gallery-overview.component";
import {PhotographDetailComponent} from "./components/photograph-detail/photograph-detail.component";
import {GalleryService} from "./services/gallery.service";

export const PROFILE_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('Profile reducer');
export const GALLERY_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('Gallery reducer');

export function getReducers() {
  return profileReducer;
}

export function getReducersGallery() {
  return galleryReducer;
}


@NgModule({
  declarations: [
    ProfileTreeComponent,
    ProfileDetailComponent,
    GalleryOverviewComponent,
    PhotographDetailComponent,
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule,
    StoreModule.forFeature('profile', PROFILE_REDUCER_TOKEN),
    StoreModule.forFeature('gallery', GALLERY_REDUCER_TOKEN),
  ],
  providers: [
    ProfileService,
    {
      provide: PROFILE_REDUCER_TOKEN,
      useFactory: getReducers,
    },
    GalleryService,
    {
      provide: GALLERY_REDUCER_TOKEN,
      useFactory: getReducersGallery,
    },
  ],
})
export class ProfileModule {
}
