import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild
} from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Select, Store } from '@ngxs/store';
import { ProfileState } from '../../state/profile.state';
import {
  ProfileEntry,
  Profile,
  ProfileCategory
} from '../../state/profile.model';
import { FormControl } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';

@Component({
  selector: 'solid-profile-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit, AfterViewInit {
  @Select(ProfileState.selectTree)
  public $profilesTree!: Observable<Profile[]>;
  @Select(ProfileState.selectFlat)
  public $profilesFlat!: Observable<ProfileEntry[]>;
  @Select(ProfileState.selectProfileAndCategory)
  public $profileAndCategorySelector!: Observable<(
    profileId?: number
  ) => { profile: ProfileEntry; category: ProfileCategory } | null>;
  @Select((s: any) => s.router.state.params)
  public $routerParams!: Observable<{ [key: string]: string }>;
  public ProfilesFlatFiltered = new BehaviorSubject<ProfileEntry[]>([]);
  @ViewChild('contentContainer', { static: false })
  public ContentContainer!: ElementRef;
  public SplitLayout = false;
  public Filter = new FormControl('');
  public FilterValue = new BehaviorSubject<string>('');
  public SelectedProfile: ProfileEntry | null = null;
  public SelectedCategory: ProfileCategory | null = null;
  public SwipeLeft = -1;
  public SwipeRight = -1;
  public View = 'tree';

  constructor(private _service: ProfileService, private _store: Store) {
    this._service.loadProfiles();
  }

  ngOnInit(): void {
    combineLatest([this.$routerParams, this.$profileAndCategorySelector, this.$profilesFlat, this.FilterValue])
      .pipe(
        map(v => {
          const { params, selector, flat, filterStr } = { params: v[0], selector: v[1], flat: v[2], filterStr: v[3] };

          // select profile
          const profileId =
            params.id !== undefined && params.id !== ''
              ? parseInt(params.id, 10)
              : undefined;
          const profile = selector(profileId);

          // filter profiles
          const regExp = new RegExp(filterStr, 'i');
          const profilesFlatFiltered = flat.filter(profile => {
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
          });

          // no profile selecte
          if (!profileId || !profile) {
            return {
              view: params.view,
              selectedProfile: null,
              selectedCategory: null,
              profilesFlatFiltered,
              swipeRight: -1,
              swipeLeft: -1
            };
          }
          let swipeRight = -1;
          let swipeLeft = -1;
          if (params.view === 'grid' || filterStr !== '') {
            const flatIndex = profilesFlatFiltered.findIndex(p => p.id === profileId);
            if (flatIndex !== 0) {
              swipeLeft = profilesFlatFiltered[flatIndex - 1]?.id || -1;
            }
            if (flatIndex !== profilesFlatFiltered.length - 1) {
              swipeRight = profilesFlatFiltered[flatIndex + 1]?.id || -1;
            }
          } else {
            const index = profile.category.children.indexOf(profile.profile);
            if (!this.Filter.value) {
              swipeLeft = (profile.category.children
                .find((p, i) => i === index -1 && p.type === 'entry') as ProfileEntry | undefined)?.id || -1;
              swipeRight = (profile.category.children
                .find((p, i) => i > index && p.type === 'entry') as ProfileEntry | undefined)?.id || -1;
            }
          }
          return {
            view: params.view,
            selectedProfile: profile.profile,
            selectedCategory: profile.category,
            profilesFlatFiltered,
            swipeRight,
            swipeLeft
          };
        })
      )
      .subscribe(v => {
        this.View = v.view;
        this.SelectedProfile = v.selectedProfile;
        this.SelectedCategory = v.selectedCategory;
        this.ProfilesFlatFiltered.next(v.profilesFlatFiltered);
        this.SwipeLeft = v.swipeLeft;
        this.SwipeRight = v.swipeRight;
      });
    this.Filter.valueChanges.subscribe(_ =>
      this.FilterValue.next(this.Filter.value)
    );
  }

  @HostListener('window:resize', ['$event'])
  public onResize() {
    this.calculateLayout();
  }

  public ngAfterViewInit(): void {
    this.calculateLayout();
  }

  @Dispatch()
  public toggleGridTree() {
    if (this.SelectedProfile) {
      return new Navigate(
        [
          '/profile',
          this.View === 'tree' ? 'grid' : 'tree',
          this.SelectedProfile.id
        ],
        undefined,
        { replaceUrl: true }
      );
    }
    return new Navigate(
      ['/profile', this.View === 'tree' ? 'grid' : 'tree'],
      undefined,
      { replaceUrl: true }
    );
  }

  @Dispatch()
  public selectProfile(profileId?: number) {
    if (profileId) {
      return new Navigate(['/profile', this.View, profileId]);
    }
    return new Navigate(['/profile', this.View]);
  }

  public swipeLeft() {
    if (this.SwipeLeft > 0) {
      this.selectProfile(this.SwipeLeft);
    }
  }

  public swipeRight() {
    if (this.SwipeRight > 0) {
      this.selectProfile(this.SwipeRight);
    }
  }

  public onPanEnd($event: any) {
    if ($event.deltaX > 100 && this.SwipeLeft) {
      $event.preventDefault();
      this.swipeLeft();
    } else if ($event.deltaX < -100 && this.SwipeRight) {
      $event.preventDefault();
      this.swipeRight();
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
