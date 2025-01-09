import {
  AfterViewInit,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { TreeNode, Profile, ProfileShort } from '../../state/profile.model';
import { UntypedFormControl } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IntroService } from '../../services/intro.service';
import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as i0 from '@angular/core';
export declare function __internal__selectRouterStateParams(s: any): any;
export declare enum APP {
  DIVE = 'Div-e',
}
export declare class BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  private _store;
  baseUrl: string;
  private introService;
  coreConfig: SolidCoreConfig;
  private _route;
  private _activatedRoute;
  titleContainer?: ElementRef;
  contentContainer: ElementRef;
  set spinnerContainer(element: ElementRef);
  APP_NAME_DIVE: APP;
  $profilesTree: Observable<TreeNode[]>;
  $profilesFlat: Observable<Profile[]>;
  $profileAndCategorySelector: Observable<
    (
      profileId?: number,
      profileType?: string | null
    ) => {
      profile: Profile;
      node: TreeNode;
    } | null
  >;
  $paramMap: Observable<ParamMap>;
  $queryParams: Observable<{
    view: string;
  }>;
  ProfilesFlatFiltered: BehaviorSubject<Profile[]>;
  SplitLayout: boolean;
  Filter: UntypedFormControl;
  FilterValue: BehaviorSubject<string>;
  SelectedProfile: Profile | null;
  SelectedProfileShort: ProfileShort;
  SelectedNode: TreeNode | null;
  SwipeLeft: ProfileShort;
  SwipeRight: ProfileShort;
  View: string;
  isSearchBarOpen: boolean;
  title_container_width: number;
  title_width: number;
  firstMovingAnimation: boolean;
  stopAnimation: boolean;
  timeOut_1: any;
  timeOut_2: any;
  collapseTree: boolean;
  profileTitle: EventEmitter<string>;
  profile$: Observable<any>;
  isLoading: boolean;
  mainSubscription: Subscription;
  filterSubscription: Subscription;
  profileSubscription: Subscription;
  constructor(
    _store: Store,
    baseUrl: string,
    introService: IntroService,
    coreConfig: SolidCoreConfig,
    _route: Router,
    _activatedRoute: ActivatedRoute
  );
  onResize(): void;
  ngOnInit(): void;
  ngAfterViewInit(): void;
  ngOnDestroy(): void;
  toggleGridTree(): Navigate;
  selectProfile(profile?: number | ProfileShort): Navigate;
  swipeLeft(): void;
  swipeRight(): void;
  onPanEnd($event: any): void;
  private calculateLayout;
  selectProfileTitle(title: string): void;
  getProfileType(type: string | undefined | null): string;
  getProfileShort(profile: any): ProfileShort;
  navigateTo(url: string): Promise<Navigate>;
  handleLongTitle(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<BaseComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    BaseComponent,
    'solid-profile-base',
    never,
    {},
    { profileTitle: 'profileTitle' },
    never,
    never,
    false,
    never
  >;
}
