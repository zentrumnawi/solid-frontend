import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ProfileState } from '../../state/profile.state';
import { TreeNode, Profile } from '../../state/profile.model';
import { UntypedFormControl } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import {
  LoadDefinition,
  LoadDefinitionSwagger,
  LoadProfiles,
} from '../../state/profile.actions';
import { SOLID_PROFILE_BASE_URL } from '../../base-url';
import { IntroService } from '../../services/intro.service';
import { SolidCoreConfig, SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

export function __internal__selectRouterStateParams(s: any) {
  return s.router.state.params;
}
export enum APP {
  DIVE = 'Div-e',
}

@Component({
  selector: 'solid-profile-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('title_container', { static: false })
  public titleContainer?: ElementRef;
  @ViewChild('contentContainer', { static: false })
  public contentContainer!: ElementRef;
  @ViewChild('spinnerContainer', { static: false }) set spinnerContainer(
    element: ElementRef
  ) {
    if (element) {
      const windowWidth = document.documentElement.clientWidth;
      const position =
        windowWidth >= 1000
          ? (windowWidth - 115 - 300) / 2
          : (windowWidth - 115) / 2;
      element.nativeElement.style.left = position + 'px';
    }
  }

  public APP_NAME_DIVE = APP.DIVE;
  @Select(ProfileState.selectTree)
  public $profilesTree!: Observable<TreeNode[]>;
  @Select(ProfileState.selectFlat)
  public $profilesFlat!: Observable<Profile[]>;
  @Select(ProfileState.selectProfileAndNode)
  public $profileAndCategorySelector!: Observable<
    (
      profileId?: number,
      profileType?: string | null
    ) => { profile: Profile; node: TreeNode } | null
  >;
  public $paramMap: Observable<ParamMap>;
  public $queryParams: Observable<{ view: string }>;
  public ProfilesFlatFiltered = new BehaviorSubject<Profile[]>([]);
  public SplitLayout = false;
  public Filter = new UntypedFormControl('');
  public FilterValue = new BehaviorSubject<string>('');
  public SelectedProfile: Profile | null = null;
  public SelectedNode: TreeNode | null = null;
  public SwipeLeft = -1;
  public SwipeRight = -1;
  public View = 'tree';
  public isSearchBarOpen = false;
  public title_container_width = 0;
  public title_width = 0;
  public firstMovingAnimation = true;
  public stopAnimation = true;
  public timeOut_1: any;
  public timeOut_2: any;
  public collapseTree = false;
  @Output() profileTitle = new EventEmitter<string>();

  @Select(ProfileState.selectProfile) profile$!: Observable<any>;
  public profileSubscription!: Subscription;
  isLoading = true;

  constructor(
    private _store: Store,
    @Inject(SOLID_PROFILE_BASE_URL) public baseUrl: string,
    private introService: IntroService,
    @Inject(SOLID_CORE_CONFIG) public coreConfig: SolidCoreConfig,
    private _route: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.$paramMap = this._activatedRoute.paramMap as Observable<ParamMap>;
    this.$queryParams = this._activatedRoute.queryParams as Observable<{
      view: string;
    }>;

    this._store.dispatch([
      new LoadDefinition(),
      new LoadProfiles(),
      // Load definitions from OpenAPI 2.0
      new LoadDefinitionSwagger(),
    ]);

    this.profileSubscription = this.profile$?.subscribe((res) => {
      if (res.length != 0) this.isLoading = false;
    });
  }

  @HostListener('window:resize', ['$event'])
  public onResize() {
    this.calculateLayout();
    this.handleLongTitle();
  }

  ngOnInit(): void {
    combineLatest([
      this.$paramMap,
      this.$queryParams,
      this.$profileAndCategorySelector,
      this.$profilesFlat,
      this.FilterValue,
    ])
      .pipe(
        map((v) => {
          const { params, queryParams, selector, flat, filterStr } = {
            params: v[0],
            queryParams: v[1],
            selector: v[2],
            flat: v[3],
            filterStr: v[4],
          };

          const id = params.get('id');
          const type = params.get('type') ? params.get('type') : undefined;

          // temporary workaround for planty since the view is still in the URL
          const view =
            this.getProfileType(type) === 'wine' ? type : queryParams['view'];
          this.View = view ? view : 'tree';

          // select profile
          const profileId =
            id !== undefined && id !== '' && id ? parseInt(id, 10) : undefined;
          const profileType = this.getProfileType(type);

          const profileAndNode = selector(profileId, profileType);

          // filter profiles
          const regExp = new RegExp(filterStr, 'i');
          const profilesFlatFiltered = flat.filter((p) => {
            if (p.name.match(regExp)) {
              return true;
            }
            if (p.sub_name) {
              return !!p.sub_name.match(regExp);
            }
          });

          // no profile selected
          if (!profileId || !profileAndNode) {
            return {
              selectedProfile: null,
              selectedNode: null,
              profilesFlatFiltered,
              swipeRight: -1,
              swipeLeft: -1,
            };
          }
          let swipeRight = -1;
          let swipeLeft = -1;
          if (this.View === 'grid' || filterStr !== '') {
            const flatIndex = profilesFlatFiltered.findIndex(
              (p) => p.id === profileId
            );
            if (flatIndex !== 0) {
              swipeLeft = profilesFlatFiltered[flatIndex - 1]?.id || -1;
            }
            if (flatIndex !== profilesFlatFiltered.length - 1) {
              swipeRight = profilesFlatFiltered[flatIndex + 1]?.id || -1;
            }
          } else {
            // TODO: Handle indices for mixed leaf nodes and categories
            const index = profileAndNode.node.profiles.indexOf(
              profileAndNode.profile
            );
            if (!this.Filter.value) {
              swipeLeft =
                (
                  profileAndNode.node.profiles.find(
                    (p, i) => i === index - 1
                  ) as Profile | undefined
                )?.id || -1;
              swipeRight =
                (
                  profileAndNode.node.profiles.find((p, i) => i > index) as
                    | Profile
                    | undefined
                )?.id || -1;
            }
          }
          this.handleLongTitle();

          return {
            selectedProfile: profileAndNode.profile,
            selectedNode: profileAndNode.node,
            profilesFlatFiltered,
            swipeRight,
            swipeLeft,
          };
        })
      )
      .subscribe((v) => {
        this.SelectedProfile = v.selectedProfile;
        this.SelectedNode = v.selectedNode;
        this.ProfilesFlatFiltered.next(v.profilesFlatFiltered);
        this.SwipeLeft = v.swipeLeft;
        this.SwipeRight = v.swipeRight;
      });
    this.Filter.valueChanges.subscribe((_) =>
      this.FilterValue.next(this.Filter.value)
    );
  }

  public ngAfterViewInit(): void {
    this.calculateLayout();

    this.profileSubscription = this.profile$.subscribe((res) => {
      if (res.length != 0) {
        if (
          localStorage.getItem('hide_profile_tour') == 'false' ||
          localStorage.getItem('hide_profile_tour') == null
        ) {
          setTimeout(() => {
            this.introService.profileTour((_targetElement: any) => {
              try {
                const id = _targetElement.id;
                const treeNodeLocation =
                  this.coreConfig.profileTour.location.treeNode;
                const treeLocation =
                  this.coreConfig.profileTour.location.profileTree;
                this.collapseTree = false;
                if (id != 'profile')
                  setTimeout(() => {
                    this.introService.introProfile.refresh(true);
                  }, 365);
                if (id == '') {
                  if (this._route.url == treeLocation)
                    this.navigateTo(treeNodeLocation);
                  if (this._route.url == treeNodeLocation) {
                    const steps = this.coreConfig.profileTour.steps;
                    const currentStep =
                      this.introService.introProfile._currentStep;
                    steps.splice(currentStep, 1);
                    setTimeout(() => {
                      this.introService.introProfile
                        .goToStep(currentStep)
                        .start();
                    }, 0.1);
                  }
                } else if (id == 'profile-view' || id == 'profile') {
                  if (this._route.url != treeLocation)
                    this.navigateTo(treeLocation);
                  this.collapseTree = true;
                }
                setTimeout(() => {
                  this.introService.introProfile.refresh(true);
                }, 0.1);
              } catch (error) {
                return;
              }
              return;
            });
          }, 800);
        }
      }
    });
  }

  public ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
  }

  @Dispatch()
  public toggleGridTree() {
    this.View = this.View === 'tree' ? 'grid' : 'tree';
    if (this.SelectedProfile) {
      return new Navigate(
        [
          `${this.baseUrl}`,
          this.SelectedProfile.def_type !== 'wine'
            ? this.SelectedProfile.def_type + '_related'
            : this.View,
          this.SelectedProfile.id,
        ],
        {
          view:
            this.SelectedProfile.def_type !== 'wine' ? this.View : undefined,
        }
      );
    }
    return new Navigate(
      [`${this.baseUrl}`],
      { view: this.View },
      { replaceUrl: true }
    );
  }

  @Dispatch()
  public selectProfile(profileId?: number | { id: number; type: string }) {
    if (!profileId) {
      return new Navigate([`${this.baseUrl}`]);
    }
    if (typeof profileId !== 'number') {
      if (profileId.type === 'wine') {
        // temporary workaround for PLANTY - type wine_related doesn't have a type in the URL
        return new Navigate([`${this.baseUrl}`, this.View, profileId.id]);
      } else {
        const profileType = profileId.type + '_related';
        return new Navigate([`${this.baseUrl}`, profileType, profileId.id], {
          view: this.View,
        });
      }
    } else {
      return new Navigate([`${this.baseUrl}`, this.View, profileId]);
    }
  }

  public swipeLeft() {
    if (this.SwipeLeft > 0) {
      this.selectProfile(this.SwipeLeft);
    }
    setTimeout(() => {
      this.profileTitle.emit(this.SelectedProfile?.name);
    }, 10);
  }

  public swipeRight() {
    if (this.SwipeRight > 0) {
      this.selectProfile(this.SwipeRight);
    }
    setTimeout(() => {
      this.profileTitle.emit(this.SelectedProfile?.name);
    }, 10);
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
    const split = this.contentContainer.nativeElement.clientWidth >= 800;
    if (split !== this.SplitLayout) {
      setTimeout(() => {
        this.SplitLayout = split;
      }, 0);
    }
  }

  public selectProfileTitle(title: string): void {
    if (title) this.profileTitle.emit(title);
  }

  public getProfileType(type: string | undefined | null): string {
    if (!type) {
      return '';
    }
    if (type === 'tree' || type === 'grid') {
      return 'wine';
    } else {
      const index = type.indexOf('_');
      if (index !== -1) {
        return type.slice(0, index);
      }
      return '';
    }
  }

  @Dispatch()
  public async navigateTo(url: string) {
    return new Navigate([url]);
  }

  public handleLongTitle() {
    this.stopAnimation = true;
    clearTimeout(this.timeOut_1);
    clearTimeout(this.timeOut_2);
    this.timeOut_1 = setTimeout(() => {
      this.stopAnimation = false;
      this.firstMovingAnimation = true;
      this.title_container_width =
        this.titleContainer?.nativeElement.offsetWidth;
      this.title_width =
        this.titleContainer?.nativeElement.firstElementChild.firstElementChild.offsetWidth;
      if (this.titleContainer?.nativeElement.firstElementChild) {
        this.timeOut_2 = setTimeout(() => {
          this.firstMovingAnimation = false;
        }, 10000);
      }
    }, 0);
  }
}
