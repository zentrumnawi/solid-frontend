import {Component, Input, OnInit} from '@angular/core';
import {MineralProfile, ProfileCategory} from '../../state/profile.model';
import {ProfileService} from "../../services/profile.service";
import {Select, Store} from "@ngxs/store";
import {ProfileState} from "../../state/profile.state";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  public Category: ProfileCategory | null = null;
  public Profile: MineralProfile | null = null;
  @Select(ProfileState.selectProfile) private _profileSelector!: Observable<(profileId: number) => { profile: MineralProfile; category: ProfileCategory } | undefined>;
  private _profileIdSubject = new BehaviorSubject<number | undefined>(undefined);

  constructor(
    private _store: Store,
    private _service: ProfileService,
  ) {
    this._service.loadProfiles();
  }

  @Input('profileId')
  public set profileId(profileId: number | undefined) {
    this._profileIdSubject.next(profileId);
  }

  public ngOnInit() {
    combineLatest([this._profileSelector, this._profileIdSubject]).pipe(map(([selector, id]) => {
      if (id) {
        return selector(id);
      }
      return undefined;
    })).subscribe(value => {
      if (value) {
        this.Category = value.category;
        this.Profile = value.profile;
      }
    })
  }
}
