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
  InjectionToken,
  ViewChild,
} from '@angular/core';
import { MenuState } from '../../state/menu.state';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Select } from '@ngxs/store';
import {
  FeedbackService,
  SOLID_SKELETON_FEEDBACK_SERVICE,
} from '../../services/feedback.service';
import { IntroService } from '../../services/intro.service';
import { SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { LandingBannerDialogComponent } from '../landing-banner-dialog/landing-banner-dialog.component';
import { MessageType } from '../../models/message.model';
import { MessagesService } from '../../services/messages.service';
import * as i0 from '@angular/core';
import * as i1 from '@angular/material/icon';
import * as i2 from '@angular/platform-browser';
import * as i3 from '../../services/intro.service';
import * as i4 from '@angular/material/dialog';
import * as i5 from '../../state/menu.state';
import * as i6 from '../../services/messages.service';
import * as i7 from '@angular/common';
import * as i8 from '@angular/router';
import * as i9 from '@angular/material/button';
import * as i10 from '@angular/material/card';
import * as i11 from '@angular/material/grid-list';
import * as i12 from '@angular/material/slide-toggle';
import * as i13 from '@angular/material/badge';
import * as i14 from '../../directives/grid-cols.directive';
import * as i15 from '../../services/feedback.service';
export const SOLID_SKELETON_HACKY_INJECTION = new InjectionToken(
  'solid-skeleton-hacky-injection'
);
export class LandingComponent {
  feedback;
  coreConfig;
  introService;
  landingDialog;
  menuState;
  messagesService;
  menuItems$;
  Landing;
  onGlossaryClick = new EventEmitter();
  destroy$ = new Subject();
  landingBannerKey = 'hide_landing_banner';
  landingTourKey = 'hide_landing_tour';
  messages = [];
  msgCount = 0;
  messagesLoading = true;
  showLanding =
    localStorage.getItem(this.landingBannerKey) == 'false' ? true : false;
  showTour =
    localStorage.getItem(this.landingTourKey) == 'false' || this.showLanding
      ? true
      : false;
  innerWidth = window.innerWidth;
  gridColumns;
  landingInfo;
  landingRef;
  constructor(
    feedback,
    coreConfig,
    iconRegistry,
    sanitizer,
    introService,
    landingDialog,
    menuState,
    messagesService
  ) {
    this.feedback = feedback;
    this.coreConfig = coreConfig;
    this.introService = introService;
    this.landingDialog = landingDialog;
    this.menuState = menuState;
    this.messagesService = messagesService;
    iconRegistry.addSvgIcon(
      'glossary_custom',
      sanitizer.bypassSecurityTrustResourceUrl(coreConfig.glossaryLogo)
    );
  }
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 700 && this.landingRef) {
      this.landingRef.close();
      this.showTour = false;
    }
  }
  ngOnInit() {
    this.getNewMessagesCount();
    const itemsCount = this.menuState.getItemsCount();
    this.gridColumns = { xs: 2, sm: 3, md: 3, lg: 3, xl: itemsCount + 2 };
    this.landingInfo = this.coreConfig.landingBannerContent;
  }
  ngAfterViewInit() {
    if (this.innerWidth < 700 && this.showLanding) {
      this.landingRef = this.landingDialog.open(LandingBannerDialogComponent, {
        panelClass: 'landing-banner-dialog',
      });
      this.landingRef.afterClosed().subscribe(() => {
        if (this.showTour) this.startGuidedTour();
      });
    } else if (!this.showLanding && this.showTour) this.startGuidedTour();
  }
  ngOnDestroy() {
    if (this.showTour) localStorage.setItem(this.landingTourKey, 'false');
    this.destroy$.next();
    this.destroy$.complete();
  }
  startGuidedTour() {
    setTimeout(() => {
      this.introService.guidedTour((_targetElement) => {
        try {
          const id = _targetElement.id;
          const landing = this.Landing?.nativeElement;
          const menuOffSetTop =
            document.getElementById('menu-grid-list')?.offsetTop;
          if (id.slice(0, 9) == 'menu-tile' || id == 'feedback') {
            if (menuOffSetTop) landing.scrollTop = menuOffSetTop - 50;
          }
          if (id == '') {
            if (menuOffSetTop) landing.scrollTop = 0;
          }
        } catch (error) {
          return;
        }
        return;
      });
    }, 500);
  }
  onNotShowAgainToggle(change) {
    if (change.checked) localStorage.setItem(this.landingBannerKey, 'true');
    else localStorage.setItem(this.landingBannerKey, 'false');
  }
  onStartTourToggle(change) {
    this.showTour = !this.showTour;
    if (change.checked) localStorage.setItem(this.landingTourKey, 'false');
    else localStorage.setItem(this.landingTourKey, 'true');
  }
  onCloseClick() {
    this.showLanding = false;
    localStorage.setItem(this.landingBannerKey, 'true');
    if (this.showTour) {
      localStorage.setItem(this.landingTourKey, 'false');
      this.startGuidedTour();
    }
  }
  getNewMessagesCount() {
    this.messagesService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe((msgs) => {
        this.messages = msgs.filter((msg) => {
          return msg.unread && msg.type !== MessageType.Changelog;
        });
        this.msgCount = this.messages.length;
        this.messagesLoading = false;
      });
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: LandingComponent,
    deps: [
      { token: SOLID_SKELETON_FEEDBACK_SERVICE },
      { token: SOLID_CORE_CONFIG },
      { token: i1.MatIconRegistry },
      { token: i2.DomSanitizer },
      { token: i3.IntroService },
      { token: i4.MatDialog },
      { token: i5.MenuState },
      { token: i6.MessagesService },
    ],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: LandingComponent,
    selector: 'solid-skeleton-landing',
    host: { listeners: { 'window:resize': 'onResize($event)' } },
    viewQueries: [
      {
        propertyName: 'Landing',
        first: true,
        predicate: ['landing'],
        descendants: true,
      },
    ],
    ngImport: i0,
    template:
      '<div class="landing-container" #landing>\r\n  <mat-card *ngIf="innerWidth >= 700 && showLanding && !messagesLoading">\r\n    <mat-card-header>\r\n      <img mat-card-avatar [src]="landingInfo.header.image" />\r\n      <mat-card-title>{{ landingInfo.header.title }}</mat-card-title>\r\n      <mat-card-subtitle>{{ landingInfo.header.subtitle }}</mat-card-subtitle>\r\n    </mat-card-header>\r\n    <mat-card-content *ngFor="let content of landingInfo.content">\r\n      <p>\r\n        {{ content.p }}\r\n      </p>\r\n    </mat-card-content>\r\n    <div class="toggle-container">\r\n      <mat-slide-toggle\r\n        class="notShowAgainToggle"\r\n        (change)="onNotShowAgainToggle($event)"\r\n        >Nicht mehr zeigen</mat-slide-toggle\r\n      >\r\n      <mat-slide-toggle\r\n        class="startTourToggle"\r\n        checked="true"\r\n        (change)="onStartTourToggle($event)"\r\n      >\r\n        Tour starten\r\n      </mat-slide-toggle>\r\n    </div>\r\n    <div class="button-container">\r\n      <button\r\n        class="closeBtn"\r\n        mat-stroked-button\r\n        color="primary"\r\n        (click)="onCloseClick()"\r\n      >\r\n        Schlie\u00DFen\r\n      </button>\r\n    </div>\r\n  </mat-card>\r\n  <mat-grid-list\r\n    id="menu-grid-list"\r\n    [solidSkeletonGridCols]="gridColumns"\r\n    gutterSize="1rem"\r\n    rowHeight="1:1"\r\n  >\r\n    <mat-grid-tile\r\n      *ngFor="let menuItem of menuItems$ | async; let index = index"\r\n      class="mat-elevation-z2"\r\n      [routerLink]="menuItem.route"\r\n      [queryParams]="{ directTo: msgCount > 0 ? \'news\' : undefined }"\r\n      id="menu-tile-{{ index }}"\r\n    >\r\n      <mat-icon\r\n        *ngIf="menuItem.svgIcon && menuItem.route !== \'info\'"\r\n        [svgIcon]="menuItem.svgIcon"\r\n      ></mat-icon>\r\n      <mat-icon *ngIf="!menuItem.svgIcon && menuItem.route !== \'info\'">{{\r\n        menuItem.icon\r\n      }}</mat-icon>\r\n      <mat-icon\r\n        *ngIf="menuItem.svgIcon && menuItem.route === \'info\'"\r\n        [svgIcon]="menuItem.svgIcon"\r\n        [matBadge]="msgCount"\r\n        [matBadgeHidden]="msgCount === 0"\r\n        matBadgeSize="large"\r\n      ></mat-icon>\r\n      <span class="navTitle">{{ menuItem.title }}</span>\r\n    </mat-grid-tile>\r\n    <mat-grid-tile\r\n      id="glossary"\r\n      (click)="onGlossaryClick.emit()"\r\n      class="mat-elevation-z2"\r\n      ><mat-icon matListIcon svgIcon="glossary_custom"></mat-icon>\r\n      <span class="navTitle">Glossar</span>\r\n    </mat-grid-tile>\r\n    <mat-grid-tile\r\n      id="feedback"\r\n      (click)="feedback.showDialog()"\r\n      class="mat-elevation-z2"\r\n      ><mat-icon matListIcon svgIcon="feedback"></mat-icon>\r\n      <span class="navTitle">Kontakt</span>\r\n    </mat-grid-tile>\r\n  </mat-grid-list>\r\n  <div class="footer-container">\r\n    <a routerLink="info">Impressum</a>\r\n    <a routerLink="info" [queryParams]="{ directTo: \'privacy\' }">\r\n      Datenschutz</a\r\n    >\r\n  </div>\r\n</div>\r\n',
    styles: [
      '@charset "UTF-8";:host{display:block}mat-card{margin-bottom:1.5rem}mat-list{padding-top:0!important}mat-grid-list{max-width:100%;margin-left:auto;margin-right:auto;margin-bottom:10vh}mat-grid-tile{border-radius:.25rem;cursor:pointer;transition:background-color .05s linear .05s}mat-grid-tile ::ng-deep div.mat-grid-tile-content{display:inline-flex;flex-direction:column;align-content:center}mat-grid-tile ::ng-deep .mat-badge-content{top:-7px!important;right:0!important;color:#fff;background-color:#e41e3f;width:24px;height:24px;line-height:24px;font-size:18px}mat-grid-tile mat-icon{height:4.5rem;width:4.5rem;font-size:4.5rem}.navTitle{padding-top:.5rem}.landing-container{overflow:auto;height:calc(100vh - 60px);padding:1rem;display:flex;flex-direction:column}.footer-container{margin-bottom:-16px;margin-top:auto;text-align:center}.footer-container a{text-decoration:none}.footer-container a:not(:last-child):after{content:"\\a0|\\a0"}.toggle-container{display:flex;font-size:13px}.toggle-container .notShowAgainToggle{margin-right:13px}.button-container{display:flex;justify-content:center;margin-top:19px}.button-container .closeBtn{width:100%;border-radius:5px;font-size:13px}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i7.NgForOf,
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
      },
      {
        kind: 'directive',
        type: i7.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i8.RouterLink,
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
        type: i9.MatButton,
        selector:
          '    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'component',
        type: i10.MatCard,
        selector: 'mat-card',
        inputs: ['appearance'],
        exportAs: ['matCard'],
      },
      {
        kind: 'directive',
        type: i10.MatCardAvatar,
        selector: '[mat-card-avatar], [matCardAvatar]',
      },
      {
        kind: 'directive',
        type: i10.MatCardContent,
        selector: 'mat-card-content',
      },
      {
        kind: 'component',
        type: i10.MatCardHeader,
        selector: 'mat-card-header',
      },
      {
        kind: 'directive',
        type: i10.MatCardSubtitle,
        selector: 'mat-card-subtitle, [mat-card-subtitle], [matCardSubtitle]',
      },
      {
        kind: 'directive',
        type: i10.MatCardTitle,
        selector: 'mat-card-title, [mat-card-title], [matCardTitle]',
      },
      {
        kind: 'component',
        type: i11.MatGridList,
        selector: 'mat-grid-list',
        inputs: ['cols', 'gutterSize', 'rowHeight'],
        exportAs: ['matGridList'],
      },
      {
        kind: 'component',
        type: i11.MatGridTile,
        selector: 'mat-grid-tile',
        inputs: ['rowspan', 'colspan'],
        exportAs: ['matGridTile'],
      },
      {
        kind: 'component',
        type: i1.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'component',
        type: i12.MatSlideToggle,
        selector: 'mat-slide-toggle',
        inputs: ['disabled', 'disableRipple', 'color', 'tabIndex'],
        exportAs: ['matSlideToggle'],
      },
      {
        kind: 'directive',
        type: i13.MatBadge,
        selector: '[matBadge]',
        inputs: [
          'matBadgeDisabled',
          'matBadgeColor',
          'matBadgeOverlap',
          'matBadgePosition',
          'matBadge',
          'matBadgeDescription',
          'matBadgeSize',
          'matBadgeHidden',
        ],
      },
      {
        kind: 'directive',
        type: i14.GridColsDirective,
        selector: '[solidSkeletonGridCols]',
        inputs: ['solidSkeletonGridCols'],
      },
      { kind: 'pipe', type: i7.AsyncPipe, name: 'async' },
    ],
  });
}
__decorate(
  [Select(MenuState.getLandingItems), __metadata('design:type', Observable)],
  LandingComponent.prototype,
  'menuItems$',
  void 0
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: LandingComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-skeleton-landing',
          template:
            '<div class="landing-container" #landing>\r\n  <mat-card *ngIf="innerWidth >= 700 && showLanding && !messagesLoading">\r\n    <mat-card-header>\r\n      <img mat-card-avatar [src]="landingInfo.header.image" />\r\n      <mat-card-title>{{ landingInfo.header.title }}</mat-card-title>\r\n      <mat-card-subtitle>{{ landingInfo.header.subtitle }}</mat-card-subtitle>\r\n    </mat-card-header>\r\n    <mat-card-content *ngFor="let content of landingInfo.content">\r\n      <p>\r\n        {{ content.p }}\r\n      </p>\r\n    </mat-card-content>\r\n    <div class="toggle-container">\r\n      <mat-slide-toggle\r\n        class="notShowAgainToggle"\r\n        (change)="onNotShowAgainToggle($event)"\r\n        >Nicht mehr zeigen</mat-slide-toggle\r\n      >\r\n      <mat-slide-toggle\r\n        class="startTourToggle"\r\n        checked="true"\r\n        (change)="onStartTourToggle($event)"\r\n      >\r\n        Tour starten\r\n      </mat-slide-toggle>\r\n    </div>\r\n    <div class="button-container">\r\n      <button\r\n        class="closeBtn"\r\n        mat-stroked-button\r\n        color="primary"\r\n        (click)="onCloseClick()"\r\n      >\r\n        Schlie\u00DFen\r\n      </button>\r\n    </div>\r\n  </mat-card>\r\n  <mat-grid-list\r\n    id="menu-grid-list"\r\n    [solidSkeletonGridCols]="gridColumns"\r\n    gutterSize="1rem"\r\n    rowHeight="1:1"\r\n  >\r\n    <mat-grid-tile\r\n      *ngFor="let menuItem of menuItems$ | async; let index = index"\r\n      class="mat-elevation-z2"\r\n      [routerLink]="menuItem.route"\r\n      [queryParams]="{ directTo: msgCount > 0 ? \'news\' : undefined }"\r\n      id="menu-tile-{{ index }}"\r\n    >\r\n      <mat-icon\r\n        *ngIf="menuItem.svgIcon && menuItem.route !== \'info\'"\r\n        [svgIcon]="menuItem.svgIcon"\r\n      ></mat-icon>\r\n      <mat-icon *ngIf="!menuItem.svgIcon && menuItem.route !== \'info\'">{{\r\n        menuItem.icon\r\n      }}</mat-icon>\r\n      <mat-icon\r\n        *ngIf="menuItem.svgIcon && menuItem.route === \'info\'"\r\n        [svgIcon]="menuItem.svgIcon"\r\n        [matBadge]="msgCount"\r\n        [matBadgeHidden]="msgCount === 0"\r\n        matBadgeSize="large"\r\n      ></mat-icon>\r\n      <span class="navTitle">{{ menuItem.title }}</span>\r\n    </mat-grid-tile>\r\n    <mat-grid-tile\r\n      id="glossary"\r\n      (click)="onGlossaryClick.emit()"\r\n      class="mat-elevation-z2"\r\n      ><mat-icon matListIcon svgIcon="glossary_custom"></mat-icon>\r\n      <span class="navTitle">Glossar</span>\r\n    </mat-grid-tile>\r\n    <mat-grid-tile\r\n      id="feedback"\r\n      (click)="feedback.showDialog()"\r\n      class="mat-elevation-z2"\r\n      ><mat-icon matListIcon svgIcon="feedback"></mat-icon>\r\n      <span class="navTitle">Kontakt</span>\r\n    </mat-grid-tile>\r\n  </mat-grid-list>\r\n  <div class="footer-container">\r\n    <a routerLink="info">Impressum</a>\r\n    <a routerLink="info" [queryParams]="{ directTo: \'privacy\' }">\r\n      Datenschutz</a\r\n    >\r\n  </div>\r\n</div>\r\n',
          styles: [
            '@charset "UTF-8";:host{display:block}mat-card{margin-bottom:1.5rem}mat-list{padding-top:0!important}mat-grid-list{max-width:100%;margin-left:auto;margin-right:auto;margin-bottom:10vh}mat-grid-tile{border-radius:.25rem;cursor:pointer;transition:background-color .05s linear .05s}mat-grid-tile ::ng-deep div.mat-grid-tile-content{display:inline-flex;flex-direction:column;align-content:center}mat-grid-tile ::ng-deep .mat-badge-content{top:-7px!important;right:0!important;color:#fff;background-color:#e41e3f;width:24px;height:24px;line-height:24px;font-size:18px}mat-grid-tile mat-icon{height:4.5rem;width:4.5rem;font-size:4.5rem}.navTitle{padding-top:.5rem}.landing-container{overflow:auto;height:calc(100vh - 60px);padding:1rem;display:flex;flex-direction:column}.footer-container{margin-bottom:-16px;margin-top:auto;text-align:center}.footer-container a{text-decoration:none}.footer-container a:not(:last-child):after{content:"\\a0|\\a0"}.toggle-container{display:flex;font-size:13px}.toggle-container .notShowAgainToggle{margin-right:13px}.button-container{display:flex;justify-content:center;margin-top:19px}.button-container .closeBtn{width:100%;border-radius:5px;font-size:13px}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: i15.FeedbackService,
        decorators: [
          {
            type: Inject,
            args: [SOLID_SKELETON_FEEDBACK_SERVICE],
          },
        ],
      },
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [SOLID_CORE_CONFIG],
          },
        ],
      },
      { type: i1.MatIconRegistry },
      { type: i2.DomSanitizer },
      { type: i3.IntroService },
      { type: i4.MatDialog },
      { type: i5.MenuState },
      { type: i6.MessagesService },
    ];
  },
  propDecorators: {
    menuItems$: [],
    Landing: [
      {
        type: ViewChild,
        args: ['landing'],
      },
    ],
    onResize: [
      {
        type: HostListener,
        args: ['window:resize', ['$event']],
      },
    ],
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3NrZWxldG9uL3NyYy9saWIvY29tcG9uZW50cy9sYW5kaW5nL2xhbmRpbmcuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9za2VsZXRvbi9zcmMvbGliL2NvbXBvbmVudHMvbGFuZGluZy9sYW5kaW5nLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixZQUFZLEVBQ1osTUFBTSxFQUNOLGNBQWMsRUFHZCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUV0RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3JDLE9BQU8sRUFDTCxlQUFlLEVBQ2YsK0JBQStCLEdBQ2hDLE1BQU0saUNBQWlDLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzVELE9BQU8sRUFBbUIsaUJBQWlCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUd4RyxPQUFPLEVBQWdCLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFD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QUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlCLFNBQVMsQ0FBQyxDQUFDLElBQW9CLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFpQixFQUFFLEVBQUU7Z0JBQ2hELE9BQU8sR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxTQUFTLENBQUM7WUFDMUQsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzt1R0FwSVUsZ0JBQWdCLGtCQThCakIsK0JBQStCLGFBQy9CLGlCQUFpQjsyRkEvQmhCLGdCQUFnQixnT0N4QzdCLHVpR0F3RkE7O0FEOUNTO0lBRE4sTUFBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7OEJBQ2QsVUFBVTtvREFBYTsyRkFGaEMsZ0JBQWdCO2tCQUw1QixTQUFTOytCQUNFLHdCQUF3Qjs7MEJBa0MvQixNQUFNOzJCQUFDLCtCQUErQjs7MEJBQ3RDLE1BQU07MkJBQUMsaUJBQWlCOzhNQTdCcEIsVUFBVSxNQUVLLE9BQU87c0JBQTVCLFNBQVM7dUJBQUMsU0FBUztnQkEwQ3BCLFFBQVE7c0JBRFAsWUFBWTt1QkFBQyxlQUFlLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbmplY3QsXHJcbiAgSW5qZWN0aW9uVG9rZW4sXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBWaWV3Q2hpbGQsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1lbnVTdGF0ZSB9IGZyb20gJy4uLy4uL3N0YXRlL21lbnUuc3RhdGUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0LCB0YWtlVW50aWwgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTWVudUl0ZW0gfSBmcm9tICcuLi8uLi9zdGF0ZS9tZW51Lm1vZGVsJztcclxuaW1wb3J0IHsgU2VsZWN0IH0gZnJvbSAnQG5neHMvc3RvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEZlZWRiYWNrU2VydmljZSxcclxuICBTT0xJRF9TS0VMRVRPTl9GRUVEQkFDS19TRVJWSUNFLFxyXG59IGZyb20gJy4uLy4uL3NlcnZpY2VzL2ZlZWRiYWNrLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJbnRyb1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9pbnRyby5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU29saWRDb3JlQ29uZmlnLCBTT0xJRF9DT1JFX0NPTkZJRyB9IGZyb20gJ0B6ZW50cnVtbmF3aS9zb2xpZC1jb3JlJztcclxuaW1wb3J0IHsgTWF0SWNvblJlZ2lzdHJ5IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xyXG5pbXBvcnQgeyBMYW5kaW5nQmFubmVyRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi4vbGFuZGluZy1iYW5uZXItZGlhbG9nL2xhbmRpbmctYmFubmVyLWRpYWxvZy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNYXRTbGlkZVRvZ2dsZUNoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlLXRvZ2dsZSc7XHJcbmltcG9ydCB7IEdyaWRDb2x1bW5zIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9ncmlkLWNvbHMuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTWVzc2FnZU1vZGVsLCBNZXNzYWdlVHlwZSB9IGZyb20gJy4uLy4uL21vZGVscy9tZXNzYWdlLm1vZGVsJztcclxuaW1wb3J0IHsgTWVzc2FnZXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbWVzc2FnZXMuc2VydmljZSc7XHJcblxyXG5leHBvcnQgY29uc3QgU09MSURfU0tFTEVUT05fSEFDS1lfSU5KRUNUSU9OID0gbmV3IEluamVjdGlvblRva2VuPCgpID0+IHZvaWQ+KFxyXG4gICdzb2xpZC1za2VsZXRvbi1oYWNreS1pbmplY3Rpb24nXHJcbik7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NvbGlkLXNrZWxldG9uLWxhbmRpbmcnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9sYW5kaW5nLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9sYW5kaW5nLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMYW5kaW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBTZWxlY3QoTWVudVN0YXRlLmdldExhbmRpbmdJdGVtcylcclxuICBwdWJsaWMgbWVudUl0ZW1zJCE6IE9ic2VydmFibGU8TWVudUl0ZW1bXT47XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ2xhbmRpbmcnKSBMYW5kaW5nPzogRWxlbWVudFJlZjtcclxuICBwdWJsaWMgb25HbG9zc2FyeUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBwdWJsaWMgZGVzdHJveSQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xyXG5cclxuICBwcml2YXRlIGxhbmRpbmdCYW5uZXJLZXkgPSAnaGlkZV9sYW5kaW5nX2Jhbm5lcic7XHJcbiAgcHJpdmF0ZSBsYW5kaW5nVG91cktleSA9ICdoaWRlX2xhbmRpbmdfdG91cic7XHJcblxyXG4gIHByaXZhdGUgbWVzc2FnZXM6IE1lc3NhZ2VNb2RlbFtdID0gW107XHJcbiAgcHVibGljIG1zZ0NvdW50ID0gMDtcclxuICBwdWJsaWMgbWVzc2FnZXNMb2FkaW5nID0gdHJ1ZTtcclxuXHJcbiAgcHVibGljIHNob3dMYW5kaW5nID1cclxuICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMubGFuZGluZ0Jhbm5lcktleSkgPT0gJ2ZhbHNlJyA/IHRydWUgOiBmYWxzZTtcclxuICBwdWJsaWMgc2hvd1RvdXIgPVxyXG4gICAgbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5sYW5kaW5nVG91cktleSkgPT0gJ2ZhbHNlJyB8fCB0aGlzLnNob3dMYW5kaW5nXHJcbiAgICAgID8gdHJ1ZVxyXG4gICAgICA6IGZhbHNlO1xyXG5cclxuICBwdWJsaWMgaW5uZXJXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gIHB1YmxpYyBncmlkQ29sdW1ucyE6IEdyaWRDb2x1bW5zO1xyXG5cclxuICBwdWJsaWMgbGFuZGluZ0luZm86IGFueTtcclxuICBwdWJsaWMgbGFuZGluZ1JlZjogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoU09MSURfU0tFTEVUT05fRkVFREJBQ0tfU0VSVklDRSkgcHVibGljIGZlZWRiYWNrOiBGZWVkYmFja1NlcnZpY2UsXHJcbiAgICBASW5qZWN0KFNPTElEX0NPUkVfQ09ORklHKSBwdWJsaWMgY29yZUNvbmZpZzogU29saWRDb3JlQ29uZmlnLFxyXG4gICAgaWNvblJlZ2lzdHJ5OiBNYXRJY29uUmVnaXN0cnksXHJcbiAgICBzYW5pdGl6ZXI6IERvbVNhbml0aXplcixcclxuICAgIHByaXZhdGUgaW50cm9TZXJ2aWNlOiBJbnRyb1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGxhbmRpbmdEaWFsb2c6IE1hdERpYWxvZyxcclxuICAgIHByaXZhdGUgbWVudVN0YXRlOiBNZW51U3RhdGUsXHJcbiAgICBwcml2YXRlIG1lc3NhZ2VzU2VydmljZTogTWVzc2FnZXNTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBpY29uUmVnaXN0cnkuYWRkU3ZnSWNvbihcclxuICAgICAgJ2dsb3NzYXJ5X2N1c3RvbScsXHJcbiAgICAgIHNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoY29yZUNvbmZpZy5nbG9zc2FyeUxvZ28pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXHJcbiAgb25SZXNpemUoZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICB0aGlzLmlubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgIGlmICh0aGlzLmlubmVyV2lkdGggPiA3MDAgJiYgdGhpcy5sYW5kaW5nUmVmKSB7XHJcbiAgICAgIHRoaXMubGFuZGluZ1JlZi5jbG9zZSgpO1xyXG4gICAgICB0aGlzLnNob3dUb3VyID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmdldE5ld01lc3NhZ2VzQ291bnQoKTtcclxuICAgIGNvbnN0IGl0ZW1zQ291bnQgPSB0aGlzLm1lbnVTdGF0ZS5nZXRJdGVtc0NvdW50KCk7XHJcbiAgICB0aGlzLmdyaWRDb2x1bW5zID0geyB4czogMiwgc206IDMsIG1kOiAzLCBsZzogMywgeGw6IGl0ZW1zQ291bnQgKyAyIH07XHJcbiAgICB0aGlzLmxhbmRpbmdJbmZvID0gdGhpcy5jb3JlQ29uZmlnLmxhbmRpbmdCYW5uZXJDb250ZW50O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmlubmVyV2lkdGggPCA3MDAgJiYgdGhpcy5zaG93TGFuZGluZykge1xyXG4gICAgICB0aGlzLmxhbmRpbmdSZWYgPSB0aGlzLmxhbmRpbmdEaWFsb2cub3BlbihMYW5kaW5nQmFubmVyRGlhbG9nQ29tcG9uZW50LCB7XHJcbiAgICAgICAgcGFuZWxDbGFzczogJ2xhbmRpbmctYmFubmVyLWRpYWxvZycsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmxhbmRpbmdSZWYuYWZ0ZXJDbG9zZWQoKS5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnNob3dUb3VyKSB0aGlzLnN0YXJ0R3VpZGVkVG91cigpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAoIXRoaXMuc2hvd0xhbmRpbmcgJiYgdGhpcy5zaG93VG91cikgdGhpcy5zdGFydEd1aWRlZFRvdXIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnNob3dUb3VyKSBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmxhbmRpbmdUb3VyS2V5LCAnZmFsc2UnKTtcclxuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xyXG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzdGFydEd1aWRlZFRvdXIoKTogdm9pZCB7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5pbnRyb1NlcnZpY2UuZ3VpZGVkVG91cigoX3RhcmdldEVsZW1lbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjb25zdCBpZCA9IF90YXJnZXRFbGVtZW50LmlkO1xyXG4gICAgICAgICAgY29uc3QgbGFuZGluZyA9IHRoaXMuTGFuZGluZz8ubmF0aXZlRWxlbWVudDtcclxuICAgICAgICAgIGNvbnN0IG1lbnVPZmZTZXRUb3AgPVxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudS1ncmlkLWxpc3QnKT8ub2Zmc2V0VG9wO1xyXG5cclxuICAgICAgICAgIGlmIChpZC5zbGljZSgwLCA5KSA9PSAnbWVudS10aWxlJyB8fCBpZCA9PSAnZmVlZGJhY2snKSB7XHJcbiAgICAgICAgICAgIGlmIChtZW51T2ZmU2V0VG9wKSBsYW5kaW5nLnNjcm9sbFRvcCA9IG1lbnVPZmZTZXRUb3AgLSA1MDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoaWQgPT0gJycpIHtcclxuICAgICAgICAgICAgaWYgKG1lbnVPZmZTZXRUb3ApIGxhbmRpbmcuc2Nyb2xsVG9wID0gMDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH0pO1xyXG4gICAgfSwgNTAwKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbk5vdFNob3dBZ2FpblRvZ2dsZShjaGFuZ2U6IE1hdFNsaWRlVG9nZ2xlQ2hhbmdlKSB7XHJcbiAgICBpZiAoY2hhbmdlLmNoZWNrZWQpIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMubGFuZGluZ0Jhbm5lcktleSwgJ3RydWUnKTtcclxuICAgIGVsc2UgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5sYW5kaW5nQmFubmVyS2V5LCAnZmFsc2UnKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblN0YXJ0VG91clRvZ2dsZShjaGFuZ2U6IE1hdFNsaWRlVG9nZ2xlQ2hhbmdlKSB7XHJcbiAgICB0aGlzLnNob3dUb3VyID0gIXRoaXMuc2hvd1RvdXI7XHJcbiAgICBpZiAoY2hhbmdlLmNoZWNrZWQpIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMubGFuZGluZ1RvdXJLZXksICdmYWxzZScpO1xyXG4gICAgZWxzZSBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmxhbmRpbmdUb3VyS2V5LCAndHJ1ZScpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uQ2xvc2VDbGljaygpIHtcclxuICAgIHRoaXMuc2hvd0xhbmRpbmcgPSBmYWxzZTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMubGFuZGluZ0Jhbm5lcktleSwgJ3RydWUnKTtcclxuICAgIGlmICh0aGlzLnNob3dUb3VyKSB7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMubGFuZGluZ1RvdXJLZXksICdmYWxzZScpO1xyXG4gICAgICB0aGlzLnN0YXJ0R3VpZGVkVG91cigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE5ld01lc3NhZ2VzQ291bnQoKSB7XHJcbiAgICB0aGlzLm1lc3NhZ2VzU2VydmljZS5tZXNzYWdlcyRcclxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxyXG4gICAgICAuc3Vic2NyaWJlKChtc2dzOiBNZXNzYWdlTW9kZWxbXSkgPT4ge1xyXG4gICAgICAgIHRoaXMubWVzc2FnZXMgPSBtc2dzLmZpbHRlcigobXNnOiBNZXNzYWdlTW9kZWwpID0+IHtcclxuICAgICAgICAgIHJldHVybiBtc2cudW5yZWFkICYmIG1zZy50eXBlICE9PSBNZXNzYWdlVHlwZS5DaGFuZ2Vsb2c7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5tc2dDb3VudCA9IHRoaXMubWVzc2FnZXMubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMubWVzc2FnZXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwibGFuZGluZy1jb250YWluZXJcIiAjbGFuZGluZz5cclxuICA8bWF0LWNhcmQgKm5nSWY9XCJpbm5lcldpZHRoID49IDcwMCAmJiBzaG93TGFuZGluZyAmJiAhbWVzc2FnZXNMb2FkaW5nXCI+XHJcbiAgICA8bWF0LWNhcmQtaGVhZGVyPlxyXG4gICAgICA8aW1nIG1hdC1jYXJkLWF2YXRhciBbc3JjXT1cImxhbmRpbmdJbmZvLmhlYWRlci5pbWFnZVwiIC8+XHJcbiAgICAgIDxtYXQtY2FyZC10aXRsZT57eyBsYW5kaW5nSW5mby5oZWFkZXIudGl0bGUgfX08L21hdC1jYXJkLXRpdGxlPlxyXG4gICAgICA8bWF0LWNhcmQtc3VidGl0bGU+e3sgbGFuZGluZ0luZm8uaGVhZGVyLnN1YnRpdGxlIH19PC9tYXQtY2FyZC1zdWJ0aXRsZT5cclxuICAgIDwvbWF0LWNhcmQtaGVhZGVyPlxyXG4gICAgPG1hdC1jYXJkLWNvbnRlbnQgKm5nRm9yPVwibGV0IGNvbnRlbnQgb2YgbGFuZGluZ0luZm8uY29udGVudFwiPlxyXG4gICAgICA8cD5cclxuICAgICAgICB7eyBjb250ZW50LnAgfX1cclxuICAgICAgPC9wPlxyXG4gICAgPC9tYXQtY2FyZC1jb250ZW50PlxyXG4gICAgPGRpdiBjbGFzcz1cInRvZ2dsZS1jb250YWluZXJcIj5cclxuICAgICAgPG1hdC1zbGlkZS10b2dnbGVcclxuICAgICAgICBjbGFzcz1cIm5vdFNob3dBZ2FpblRvZ2dsZVwiXHJcbiAgICAgICAgKGNoYW5nZSk9XCJvbk5vdFNob3dBZ2FpblRvZ2dsZSgkZXZlbnQpXCJcclxuICAgICAgICA+TmljaHQgbWVociB6ZWlnZW48L21hdC1zbGlkZS10b2dnbGVcclxuICAgICAgPlxyXG4gICAgICA8bWF0LXNsaWRlLXRvZ2dsZVxyXG4gICAgICAgIGNsYXNzPVwic3RhcnRUb3VyVG9nZ2xlXCJcclxuICAgICAgICBjaGVja2VkPVwidHJ1ZVwiXHJcbiAgICAgICAgKGNoYW5nZSk9XCJvblN0YXJ0VG91clRvZ2dsZSgkZXZlbnQpXCJcclxuICAgICAgPlxyXG4gICAgICAgIFRvdXIgc3RhcnRlblxyXG4gICAgICA8L21hdC1zbGlkZS10b2dnbGU+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJidXR0b24tY29udGFpbmVyXCI+XHJcbiAgICAgIDxidXR0b25cclxuICAgICAgICBjbGFzcz1cImNsb3NlQnRuXCJcclxuICAgICAgICBtYXQtc3Ryb2tlZC1idXR0b25cclxuICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxyXG4gICAgICAgIChjbGljayk9XCJvbkNsb3NlQ2xpY2soKVwiXHJcbiAgICAgID5cclxuICAgICAgICBTY2hsaWXDn2VuXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9tYXQtY2FyZD5cclxuICA8bWF0LWdyaWQtbGlzdFxyXG4gICAgaWQ9XCJtZW51LWdyaWQtbGlzdFwiXHJcbiAgICBbc29saWRTa2VsZXRvbkdyaWRDb2xzXT1cImdyaWRDb2x1bW5zXCJcclxuICAgIGd1dHRlclNpemU9XCIxcmVtXCJcclxuICAgIHJvd0hlaWdodD1cIjE6MVwiXHJcbiAgPlxyXG4gICAgPG1hdC1ncmlkLXRpbGVcclxuICAgICAgKm5nRm9yPVwibGV0IG1lbnVJdGVtIG9mIG1lbnVJdGVtcyQgfCBhc3luYzsgbGV0IGluZGV4ID0gaW5kZXhcIlxyXG4gICAgICBjbGFzcz1cIm1hdC1lbGV2YXRpb24tejJcIlxyXG4gICAgICBbcm91dGVyTGlua109XCJtZW51SXRlbS5yb3V0ZVwiXHJcbiAgICAgIFtxdWVyeVBhcmFtc109XCJ7IGRpcmVjdFRvOiBtc2dDb3VudCA+IDAgPyAnbmV3cycgOiB1bmRlZmluZWQgfVwiXHJcbiAgICAgIGlkPVwibWVudS10aWxlLXt7IGluZGV4IH19XCJcclxuICAgID5cclxuICAgICAgPG1hdC1pY29uXHJcbiAgICAgICAgKm5nSWY9XCJtZW51SXRlbS5zdmdJY29uICYmIG1lbnVJdGVtLnJvdXRlICE9PSAnaW5mbydcIlxyXG4gICAgICAgIFtzdmdJY29uXT1cIm1lbnVJdGVtLnN2Z0ljb25cIlxyXG4gICAgICA+PC9tYXQtaWNvbj5cclxuICAgICAgPG1hdC1pY29uICpuZ0lmPVwiIW1lbnVJdGVtLnN2Z0ljb24gJiYgbWVudUl0ZW0ucm91dGUgIT09ICdpbmZvJ1wiPnt7XHJcbiAgICAgICAgbWVudUl0ZW0uaWNvblxyXG4gICAgICB9fTwvbWF0LWljb24+XHJcbiAgICAgIDxtYXQtaWNvblxyXG4gICAgICAgICpuZ0lmPVwibWVudUl0ZW0uc3ZnSWNvbiAmJiBtZW51SXRlbS5yb3V0ZSA9PT0gJ2luZm8nXCJcclxuICAgICAgICBbc3ZnSWNvbl09XCJtZW51SXRlbS5zdmdJY29uXCJcclxuICAgICAgICBbbWF0QmFkZ2VdPVwibXNnQ291bnRcIlxyXG4gICAgICAgIFttYXRCYWRnZUhpZGRlbl09XCJtc2dDb3VudCA9PT0gMFwiXHJcbiAgICAgICAgbWF0QmFkZ2VTaXplPVwibGFyZ2VcIlxyXG4gICAgICA+PC9tYXQtaWNvbj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJuYXZUaXRsZVwiPnt7IG1lbnVJdGVtLnRpdGxlIH19PC9zcGFuPlxyXG4gICAgPC9tYXQtZ3JpZC10aWxlPlxyXG4gICAgPG1hdC1ncmlkLXRpbGVcclxuICAgICAgaWQ9XCJnbG9zc2FyeVwiXHJcbiAgICAgIChjbGljayk9XCJvbkdsb3NzYXJ5Q2xpY2suZW1pdCgpXCJcclxuICAgICAgY2xhc3M9XCJtYXQtZWxldmF0aW9uLXoyXCJcclxuICAgICAgPjxtYXQtaWNvbiBtYXRMaXN0SWNvbiBzdmdJY29uPVwiZ2xvc3NhcnlfY3VzdG9tXCI+PC9tYXQtaWNvbj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJuYXZUaXRsZVwiPkdsb3NzYXI8L3NwYW4+XHJcbiAgICA8L21hdC1ncmlkLXRpbGU+XHJcbiAgICA8bWF0LWdyaWQtdGlsZVxyXG4gICAgICBpZD1cImZlZWRiYWNrXCJcclxuICAgICAgKGNsaWNrKT1cImZlZWRiYWNrLnNob3dEaWFsb2coKVwiXHJcbiAgICAgIGNsYXNzPVwibWF0LWVsZXZhdGlvbi16MlwiXHJcbiAgICAgID48bWF0LWljb24gbWF0TGlzdEljb24gc3ZnSWNvbj1cImZlZWRiYWNrXCI+PC9tYXQtaWNvbj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJuYXZUaXRsZVwiPktvbnRha3Q8L3NwYW4+XHJcbiAgICA8L21hdC1ncmlkLXRpbGU+XHJcbiAgPC9tYXQtZ3JpZC1saXN0PlxyXG4gIDxkaXYgY2xhc3M9XCJmb290ZXItY29udGFpbmVyXCI+XHJcbiAgICA8YSByb3V0ZXJMaW5rPVwiaW5mb1wiPkltcHJlc3N1bTwvYT5cclxuICAgIDxhIHJvdXRlckxpbms9XCJpbmZvXCIgW3F1ZXJ5UGFyYW1zXT1cInsgZGlyZWN0VG86ICdwcml2YWN5JyB9XCI+XHJcbiAgICAgIERhdGVuc2NodXR6PC9hXHJcbiAgICA+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=
