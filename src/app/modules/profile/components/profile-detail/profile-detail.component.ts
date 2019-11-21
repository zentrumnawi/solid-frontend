import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../../../shared/abstract/base.component';
import {MineralProfile, ProfileCategory} from '../../state/profile.model';
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
  public Category: ProfileCategory | null = null;
  public Profile: MineralProfile | null = null;

  @Input('profileId')
  private ProfileId?: number;

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
          console.log(profile);
          if (profile) {
            this.Category = profile.category;
            this.Profile = profile.profile;
          }
        }));
      }
    }
}
