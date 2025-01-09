var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Output,
  ViewChild,
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ProfileState } from '../../state/profile.state';
import { UntypedFormControl } from '@angular/forms';
import { Navigate } from '@ngxs/router-plugin';
import { map } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import {
  LoadDefinition,
  LoadDefinitionSwagger,
  LoadProfiles,
} from '../../state/profile.actions';
import { SOLID_PROFILE_BASE_URL } from '../../base-url';
import { IntroService } from '../../services/intro.service';
import { SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import { ActivatedRoute, Router } from '@angular/router';
import * as i0 from '@angular/core';
import * as i1 from '@ngxs/store';
import * as i2 from '../../services/intro.service';
import * as i3 from '@angular/router';
import * as i4 from '@angular/common';
import * as i5 from '@angular/forms';
import * as i6 from '@zentrumnawi/solid-core';
import * as i7 from '@angular/cdk/scrolling';
import * as i8 from '@angular/material/button';
import * as i9 from '@angular/material/form-field';
import * as i10 from '@angular/material/icon';
import * as i11 from '@angular/material/input';
import * as i12 from '@angular/material/progress-spinner';
import * as i13 from '@angular/material/toolbar';
import * as i14 from '@angular/material/card';
import * as i15 from '../tree/tree.component';
import * as i16 from '../list/list.component';
import * as i17 from '../detail/detail.component';
import * as i18 from '../grid/grid.component';
export function __internal__selectRouterStateParams(s) {
  return s.router.state.params;
}
export var APP;
(function (APP) {
  APP['DIVE'] = 'Div-e';
})(APP || (APP = {}));
export class BaseComponent {
  _store;
  baseUrl;
  introService;
  coreConfig;
  _route;
  _activatedRoute;
  titleContainer;
  contentContainer;
  set spinnerContainer(element) {
    if (element) {
      const windowWidth = document.documentElement.clientWidth;
      const position =
        windowWidth >= 1000
          ? (windowWidth - 115 - 300) / 2
          : (windowWidth - 115) / 2;
      element.nativeElement.style.left = position + 'px';
    }
  }
  APP_NAME_DIVE = APP.DIVE;
  $profilesTree;
  $profilesFlat;
  $profileAndCategorySelector;
  $paramMap;
  $queryParams;
  ProfilesFlatFiltered = new BehaviorSubject([]);
  SplitLayout = false;
  Filter = new UntypedFormControl('');
  FilterValue = new BehaviorSubject('');
  SelectedProfile = null;
  SelectedProfileShort = { id: -1, type: undefined };
  SelectedNode = null;
  SwipeLeft = { id: -1 };
  SwipeRight = { id: -1 };
  View = 'tree';
  isSearchBarOpen = false;
  title_container_width = 0;
  title_width = 0;
  firstMovingAnimation = true;
  stopAnimation = true;
  timeOut_1;
  timeOut_2;
  collapseTree = false;
  profileTitle = new EventEmitter();
  profile$;
  isLoading = true;
  mainSubscription;
  filterSubscription;
  profileSubscription;
  constructor(
    _store,
    baseUrl,
    introService,
    coreConfig,
    _route,
    _activatedRoute
  ) {
    this._store = _store;
    this.baseUrl = baseUrl;
    this.introService = introService;
    this.coreConfig = coreConfig;
    this._route = _route;
    this._activatedRoute = _activatedRoute;
    this.$paramMap = this._activatedRoute.paramMap;
    this.$queryParams = this._activatedRoute.queryParams;
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
  onResize() {
    this.calculateLayout();
    this.handleLongTitle();
  }
  ngOnInit() {
    this.mainSubscription = combineLatest([
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
          const type = params.get('type');
          // temporary workaround for planty since the view is still in the URL
          const view =
            this.getProfileType(type) === 'wine' ? type : queryParams['view'];
          this.View = view ? view : 'tree';
          // select profile
          const profileId = id ? parseInt(id, 10) : undefined;
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
              swipeRight: { id: -1 },
              swipeLeft: { id: -1 },
            };
          }
          let swipeRight = {
            id: -1,
          };
          let swipeLeft = {
            id: -1,
          };
          if (this.View === 'grid' || filterStr !== '') {
            const flatIndex = profilesFlatFiltered.findIndex(
              (p) => p.id === profileId && p.def_type === profileType
            );
            if (flatIndex !== 0) {
              const profile = profilesFlatFiltered[flatIndex - 1];
              swipeLeft = this.getProfileShort(profile);
            }
            if (flatIndex !== profilesFlatFiltered.length - 1) {
              const profile = profilesFlatFiltered[flatIndex + 1];
              swipeRight = this.getProfileShort(profile);
            }
          } else {
            const index = profileAndNode.node.profiles.indexOf(
              profileAndNode.profile
            );
            if (!this.Filter.value) {
              const profileLeft = profileAndNode.node.profiles.find(
                (p, i) => i === index - 1
              );
              swipeLeft = this.getProfileShort(profileLeft);
              const profileRight = profileAndNode.node.profiles.find(
                (p, i) => i > index
              );
              swipeRight = this.getProfileShort(profileRight);
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
    this.filterSubscription = this.Filter.valueChanges.subscribe((_) =>
      this.FilterValue.next(this.Filter.value)
    );
  }
  ngAfterViewInit() {
    this.calculateLayout();
    this.profileSubscription = this.profile$.subscribe((res) => {
      if (res.length != 0) {
        if (
          localStorage.getItem('hide_profile_tour') == 'false' ||
          localStorage.getItem('hide_profile_tour') == null
        ) {
          setTimeout(() => {
            this.introService.profileTour((_targetElement) => {
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
  ngOnDestroy() {
    this.mainSubscription.unsubscribe();
    this.filterSubscription.unsubscribe();
    this.profileSubscription.unsubscribe();
  }
  toggleGridTree() {
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
        }
      );
    }
    return new Navigate(
      [`${this.baseUrl}`],
      { view: this.View },
      { replaceUrl: true }
    );
  }
  selectProfile(profile) {
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
  swipeLeft() {
    if (this.SwipeLeft.id > 0) {
      this.selectProfile(this.SwipeLeft);
    }
    setTimeout(() => {
      this.profileTitle.emit(this.SelectedProfile?.name);
    }, 10);
  }
  swipeRight() {
    if (this.SwipeRight.id > 0) {
      this.selectProfile(this.SwipeRight);
    }
    setTimeout(() => {
      this.profileTitle.emit(this.SelectedProfile?.name);
    }, 10);
  }
  onPanEnd($event) {
    if ($event.deltaX > 100 && this.SwipeLeft) {
      $event.preventDefault();
      this.swipeLeft();
    } else if ($event.deltaX < -100 && this.SwipeRight) {
      $event.preventDefault();
      this.swipeRight();
    }
  }
  calculateLayout() {
    const split = this.contentContainer.nativeElement.clientWidth >= 900;
    if (split !== this.SplitLayout) {
      setTimeout(() => {
        this.SplitLayout = split;
      }, 0);
    }
  }
  selectProfileTitle(title) {
    if (title) this.profileTitle.emit(title);
  }
  getProfileType(type) {
    if (!type) {
      return '';
    }
    if (type === 'tree' || type === 'grid') {
      return 'wine'; // temporary for PLANTY
    } else {
      return type;
    }
  }
  getProfileShort(profile) {
    const profileId = profile?.id || -1;
    const profileType = profile?.def_type;
    return { id: profileId, type: profileType };
  }
  async navigateTo(url) {
    return new Navigate([url]);
  }
  handleLongTitle() {
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
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: BaseComponent,
    deps: [
      { token: i1.Store },
      { token: SOLID_PROFILE_BASE_URL },
      { token: i2.IntroService },
      { token: SOLID_CORE_CONFIG },
      { token: i3.Router },
      { token: i3.ActivatedRoute },
    ],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: BaseComponent,
    selector: 'solid-profile-base',
    outputs: { profileTitle: 'profileTitle' },
    host: { listeners: { 'window:resize': 'onResize($event)' } },
    viewQueries: [
      {
        propertyName: 'titleContainer',
        first: true,
        predicate: ['title_container'],
        descendants: true,
      },
      {
        propertyName: 'contentContainer',
        first: true,
        predicate: ['contentContainer'],
        descendants: true,
      },
      {
        propertyName: 'spinnerContainer',
        first: true,
        predicate: ['spinnerContainer'],
        descendants: true,
      },
    ],
    ngImport: i0,
    template:
      '<div\r\n  #contentContainer\r\n  [class.splitLayout]="SplitLayout"\r\n  class="content-container"\r\n  id="profile"\r\n>\r\n  <mat-toolbar\r\n    *ngIf="SplitLayout || !SelectedProfile"\r\n    [class.full-width]="!SelectedProfile"\r\n    class="main-toolbar"\r\n  >\r\n    <button mat-icon-button class="button-back" routerLink="">\r\n      <mat-icon>arrow_back</mat-icon>\r\n    </button>\r\n    <mat-form-field\r\n      appearance="fill"\r\n      floatLabel="auto"\r\n      [class.openSearchBar]="isSearchBarOpen"\r\n    >\r\n      <mat-label>Suche</mat-label>\r\n      <input\r\n        [formControl]="Filter"\r\n        matInput\r\n        type="text"\r\n        #search_input\r\n        (blur)="\r\n          Filter.value === \'\'\r\n            ? (isSearchBarOpen = false)\r\n            : (isSearchBarOpen = true)\r\n        "\r\n        (focus)="isSearchBarOpen = true"\r\n      />\r\n      <button mat-icon-button matSuffix (click)="Filter.setValue(\'\')">\r\n        <!--mat-icon *ngIf="Filter.value == \'\'" matSuffix>search</mat-icon-->\r\n        <mat-icon>\r\n          {{ Filter.value === \'\' ? \'search\' : \'close\' }}\r\n        </mat-icon>\r\n      </button>\r\n    </mat-form-field>\r\n    <div class="spacer"></div>\r\n    <button id="profile-view" (click)="toggleGridTree()" mat-icon-button>\r\n      <mat-icon>{{\r\n        View === \'tree\' ? \'view_module\' : \'account_tree\'\r\n      }}</mat-icon>\r\n    </button>\r\n  </mat-toolbar>\r\n  <mat-toolbar *ngIf="SelectedProfile" class="detail-toolbar" color="accent">\r\n    <div class="title-container" #title_container>\r\n      <div *ngIf="coreConfig.appName === APP_NAME_DIVE">\r\n        <div\r\n          class="title"\r\n          [data]="SelectedProfile!.name"\r\n          markdown\r\n          [class.long-title]="\r\n            title_width >= title_container_width &&\r\n            firstMovingAnimation &&\r\n            !stopAnimation\r\n          "\r\n          [class.long-title-1]="\r\n            title_width >= title_container_width &&\r\n            !firstMovingAnimation &&\r\n            !stopAnimation\r\n          "\r\n        ></div>\r\n      </div>\r\n      <div *ngIf="coreConfig.appName !== APP_NAME_DIVE">\r\n        <div\r\n          class="title"\r\n          [class.long-title]="\r\n            title_width >= title_container_width &&\r\n            firstMovingAnimation &&\r\n            !stopAnimation\r\n          "\r\n          [class.long-title-1]="\r\n            title_width >= title_container_width &&\r\n            !firstMovingAnimation &&\r\n            !stopAnimation\r\n          "\r\n        >\r\n          {{ SelectedProfile.name }}\r\n        </div>\r\n      </div>\r\n      <span *ngIf="SelectedProfile.sub_name">{{\r\n        SelectedProfile.sub_name\r\n      }}</span>\r\n    </div>\r\n    <div id="profile-detail-navigation">\r\n      <button\r\n        (click)="swipeLeft()"\r\n        [disabled]="SwipeLeft.id < 0"\r\n        mat-icon-button\r\n      >\r\n        <mat-icon>navigate_before</mat-icon>\r\n      </button>\r\n      <button (click)="selectProfile(undefined)" mat-icon-button>\r\n        <mat-icon>{{ SplitLayout ? \'close\' : \'expand_less\' }}</mat-icon>\r\n      </button>\r\n      <button\r\n        (click)="swipeRight()"\r\n        [disabled]="SwipeRight.id < 0"\r\n        mat-icon-button\r\n      >\r\n        <mat-icon>navigate_next</mat-icon>\r\n      </button>\r\n    </div>\r\n  </mat-toolbar>\r\n  <ng-container *ngIf="(SplitLayout || !SelectedProfile) && !isLoading">\r\n    <ng-container [ngSwitch]="(View === \'tree\' && Filter.value !== \'\') || View">\r\n      <solid-profile-grid\r\n        *ngSwitchCase="\'grid\'"\r\n        (selectProfile)="selectProfile($event)"\r\n        [class.full-width]="!SelectedProfile"\r\n        [profiles]="ProfilesFlatFiltered.asObservable()"\r\n        [selectedProfileId]="\r\n          SelectedProfile ? SelectedProfile.id : SelectedProfileShort.id\r\n        "\r\n        [selectedProfileType]="\r\n          SelectedProfile ? SelectedProfile.def_type : SelectedProfileShort.type\r\n        "\r\n        [isDiveApp]="coreConfig.appName === this.APP_NAME_DIVE"\r\n        (selectProfileTitle)="selectProfileTitle($event)"\r\n      ></solid-profile-grid>\r\n      <solid-profile-tree\r\n        *ngSwitchCase="\'tree\'"\r\n        (selectProfile)="selectProfile($event)"\r\n        (selectProfileTitle)="selectProfileTitle($event)"\r\n        [profiles]="$profilesTree"\r\n        [selectedProfileId]="\r\n          SelectedProfile ? SelectedProfile.id : SelectedProfileShort.id\r\n        "\r\n        [selectedProfileType]="\r\n          SelectedProfile ? SelectedProfile.def_type : SelectedProfileShort.type\r\n        "\r\n        [isDiveApp]="coreConfig.appName === this.APP_NAME_DIVE"\r\n        [collapseTree]="collapseTree"\r\n      ></solid-profile-tree>\r\n      <solid-profile-list\r\n        *ngSwitchDefault\r\n        (selectProfile)="selectProfile($event)"\r\n        (selectProfileTitle)="selectProfileTitle($event)"\r\n        [profiles]="ProfilesFlatFiltered.asObservable()"\r\n        [selectedProfileId]="\r\n          SelectedProfile ? SelectedProfile.id : SelectedProfileShort.id\r\n        "\r\n        [selectedProfileType]="\r\n          SelectedProfile ? SelectedProfile.def_type : SelectedProfileShort.type\r\n        "\r\n        [isDiveApp]="coreConfig.appName === this.APP_NAME_DIVE"\r\n      ></solid-profile-list>\r\n    </ng-container>\r\n  </ng-container>\r\n  <div *ngIf="isLoading">\r\n    <mat-card-content #spinnerContainer>\r\n      <mat-spinner color="primary" [diameter]="115"></mat-spinner>\r\n    </mat-card-content>\r\n  </div>\r\n  <solid-profile-detail\r\n    *ngIf="SelectedProfile && SelectedNode"\r\n    (selectProfile)="selectProfile($event)"\r\n    cdkScrollable\r\n    [node]="SelectedNode"\r\n    [profile]="SelectedProfile"\r\n  ></solid-profile-detail>\r\n</div>\r\n',
    styles: [
      ':host{display:block;height:100%}mat-form-field{width:0;transition:.5s ease-in-out}mat-form-field ::ng-deep div.mat-form-field-wrapper{padding:0}mat-form-field ::ng-deep div.mat-form-field-wrapper div.mat-form-field-flex{background-color:#0000;padding-bottom:2.5px;padding-left:0;margin-left:10px}mat-form-field ::ng-deep div.mat-form-field-wrapper div.mat-form-field-flex div.mat-form-field-suffix{margin-left:-.75em}mat-form-field ::ng-deep div.mat-form-field-underline{display:none}.openSearchBar{width:328px}mat-form-field flex{max-width:20em;padding-top:0}mat-form-field flex ::ng-deep div.mat-form-field-wrapper{padding:0}mat-form-field flex ::ng-deep div.mat-form-field-underline{display:none}mat-icon.clear-filter{cursor:pointer}div.content-container{display:grid;grid-template-columns:100%;grid-template-rows:56px 1fr;overflow:hidden;height:100%}div.content-container mat-toolbar.detail-toolbar{flex-flow:wrap}div.content-container mat-toolbar.detail-toolbar div.title-container{white-space:nowrap;display:flex;flex-direction:column;overflow:hidden;flex:1;margin-right:.5em}div.content-container mat-toolbar.detail-toolbar div.title-container span:nth-child(2){font-size:14px;line-height:27px;margin-top:-6px}div.content-container.splitLayout{grid-template-areas:"main-toolbar toolbar" "view profile";grid-template-columns:320px 1fr;max-height:100%}div.content-container.splitLayout mat-toolbar.detail-toolbar{grid-area:toolbar}div.content-container.splitLayout mat-toolbar.main-toolbar{grid-area:main-toolbar;width:101%;padding-right:25px}div.content-container.splitLayout mat-toolbar.full-width{grid-column:main-toolbar/toolbar}div.content-container.splitLayout solid-profile-detail{grid-area:profile;overflow-y:auto;margin-top:3px}div.content-container.splitLayout solid-profile-tree,div.content-container.splitLayout solid-profile-grid,div.content-container.splitLayout solid-profile-list{grid-area:view;overflow-y:auto}div.content-container.splitLayout solid-profile-tree.full-width,div.content-container.splitLayout solid-profile-grid.full-width,div.content-container.splitLayout solid-profile-list.full-width{grid-column:view/profile}div.content-container solid-profile-tree,div.content-container solid-profile-list{grid-row:2;overflow-y:auto}div.content-container mat-toolbar{grid-row:1}div.content-container solid-profile-detail{grid-row:2;overflow-y:auto;margin-top:3px}mat-toolbar{height:56px!important}.title{margin-right:-20em;display:inline-block}.title ::ng-deep p{margin-bottom:0}div.long-title{display:inline-block;animation:text-moving-1 12s linear infinite}div.long-title-1{display:inline-block;animation:text-moving-2 11s linear infinite}@keyframes text-moving-1{0%{transform:translate(0)}20%{transform:translate(0)}80%{transform:translate(-100%)}to{transform:translate(-150%)}}@keyframes text-moving-2{0%{transform:translate(100%)}to{transform:translate(-100%)}}mat-card-content{position:absolute;margin-top:100px}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i4.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i4.NgSwitch,
        selector: '[ngSwitch]',
        inputs: ['ngSwitch'],
      },
      {
        kind: 'directive',
        type: i4.NgSwitchCase,
        selector: '[ngSwitchCase]',
        inputs: ['ngSwitchCase'],
      },
      {
        kind: 'directive',
        type: i4.NgSwitchDefault,
        selector: '[ngSwitchDefault]',
      },
      {
        kind: 'directive',
        type: i5.DefaultValueAccessor,
        selector:
          'input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]',
      },
      {
        kind: 'directive',
        type: i5.NgControlStatus,
        selector: '[formControlName],[ngModel],[formControl]',
      },
      {
        kind: 'directive',
        type: i5.FormControlDirective,
        selector: '[formControl]',
        inputs: ['formControl', 'disabled', 'ngModel'],
        outputs: ['ngModelChange'],
        exportAs: ['ngForm'],
      },
      {
        kind: 'component',
        type: i6.MarkdownComponent,
        selector: '[markdown]',
        inputs: ['inline', 'data', 'appendData'],
      },
      {
        kind: 'directive',
        type: i7.CdkScrollable,
        selector: '[cdk-scrollable], [cdkScrollable]',
      },
      {
        kind: 'directive',
        type: i3.RouterLink,
        selector: '[routerLink]',
        inputs: [
          'target',
          'queryParams',
          'fragment',
          'queryParamsHandling',
          'state',
          'relativeTo',
          'preserveFragment',
          'skipLocationChange',
          'replaceUrl',
          'routerLink',
        ],
      },
      {
        kind: 'component',
        type: i8.MatIconButton,
        selector: 'button[mat-icon-button]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'component',
        type: i9.MatFormField,
        selector: 'mat-form-field',
        inputs: [
          'hideRequiredMarker',
          'color',
          'floatLabel',
          'appearance',
          'subscriptSizing',
          'hintLabel',
        ],
        exportAs: ['matFormField'],
      },
      { kind: 'directive', type: i9.MatLabel, selector: 'mat-label' },
      {
        kind: 'directive',
        type: i9.MatSuffix,
        selector: '[matSuffix], [matIconSuffix], [matTextSuffix]',
        inputs: ['matTextSuffix'],
      },
      {
        kind: 'component',
        type: i10.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'directive',
        type: i11.MatInput,
        selector:
          'input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]',
        inputs: [
          'disabled',
          'id',
          'placeholder',
          'name',
          'required',
          'type',
          'errorStateMatcher',
          'aria-describedby',
          'value',
          'readonly',
        ],
        exportAs: ['matInput'],
      },
      {
        kind: 'component',
        type: i12.MatProgressSpinner,
        selector: 'mat-progress-spinner, mat-spinner',
        inputs: ['color', 'mode', 'value', 'diameter', 'strokeWidth'],
        exportAs: ['matProgressSpinner'],
      },
      {
        kind: 'component',
        type: i13.MatToolbar,
        selector: 'mat-toolbar',
        inputs: ['color'],
        exportAs: ['matToolbar'],
      },
      {
        kind: 'directive',
        type: i14.MatCardContent,
        selector: 'mat-card-content',
      },
      {
        kind: 'component',
        type: i15.TreeComponent,
        selector: 'solid-profile-tree',
        inputs: [
          'selectedProfileId',
          'selectedProfileType',
          'profiles',
          'isDiveApp',
          'collapseTree',
        ],
        outputs: ['selectProfile', 'selectProfileTitle'],
      },
      {
        kind: 'component',
        type: i16.ListComponent,
        selector: 'solid-profile-list',
        inputs: [
          'profiles',
          'selectedProfileId',
          'selectedProfileType',
          'isDiveApp',
        ],
        outputs: ['selectProfile', 'selectProfileTitle'],
      },
      {
        kind: 'component',
        type: i17.DetailComponent,
        selector: 'solid-profile-detail',
        inputs: ['node', 'profile'],
        outputs: ['selectProfile'],
      },
      {
        kind: 'component',
        type: i18.GridComponent,
        selector: 'solid-profile-grid',
        inputs: [
          'profiles',
          'selectedProfileId',
          'selectedProfileType',
          'isDiveApp',
        ],
        outputs: ['selectProfile', 'selectProfileTitle'],
      },
    ],
  });
}
__decorate(
  [Select(ProfileState.selectTree), __metadata('design:type', Observable)],
  BaseComponent.prototype,
  '$profilesTree',
  void 0
);
__decorate(
  [Select(ProfileState.selectFlat), __metadata('design:type', Observable)],
  BaseComponent.prototype,
  '$profilesFlat',
  void 0
);
__decorate(
  [
    Select(ProfileState.selectProfileAndNode),
    __metadata('design:type', Observable),
  ],
  BaseComponent.prototype,
  '$profileAndCategorySelector',
  void 0
);
__decorate(
  [Select(ProfileState.selectProfile), __metadata('design:type', Observable)],
  BaseComponent.prototype,
  'profile$',
  void 0
);
__decorate(
  [
    Dispatch(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', []),
    __metadata('design:returntype', void 0),
  ],
  BaseComponent.prototype,
  'toggleGridTree',
  null
);
__decorate(
  [
    Dispatch(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', void 0),
  ],
  BaseComponent.prototype,
  'selectProfile',
  null
);
__decorate(
  [
    Dispatch(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Promise),
  ],
  BaseComponent.prototype,
  'navigateTo',
  null
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: BaseComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-profile-base',
          template:
            '<div\r\n  #contentContainer\r\n  [class.splitLayout]="SplitLayout"\r\n  class="content-container"\r\n  id="profile"\r\n>\r\n  <mat-toolbar\r\n    *ngIf="SplitLayout || !SelectedProfile"\r\n    [class.full-width]="!SelectedProfile"\r\n    class="main-toolbar"\r\n  >\r\n    <button mat-icon-button class="button-back" routerLink="">\r\n      <mat-icon>arrow_back</mat-icon>\r\n    </button>\r\n    <mat-form-field\r\n      appearance="fill"\r\n      floatLabel="auto"\r\n      [class.openSearchBar]="isSearchBarOpen"\r\n    >\r\n      <mat-label>Suche</mat-label>\r\n      <input\r\n        [formControl]="Filter"\r\n        matInput\r\n        type="text"\r\n        #search_input\r\n        (blur)="\r\n          Filter.value === \'\'\r\n            ? (isSearchBarOpen = false)\r\n            : (isSearchBarOpen = true)\r\n        "\r\n        (focus)="isSearchBarOpen = true"\r\n      />\r\n      <button mat-icon-button matSuffix (click)="Filter.setValue(\'\')">\r\n        <!--mat-icon *ngIf="Filter.value == \'\'" matSuffix>search</mat-icon-->\r\n        <mat-icon>\r\n          {{ Filter.value === \'\' ? \'search\' : \'close\' }}\r\n        </mat-icon>\r\n      </button>\r\n    </mat-form-field>\r\n    <div class="spacer"></div>\r\n    <button id="profile-view" (click)="toggleGridTree()" mat-icon-button>\r\n      <mat-icon>{{\r\n        View === \'tree\' ? \'view_module\' : \'account_tree\'\r\n      }}</mat-icon>\r\n    </button>\r\n  </mat-toolbar>\r\n  <mat-toolbar *ngIf="SelectedProfile" class="detail-toolbar" color="accent">\r\n    <div class="title-container" #title_container>\r\n      <div *ngIf="coreConfig.appName === APP_NAME_DIVE">\r\n        <div\r\n          class="title"\r\n          [data]="SelectedProfile!.name"\r\n          markdown\r\n          [class.long-title]="\r\n            title_width >= title_container_width &&\r\n            firstMovingAnimation &&\r\n            !stopAnimation\r\n          "\r\n          [class.long-title-1]="\r\n            title_width >= title_container_width &&\r\n            !firstMovingAnimation &&\r\n            !stopAnimation\r\n          "\r\n        ></div>\r\n      </div>\r\n      <div *ngIf="coreConfig.appName !== APP_NAME_DIVE">\r\n        <div\r\n          class="title"\r\n          [class.long-title]="\r\n            title_width >= title_container_width &&\r\n            firstMovingAnimation &&\r\n            !stopAnimation\r\n          "\r\n          [class.long-title-1]="\r\n            title_width >= title_container_width &&\r\n            !firstMovingAnimation &&\r\n            !stopAnimation\r\n          "\r\n        >\r\n          {{ SelectedProfile.name }}\r\n        </div>\r\n      </div>\r\n      <span *ngIf="SelectedProfile.sub_name">{{\r\n        SelectedProfile.sub_name\r\n      }}</span>\r\n    </div>\r\n    <div id="profile-detail-navigation">\r\n      <button\r\n        (click)="swipeLeft()"\r\n        [disabled]="SwipeLeft.id < 0"\r\n        mat-icon-button\r\n      >\r\n        <mat-icon>navigate_before</mat-icon>\r\n      </button>\r\n      <button (click)="selectProfile(undefined)" mat-icon-button>\r\n        <mat-icon>{{ SplitLayout ? \'close\' : \'expand_less\' }}</mat-icon>\r\n      </button>\r\n      <button\r\n        (click)="swipeRight()"\r\n        [disabled]="SwipeRight.id < 0"\r\n        mat-icon-button\r\n      >\r\n        <mat-icon>navigate_next</mat-icon>\r\n      </button>\r\n    </div>\r\n  </mat-toolbar>\r\n  <ng-container *ngIf="(SplitLayout || !SelectedProfile) && !isLoading">\r\n    <ng-container [ngSwitch]="(View === \'tree\' && Filter.value !== \'\') || View">\r\n      <solid-profile-grid\r\n        *ngSwitchCase="\'grid\'"\r\n        (selectProfile)="selectProfile($event)"\r\n        [class.full-width]="!SelectedProfile"\r\n        [profiles]="ProfilesFlatFiltered.asObservable()"\r\n        [selectedProfileId]="\r\n          SelectedProfile ? SelectedProfile.id : SelectedProfileShort.id\r\n        "\r\n        [selectedProfileType]="\r\n          SelectedProfile ? SelectedProfile.def_type : SelectedProfileShort.type\r\n        "\r\n        [isDiveApp]="coreConfig.appName === this.APP_NAME_DIVE"\r\n        (selectProfileTitle)="selectProfileTitle($event)"\r\n      ></solid-profile-grid>\r\n      <solid-profile-tree\r\n        *ngSwitchCase="\'tree\'"\r\n        (selectProfile)="selectProfile($event)"\r\n        (selectProfileTitle)="selectProfileTitle($event)"\r\n        [profiles]="$profilesTree"\r\n        [selectedProfileId]="\r\n          SelectedProfile ? SelectedProfile.id : SelectedProfileShort.id\r\n        "\r\n        [selectedProfileType]="\r\n          SelectedProfile ? SelectedProfile.def_type : SelectedProfileShort.type\r\n        "\r\n        [isDiveApp]="coreConfig.appName === this.APP_NAME_DIVE"\r\n        [collapseTree]="collapseTree"\r\n      ></solid-profile-tree>\r\n      <solid-profile-list\r\n        *ngSwitchDefault\r\n        (selectProfile)="selectProfile($event)"\r\n        (selectProfileTitle)="selectProfileTitle($event)"\r\n        [profiles]="ProfilesFlatFiltered.asObservable()"\r\n        [selectedProfileId]="\r\n          SelectedProfile ? SelectedProfile.id : SelectedProfileShort.id\r\n        "\r\n        [selectedProfileType]="\r\n          SelectedProfile ? SelectedProfile.def_type : SelectedProfileShort.type\r\n        "\r\n        [isDiveApp]="coreConfig.appName === this.APP_NAME_DIVE"\r\n      ></solid-profile-list>\r\n    </ng-container>\r\n  </ng-container>\r\n  <div *ngIf="isLoading">\r\n    <mat-card-content #spinnerContainer>\r\n      <mat-spinner color="primary" [diameter]="115"></mat-spinner>\r\n    </mat-card-content>\r\n  </div>\r\n  <solid-profile-detail\r\n    *ngIf="SelectedProfile && SelectedNode"\r\n    (selectProfile)="selectProfile($event)"\r\n    cdkScrollable\r\n    [node]="SelectedNode"\r\n    [profile]="SelectedProfile"\r\n  ></solid-profile-detail>\r\n</div>\r\n',
          styles: [
            ':host{display:block;height:100%}mat-form-field{width:0;transition:.5s ease-in-out}mat-form-field ::ng-deep div.mat-form-field-wrapper{padding:0}mat-form-field ::ng-deep div.mat-form-field-wrapper div.mat-form-field-flex{background-color:#0000;padding-bottom:2.5px;padding-left:0;margin-left:10px}mat-form-field ::ng-deep div.mat-form-field-wrapper div.mat-form-field-flex div.mat-form-field-suffix{margin-left:-.75em}mat-form-field ::ng-deep div.mat-form-field-underline{display:none}.openSearchBar{width:328px}mat-form-field flex{max-width:20em;padding-top:0}mat-form-field flex ::ng-deep div.mat-form-field-wrapper{padding:0}mat-form-field flex ::ng-deep div.mat-form-field-underline{display:none}mat-icon.clear-filter{cursor:pointer}div.content-container{display:grid;grid-template-columns:100%;grid-template-rows:56px 1fr;overflow:hidden;height:100%}div.content-container mat-toolbar.detail-toolbar{flex-flow:wrap}div.content-container mat-toolbar.detail-toolbar div.title-container{white-space:nowrap;display:flex;flex-direction:column;overflow:hidden;flex:1;margin-right:.5em}div.content-container mat-toolbar.detail-toolbar div.title-container span:nth-child(2){font-size:14px;line-height:27px;margin-top:-6px}div.content-container.splitLayout{grid-template-areas:"main-toolbar toolbar" "view profile";grid-template-columns:320px 1fr;max-height:100%}div.content-container.splitLayout mat-toolbar.detail-toolbar{grid-area:toolbar}div.content-container.splitLayout mat-toolbar.main-toolbar{grid-area:main-toolbar;width:101%;padding-right:25px}div.content-container.splitLayout mat-toolbar.full-width{grid-column:main-toolbar/toolbar}div.content-container.splitLayout solid-profile-detail{grid-area:profile;overflow-y:auto;margin-top:3px}div.content-container.splitLayout solid-profile-tree,div.content-container.splitLayout solid-profile-grid,div.content-container.splitLayout solid-profile-list{grid-area:view;overflow-y:auto}div.content-container.splitLayout solid-profile-tree.full-width,div.content-container.splitLayout solid-profile-grid.full-width,div.content-container.splitLayout solid-profile-list.full-width{grid-column:view/profile}div.content-container solid-profile-tree,div.content-container solid-profile-list{grid-row:2;overflow-y:auto}div.content-container mat-toolbar{grid-row:1}div.content-container solid-profile-detail{grid-row:2;overflow-y:auto;margin-top:3px}mat-toolbar{height:56px!important}.title{margin-right:-20em;display:inline-block}.title ::ng-deep p{margin-bottom:0}div.long-title{display:inline-block;animation:text-moving-1 12s linear infinite}div.long-title-1{display:inline-block;animation:text-moving-2 11s linear infinite}@keyframes text-moving-1{0%{transform:translate(0)}20%{transform:translate(0)}80%{transform:translate(-100%)}to{transform:translate(-150%)}}@keyframes text-moving-2{0%{transform:translate(100%)}to{transform:translate(-100%)}}mat-card-content{position:absolute;margin-top:100px}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      { type: i1.Store },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [SOLID_PROFILE_BASE_URL],
          },
        ],
      },
      { type: i2.IntroService },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [SOLID_CORE_CONFIG],
          },
        ],
      },
      { type: i3.Router },
      { type: i3.ActivatedRoute },
    ];
  },
  propDecorators: {
    titleContainer: [
      {
        type: ViewChild,
        args: ['title_container', { static: false }],
      },
    ],
    contentContainer: [
      {
        type: ViewChild,
        args: ['contentContainer', { static: false }],
      },
    ],
    spinnerContainer: [
      {
        type: ViewChild,
        args: ['spinnerContainer', { static: false }],
      },
    ],
    $profilesTree: [],
    $profilesFlat: [],
    $profileAndCategorySelector: [],
    profileTitle: [
      {
        type: Output,
      },
    ],
    profile$: [],
    onResize: [
      {
        type: HostListener,
        args: ['window:resize', ['$event']],
      },
    ],
    toggleGridTree: [],
    selectProfile: [],
    navigateTo: [],
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3Byb2ZpbGUvc3JjL2xpYi9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3Byb2ZpbGUvc3JjL2xpYi9jb21wb25lbnRzL2Jhc2UvYmFzZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFHTixNQUFNLEVBQ04sU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUV6RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNwRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDL0MsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDaEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3pELE9BQU8sRUFDTCxjQUFjLEVBQ2QscUJBQXFCLEVBQ3JCLFlBQVksR0FDYixNQUFNLDZCQUE2QixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM1RCxPQUFPLEVBQW1CLGlCQUFpQixFQUFFLE1BQU0seUJBQXlC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LGNBQWM7c0JBRHBCLFNBQVM7dUJBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUd4QyxnQkFBZ0I7c0JBRHRCLFNBQVM7dUJBQUMsa0JBQWtCLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQUVNLGdCQUFnQjtzQkFBckUsU0FBUzt1QkFBQyxrQkFBa0IsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBZXpDLGFBQWEsTUFFYixhQUFhLE1BRWIsMkJBQTJCLE1BMEJ4QixZQUFZO3NCQUFyQixNQUFNO2dCQUU2QixRQUFRLE1BaUNyQyxRQUFRO3NCQURkLFlBQVk7dUJBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQWtMbEMsY0FBYyxNQXlCZCxhQUFhLE1BaUZQLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbmplY3QsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgVmlld0NoaWxkLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTZWxlY3QsIFN0b3JlIH0gZnJvbSAnQG5neHMvc3RvcmUnO1xyXG5pbXBvcnQgeyBQcm9maWxlU3RhdGUgfSBmcm9tICcuLi8uLi9zdGF0ZS9wcm9maWxlLnN0YXRlJztcclxuaW1wb3J0IHsgVHJlZU5vZGUsIFByb2ZpbGUsIFByb2ZpbGVTaG9ydCB9IGZyb20gJy4uLy4uL3N0YXRlL3Byb2ZpbGUubW9kZWwnO1xyXG5pbXBvcnQgeyBVbnR5cGVkRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IE5hdmlnYXRlIH0gZnJvbSAnQG5neHMvcm91dGVyLXBsdWdpbic7XHJcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgRGlzcGF0Y2ggfSBmcm9tICdAbmd4cy1sYWJzL2Rpc3BhdGNoLWRlY29yYXRvcic7XHJcbmltcG9ydCB7XHJcbiAgTG9hZERlZmluaXRpb24sXHJcbiAgTG9hZERlZmluaXRpb25Td2FnZ2VyLFxyXG4gIExvYWRQcm9maWxlcyxcclxufSBmcm9tICcuLi8uLi9zdGF0ZS9wcm9maWxlLmFjdGlvbnMnO1xyXG5pbXBvcnQgeyBTT0xJRF9QUk9GSUxFX0JBU0VfVVJMIH0gZnJvbSAnLi4vLi4vYmFzZS11cmwnO1xyXG5pbXBvcnQgeyBJbnRyb1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9pbnRyby5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU29saWRDb3JlQ29uZmlnLCBTT0xJRF9DT1JFX0NPTkZJRyB9IGZyb20gJ0B6ZW50cnVtbmF3aS9zb2xpZC1jb3JlJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFBhcmFtTWFwLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW50ZXJuYWxfX3NlbGVjdFJvdXRlclN0YXRlUGFyYW1zKHM6IGFueSkge1xyXG4gIHJldHVybiBzLnJvdXRlci5zdGF0ZS5wYXJhbXM7XHJcbn1cclxuZXhwb3J0IGVudW0gQVBQIHtcclxuICBESVZFID0gJ0Rpdi1lJyxcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzb2xpZC1wcm9maWxlLWJhc2UnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9iYXNlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9iYXNlLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBWaWV3Q2hpbGQoJ3RpdGxlX2NvbnRhaW5lcicsIHsgc3RhdGljOiBmYWxzZSB9KVxyXG4gIHB1YmxpYyB0aXRsZUNvbnRhaW5lcj86IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnY29udGVudENvbnRhaW5lcicsIHsgc3RhdGljOiBmYWxzZSB9KVxyXG4gIHB1YmxpYyBjb250ZW50Q29udGFpbmVyITogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCdzcGlubmVyQ29udGFpbmVyJywgeyBzdGF0aWM6IGZhbHNlIH0pIHNldCBzcGlubmVyQ29udGFpbmVyKFxyXG4gICAgZWxlbWVudDogRWxlbWVudFJlZlxyXG4gICkge1xyXG4gICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgY29uc3Qgd2luZG93V2lkdGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7XHJcbiAgICAgIGNvbnN0IHBvc2l0aW9uID1cclxuICAgICAgICB3aW5kb3dXaWR0aCA+PSAxMDAwXHJcbiAgICAgICAgICA/ICh3aW5kb3dXaWR0aCAtIDExNSAtIDMwMCkgLyAyXHJcbiAgICAgICAgICA6ICh3aW5kb3dXaWR0aCAtIDExNSkgLyAyO1xyXG4gICAgICBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9IHBvc2l0aW9uICsgJ3B4JztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBBUFBfTkFNRV9ESVZFID0gQVBQLkRJVkU7XHJcbiAgQFNlbGVjdChQcm9maWxlU3RhdGUuc2VsZWN0VHJlZSlcclxuICBwdWJsaWMgJHByb2ZpbGVzVHJlZSE6IE9ic2VydmFibGU8VHJlZU5vZGVbXT47XHJcbiAgQFNlbGVjdChQcm9maWxlU3RhdGUuc2VsZWN0RmxhdClcclxuICBwdWJsaWMgJHByb2ZpbGVzRmxhdCE6IE9ic2VydmFibGU8UHJvZmlsZVtdPjtcclxuICBAU2VsZWN0KFByb2ZpbGVTdGF0ZS5zZWxlY3RQcm9maWxlQW5kTm9kZSlcclxuICBwdWJsaWMgJHByb2ZpbGVBbmRDYXRlZ29yeVNlbGVjdG9yITogT2JzZXJ2YWJsZTxcclxuICAgIChcclxuICAgICAgcHJvZmlsZUlkPzogbnVtYmVyLFxyXG4gICAgICBwcm9maWxlVHlwZT86IHN0cmluZyB8IG51bGxcclxuICAgICkgPT4geyBwcm9maWxlOiBQcm9maWxlOyBub2RlOiBUcmVlTm9kZSB9IHwgbnVsbFxyXG4gID47XHJcbiAgcHVibGljICRwYXJhbU1hcDogT2JzZXJ2YWJsZTxQYXJhbU1hcD47XHJcbiAgcHVibGljICRxdWVyeVBhcmFtczogT2JzZXJ2YWJsZTx7IHZpZXc6IHN0cmluZyB9PjtcclxuICBwdWJsaWMgUHJvZmlsZXNGbGF0RmlsdGVyZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFByb2ZpbGVbXT4oW10pO1xyXG4gIHB1YmxpYyBTcGxpdExheW91dCA9IGZhbHNlO1xyXG4gIHB1YmxpYyBGaWx0ZXIgPSBuZXcgVW50eXBlZEZvcm1Db250cm9sKCcnKTtcclxuICBwdWJsaWMgRmlsdGVyVmFsdWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZz4oJycpO1xyXG4gIHB1YmxpYyBTZWxlY3RlZFByb2ZpbGU6IFByb2ZpbGUgfCBudWxsID0gbnVsbDtcclxuICBwdWJsaWMgU2VsZWN0ZWRQcm9maWxlU2hvcnQ6IFByb2ZpbGVTaG9ydCA9IHsgaWQ6IC0xLCB0eXBlOiB1bmRlZmluZWQgfTtcclxuICBwdWJsaWMgU2VsZWN0ZWROb2RlOiBUcmVlTm9kZSB8IG51bGwgPSBudWxsO1xyXG4gIHB1YmxpYyBTd2lwZUxlZnQ6IFByb2ZpbGVTaG9ydCA9IHsgaWQ6IC0xIH07XHJcbiAgcHVibGljIFN3aXBlUmlnaHQ6IFByb2ZpbGVTaG9ydCA9IHsgaWQ6IC0xIH07XHJcbiAgcHVibGljIFZpZXcgPSAndHJlZSc7XHJcbiAgcHVibGljIGlzU2VhcmNoQmFyT3BlbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyB0aXRsZV9jb250YWluZXJfd2lkdGggPSAwO1xyXG4gIHB1YmxpYyB0aXRsZV93aWR0aCA9IDA7XHJcbiAgcHVibGljIGZpcnN0TW92aW5nQW5pbWF0aW9uID0gdHJ1ZTtcclxuICBwdWJsaWMgc3RvcEFuaW1hdGlvbiA9IHRydWU7XHJcbiAgcHVibGljIHRpbWVPdXRfMTogYW55O1xyXG4gIHB1YmxpYyB0aW1lT3V0XzI6IGFueTtcclxuICBwdWJsaWMgY29sbGFwc2VUcmVlID0gZmFsc2U7XHJcbiAgQE91dHB1dCgpIHByb2ZpbGVUaXRsZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICBAU2VsZWN0KFByb2ZpbGVTdGF0ZS5zZWxlY3RQcm9maWxlKSBwcm9maWxlJCE6IE9ic2VydmFibGU8YW55PjtcclxuICBpc0xvYWRpbmcgPSB0cnVlO1xyXG5cclxuICBwdWJsaWMgbWFpblN1YnNjcmlwdGlvbiE6IFN1YnNjcmlwdGlvbjtcclxuICBwdWJsaWMgZmlsdGVyU3Vic2NyaXB0aW9uITogU3Vic2NyaXB0aW9uO1xyXG4gIHB1YmxpYyBwcm9maWxlU3Vic2NyaXB0aW9uITogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX3N0b3JlOiBTdG9yZSxcclxuICAgIEBJbmplY3QoU09MSURfUFJPRklMRV9CQVNFX1VSTCkgcHVibGljIGJhc2VVcmw6IHN0cmluZyxcclxuICAgIHByaXZhdGUgaW50cm9TZXJ2aWNlOiBJbnRyb1NlcnZpY2UsXHJcbiAgICBASW5qZWN0KFNPTElEX0NPUkVfQ09ORklHKSBwdWJsaWMgY29yZUNvbmZpZzogU29saWRDb3JlQ29uZmlnLFxyXG4gICAgcHJpdmF0ZSBfcm91dGU6IFJvdXRlcixcclxuICAgIHByaXZhdGUgX2FjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVxyXG4gICkge1xyXG4gICAgdGhpcy4kcGFyYW1NYXAgPSB0aGlzLl9hY3RpdmF0ZWRSb3V0ZS5wYXJhbU1hcCBhcyBPYnNlcnZhYmxlPFBhcmFtTWFwPjtcclxuICAgIHRoaXMuJHF1ZXJ5UGFyYW1zID0gdGhpcy5fYWN0aXZhdGVkUm91dGUucXVlcnlQYXJhbXMgYXMgT2JzZXJ2YWJsZTx7XHJcbiAgICAgIHZpZXc6IHN0cmluZztcclxuICAgIH0+O1xyXG5cclxuICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKFtcclxuICAgICAgbmV3IExvYWREZWZpbml0aW9uKCksXHJcbiAgICAgIG5ldyBMb2FkUHJvZmlsZXMoKSxcclxuICAgICAgLy8gTG9hZCBkZWZpbml0aW9ucyBmcm9tIE9wZW5BUEkgMi4wXHJcbiAgICAgIG5ldyBMb2FkRGVmaW5pdGlvblN3YWdnZXIoKSxcclxuICAgIF0pO1xyXG5cclxuICAgIHRoaXMucHJvZmlsZVN1YnNjcmlwdGlvbiA9IHRoaXMucHJvZmlsZSQ/LnN1YnNjcmliZSgocmVzKSA9PiB7XHJcbiAgICAgIGlmIChyZXMubGVuZ3RoICE9IDApIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnLCBbJyRldmVudCddKVxyXG4gIHB1YmxpYyBvblJlc2l6ZSgpIHtcclxuICAgIHRoaXMuY2FsY3VsYXRlTGF5b3V0KCk7XHJcbiAgICB0aGlzLmhhbmRsZUxvbmdUaXRsZSgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLm1haW5TdWJzY3JpcHRpb24gPSBjb21iaW5lTGF0ZXN0KFtcclxuICAgICAgdGhpcy4kcGFyYW1NYXAsXHJcbiAgICAgIHRoaXMuJHF1ZXJ5UGFyYW1zLFxyXG4gICAgICB0aGlzLiRwcm9maWxlQW5kQ2F0ZWdvcnlTZWxlY3RvcixcclxuICAgICAgdGhpcy4kcHJvZmlsZXNGbGF0LFxyXG4gICAgICB0aGlzLkZpbHRlclZhbHVlLFxyXG4gICAgXSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgbWFwKCh2KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB7IHBhcmFtcywgcXVlcnlQYXJhbXMsIHNlbGVjdG9yLCBmbGF0LCBmaWx0ZXJTdHIgfSA9IHtcclxuICAgICAgICAgICAgcGFyYW1zOiB2WzBdLFxyXG4gICAgICAgICAgICBxdWVyeVBhcmFtczogdlsxXSxcclxuICAgICAgICAgICAgc2VsZWN0b3I6IHZbMl0sXHJcbiAgICAgICAgICAgIGZsYXQ6IHZbM10sXHJcbiAgICAgICAgICAgIGZpbHRlclN0cjogdls0XSxcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgY29uc3QgaWQgPSBwYXJhbXMuZ2V0KCdpZCcpO1xyXG4gICAgICAgICAgY29uc3QgdHlwZSA9IHBhcmFtcy5nZXQoJ3R5cGUnKTtcclxuXHJcbiAgICAgICAgICAvLyB0ZW1wb3Jhcnkgd29ya2Fyb3VuZCBmb3IgcGxhbnR5IHNpbmNlIHRoZSB2aWV3IGlzIHN0aWxsIGluIHRoZSBVUkxcclxuICAgICAgICAgIGNvbnN0IHZpZXcgPVxyXG4gICAgICAgICAgICB0aGlzLmdldFByb2ZpbGVUeXBlKHR5cGUpID09PSAnd2luZScgPyB0eXBlIDogcXVlcnlQYXJhbXNbJ3ZpZXcnXTtcclxuICAgICAgICAgIHRoaXMuVmlldyA9IHZpZXcgPyB2aWV3IDogJ3RyZWUnO1xyXG5cclxuICAgICAgICAgIC8vIHNlbGVjdCBwcm9maWxlXHJcbiAgICAgICAgICBjb25zdCBwcm9maWxlSWQgPSBpZCA/IHBhcnNlSW50KGlkLCAxMCkgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICBjb25zdCBwcm9maWxlVHlwZSA9IHRoaXMuZ2V0UHJvZmlsZVR5cGUodHlwZSk7XHJcblxyXG4gICAgICAgICAgY29uc3QgcHJvZmlsZUFuZE5vZGUgPSBzZWxlY3Rvcihwcm9maWxlSWQsIHByb2ZpbGVUeXBlKTtcclxuXHJcbiAgICAgICAgICAvLyBmaWx0ZXIgcHJvZmlsZXNcclxuICAgICAgICAgIGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoZmlsdGVyU3RyLCAnaScpO1xyXG4gICAgICAgICAgY29uc3QgcHJvZmlsZXNGbGF0RmlsdGVyZWQgPSBmbGF0LmZpbHRlcigocCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocC5uYW1lLm1hdGNoKHJlZ0V4cCkpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocC5zdWJfbmFtZSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiAhIXAuc3ViX25hbWUubWF0Y2gocmVnRXhwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgLy8gbm8gcHJvZmlsZSBzZWxlY3RlZFxyXG4gICAgICAgICAgaWYgKCFwcm9maWxlSWQgfHwgIXByb2ZpbGVBbmROb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgc2VsZWN0ZWRQcm9maWxlOiBudWxsLFxyXG4gICAgICAgICAgICAgIHNlbGVjdGVkTm9kZTogbnVsbCxcclxuICAgICAgICAgICAgICBwcm9maWxlc0ZsYXRGaWx0ZXJlZCxcclxuICAgICAgICAgICAgICBzd2lwZVJpZ2h0OiB7IGlkOiAtMSB9LFxyXG4gICAgICAgICAgICAgIHN3aXBlTGVmdDogeyBpZDogLTEgfSxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGxldCBzd2lwZVJpZ2h0OiBQcm9maWxlU2hvcnQgPSB7XHJcbiAgICAgICAgICAgIGlkOiAtMSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBsZXQgc3dpcGVMZWZ0OiBQcm9maWxlU2hvcnQgPSB7XHJcbiAgICAgICAgICAgIGlkOiAtMSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICBpZiAodGhpcy5WaWV3ID09PSAnZ3JpZCcgfHwgZmlsdGVyU3RyICE9PSAnJykge1xyXG4gICAgICAgICAgICBjb25zdCBmbGF0SW5kZXggPSBwcm9maWxlc0ZsYXRGaWx0ZXJlZC5maW5kSW5kZXgoXHJcbiAgICAgICAgICAgICAgKHApID0+IHAuaWQgPT09IHByb2ZpbGVJZCAmJiBwLmRlZl90eXBlID09PSBwcm9maWxlVHlwZVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBpZiAoZmxhdEluZGV4ICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgY29uc3QgcHJvZmlsZSA9IHByb2ZpbGVzRmxhdEZpbHRlcmVkW2ZsYXRJbmRleCAtIDFdO1xyXG4gICAgICAgICAgICAgIHN3aXBlTGVmdCA9IHRoaXMuZ2V0UHJvZmlsZVNob3J0KHByb2ZpbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChmbGF0SW5kZXggIT09IHByb2ZpbGVzRmxhdEZpbHRlcmVkLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICBjb25zdCBwcm9maWxlID0gcHJvZmlsZXNGbGF0RmlsdGVyZWRbZmxhdEluZGV4ICsgMV07XHJcbiAgICAgICAgICAgICAgc3dpcGVSaWdodCA9IHRoaXMuZ2V0UHJvZmlsZVNob3J0KHByb2ZpbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHByb2ZpbGVBbmROb2RlLm5vZGUucHJvZmlsZXMuaW5kZXhPZihcclxuICAgICAgICAgICAgICBwcm9maWxlQW5kTm9kZS5wcm9maWxlXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5GaWx0ZXIudmFsdWUpIHtcclxuICAgICAgICAgICAgICBjb25zdCBwcm9maWxlTGVmdCA9IHByb2ZpbGVBbmROb2RlLm5vZGUucHJvZmlsZXMuZmluZChcclxuICAgICAgICAgICAgICAgIChwLCBpKSA9PiBpID09PSBpbmRleCAtIDFcclxuICAgICAgICAgICAgICApIGFzIFByb2ZpbGUgfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgc3dpcGVMZWZ0ID0gdGhpcy5nZXRQcm9maWxlU2hvcnQocHJvZmlsZUxlZnQpO1xyXG5cclxuICAgICAgICAgICAgICBjb25zdCBwcm9maWxlUmlnaHQgPSBwcm9maWxlQW5kTm9kZS5ub2RlLnByb2ZpbGVzLmZpbmQoXHJcbiAgICAgICAgICAgICAgICAocCwgaSkgPT4gaSA+IGluZGV4XHJcbiAgICAgICAgICAgICAgKSBhcyBQcm9maWxlIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgIHN3aXBlUmlnaHQgPSB0aGlzLmdldFByb2ZpbGVTaG9ydChwcm9maWxlUmlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLmhhbmRsZUxvbmdUaXRsZSgpO1xyXG5cclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkUHJvZmlsZTogcHJvZmlsZUFuZE5vZGUucHJvZmlsZSxcclxuICAgICAgICAgICAgc2VsZWN0ZWROb2RlOiBwcm9maWxlQW5kTm9kZS5ub2RlLFxyXG4gICAgICAgICAgICBwcm9maWxlc0ZsYXRGaWx0ZXJlZCxcclxuICAgICAgICAgICAgc3dpcGVSaWdodCxcclxuICAgICAgICAgICAgc3dpcGVMZWZ0LFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9KVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKHYpID0+IHtcclxuICAgICAgICB0aGlzLlNlbGVjdGVkUHJvZmlsZSA9IHYuc2VsZWN0ZWRQcm9maWxlO1xyXG4gICAgICAgIHRoaXMuU2VsZWN0ZWROb2RlID0gdi5zZWxlY3RlZE5vZGU7XHJcbiAgICAgICAgdGhpcy5Qcm9maWxlc0ZsYXRGaWx0ZXJlZC5uZXh0KHYucHJvZmlsZXNGbGF0RmlsdGVyZWQpO1xyXG4gICAgICAgIHRoaXMuU3dpcGVMZWZ0ID0gdi5zd2lwZUxlZnQ7XHJcbiAgICAgICAgdGhpcy5Td2lwZVJpZ2h0ID0gdi5zd2lwZVJpZ2h0O1xyXG4gICAgICB9KTtcclxuICAgIHRoaXMuZmlsdGVyU3Vic2NyaXB0aW9uID0gdGhpcy5GaWx0ZXIudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoXykgPT5cclxuICAgICAgdGhpcy5GaWx0ZXJWYWx1ZS5uZXh0KHRoaXMuRmlsdGVyLnZhbHVlKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZUxheW91dCgpO1xyXG5cclxuICAgIHRoaXMucHJvZmlsZVN1YnNjcmlwdGlvbiA9IHRoaXMucHJvZmlsZSQuc3Vic2NyaWJlKChyZXMpID0+IHtcclxuICAgICAgaWYgKHJlcy5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdoaWRlX3Byb2ZpbGVfdG91cicpID09ICdmYWxzZScgfHxcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdoaWRlX3Byb2ZpbGVfdG91cicpID09IG51bGxcclxuICAgICAgICApIHtcclxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmludHJvU2VydmljZS5wcm9maWxlVG91cigoX3RhcmdldEVsZW1lbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpZCA9IF90YXJnZXRFbGVtZW50LmlkO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHJlZU5vZGVMb2NhdGlvbiA9XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29yZUNvbmZpZy5wcm9maWxlVG91ci5sb2NhdGlvbi50cmVlTm9kZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRyZWVMb2NhdGlvbiA9XHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29yZUNvbmZpZy5wcm9maWxlVG91ci5sb2NhdGlvbi5wcm9maWxlVHJlZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2VUcmVlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWQgIT0gJ3Byb2ZpbGUnKVxyXG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmludHJvU2VydmljZS5pbnRyb1Byb2ZpbGUucmVmcmVzaCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgfSwgMzY1KTtcclxuICAgICAgICAgICAgICAgIGlmIChpZCA9PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcm91dGUudXJsID09IHRyZWVMb2NhdGlvbilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlVG8odHJlZU5vZGVMb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9yb3V0ZS51cmwgPT0gdHJlZU5vZGVMb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0ZXBzID0gdGhpcy5jb3JlQ29uZmlnLnByb2ZpbGVUb3VyLnN0ZXBzO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRTdGVwID1cclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9TZXJ2aWNlLmludHJvUHJvZmlsZS5fY3VycmVudFN0ZXA7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcHMuc3BsaWNlKGN1cnJlbnRTdGVwLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW50cm9TZXJ2aWNlLmludHJvUHJvZmlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuZ29Ub1N0ZXAoY3VycmVudFN0ZXApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDAuMSk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaWQgPT0gJ3Byb2ZpbGUtdmlldycgfHwgaWQgPT0gJ3Byb2ZpbGUnKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9yb3V0ZS51cmwgIT0gdHJlZUxvY2F0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVUbyh0cmVlTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlVHJlZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5pbnRyb1NlcnZpY2UuaW50cm9Qcm9maWxlLnJlZnJlc2godHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9LCAwLjEpO1xyXG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9LCA4MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLm1haW5TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuZmlsdGVyU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLnByb2ZpbGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIEBEaXNwYXRjaCgpXHJcbiAgcHVibGljIHRvZ2dsZUdyaWRUcmVlKCkge1xyXG4gICAgdGhpcy5WaWV3ID0gdGhpcy5WaWV3ID09PSAndHJlZScgPyAnZ3JpZCcgOiAndHJlZSc7XHJcbiAgICBpZiAodGhpcy5TZWxlY3RlZFByb2ZpbGUpIHtcclxuICAgICAgcmV0dXJuIG5ldyBOYXZpZ2F0ZShcclxuICAgICAgICBbXHJcbiAgICAgICAgICBgJHt0aGlzLmJhc2VVcmx9YCxcclxuICAgICAgICAgIHRoaXMuU2VsZWN0ZWRQcm9maWxlLmRlZl90eXBlICE9PSAnd2luZSdcclxuICAgICAgICAgICAgPyB0aGlzLlNlbGVjdGVkUHJvZmlsZS5kZWZfdHlwZVxyXG4gICAgICAgICAgICA6IHRoaXMuVmlldyxcclxuICAgICAgICAgIHRoaXMuU2VsZWN0ZWRQcm9maWxlLmlkLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdmlldzpcclxuICAgICAgICAgICAgdGhpcy5TZWxlY3RlZFByb2ZpbGUuZGVmX3R5cGUgIT09ICd3aW5lJyA/IHRoaXMuVmlldyA6IHVuZGVmaW5lZCxcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IE5hdmlnYXRlKFxyXG4gICAgICBbYCR7dGhpcy5iYXNlVXJsfWBdLFxyXG4gICAgICB7IHZpZXc6IHRoaXMuVmlldyB9LFxyXG4gICAgICB7IHJlcGxhY2VVcmw6IHRydWUgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIEBEaXNwYXRjaCgpXHJcbiAgcHVibGljIHNlbGVjdFByb2ZpbGUocHJvZmlsZT86IG51bWJlciB8IFByb2ZpbGVTaG9ydCkge1xyXG4gICAgaWYgKCFwcm9maWxlKSB7XHJcbiAgICAgIHJldHVybiBuZXcgTmF2aWdhdGUoW2Ake3RoaXMuYmFzZVVybH1gXSwge1xyXG4gICAgICAgIHZpZXc6IHRoaXMuVmlldyA/IHRoaXMuVmlldyA6IHVuZGVmaW5lZCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHByb2ZpbGUgIT09ICdudW1iZXInICYmIHByb2ZpbGUudHlwZSkge1xyXG4gICAgICB0aGlzLlNlbGVjdGVkUHJvZmlsZVNob3J0ID0gcHJvZmlsZTtcclxuICAgICAgaWYgKHByb2ZpbGUudHlwZSA9PT0gJ3dpbmUnKSB7XHJcbiAgICAgICAgLy8gdGVtcG9yYXJ5IHdvcmthcm91bmQgZm9yIFBMQU5UWSAtIHR5cGUgd2luZV9yZWxhdGVkIGRvZXNuJ3QgaGF2ZSBhIHR5cGUgaW4gdGhlIFVSTFxyXG4gICAgICAgIHJldHVybiBuZXcgTmF2aWdhdGUoW2Ake3RoaXMuYmFzZVVybH1gLCB0aGlzLlZpZXcsIHByb2ZpbGUuaWRdKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBwcm9maWxlVHlwZSA9IHByb2ZpbGUudHlwZTtcclxuICAgICAgICByZXR1cm4gbmV3IE5hdmlnYXRlKFtgJHt0aGlzLmJhc2VVcmx9YCwgcHJvZmlsZVR5cGUsIHByb2ZpbGUuaWRdLCB7XHJcbiAgICAgICAgICB2aWV3OiB0aGlzLlZpZXcsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBuZXcgTmF2aWdhdGUoW2Ake3RoaXMuYmFzZVVybH1gLCB0aGlzLlZpZXcsIHByb2ZpbGVdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzd2lwZUxlZnQoKSB7XHJcbiAgICBpZiAodGhpcy5Td2lwZUxlZnQuaWQgPiAwKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0UHJvZmlsZSh0aGlzLlN3aXBlTGVmdCk7XHJcbiAgICB9XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5wcm9maWxlVGl0bGUuZW1pdCh0aGlzLlNlbGVjdGVkUHJvZmlsZT8ubmFtZSk7XHJcbiAgICB9LCAxMCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3dpcGVSaWdodCgpIHtcclxuICAgIGlmICh0aGlzLlN3aXBlUmlnaHQuaWQgPiAwKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0UHJvZmlsZSh0aGlzLlN3aXBlUmlnaHQpO1xyXG4gICAgfVxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMucHJvZmlsZVRpdGxlLmVtaXQodGhpcy5TZWxlY3RlZFByb2ZpbGU/Lm5hbWUpO1xyXG4gICAgfSwgMTApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uUGFuRW5kKCRldmVudDogYW55KSB7XHJcbiAgICBpZiAoJGV2ZW50LmRlbHRhWCA+IDEwMCAmJiB0aGlzLlN3aXBlTGVmdCkge1xyXG4gICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdGhpcy5zd2lwZUxlZnQoKTtcclxuICAgIH0gZWxzZSBpZiAoJGV2ZW50LmRlbHRhWCA8IC0xMDAgJiYgdGhpcy5Td2lwZVJpZ2h0KSB7XHJcbiAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLnN3aXBlUmlnaHQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2FsY3VsYXRlTGF5b3V0KCkge1xyXG4gICAgY29uc3Qgc3BsaXQgPSB0aGlzLmNvbnRlbnRDb250YWluZXIubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aCA+PSA5MDA7XHJcbiAgICBpZiAoc3BsaXQgIT09IHRoaXMuU3BsaXRMYXlvdXQpIHtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5TcGxpdExheW91dCA9IHNwbGl0O1xyXG4gICAgICB9LCAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZWxlY3RQcm9maWxlVGl0bGUodGl0bGU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgaWYgKHRpdGxlKSB0aGlzLnByb2ZpbGVUaXRsZS5lbWl0KHRpdGxlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRQcm9maWxlVHlwZSh0eXBlOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsKTogc3RyaW5nIHtcclxuICAgIGlmICghdHlwZSkge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZSA9PT0gJ3RyZWUnIHx8IHR5cGUgPT09ICdncmlkJykge1xyXG4gICAgICByZXR1cm4gJ3dpbmUnOyAvLyB0ZW1wb3JhcnkgZm9yIFBMQU5UWVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHR5cGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0UHJvZmlsZVNob3J0KHByb2ZpbGU6IGFueSk6IFByb2ZpbGVTaG9ydCB7XHJcbiAgICBjb25zdCBwcm9maWxlSWQgPSBwcm9maWxlPy5pZCB8fCAtMTtcclxuICAgIGNvbnN0IHByb2ZpbGVUeXBlID0gcHJvZmlsZT8uZGVmX3R5cGU7XHJcbiAgICByZXR1cm4geyBpZDogcHJvZmlsZUlkLCB0eXBlOiBwcm9maWxlVHlwZSB9O1xyXG4gIH1cclxuXHJcbiAgQERpc3BhdGNoKClcclxuICBwdWJsaWMgYXN5bmMgbmF2aWdhdGVUbyh1cmw6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIG5ldyBOYXZpZ2F0ZShbdXJsXSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGFuZGxlTG9uZ1RpdGxlKCkge1xyXG4gICAgdGhpcy5zdG9wQW5pbWF0aW9uID0gdHJ1ZTtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVPdXRfMSk7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lT3V0XzIpO1xyXG4gICAgdGhpcy50aW1lT3V0XzEgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5zdG9wQW5pbWF0aW9uID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuZmlyc3RNb3ZpbmdBbmltYXRpb24gPSB0cnVlO1xyXG4gICAgICB0aGlzLnRpdGxlX2NvbnRhaW5lcl93aWR0aCA9XHJcbiAgICAgICAgdGhpcy50aXRsZUNvbnRhaW5lcj8ubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcclxuICAgICAgdGhpcy50aXRsZV93aWR0aCA9XHJcbiAgICAgICAgdGhpcy50aXRsZUNvbnRhaW5lcj8ubmF0aXZlRWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZC5vZmZzZXRXaWR0aDtcclxuICAgICAgaWYgKHRoaXMudGl0bGVDb250YWluZXI/Lm5hdGl2ZUVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpIHtcclxuICAgICAgICB0aGlzLnRpbWVPdXRfMiA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5maXJzdE1vdmluZ0FuaW1hdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgIH0sIDEwMDAwKTtcclxuICAgICAgfVxyXG4gICAgfSwgMCk7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXZcclxuICAjY29udGVudENvbnRhaW5lclxyXG4gIFtjbGFzcy5zcGxpdExheW91dF09XCJTcGxpdExheW91dFwiXHJcbiAgY2xhc3M9XCJjb250ZW50LWNvbnRhaW5lclwiXHJcbiAgaWQ9XCJwcm9maWxlXCJcclxuPlxyXG4gIDxtYXQtdG9vbGJhclxyXG4gICAgKm5nSWY9XCJTcGxpdExheW91dCB8fCAhU2VsZWN0ZWRQcm9maWxlXCJcclxuICAgIFtjbGFzcy5mdWxsLXdpZHRoXT1cIiFTZWxlY3RlZFByb2ZpbGVcIlxyXG4gICAgY2xhc3M9XCJtYWluLXRvb2xiYXJcIlxyXG4gID5cclxuICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIGNsYXNzPVwiYnV0dG9uLWJhY2tcIiByb3V0ZXJMaW5rPVwiXCI+XHJcbiAgICAgIDxtYXQtaWNvbj5hcnJvd19iYWNrPC9tYXQtaWNvbj5cclxuICAgIDwvYnV0dG9uPlxyXG4gICAgPG1hdC1mb3JtLWZpZWxkXHJcbiAgICAgIGFwcGVhcmFuY2U9XCJmaWxsXCJcclxuICAgICAgZmxvYXRMYWJlbD1cImF1dG9cIlxyXG4gICAgICBbY2xhc3Mub3BlblNlYXJjaEJhcl09XCJpc1NlYXJjaEJhck9wZW5cIlxyXG4gICAgPlxyXG4gICAgICA8bWF0LWxhYmVsPlN1Y2hlPC9tYXQtbGFiZWw+XHJcbiAgICAgIDxpbnB1dFxyXG4gICAgICAgIFtmb3JtQ29udHJvbF09XCJGaWx0ZXJcIlxyXG4gICAgICAgIG1hdElucHV0XHJcbiAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICNzZWFyY2hfaW5wdXRcclxuICAgICAgICAoYmx1cik9XCJcclxuICAgICAgICAgIEZpbHRlci52YWx1ZSA9PT0gJydcclxuICAgICAgICAgICAgPyAoaXNTZWFyY2hCYXJPcGVuID0gZmFsc2UpXHJcbiAgICAgICAgICAgIDogKGlzU2VhcmNoQmFyT3BlbiA9IHRydWUpXHJcbiAgICAgICAgXCJcclxuICAgICAgICAoZm9jdXMpPVwiaXNTZWFyY2hCYXJPcGVuID0gdHJ1ZVwiXHJcbiAgICAgIC8+XHJcbiAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIG1hdFN1ZmZpeCAoY2xpY2spPVwiRmlsdGVyLnNldFZhbHVlKCcnKVwiPlxyXG4gICAgICAgIDwhLS1tYXQtaWNvbiAqbmdJZj1cIkZpbHRlci52YWx1ZSA9PSAnJ1wiIG1hdFN1ZmZpeD5zZWFyY2g8L21hdC1pY29uLS0+XHJcbiAgICAgICAgPG1hdC1pY29uPlxyXG4gICAgICAgICAge3sgRmlsdGVyLnZhbHVlID09PSAnJyA/ICdzZWFyY2gnIDogJ2Nsb3NlJyB9fVxyXG4gICAgICAgIDwvbWF0LWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9tYXQtZm9ybS1maWVsZD5cclxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj48L2Rpdj5cclxuICAgIDxidXR0b24gaWQ9XCJwcm9maWxlLXZpZXdcIiAoY2xpY2spPVwidG9nZ2xlR3JpZFRyZWUoKVwiIG1hdC1pY29uLWJ1dHRvbj5cclxuICAgICAgPG1hdC1pY29uPnt7XHJcbiAgICAgICAgVmlldyA9PT0gJ3RyZWUnID8gJ3ZpZXdfbW9kdWxlJyA6ICdhY2NvdW50X3RyZWUnXHJcbiAgICAgIH19PC9tYXQtaWNvbj5cclxuICAgIDwvYnV0dG9uPlxyXG4gIDwvbWF0LXRvb2xiYXI+XHJcbiAgPG1hdC10b29sYmFyICpuZ0lmPVwiU2VsZWN0ZWRQcm9maWxlXCIgY2xhc3M9XCJkZXRhaWwtdG9vbGJhclwiIGNvbG9yPVwiYWNjZW50XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwidGl0bGUtY29udGFpbmVyXCIgI3RpdGxlX2NvbnRhaW5lcj5cclxuICAgICAgPGRpdiAqbmdJZj1cImNvcmVDb25maWcuYXBwTmFtZSA9PT0gQVBQX05BTUVfRElWRVwiPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzPVwidGl0bGVcIlxyXG4gICAgICAgICAgW2RhdGFdPVwiU2VsZWN0ZWRQcm9maWxlIS5uYW1lXCJcclxuICAgICAgICAgIG1hcmtkb3duXHJcbiAgICAgICAgICBbY2xhc3MubG9uZy10aXRsZV09XCJcclxuICAgICAgICAgICAgdGl0bGVfd2lkdGggPj0gdGl0bGVfY29udGFpbmVyX3dpZHRoICYmXHJcbiAgICAgICAgICAgIGZpcnN0TW92aW5nQW5pbWF0aW9uICYmXHJcbiAgICAgICAgICAgICFzdG9wQW5pbWF0aW9uXHJcbiAgICAgICAgICBcIlxyXG4gICAgICAgICAgW2NsYXNzLmxvbmctdGl0bGUtMV09XCJcclxuICAgICAgICAgICAgdGl0bGVfd2lkdGggPj0gdGl0bGVfY29udGFpbmVyX3dpZHRoICYmXHJcbiAgICAgICAgICAgICFmaXJzdE1vdmluZ0FuaW1hdGlvbiAmJlxyXG4gICAgICAgICAgICAhc3RvcEFuaW1hdGlvblxyXG4gICAgICAgICAgXCJcclxuICAgICAgICA+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiY29yZUNvbmZpZy5hcHBOYW1lICE9PSBBUFBfTkFNRV9ESVZFXCI+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY2xhc3M9XCJ0aXRsZVwiXHJcbiAgICAgICAgICBbY2xhc3MubG9uZy10aXRsZV09XCJcclxuICAgICAgICAgICAgdGl0bGVfd2lkdGggPj0gdGl0bGVfY29udGFpbmVyX3dpZHRoICYmXHJcbiAgICAgICAgICAgIGZpcnN0TW92aW5nQW5pbWF0aW9uICYmXHJcbiAgICAgICAgICAgICFzdG9wQW5pbWF0aW9uXHJcbiAgICAgICAgICBcIlxyXG4gICAgICAgICAgW2NsYXNzLmxvbmctdGl0bGUtMV09XCJcclxuICAgICAgICAgICAgdGl0bGVfd2lkdGggPj0gdGl0bGVfY29udGFpbmVyX3dpZHRoICYmXHJcbiAgICAgICAgICAgICFmaXJzdE1vdmluZ0FuaW1hdGlvbiAmJlxyXG4gICAgICAgICAgICAhc3RvcEFuaW1hdGlvblxyXG4gICAgICAgICAgXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICB7eyBTZWxlY3RlZFByb2ZpbGUubmFtZSB9fVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPHNwYW4gKm5nSWY9XCJTZWxlY3RlZFByb2ZpbGUuc3ViX25hbWVcIj57e1xyXG4gICAgICAgIFNlbGVjdGVkUHJvZmlsZS5zdWJfbmFtZVxyXG4gICAgICB9fTwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBpZD1cInByb2ZpbGUtZGV0YWlsLW5hdmlnYXRpb25cIj5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIChjbGljayk9XCJzd2lwZUxlZnQoKVwiXHJcbiAgICAgICAgW2Rpc2FibGVkXT1cIlN3aXBlTGVmdC5pZCA8IDBcIlxyXG4gICAgICAgIG1hdC1pY29uLWJ1dHRvblxyXG4gICAgICA+XHJcbiAgICAgICAgPG1hdC1pY29uPm5hdmlnYXRlX2JlZm9yZTwvbWF0LWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uIChjbGljayk9XCJzZWxlY3RQcm9maWxlKHVuZGVmaW5lZClcIiBtYXQtaWNvbi1idXR0b24+XHJcbiAgICAgICAgPG1hdC1pY29uPnt7IFNwbGl0TGF5b3V0ID8gJ2Nsb3NlJyA6ICdleHBhbmRfbGVzcycgfX08L21hdC1pY29uPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIChjbGljayk9XCJzd2lwZVJpZ2h0KClcIlxyXG4gICAgICAgIFtkaXNhYmxlZF09XCJTd2lwZVJpZ2h0LmlkIDwgMFwiXHJcbiAgICAgICAgbWF0LWljb24tYnV0dG9uXHJcbiAgICAgID5cclxuICAgICAgICA8bWF0LWljb24+bmF2aWdhdGVfbmV4dDwvbWF0LWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9tYXQtdG9vbGJhcj5cclxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiKFNwbGl0TGF5b3V0IHx8ICFTZWxlY3RlZFByb2ZpbGUpICYmICFpc0xvYWRpbmdcIj5cclxuICAgIDxuZy1jb250YWluZXIgW25nU3dpdGNoXT1cIihWaWV3ID09PSAndHJlZScgJiYgRmlsdGVyLnZhbHVlICE9PSAnJykgfHwgVmlld1wiPlxyXG4gICAgICA8c29saWQtcHJvZmlsZS1ncmlkXHJcbiAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIidncmlkJ1wiXHJcbiAgICAgICAgKHNlbGVjdFByb2ZpbGUpPVwic2VsZWN0UHJvZmlsZSgkZXZlbnQpXCJcclxuICAgICAgICBbY2xhc3MuZnVsbC13aWR0aF09XCIhU2VsZWN0ZWRQcm9maWxlXCJcclxuICAgICAgICBbcHJvZmlsZXNdPVwiUHJvZmlsZXNGbGF0RmlsdGVyZWQuYXNPYnNlcnZhYmxlKClcIlxyXG4gICAgICAgIFtzZWxlY3RlZFByb2ZpbGVJZF09XCJcclxuICAgICAgICAgIFNlbGVjdGVkUHJvZmlsZSA/IFNlbGVjdGVkUHJvZmlsZS5pZCA6IFNlbGVjdGVkUHJvZmlsZVNob3J0LmlkXHJcbiAgICAgICAgXCJcclxuICAgICAgICBbc2VsZWN0ZWRQcm9maWxlVHlwZV09XCJcclxuICAgICAgICAgIFNlbGVjdGVkUHJvZmlsZSA/IFNlbGVjdGVkUHJvZmlsZS5kZWZfdHlwZSA6IFNlbGVjdGVkUHJvZmlsZVNob3J0LnR5cGVcclxuICAgICAgICBcIlxyXG4gICAgICAgIFtpc0RpdmVBcHBdPVwiY29yZUNvbmZpZy5hcHBOYW1lID09PSB0aGlzLkFQUF9OQU1FX0RJVkVcIlxyXG4gICAgICAgIChzZWxlY3RQcm9maWxlVGl0bGUpPVwic2VsZWN0UHJvZmlsZVRpdGxlKCRldmVudClcIlxyXG4gICAgICA+PC9zb2xpZC1wcm9maWxlLWdyaWQ+XHJcbiAgICAgIDxzb2xpZC1wcm9maWxlLXRyZWVcclxuICAgICAgICAqbmdTd2l0Y2hDYXNlPVwiJ3RyZWUnXCJcclxuICAgICAgICAoc2VsZWN0UHJvZmlsZSk9XCJzZWxlY3RQcm9maWxlKCRldmVudClcIlxyXG4gICAgICAgIChzZWxlY3RQcm9maWxlVGl0bGUpPVwic2VsZWN0UHJvZmlsZVRpdGxlKCRldmVudClcIlxyXG4gICAgICAgIFtwcm9maWxlc109XCIkcHJvZmlsZXNUcmVlXCJcclxuICAgICAgICBbc2VsZWN0ZWRQcm9maWxlSWRdPVwiXHJcbiAgICAgICAgICBTZWxlY3RlZFByb2ZpbGUgPyBTZWxlY3RlZFByb2ZpbGUuaWQgOiBTZWxlY3RlZFByb2ZpbGVTaG9ydC5pZFxyXG4gICAgICAgIFwiXHJcbiAgICAgICAgW3NlbGVjdGVkUHJvZmlsZVR5cGVdPVwiXHJcbiAgICAgICAgICBTZWxlY3RlZFByb2ZpbGUgPyBTZWxlY3RlZFByb2ZpbGUuZGVmX3R5cGUgOiBTZWxlY3RlZFByb2ZpbGVTaG9ydC50eXBlXHJcbiAgICAgICAgXCJcclxuICAgICAgICBbaXNEaXZlQXBwXT1cImNvcmVDb25maWcuYXBwTmFtZSA9PT0gdGhpcy5BUFBfTkFNRV9ESVZFXCJcclxuICAgICAgICBbY29sbGFwc2VUcmVlXT1cImNvbGxhcHNlVHJlZVwiXHJcbiAgICAgID48L3NvbGlkLXByb2ZpbGUtdHJlZT5cclxuICAgICAgPHNvbGlkLXByb2ZpbGUtbGlzdFxyXG4gICAgICAgICpuZ1N3aXRjaERlZmF1bHRcclxuICAgICAgICAoc2VsZWN0UHJvZmlsZSk9XCJzZWxlY3RQcm9maWxlKCRldmVudClcIlxyXG4gICAgICAgIChzZWxlY3RQcm9maWxlVGl0bGUpPVwic2VsZWN0UHJvZmlsZVRpdGxlKCRldmVudClcIlxyXG4gICAgICAgIFtwcm9maWxlc109XCJQcm9maWxlc0ZsYXRGaWx0ZXJlZC5hc09ic2VydmFibGUoKVwiXHJcbiAgICAgICAgW3NlbGVjdGVkUHJvZmlsZUlkXT1cIlxyXG4gICAgICAgICAgU2VsZWN0ZWRQcm9maWxlID8gU2VsZWN0ZWRQcm9maWxlLmlkIDogU2VsZWN0ZWRQcm9maWxlU2hvcnQuaWRcclxuICAgICAgICBcIlxyXG4gICAgICAgIFtzZWxlY3RlZFByb2ZpbGVUeXBlXT1cIlxyXG4gICAgICAgICAgU2VsZWN0ZWRQcm9maWxlID8gU2VsZWN0ZWRQcm9maWxlLmRlZl90eXBlIDogU2VsZWN0ZWRQcm9maWxlU2hvcnQudHlwZVxyXG4gICAgICAgIFwiXHJcbiAgICAgICAgW2lzRGl2ZUFwcF09XCJjb3JlQ29uZmlnLmFwcE5hbWUgPT09IHRoaXMuQVBQX05BTUVfRElWRVwiXHJcbiAgICAgID48L3NvbGlkLXByb2ZpbGUtbGlzdD5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG4gIDxkaXYgKm5nSWY9XCJpc0xvYWRpbmdcIj5cclxuICAgIDxtYXQtY2FyZC1jb250ZW50ICNzcGlubmVyQ29udGFpbmVyPlxyXG4gICAgICA8bWF0LXNwaW5uZXIgY29sb3I9XCJwcmltYXJ5XCIgW2RpYW1ldGVyXT1cIjExNVwiPjwvbWF0LXNwaW5uZXI+XHJcbiAgICA8L21hdC1jYXJkLWNvbnRlbnQ+XHJcbiAgPC9kaXY+XHJcbiAgPHNvbGlkLXByb2ZpbGUtZGV0YWlsXHJcbiAgICAqbmdJZj1cIlNlbGVjdGVkUHJvZmlsZSAmJiBTZWxlY3RlZE5vZGVcIlxyXG4gICAgKHNlbGVjdFByb2ZpbGUpPVwic2VsZWN0UHJvZmlsZSgkZXZlbnQpXCJcclxuICAgIGNka1Njcm9sbGFibGVcclxuICAgIFtub2RlXT1cIlNlbGVjdGVkTm9kZVwiXHJcbiAgICBbcHJvZmlsZV09XCJTZWxlY3RlZFByb2ZpbGVcIlxyXG4gID48L3NvbGlkLXByb2ZpbGUtZGV0YWlsPlxyXG48L2Rpdj5cclxuIl19
