import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {ProfileTreeComponent} from './components/profile-tree/profile-tree.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileService} from './services/profile.service';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import {GalleryOverviewComponent} from "./components/gallery-overview/gallery-overview.component";
import {PhotographDetailComponent} from "./components/photograph-detail/photograph-detail.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MediaErrorDialogComponent} from "./components/media-error-dialog/media-error-dialog.component";
import {NgxsModule} from "@ngxs/store";
import {ProfileState} from "./state/profile.state";
import {GalleryState} from "./state/gallery.state";
import {GalleryService} from "./services/gallery.service";

@NgModule({
  declarations: [
    ProfileTreeComponent,
    ProfileDetailComponent,
    GalleryOverviewComponent,
    PhotographDetailComponent,
    MediaErrorDialogComponent,
  ],
  entryComponents: [
    MediaErrorDialogComponent,
  ],
  imports: [
    SharedModule,
    MatTabsModule,
    ProfileRoutingModule,
    NgxsModule.forFeature([
      ProfileState,
      GalleryState,
    ])
  ],
  providers: [
    ProfileService,
    GalleryService
  ],
})
export class ProfileModule {
}
