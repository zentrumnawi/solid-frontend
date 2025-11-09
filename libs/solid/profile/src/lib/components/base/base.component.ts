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
import { TreeNode, Profile, ProfileShort, LazyTreeNode } from '../../state/profile.model';
import { UntypedFormControl } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { map, debounceTime, take } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import {
  LoadDefinition,
  LoadDefinitionSwagger,
  LoadProfiles,
  GetRootNodes,
  SearchProfiles,
  LoadProfilesFlat,
  EnsureEntryPath,
  GetSingleProfile,
  GetEntries,
} from '../../state/profile.actions';
import { SOLID_PROFILE_BASE_URL } from '../../base-url';
import { IntroService } from '../../services/intro.service';
import { SolidCoreConfig, SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import type { Input as HammerInput } from 'hammerjs';
import { of, switchMap, tap, filter, distinctUntilChanged } from 'rxjs';

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
    element: ElementRef,
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
  @Select(ProfileState.selectRootNodes)
  public $rootNodes!: Observable<LazyTreeNode[]>;
  @Select(ProfileState.selectFlat)
  public $profilesFlat!: Observable<Profile[]>;
  @Select(ProfileState.selectTree)
  public $profilesTree!: Observable<TreeNode[]>;
  @Select(ProfileState.selectProfileAndNode)
  public $profileAndCategorySelector!: Observable<
    (
      profileId?: number,
      profileType?: string | null,
    ) => { profile: Profile; node: TreeNode } | null
  >;
  @Select(ProfileState.selectSelectedProfilePath)
  public $selectedProfilePath!: Observable<LazyTreeNode[]>;
  public openPath: LazyTreeNode[] = [];
  public $paramMap: Observable<ParamMap>;
  public $queryParams: Observable<{ view: string }>;
  public ProfilesFlatFiltered = new BehaviorSubject<Profile[]>([]);
  public SplitLayout = false;
  public Filter = new UntypedFormControl('');
  public FilterValue = new BehaviorSubject<string>('');
  public SelectedProfile: Profile | null = null;
  public SelectedProfileShort: ProfileShort = { id: -1, type: undefined };
  public SelectedNode: TreeNode | null = null;
  public SwipeLeft: ProfileShort = { id: -1 };
  public SwipeRight: ProfileShort = { id: -1 };
  public View = 'tree';
  public isSearchBarOpen = false;
  public title_container_width = 0;
  public title_width = 0;
  public firstMovingAnimation = true;
  public stopAnimation = true;
  public timeOut_1: any;
  public timeOut_2: any;
  public collapseTree = false;
  public searchResults: Profile[] = [];
  public gridProfiles: Profile[] = [];
  @Output() profileTitle = new EventEmitter<string>();

  @Select(ProfileState.selectSelectedProfile) $selectedProfile!: Observable<Profile>;
  isLoading = true;
  isLoadingGrid = true;
  public mainSubscription!: Subscription;
  public filterSubscription!: Subscription;
  public rootSubscription!: Subscription;
  public profileTreeSubscription!: Subscription;
  public gridProfilesSubscription!: Subscription;
  public searchResultsSubscription!: Subscription;
  @Select(ProfileState.selectSearchResults)
  public $searchResults!: Observable<Profile[]>;

  @Select(ProfileState.selectGridProfiles)
  public $gridProfiles!: Observable<Profile[]>;

  constructor(
    private _store: Store,
    @Inject(SOLID_PROFILE_BASE_URL) public baseUrl: string,
    private introService: IntroService,
    @Inject(SOLID_CORE_CONFIG) public coreConfig: SolidCoreConfig,
    private _route: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.$paramMap = this._activatedRoute.paramMap as Observable<ParamMap>;
    this.$queryParams = this._activatedRoute.queryParams as Observable<{
      view: string;
    }>;

    this._store.dispatch([
      new LoadDefinition(),
      new GetRootNodes(),
      // Load definitions from OpenAPI 2.0
      new LoadDefinitionSwagger(),
    ]);

    this.rootSubscription = this.$rootNodes?.subscribe((res) => {
      if (res.length != 0) this.isLoading = false;
    });
  }

  @HostListener('window:resize', ['$event'])
  public onResize() {
    this.calculateLayout();
    this.handleLongTitle();
  }

  ngOnInit(): void {
    this.profileTreeSubscription = this.$profilesTree.subscribe((res) => {
      if (res.length !== 0) {
        this.isLoading = false;

        setTimeout(() => {
          this.startTourIfNeeded();
        }, 0);
      }      
    });

    this.searchResultsSubscription = this.$searchResults?.subscribe((res) => {
      this.searchResults = res;
    });

    this.gridProfilesSubscription = this.$gridProfiles?.subscribe((res) => {
      this.gridProfiles = res;
      if (res.length > 0) {
        this.isLoadingGrid = false;
      }
    });

    const route$ = combineLatest([this.$paramMap, this.$queryParams]).pipe(
      map(([pm, qp]) => ({
        id:  pm.get('id') ? +pm.get('id')! : undefined,
        typ: this.getProfileType(pm.get('type')),
        view:
          this.getProfileType(pm.get('type')) === 'wine' ? pm.get('type')
                                                         : qp['view']
      })),
      distinctUntilChanged((a, b) => a.id === b.id && a.typ === b.typ)
    );

    this.mainSubscription = route$.pipe(
      switchMap((route) => {
        if (!route.id) {
          return of({ selectedProfile: null, selectedNode: null, flat: [] });
        }

        // if(route.id && !this._store.selectSnapshot(ProfileState.selectSelectedProfile)) {
        //   console.log("fetching entries first time")             // not in store yet
        //       this._store.dispatch(new GetSingleProfile(route.id, route.typ)).subscribe(() => {
        //         this.$selectedProfile.pipe(take(1)).subscribe(profile => {
        //           if(!this._store.selectSnapshot(ProfileState.selectEntries)[profile.tree_node.id]?.length) {
        //             this._store.dispatch(new GetEntries(profile.tree_node.id));
        //           }
        //         });
        //       });
        //     }

        /* stream that emits the profile+node once they exist in the store */
        const loaded$ = this.$profileAndCategorySelector.pipe(
          map(selFn => selFn(route.id, route.typ)),
          tap(res => {
            console.log("route", route);
            console.log("route.id", route.id);
            console.log("route.typ", route.typ);
            console.log("res", res);
            if (!res && route.id && route.typ && !this._store.selectSnapshot(ProfileState.selectSelectedProfile)) { 
              console.log("fetching entries first time")             // not in store yet
              this._store.dispatch(new GetSingleProfile(route.id, route.typ)).subscribe(() => {
                this.$selectedProfile.pipe(take(1)).subscribe(profile => {
                  if(!this._store.selectSnapshot(ProfileState.selectEntries)[profile.tree_node.id]?.length) {
                    this._store.dispatch(new GetEntries(profile.tree_node.id));
                  }
                });
              });
            }
          }),
          filter(Boolean),           // wait until it appears
          take(1)                    // only once per route change
        );

        return loaded$.pipe(
          
          //tap(a => console.log("firing on loaded$", a)),
          tap(({ node }) => {
            console.log("node before ensureEntryPath", route.typ);
            this._store.dispatch(new EnsureEntryPath(node.id, route.typ))
            .pipe(take(1))
            .subscribe(_ => {
              console.log("_", _);  
              this.openPath = this._store.selectSnapshot(ProfileState.selectSelectedProfilePath);
              console.log("openPath", this.openPath);
            });
          }
          ),
          map(({ profile, node }) => ({
            selectedProfile: profile,
            selectedNode: node,
            flat: this.View === 'grid' ? this.gridProfiles : this.searchResults,
            filterStr: this.Filter.value
          }))
        );
      
      })
    ).subscribe(view => {
      /* pure view-model code here – no dispatches */
      console.log("entering view", view);
      this.SelectedProfile = view.selectedProfile;
      this.SelectedNode = view.selectedNode;
      this.ProfilesFlatFiltered.next(view.flat);

      if(!view.selectedProfile || !view.selectedNode) return;

      this.updateSwipeTargets(view);

      this.handleLongTitle();
    });
    this.filterSubscription = this.Filter.valueChanges
      .pipe(debounceTime(300))
      .subscribe((filterStr) => {
        this._store.dispatch(new SearchProfiles(filterStr));
      });
  }

  private startTourIfNeeded() {
    const shouldShowTour =
      localStorage.getItem('hide_profile_tour') === 'false' ||
      localStorage.getItem('hide_profile_tour') === null;
    if (shouldShowTour) {
      const initialId = this._activatedRoute.snapshot.paramMap.get('id');
      this.introService.profileTour((element: HTMLElement) => {
        try {
          this.handleTourStep(element, initialId);
        } catch (error) {
          return;
        }
      });
    }
  }

  public ngAfterViewInit(): void {
    this.calculateLayout();

    this.rootSubscription = this.$rootNodes.subscribe((res) => {
      if (res.length === 0) return;
      this.isLoading = false;

      const shouldShowTour =
        localStorage.getItem('hide_profile_tour') === 'false' ||
        localStorage.getItem('hide_profile_tour') === null;
      if (shouldShowTour) {
        setTimeout(() => {
          const initialId = this._activatedRoute.snapshot.paramMap.get('id');

          this.introService.profileTour((element: HTMLElement) => {
            try {
              this.handleTourStep(element, initialId);
            } catch (error) {
              return;
            }
          });
        }, 800);
      }
    });
  }

  private async handleTourStep(element: HTMLElement, initialId: string | null) {
    const id = element.id;
    const { treeNode: treeNodeLocation, profileTree: treeLocation } =
      this.coreConfig.profileTour.location;

    if (id !== 'profile') {
      await new Promise((resolve) => setTimeout(resolve, 100));
      this.refreshTourUI();
    }

    if (id === '' && !initialId) {
      this.handleEmptyStep(treeLocation, treeNodeLocation);
    }

    // Handle profile view step
    else if ((id === 'profile-view' || id === 'profile') && !initialId) {
      if (this._route.url !== treeLocation) {
        await this.navigateTo(treeLocation);
        this.refreshTourUI();
        this.collapseTree = true;
      }
    }

    this.refreshTourUI();
  }

  private refreshTourUI(delay = 400) {
    setTimeout(() => {
      this.introService.introProfile.refresh();
    }, delay);
  }

  private async handleEmptyStep(
    treeLocation: string,
    treeNodeLocation: string,
  ) {
    if (this._route.url === treeLocation) {
      await this.navigateTo(treeNodeLocation);
    }

    this.refreshTourUI();

    const currentStep = this.introService.introProfile.currentStep();
    if (currentStep) {
      this.introService.introProfile.start().goToStep(currentStep + 1);
    }
  }

  public ngOnDestroy(): void {
    this.mainSubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
    this.rootSubscription.unsubscribe();
    this.profileTreeSubscription.unsubscribe();
    this.gridProfilesSubscription?.unsubscribe();
    this.searchResultsSubscription?.unsubscribe();
  }

  @Dispatch()
  public toggleGridTree() {
    this.View = this.View === 'tree' ? 'grid' : 'tree';

    if (this.SelectedProfile) {
      return new Navigate(
        [
          `${this.baseUrl}`,
          this.SelectedProfile.def_type !== 'wine'
            ? this.SelectedProfile.def_type
            : this.View,
          this.SelectedProfile.id,
        ],
        {
          view:
            this.SelectedProfile.def_type !== 'wine' ? this.View : undefined,
        },
      );
    }
    return new Navigate(
      [`${this.baseUrl}`],
      { view: this.View },
      { replaceUrl: true },
    );
  }

  @Dispatch()
  public selectProfile(profile?: number | ProfileShort) {
    if (!profile) {
      return new Navigate([`${this.baseUrl}`], {
        view: this.View ? this.View : undefined,
      });
    }
    if (typeof profile !== 'number' && profile.type) {
      this.SelectedProfileShort = profile;
      if (profile.type === 'wine') {
        // temporary workaround for PLANTY - type wine_related doesn't have a type in the URL
        return new Navigate([`${this.baseUrl}`, this.View, profile.id]);
      } else {
        const profileType = profile.type;
        return new Navigate([`${this.baseUrl}`, profileType, profile.id], {
          view: this.View,
        });
      }
    } else {
      return new Navigate([`${this.baseUrl}`, this.View, profile]);
    }
  }

  public swipeLeft() {
    if (this.SwipeLeft.id > 0) {
      this.selectProfile(this.SwipeLeft);
    }
    setTimeout(() => {
      this.profileTitle.emit(this.SelectedProfile?.name);
    }, 10);
  }

  public swipeRight() {
    if (this.SwipeRight.id > 0) {
      this.selectProfile(this.SwipeRight);
    }
    setTimeout(() => {
      this.profileTitle.emit(this.SelectedProfile?.name);
    }, 10);
  }

  public onPanEnd($event: HammerInput) {
    if ($event.deltaX > 100 && this.SwipeLeft) {
      $event.preventDefault();
      this.swipeLeft();
    } else if ($event.deltaX < -100 && this.SwipeRight) {
      $event.preventDefault();
      this.swipeRight();
    }
  }

  private calculateLayout() {
    const split = this.contentContainer.nativeElement.clientWidth >= 900;
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
      return 'wine'; // temporary for PLANTY
    } else {
      return type;
    }
  }

  public getProfileShort(profile: Profile | undefined): ProfileShort {
    const profileId = profile?.id || -1;
    const profileType = profile?.def_type;
    return { id: profileId, type: profileType };
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

  get profilesToShow(): Profile[] {
    if (this.View === 'grid') {
      return this.Filter.value === '' ? this.gridProfiles : this.searchResults;
    }
    return [];
  }

  private updateSwipeTargets(view: any) {
    if (this.isGridOrFiltered()) {
      this.updateSwipeTargetsForGridView(view);
    } else {
      this.updateSwipeTargetsForTreeView(view);
    }
  }

  private isGridOrFiltered(): boolean {
    return this.View === 'grid' || this.Filter.value !== '';
  }

  private updateSwipeTargetsForGridView(view: any) {
    const profiles = view.flat;
    const currentIndex = this.findCurrentProfileIndex(profiles, view.selectedProfile);
    
    this.SwipeLeft = this.getSwipeLeftTarget(profiles, currentIndex);
    this.SwipeRight = this.getSwipeRightTarget(profiles, currentIndex);
  }

  private findCurrentProfileIndex(profiles: any[], selectedProfile: any): number {
    return profiles.findIndex(
      (p) => p.id === selectedProfile?.id && p.def_type === selectedProfile?.def_type
    );
  }

  private getSwipeLeftTarget(profiles: any[], currentIndex: number) {
    if (currentIndex === 0) {
      return { id: -1 };
    }
    const profile = profiles[currentIndex - 1];
    return this.getProfileShort(profile);
  }

  private getSwipeRightTarget(profiles: any[], currentIndex: number) {
    if (currentIndex === profiles.length - 1) {
      return { id: -1 };
    }
    const profile = profiles[currentIndex + 1];
    return this.getProfileShort(profile);
  }

  private updateSwipeTargetsForTreeView(view: any) {
    if (this.Filter.value) {
      this.clearSwipeTargets();
      return;
    }

    const profiles = this.getProfilesForNode(view.selectedNode?.id);
    const currentIndex = profiles.indexOf(view.selectedProfile!);
    
    this.SwipeLeft = this.getTreeViewSwipeLeftTarget(profiles, currentIndex);
    this.SwipeRight = this.getTreeViewSwipeRightTarget(profiles, currentIndex);
  }

  private getProfilesForNode(nodeId: number): any[] {
    return this._store.selectSnapshot(ProfileState.selectEntries)[nodeId ?? 0];
  }

  private getTreeViewSwipeLeftTarget(profiles: any[], currentIndex: number) {
    const profileLeft = profiles.find(
      (p, i) => i === currentIndex - 1
    ) as Profile | undefined;
    return this.getProfileShort(profileLeft);
  }

  private getTreeViewSwipeRightTarget(profiles: any[], currentIndex: number) {
    const profileRight = profiles.find(
      (p, i) => i > currentIndex
    ) as Profile | undefined;
    return this.getProfileShort(profileRight);
  }

  private clearSwipeTargets() {
    this.SwipeLeft = { id: -1 };
    this.SwipeRight = { id: -1 };
  }
}
