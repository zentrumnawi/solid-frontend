import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ProfileTreeComponent } from './components/profile-tree/profile-tree.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileService } from './services/profile.service';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import { GalleryOverviewComponent } from './components/gallery-overview/gallery-overview.component';
import { PhotographDetailComponent } from './components/photograph-detail/photograph-detail.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MediaErrorDialogComponent } from './components/media-error-dialog/media-error-dialog.component';
import { NgxsModule } from '@ngxs/store';
import { ProfileState } from './state/profile.state';
import { GalleryState } from './state/gallery.state';
import { GalleryService } from './services/gallery.service';
import { ProfileListComponent } from './components/profile-list/profile-list.component';
import { ProfileBaseComponent } from './components/profile-base/profile-base.component';
import { ProfileGridComponent } from './components/profile-grid/profile-grid.component';
import { SolidCoreModule } from '@zentrumnawi/solid/core';


@NgModule({
  declarations: [
    ProfileTreeComponent,
    ProfileListComponent,
    ProfileDetailComponent,
    GalleryOverviewComponent,
    PhotographDetailComponent,
    MediaErrorDialogComponent,
    ProfileBaseComponent,
    ProfileGridComponent,
  ],
  imports: [
    SharedModule,
    MatTabsModule,
    SolidCoreModule,
    ProfileRoutingModule,
    NgxsModule.forFeature([
      ProfileState,
      GalleryState
    ])
  ],
  providers: [
    ProfileService,
    GalleryService
  ],
})
export class ProfileModule {
}
