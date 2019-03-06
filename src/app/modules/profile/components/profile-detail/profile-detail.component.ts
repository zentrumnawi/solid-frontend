import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {BaseComponent} from '../../../../shared/abstract/base.component';
import {MineralProfile, ProfileAppState} from '../../state/profile.model';
import {selectProfile} from '../../state/selectors';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent extends BaseComponent {
  private _profileId?: number;
  @Input('profileId')
  public set profileId(id: string) {
    const intId = parseInt(id, 10);
    if (intId !== this._profileId) {
      if (this._storeSub) this._storeSub.unsubscribe();
      this._storeSub = this._store.pipe(select(selectProfile, intId)).subscribe(profile => {
        this.Profile = profile;
      });
    }
    this._profileId = intId;
  }
  public Profile?: MineralProfile;
  private _storeSub?: Subscription;

  constructor(
    private _store: Store<ProfileAppState>,
    private _router: Router,
    route: ActivatedRoute,
  ) {
    super();
    route.params.subscribe(data => {
      if (data['id']) {
        this.profileId = data['id'];
      }
    })
  }

  public onCloseClick() {
    this._router.navigateByUrl('profile');
  }
}
