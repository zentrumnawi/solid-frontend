import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {Store} from "@ngxs/store";
import {ProfileState} from "../../state/profile.state";
import {MineralProfile, Profile, ProfileCategory} from "../../state/profile.model";
import {FormControl} from "@angular/forms";
import {Navigate} from "@ngxs/router-plugin";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-profile-base',
  templateUrl: './profile-base.component.html',
  styleUrls: ['./profile-base.component.scss']
})
export class ProfileBaseComponent implements AfterViewInit {
  @ViewChild('contentContainer', {static: false}) public ContentContainer!: ElementRef;
  public SplitLayout = false;
  public Filter = new FormControl('');
  public FilteredProfiles: MineralProfile[] = [];
  public SelectedProfile?: MineralProfile;
  public CanSwipeLeft = false;
  public CanSwipeRight = false;
  private _flatProfiles: MineralProfile[] = [];
  public SelectedProfileId?: number;
  private _storeSub?: Subscription;
  private _selectedCategory?: ProfileCategory;

  constructor(
    private _service: ProfileService,
    private _store: Store,
  ) {
    this._service.loadProfiles();
    this._store.select(ProfileState.select).subscribe(profiles => {
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

    this._store.select(s => s.router.state.params).subscribe(params => {
      if (params.id) {
        this.selectProfileInt(parseInt(params.id, 10));
      } else {
        this.selectProfileInt();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  public onResize() {
    this.calculateLayout();
  }

  public ngAfterViewInit(): void {
    this.calculateLayout();
  }

  public selectProfile(profileId?: number) {
    if (profileId) {
      this._store.dispatch(new Navigate(['/profile', profileId]));
    } else {
      this._store.dispatch(new Navigate(['/profile']));
    }
    this.selectProfileInt(profileId);
  }


  public swipeLeft() {
    if (this._selectedCategory && this.SelectedProfile) {
      const index = this._selectedCategory.children.indexOf(this.SelectedProfile);
      this.selectProfile((this._selectedCategory.children[index - 1] as MineralProfile).id);
    }
  }

  public swipeRight() {
    if (this._selectedCategory && this.SelectedProfile) {
      const index = this._selectedCategory.children.indexOf(this.SelectedProfile);
      this.selectProfile((this._selectedCategory.children[index + 1] as MineralProfile).id);
    }
  }

  public onPanEnd($event: HammerInput) {
    if ($event.deltaX > 100 && this.CanSwipeLeft) {
      $event.preventDefault();
      this.swipeLeft();
    } else if ($event.deltaX < -100 && this.CanSwipeRight) {
      $event.preventDefault();
      this.swipeRight();
    }
  }

  private selectProfileInt(profileId?: number) {
    if (profileId) {
      this.SelectedProfileId = profileId;
      this._store.selectSnapshot(s => s.profile);
      this._storeSub = this._store.select(ProfileState.selectProfile).pipe(map(f => f(profileId))).subscribe(profile => {
        if (profile) {
          this.SelectedProfile = profile.profile;
          this._selectedCategory = profile.category;
          const index = profile.category.children.indexOf(profile.profile);
          if (!this.Filter.value) {
            this.CanSwipeLeft = index > 0;
            this.CanSwipeRight = index < profile.category.children.length - 1;
          } else {
            this.CanSwipeLeft = false;
            this.CanSwipeRight = false;
          }
        }
      });
    } else {
      this.SelectedProfileId = undefined;
      this.SelectedProfile = undefined;
    }
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
