import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../shared/abstract/base.component';
import {MineralProfile} from '../../state/profile.model';
import {ProfileService} from "../../services/profile.service";
import {Store} from "@ngxs/store";
import {ProfileState} from "../../state/profile.state";
import {map} from "rxjs/operators";

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

  @Input() alwaysShowMineralName = false;

  constructor(
    private _store: Store,
    private _service: ProfileService,
  ) {
    super();
  }

  public ngOnInit() {
      if (this.ProfileId) {
        this._service.loadProfiles();
        this.addSub(this._store.select(ProfileState.selectProfile).pipe(map(f => f(this.ProfileId!))).subscribe(profile => {
          if (profile) {
            this._profile = profile.profile;
          }
        }));
      }
    }
}
