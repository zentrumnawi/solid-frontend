import {InjectionToken, NgModule} from '@angular/core';
import {ActionReducerMap, StoreModule} from '@ngrx/store';
import {SharedModule} from '../../shared/shared.module';
import {AppState} from '../../state/app.model';
import {ProfileTreeComponent} from './components/profile-tree/profile-tree.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileService} from './services/profile.service';
import {profileReducer} from './state/profile.reducer';

export const PROFILE_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('Profile reducer');

export function getReducers() {
  return profileReducer;
}


@NgModule({
  declarations: [
    ProfileTreeComponent,
  ],
  imports: [
    SharedModule,
    ProfileRoutingModule,
    StoreModule.forFeature('profile', PROFILE_REDUCER_TOKEN),
  ],
  providers: [
    ProfileService,
    {
      provide: PROFILE_REDUCER_TOKEN,
      useFactory: getReducers,
    },
  ],
})
export class ProfileModule {
}
