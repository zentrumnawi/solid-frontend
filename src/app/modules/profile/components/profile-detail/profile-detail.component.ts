import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../shared/abstract/base.component';
import {MineralProfile, ProfileAppState} from '../../state/profile.model';
import {Store} from "@ngrx/store";
import {selectNonTreeProfile} from "../../state/selectors";
import {select} from "@ngrx/store";
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent extends BaseComponent implements OnInit {
  public get Profile(): MineralProfile | null {
    return this._profile ? this._profile : null;
  }

  @Input('profile')
  private _profile?: MineralProfile;

  @Input('profileId')
  private ProfileId?: number;

  constructor(
    private _store: Store<ProfileAppState>,
    private _service: ProfileService,
  ) {
    super();
  }

  public ngOnInit() {
      if (this.ProfileId) {
        this._service.loadProfile(this.ProfileId);
        this.addSub(this._store.pipe(select(selectNonTreeProfile, this.ProfileId)).subscribe(profile => {
          if (profile) {
            this._profile = profile;
          }
        }));
      }
    }
}
