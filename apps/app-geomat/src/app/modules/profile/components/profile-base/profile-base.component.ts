import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ProfileService} from '../../services/profile.service';
import {Select, Store} from '@ngxs/store';
import {ProfileState} from '../../state/profile.state';
import {MineralProfile, Profile, ProfileCategory} from '../../state/profile.model';
import {FormControl} from '@angular/forms';
import {Navigate} from '@ngxs/router-plugin';
import {map} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {HammerInput} from '@angular/material/core';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';

@Component({
  selector: 'app-profile-base',
  templateUrl: './profile-base.component.html',
  styleUrls: ['./profile-base.component.scss']
})
export class ProfileBaseComponent implements OnInit, AfterViewInit {
  @Select(ProfileState.selectTree)
  public $profilesTree!: Observable<Profile[]>;
  @Select(ProfileState.selectFlat)
  public $profilesFlat!: Observable<MineralProfile[]>;
  @Select(ProfileState.selectProfileAndCategory)
  public $profileAndCategorySelector!: Observable<(profileId?: number) => { profile: MineralProfile; category: ProfileCategory } | null>;
  @Select((s: any) => s.router.state.params)
  public $routerParams!: Observable<{ [key: string]: string }>;
  @ViewChild('contentContainer', {static: false}) public ContentContainer!: ElementRef;
  public SplitLayout = false;
  public Filter = new FormControl('');
  public FilterValue = new BehaviorSubject<string>('');
  public SelectedProfile: MineralProfile | null = null;
  public SelectedCategory: ProfileCategory | null = null;
  public CanSwipeLeft = false;
  public CanSwipeRight = false;
  public View = 'tree';

  constructor(
    private _service: ProfileService,
    private _store: Store,
  ) {
    this._service.loadProfiles();
  }

  ngOnInit(): void {
    combineLatest([this.$routerParams, this.$profileAndCategorySelector])
      .pipe(map(v => {
        const {params, selector} = {params: v[0], selector: v[1]};
        const profileId = params.id !== undefined && params.id !== '' ? parseInt(params.id, 10) : undefined;
        const profile = selector(profileId);
        if (profileId && profile) {
          const index = profile.category.children.indexOf(profile.profile);
          let canSwipeRight = false;
          let canSwipeLeft = false;
          if (!this.Filter.value) {
            canSwipeLeft = index > 0;
            canSwipeRight = index < profile.category.children.length - 1;
          }
          return {
            view: params.view,
            selectedProfile: profile.profile,
            selectedCategory: profile.category,
            canSwipeRight,
            canSwipeLeft
          };
        }
        return {
          view: params.view,
          selectedProfile: null,
          selectedCategory: null,
          canSwipeRight: false,
          canSwipeLeft: false
        };
      }))
      .subscribe(v => {
        this.View = v.view;
        this.SelectedProfile = v.selectedProfile;
        this.SelectedCategory = v.selectedCategory;
        this.CanSwipeLeft = v.canSwipeLeft;
        this.CanSwipeRight = v.canSwipeRight;
      });
    this.Filter.valueChanges.subscribe(_ => this.FilterValue.next(this.Filter.value));
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
      return new Navigate(['/profile', this.View === 'tree' ? 'grid' : 'tree', this.SelectedProfile.id], undefined, {replaceUrl: true});
    }
    return new Navigate(['/profile', this.View === 'tree' ? 'grid' : 'tree'], undefined, {replaceUrl: true});
  }

  @Dispatch()
  public selectProfile(profileId?: number) {
    if (profileId) {
      return new Navigate(['/profile', this.View, profileId]);
    }
    return new Navigate(['/profile', this.View]);
  }


  public swipeLeft() {
    if (this.SelectedCategory && this.SelectedProfile) {
      const index = this.SelectedCategory.children.indexOf(this.SelectedProfile);
      this.selectProfile((this.SelectedCategory.children[index - 1] as MineralProfile).id);
    }
  }

  public swipeRight() {
    if (this.SelectedCategory && this.SelectedProfile) {
      const index = this.SelectedCategory.children.indexOf(this.SelectedProfile);
      this.selectProfile((this.SelectedCategory.children[index + 1] as MineralProfile).id);
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

  private calculateLayout() {
    const split = this.ContentContainer.nativeElement.clientWidth >= 800;
    if (split !== this.SplitLayout) {
      setTimeout(() => {
        this.SplitLayout = split;
      }, 0);
    }
  }
}
