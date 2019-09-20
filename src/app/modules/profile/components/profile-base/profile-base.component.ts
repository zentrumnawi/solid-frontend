import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {Store} from "@ngxs/store";
import {ProfileState} from "../../state/profile.state";
import {MineralProfile, Profile} from "../../state/profile.model";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-profile-base',
  templateUrl: './profile-base.component.html',
  styleUrls: ['./profile-base.component.scss']
})
export class ProfileBaseComponent implements AfterViewInit {
  @ViewChild('contentContainer', {static: false}) public ContentContainer!: ElementRef;
  public SplitLayout = false;
  public Filter = new FormControl('');
  public Selected?: number;
  public FilteredProfiles: MineralProfile[] = [];
  private _profiles: Profile[] = [];
  private _flatProfiles: MineralProfile[] = [];

  constructor(
    private _service: ProfileService,
    private _store: Store,
  ) {
    this._service.loadProfiles();
    this._store.select(ProfileState.select).subscribe(profiles => {
      this._profiles = profiles;
      const mapit = (result: MineralProfile[], value: Profile[]) => {
        for (let v of value) {
          if (v.type === 'category') {
            result.push(...mapit([], v.children));
          } else {
            result.push(v);
          }
        }
        return result;
      };
      this._flatProfiles = mapit([], profiles);
    });
    this.Filter.valueChanges.subscribe(filterString => {
      const regExp = new RegExp(filterString, 'i');
      this.FilteredProfiles = this._flatProfiles.filter(profile => {
        if (profile.mineralName.match(regExp)) {
          return true;
        }
        if (profile.trivialName && profile.trivialName.match(regExp)) {
          return true;
        }
        if (profile.variety && profile.variety.match(regExp)) {
          return true;
        }
        return false;
      })
    });
  }

  @HostListener('window:resize', ['$event'])
  public onResize() {
    this.calculateLayout();
  }

  public ngAfterViewInit(): void {
    this.calculateLayout();
  }

  private calculateLayout() {
    const split = this.ContentContainer.nativeElement.clientWidth >= 800;
    if (split !== this.SplitLayout) {
      setTimeout(() => {
        this.SplitLayout = split;
      }, 0);
    }
  }
}
