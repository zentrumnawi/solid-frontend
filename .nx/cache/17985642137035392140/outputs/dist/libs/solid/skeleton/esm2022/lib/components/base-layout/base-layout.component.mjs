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
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UpdateService } from '../../services/update.service';
import { SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';
import {
  FeedbackService,
  SOLID_SKELETON_FEEDBACK_SERVICE,
} from '../../services/feedback.service';
import { Router } from '@angular/router';
import { LandingComponent } from '../landing/landing.component';
import { Navigate } from '@ngxs/router-plugin';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { BaseComponent } from '@zentrumnawi/solid-profile';
import * as i0 from '@angular/core';
import * as i1 from '../../services/update.service';
import * as i2 from '@angular/cdk/layout';
import * as i3 from '@angular/router';
import * as i4 from '@angular/common';
import * as i5 from '@zentrumnawi/solid-glossary';
import * as i6 from '@angular/material/button';
import * as i7 from '@angular/material/icon';
import * as i8 from '@angular/material/sidenav';
import * as i9 from '@angular/material/toolbar';
import * as i10 from '../main-menu/main-menu.component';
import * as i11 from '../../services/feedback.service';
export class BaseLayoutComponent {
  feedback;
  config;
  _breakpointObserver;
  _router;
  FixedLayout = false;
  subscription;
  title = '';
  MainMenu;
  Glossary;
  // noinspection JSUnusedLocalSymbols.
  constructor(feedback, config, update, _breakpointObserver, _router) {
    this.feedback = feedback;
    this.config = config;
    this._breakpointObserver = _breakpointObserver;
    this._router = _router;
  }
  ngOnInit() {
    this._breakpointObserver
      .observe(['(min-width: 1000px)'])
      .subscribe((isFixed) => {
        const newFixedLayout = isFixed.matches;
        if (newFixedLayout) {
          if (this.MainMenu) {
            this.MainMenu.open();
          }
          if (this.Glossary) {
            this.Glossary.close();
          }
        } else {
          if (this.MainMenu) {
            this.MainMenu.close();
          }
          if (this.Glossary) {
            this.Glossary.close();
          }
        }
        this.FixedLayout = newFixedLayout;
      });
  }
  async onMenuSelectionChanged() {
    if (!this.FixedLayout && this.MainMenu) {
      await this.MainMenu.close();
    }
    if (!this.FixedLayout && this.Glossary) {
      await this.Glossary.close();
    }
  }
  onMenuGlossaryClick() {
    if (this.Glossary) {
      this.Glossary.open();
    }
    if (!this.FixedLayout && this.MainMenu) {
      this.MainMenu.close();
    }
  }
  closeMenu() {
    if (this.MainMenu && !this.FixedLayout) this.MainMenu.close();
  }
  reportError() {
    const location = this.Glossary?.opened ? 'glossary' : this._router.url;
    this.feedback.showDialog(location, this.title);
    this.title = '';
  }
  onLandingGlossaryClick(ref) {
    if (!(ref instanceof LandingComponent)) {
      return;
    }
    ref.onGlossaryClick.subscribe(() => {
      if (this.Glossary) {
        this.Glossary.open();
      }
    });
  }
  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  async navigateTo(url) {
    return new Navigate([url]);
  }
  profileTitle(ref) {
    if (!(ref instanceof BaseComponent)) {
      return;
    }
    ref.profileTitle.subscribe((profileTitle) => {
      this.title = profileTitle;
    });
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: BaseLayoutComponent,
    deps: [
      { token: SOLID_SKELETON_FEEDBACK_SERVICE },
      { token: SOLID_CORE_CONFIG },
      { token: i1.UpdateService },
      { token: i2.BreakpointObserver },
      { token: i3.Router },
    ],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: BaseLayoutComponent,
    selector: 'solid-skeleton-base-layout',
    viewQueries: [
      {
        propertyName: 'MainMenu',
        first: true,
        predicate: ['mainmenu'],
        descendants: true,
        static: true,
      },
      {
        propertyName: 'Glossary',
        first: true,
        predicate: ['glossary'],
        descendants: true,
        static: true,
      },
    ],
    ngImport: i0,
    template:
      '<div class="base-layout-container mat-typography">\r\n  <mat-toolbar color="primary" class="base-layout-main-toolbar">\r\n    <ng-container *ngIf="FixedLayout">\r\n      <div class="right-border">\r\n        <span>Men\u00FC</span>\r\n      </div>\r\n      <img\r\n        id="Logo"\r\n        [src]="config.appLogo"\r\n        onerror=\'this.style.display = "none"\'\r\n        (click)="navigateTo(\'/\')"\r\n      />\r\n      <span id="app-name" class="appName" (click)="navigateTo(\'/\')">{{\r\n        config.appName\r\n      }}</span>\r\n      <div class="spacer"></div>\r\n      <div class="reportButton" *ngIf="this.config.error_report">\r\n        <button\r\n          id="reportButton"\r\n          class="button"\r\n          (click)="reportError()"\r\n          mat-icon-button\r\n        >\r\n          <mat-icon\r\n            aria-label="Fehler melden"\r\n            svgIcon="feedback_outline"\r\n          ></mat-icon>\r\n        </button>\r\n        <div class="bottom"></div>\r\n      </div>\r\n      <div id="glossary">\r\n        <button (click)="Glossary?.toggle()" mat-icon-button>\r\n          <mat-icon\r\n            aria-label="Glossar \u00F6ffnen"\r\n            svgIcon="glossary_generic"\r\n          ></mat-icon>\r\n        </button>\r\n      </div>\r\n    </ng-container>\r\n    <ng-container *ngIf="!FixedLayout">\r\n      <div class="mainmenu-button">\r\n        <button\r\n          id="menu"\r\n          (click)="MainMenu?.toggle(); Glossary?.close()"\r\n          mat-icon-button\r\n        >\r\n          <mat-icon aria-label="Men\u00FC \u00F6ffnen">menu</mat-icon>\r\n        </button>\r\n      </div>\r\n      <img\r\n        id="Logo"\r\n        [src]="config.appLogo"\r\n        onerror=\'this.style.display = "none"\'\r\n        (click)="navigateTo(\'/\')"\r\n      />\r\n      <span\r\n        id="app-name"\r\n        [class.app-title-fixed]="FixedLayout"\r\n        class="appName"\r\n        (click)="navigateTo(\'/\')"\r\n        >{{ config.appName }}</span\r\n      >\r\n      <div class="spacer"></div>\r\n      <div class="reportButton" *ngIf="this.config.error_report">\r\n        <button\r\n          id="reportButton"\r\n          class="button"\r\n          (click)="reportError()"\r\n          mat-icon-button\r\n        >\r\n          <mat-icon\r\n            aria-label="Fehler melden"\r\n            svgIcon="feedback_outline"\r\n          ></mat-icon>\r\n        </button>\r\n        <div class="bottom"></div>\r\n      </div>\r\n      <button\r\n        id="glossary"\r\n        (click)="Glossary?.toggle(); MainMenu?.close()"\r\n        mat-icon-button\r\n      >\r\n        <mat-icon\r\n          aria-label="Glossar \u00F6ffnen"\r\n          svgIcon="glossary_generic"\r\n        ></mat-icon>\r\n      </button>\r\n    </ng-container>\r\n  </mat-toolbar>\r\n  <mat-sidenav-container (backdropClick)="closeMenu()">\r\n    <mat-sidenav\r\n      #mainmenu\r\n      [fixedInViewport]="!FixedLayout"\r\n      [mode]="FixedLayout ? \'side\' : \'over\'"\r\n      class="mainmenu-sidenav"\r\n      position="start"\r\n      disableClose\r\n    >\r\n      <mat-toolbar\r\n        (click)="MainMenu?.toggle()"\r\n        *ngIf="!FixedLayout"\r\n        color="primary"\r\n      >\r\n        Men\u00FC\r\n      </mat-toolbar>\r\n      <solid-skeleton-main-menu\r\n        (selectMenuEntry)="onMenuSelectionChanged()"\r\n        (openGlossaryClick)="onMenuGlossaryClick()"\r\n      ></solid-skeleton-main-menu>\r\n    </mat-sidenav>\r\n    <mat-sidenav-content>\r\n      <router-outlet\r\n        (activate)="onLandingGlossaryClick($event); profileTitle($event)"\r\n        (deactivate)="unsubscribe()"\r\n      >\r\n      </router-outlet>\r\n    </mat-sidenav-content>\r\n    <mat-sidenav\r\n      #glossary\r\n      [fixedInViewport]="true"\r\n      [mode]="\'over\'"\r\n      class="glossary-sidenav"\r\n      position="end"\r\n    >\r\n      <mat-toolbar\r\n        (click)="Glossary?.toggle()"\r\n        class="glossary-toolbar"\r\n        color="primary"\r\n      >\r\n        Glossar\r\n      </mat-toolbar>\r\n      <solid-glossary></solid-glossary>\r\n    </mat-sidenav>\r\n  </mat-sidenav-container>\r\n</div>\r\n',
    styles: [
      '.base-layout-container{position:absolute;inset:0}.base-layout-container mat-sidenav-content{height:100%;max-height:100%}.base-layout-container mat-sidenav-container{position:absolute;inset:60px 0 0}.base-layout-container mat-toolbar{height:60px;position:relative;z-index:999}.base-layout-container mat-toolbar span.appName{padding-left:16px}@media (max-width: 365px){.base-layout-container mat-toolbar span.appName{padding-left:9px;padding-right:5px}}.base-layout-container mat-toolbar .app-title-fixed{margin-left:300px}.base-layout-container mat-toolbar .right-border{width:284px;height:100%;display:inline-flex;align-items:center}.base-layout-container mat-toolbar .left-border{width:284px;height:56px;text-align:right;display:inline-flex;align-items:center}.base-layout-container .glossary-sidenav,.base-layout-container .mainmenu-sidenav{width:300px;height:100%}.base-layout-container ::ng-deep .mat-drawer-inner-container{overflow:hidden}.base-layout-container .reportButton{height:100%;display:flex;flex-direction:column;justify-content:flex-end;margin-top:8px;margin-right:.3em}.base-layout-container .reportButton .button{background-color:#fff;border-radius:10px 10px 0 0}.base-layout-container .reportButton .button ::ng-deep .mat-icon{height:40px;width:40px;color:#000000b3}.base-layout-container .reportButton .bottom{background-color:#fff;height:10px}@media (max-width: 365px){.base-layout-container .reportButton{margin-right:0}}img#Logo{margin-left:1em;height:24px;cursor:pointer}span.appName{cursor:pointer}@media (max-width: 365px){img#Logo{margin-left:3px;height:20px}}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i4.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'component',
        type: i5.GlossaryComponent,
        selector: 'solid-glossary',
      },
      {
        kind: 'directive',
        type: i3.RouterOutlet,
        selector: 'router-outlet',
        inputs: ['name'],
        outputs: ['activate', 'deactivate', 'attach', 'detach'],
        exportAs: ['outlet'],
      },
      {
        kind: 'component',
        type: i6.MatIconButton,
        selector: 'button[mat-icon-button]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'component',
        type: i7.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'component',
        type: i8.MatSidenav,
        selector: 'mat-sidenav',
        inputs: ['fixedInViewport', 'fixedTopGap', 'fixedBottomGap'],
        exportAs: ['matSidenav'],
      },
      {
        kind: 'component',
        type: i8.MatSidenavContainer,
        selector: 'mat-sidenav-container',
        exportAs: ['matSidenavContainer'],
      },
      {
        kind: 'component',
        type: i8.MatSidenavContent,
        selector: 'mat-sidenav-content',
      },
      {
        kind: 'component',
        type: i9.MatToolbar,
        selector: 'mat-toolbar',
        inputs: ['color'],
        exportAs: ['matToolbar'],
      },
      {
        kind: 'component',
        type: i10.MainMenuComponent,
        selector: 'solid-skeleton-main-menu',
        outputs: ['selectMenuEntry', 'openGlossaryClick'],
      },
    ],
  });
}
__decorate(
  [
    Dispatch(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Promise),
  ],
  BaseLayoutComponent.prototype,
  'navigateTo',
  null
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: BaseLayoutComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-skeleton-base-layout',
          template:
            '<div class="base-layout-container mat-typography">\r\n  <mat-toolbar color="primary" class="base-layout-main-toolbar">\r\n    <ng-container *ngIf="FixedLayout">\r\n      <div class="right-border">\r\n        <span>Men\u00FC</span>\r\n      </div>\r\n      <img\r\n        id="Logo"\r\n        [src]="config.appLogo"\r\n        onerror=\'this.style.display = "none"\'\r\n        (click)="navigateTo(\'/\')"\r\n      />\r\n      <span id="app-name" class="appName" (click)="navigateTo(\'/\')">{{\r\n        config.appName\r\n      }}</span>\r\n      <div class="spacer"></div>\r\n      <div class="reportButton" *ngIf="this.config.error_report">\r\n        <button\r\n          id="reportButton"\r\n          class="button"\r\n          (click)="reportError()"\r\n          mat-icon-button\r\n        >\r\n          <mat-icon\r\n            aria-label="Fehler melden"\r\n            svgIcon="feedback_outline"\r\n          ></mat-icon>\r\n        </button>\r\n        <div class="bottom"></div>\r\n      </div>\r\n      <div id="glossary">\r\n        <button (click)="Glossary?.toggle()" mat-icon-button>\r\n          <mat-icon\r\n            aria-label="Glossar \u00F6ffnen"\r\n            svgIcon="glossary_generic"\r\n          ></mat-icon>\r\n        </button>\r\n      </div>\r\n    </ng-container>\r\n    <ng-container *ngIf="!FixedLayout">\r\n      <div class="mainmenu-button">\r\n        <button\r\n          id="menu"\r\n          (click)="MainMenu?.toggle(); Glossary?.close()"\r\n          mat-icon-button\r\n        >\r\n          <mat-icon aria-label="Men\u00FC \u00F6ffnen">menu</mat-icon>\r\n        </button>\r\n      </div>\r\n      <img\r\n        id="Logo"\r\n        [src]="config.appLogo"\r\n        onerror=\'this.style.display = "none"\'\r\n        (click)="navigateTo(\'/\')"\r\n      />\r\n      <span\r\n        id="app-name"\r\n        [class.app-title-fixed]="FixedLayout"\r\n        class="appName"\r\n        (click)="navigateTo(\'/\')"\r\n        >{{ config.appName }}</span\r\n      >\r\n      <div class="spacer"></div>\r\n      <div class="reportButton" *ngIf="this.config.error_report">\r\n        <button\r\n          id="reportButton"\r\n          class="button"\r\n          (click)="reportError()"\r\n          mat-icon-button\r\n        >\r\n          <mat-icon\r\n            aria-label="Fehler melden"\r\n            svgIcon="feedback_outline"\r\n          ></mat-icon>\r\n        </button>\r\n        <div class="bottom"></div>\r\n      </div>\r\n      <button\r\n        id="glossary"\r\n        (click)="Glossary?.toggle(); MainMenu?.close()"\r\n        mat-icon-button\r\n      >\r\n        <mat-icon\r\n          aria-label="Glossar \u00F6ffnen"\r\n          svgIcon="glossary_generic"\r\n        ></mat-icon>\r\n      </button>\r\n    </ng-container>\r\n  </mat-toolbar>\r\n  <mat-sidenav-container (backdropClick)="closeMenu()">\r\n    <mat-sidenav\r\n      #mainmenu\r\n      [fixedInViewport]="!FixedLayout"\r\n      [mode]="FixedLayout ? \'side\' : \'over\'"\r\n      class="mainmenu-sidenav"\r\n      position="start"\r\n      disableClose\r\n    >\r\n      <mat-toolbar\r\n        (click)="MainMenu?.toggle()"\r\n        *ngIf="!FixedLayout"\r\n        color="primary"\r\n      >\r\n        Men\u00FC\r\n      </mat-toolbar>\r\n      <solid-skeleton-main-menu\r\n        (selectMenuEntry)="onMenuSelectionChanged()"\r\n        (openGlossaryClick)="onMenuGlossaryClick()"\r\n      ></solid-skeleton-main-menu>\r\n    </mat-sidenav>\r\n    <mat-sidenav-content>\r\n      <router-outlet\r\n        (activate)="onLandingGlossaryClick($event); profileTitle($event)"\r\n        (deactivate)="unsubscribe()"\r\n      >\r\n      </router-outlet>\r\n    </mat-sidenav-content>\r\n    <mat-sidenav\r\n      #glossary\r\n      [fixedInViewport]="true"\r\n      [mode]="\'over\'"\r\n      class="glossary-sidenav"\r\n      position="end"\r\n    >\r\n      <mat-toolbar\r\n        (click)="Glossary?.toggle()"\r\n        class="glossary-toolbar"\r\n        color="primary"\r\n      >\r\n        Glossar\r\n      </mat-toolbar>\r\n      <solid-glossary></solid-glossary>\r\n    </mat-sidenav>\r\n  </mat-sidenav-container>\r\n</div>\r\n',
          styles: [
            '.base-layout-container{position:absolute;inset:0}.base-layout-container mat-sidenav-content{height:100%;max-height:100%}.base-layout-container mat-sidenav-container{position:absolute;inset:60px 0 0}.base-layout-container mat-toolbar{height:60px;position:relative;z-index:999}.base-layout-container mat-toolbar span.appName{padding-left:16px}@media (max-width: 365px){.base-layout-container mat-toolbar span.appName{padding-left:9px;padding-right:5px}}.base-layout-container mat-toolbar .app-title-fixed{margin-left:300px}.base-layout-container mat-toolbar .right-border{width:284px;height:100%;display:inline-flex;align-items:center}.base-layout-container mat-toolbar .left-border{width:284px;height:56px;text-align:right;display:inline-flex;align-items:center}.base-layout-container .glossary-sidenav,.base-layout-container .mainmenu-sidenav{width:300px;height:100%}.base-layout-container ::ng-deep .mat-drawer-inner-container{overflow:hidden}.base-layout-container .reportButton{height:100%;display:flex;flex-direction:column;justify-content:flex-end;margin-top:8px;margin-right:.3em}.base-layout-container .reportButton .button{background-color:#fff;border-radius:10px 10px 0 0}.base-layout-container .reportButton .button ::ng-deep .mat-icon{height:40px;width:40px;color:#000000b3}.base-layout-container .reportButton .bottom{background-color:#fff;height:10px}@media (max-width: 365px){.base-layout-container .reportButton{margin-right:0}}img#Logo{margin-left:1em;height:24px;cursor:pointer}span.appName{cursor:pointer}@media (max-width: 365px){img#Logo{margin-left:3px;height:20px}}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: i11.FeedbackService,
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
      { type: i1.UpdateService },
      { type: i2.BreakpointObserver },
      { type: i3.Router },
    ];
  },
  propDecorators: {
    MainMenu: [
      {
        type: ViewChild,
        args: ['mainmenu', { static: true }],
      },
    ],
    Glossary: [
      {
        type: ViewChild,
        args: ['glossary', { static: true }],
      },
    ],
    navigateTo: [],
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1sYXlvdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9za2VsZXRvbi9zcmMvbGliL2NvbXBvbmVudHMvYmFzZS1sYXlvdXQvYmFzZS1sYXlvdXQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9za2VsZXRvbi9zcmMvbGliL2NvbXBvbmVudHMvYmFzZS1sYXlvdXQvYmFzZS1sYXlvdXQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQVUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGlCQUFpQixFQUFtQixNQUFNLHlCQUF5QixDQUFDO0FBQzdFLE9BQU8sRUFDTCxlQUFlLEVBQ2YsK0JBQStCLEdBQ2hDLE1BQU0saUNBQWlDLENBQUM7QUFDekMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRWhFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7Ozs7Ozs7Ozs7O0FBTzNELE1BQU0sT0FBTyxtQkFBbUI7SUFVckI7SUFDMkI7SUFFMUI7SUFDQTtJQWJILFdBQVcsR0FBRyxLQUFL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LFFBQVEsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN0QjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLFdBQVc7UUFDaEIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDakM7SUFDSCxDQUFDO0lBR1ksQUFBTixLQUFLLENBQUMsVUFBVSxDQUFDLEdBQVc7UUFDakMsT0FBTyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVNLFlBQVksQ0FBQyxHQUFRO1FBQzFCLElBQUksQ0FBQyxDQUFDLEdBQUcsWUFBWSxhQUFhLENBQUMsRUFBRTtZQUNuQyxPQUFPO1NBQ1I7UUFDRCxHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFlBQW9CLEVBQUUsRUFBRTtZQUNsRCxJQUFJLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7dUdBbEdVLG1CQUFtQixrQkFTcEIsK0JBQStCLGFBRS9CLGlCQUFpQjsyRkFYaEIsbUJBQW1CLDJSQ3JCaEMsMnNJQXVJQTs7QUQzQmU7SUFEWixRQUFRLEVBQUU7Ozs7cURBR1Y7MkZBekZVLG1CQUFtQjtrQkFML0IsU0FBUzsrQkFDRSw0QkFBNEI7OzBCQWFuQyxNQUFNOzJCQUFDLCtCQUErQjs7MEJBRXRDLE1BQU07MkJBQUMsaUJBQWlCOzhIQVBjLFFBQVE7c0JBQWhELFNBQVM7dUJBQUMsVUFBVSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFDRSxRQUFRO3NCQUFoRCxTQUFTO3VCQUFDLFVBQVUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7Z0JBa0YxQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdERyYXdlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NpZGVuYXYnO1xyXG5pbXBvcnQgeyBCcmVha3BvaW50T2JzZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvbGF5b3V0JztcclxuaW1wb3J0IHsgVXBkYXRlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3VwZGF0ZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU09MSURfQ09SRV9DT05GSUcsIFNvbGlkQ29yZUNvbmZpZyB9IGZyb20gJ0B6ZW50cnVtbmF3aS9zb2xpZC1jb3JlJztcclxuaW1wb3J0IHtcclxuICBGZWVkYmFja1NlcnZpY2UsXHJcbiAgU09MSURfU0tFTEVUT05fRkVFREJBQ0tfU0VSVklDRSxcclxufSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9mZWVkYmFjay5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgTGFuZGluZ0NvbXBvbmVudCB9IGZyb20gJy4uL2xhbmRpbmcvbGFuZGluZy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTmF2aWdhdGUgfSBmcm9tICdAbmd4cy9yb3V0ZXItcGx1Z2luJztcclxuaW1wb3J0IHsgRGlzcGF0Y2ggfSBmcm9tICdAbmd4cy1sYWJzL2Rpc3BhdGNoLWRlY29yYXRvcic7XHJcbmltcG9ydCB7IEJhc2VDb21wb25lbnQgfSBmcm9tICdAemVudHJ1bW5hd2kvc29saWQtcHJvZmlsZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NvbGlkLXNrZWxldG9uLWJhc2UtbGF5b3V0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYmFzZS1sYXlvdXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2Jhc2UtbGF5b3V0LmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCYXNlTGF5b3V0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBwdWJsaWMgRml4ZWRMYXlvdXQgPSBmYWxzZTtcclxuICBwdWJsaWMgc3Vic2NyaXB0aW9uITogU3Vic2NyaXB0aW9uO1xyXG4gIHB1YmxpYyB0aXRsZSA9ICcnO1xyXG4gIEBWaWV3Q2hpbGQoJ21haW5tZW51JywgeyBzdGF0aWM6IHRydWUgfSkgTWFpbk1lbnU/OiBNYXREcmF3ZXI7XHJcbiAgQFZpZXdDaGlsZCgnZ2xvc3NhcnknLCB7IHN0YXRpYzogdHJ1ZSB9KSBHbG9zc2FyeT86IE1hdERyYXdlcjtcclxuXHJcbiAgLy8gbm9pbnNwZWN0aW9uIEpTVW51c2VkTG9jYWxTeW1ib2xzLlxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQEluamVjdChTT0xJRF9TS0VMRVRPTl9GRUVEQkFDS19TRVJWSUNFKVxyXG4gICAgcHVibGljIGZlZWRiYWNrOiBGZWVkYmFja1NlcnZpY2UsXHJcbiAgICBASW5qZWN0KFNPTElEX0NPUkVfQ09ORklHKSBwdWJsaWMgY29uZmlnOiBTb2xpZENvcmVDb25maWcsXHJcbiAgICB1cGRhdGU6IFVwZGF0ZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIF9icmVha3BvaW50T2JzZXJ2ZXI6IEJyZWFrcG9pbnRPYnNlcnZlcixcclxuICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyXHJcbiAgKSB7fVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLl9icmVha3BvaW50T2JzZXJ2ZXJcclxuICAgICAgLm9ic2VydmUoWycobWluLXdpZHRoOiAxMDAwcHgpJ10pXHJcbiAgICAgIC5zdWJzY3JpYmUoKGlzRml4ZWQpID0+IHtcclxuICAgICAgICBjb25zdCBuZXdGaXhlZExheW91dCA9IGlzRml4ZWQubWF0Y2hlcztcclxuICAgICAgICBpZiAobmV3Rml4ZWRMYXlvdXQpIHtcclxuICAgICAgICAgIGlmICh0aGlzLk1haW5NZW51KSB7XHJcbiAgICAgICAgICAgIHRoaXMuTWFpbk1lbnUub3BlbigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMuR2xvc3NhcnkpIHtcclxuICAgICAgICAgICAgdGhpcy5HbG9zc2FyeS5jbG9zZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5NYWluTWVudSkge1xyXG4gICAgICAgICAgICB0aGlzLk1haW5NZW51LmNsb3NlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGhpcy5HbG9zc2FyeSkge1xyXG4gICAgICAgICAgICB0aGlzLkdsb3NzYXJ5LmNsb3NlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuRml4ZWRMYXlvdXQgPSBuZXdGaXhlZExheW91dDtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgb25NZW51U2VsZWN0aW9uQ2hhbmdlZCgpIHtcclxuICAgIGlmICghdGhpcy5GaXhlZExheW91dCAmJiB0aGlzLk1haW5NZW51KSB7XHJcbiAgICAgIGF3YWl0IHRoaXMuTWFpbk1lbnUuY2xvc2UoKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5GaXhlZExheW91dCAmJiB0aGlzLkdsb3NzYXJ5KSB7XHJcbiAgICAgIGF3YWl0IHRoaXMuR2xvc3NhcnkuY2xvc2UoKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIG9uTWVudUdsb3NzYXJ5Q2xpY2soKSB7XHJcbiAgICBpZiAodGhpcy5HbG9zc2FyeSkge1xyXG4gICAgICB0aGlzLkdsb3NzYXJ5Lm9wZW4oKTtcclxuICAgIH1cclxuICAgIGlmICghdGhpcy5GaXhlZExheW91dCAmJiB0aGlzLk1haW5NZW51KSB7XHJcbiAgICAgIHRoaXMuTWFpbk1lbnUuY2xvc2UoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBjbG9zZU1lbnUoKSB7XHJcbiAgICBpZiAodGhpcy5NYWluTWVudSAmJiAhdGhpcy5GaXhlZExheW91dCkgdGhpcy5NYWluTWVudS5jbG9zZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlcG9ydEVycm9yKCkge1xyXG4gICAgY29uc3QgbG9jYXRpb24gPSB0aGlzLkdsb3NzYXJ5Py5vcGVuZWQgPyAnZ2xvc3NhcnknIDogdGhpcy5fcm91dGVyLnVybDtcclxuICAgIHRoaXMuZmVlZGJhY2suc2hvd0RpYWxvZyhsb2NhdGlvbiwgdGhpcy50aXRsZSk7XHJcbiAgICB0aGlzLnRpdGxlID0gJyc7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25MYW5kaW5nR2xvc3NhcnlDbGljayhyZWY6IGFueSkge1xyXG4gICAgaWYgKCEocmVmIGluc3RhbmNlb2YgTGFuZGluZ0NvbXBvbmVudCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZi5vbkdsb3NzYXJ5Q2xpY2suc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgaWYgKHRoaXMuR2xvc3NhcnkpIHtcclxuICAgICAgICB0aGlzLkdsb3NzYXJ5Lm9wZW4oKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdW5zdWJzY3JpYmUoKSB7XHJcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBEaXNwYXRjaCgpXHJcbiAgcHVibGljIGFzeW5jIG5hdmlnYXRlVG8odXJsOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiBuZXcgTmF2aWdhdGUoW3VybF0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHByb2ZpbGVUaXRsZShyZWY6IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKCEocmVmIGluc3RhbmNlb2YgQmFzZUNvbXBvbmVudCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmVmLnByb2ZpbGVUaXRsZS5zdWJzY3JpYmUoKHByb2ZpbGVUaXRsZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHRoaXMudGl0bGUgPSBwcm9maWxlVGl0bGU7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cImJhc2UtbGF5b3V0LWNvbnRhaW5lciBtYXQtdHlwb2dyYXBoeVwiPlxyXG4gIDxtYXQtdG9vbGJhciBjb2xvcj1cInByaW1hcnlcIiBjbGFzcz1cImJhc2UtbGF5b3V0LW1haW4tdG9vbGJhclwiPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIkZpeGVkTGF5b3V0XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyaWdodC1ib3JkZXJcIj5cclxuICAgICAgICA8c3Bhbj5NZW7DvDwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxpbWdcclxuICAgICAgICBpZD1cIkxvZ29cIlxyXG4gICAgICAgIFtzcmNdPVwiY29uZmlnLmFwcExvZ29cIlxyXG4gICAgICAgIG9uZXJyb3I9J3RoaXMuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiJ1xyXG4gICAgICAgIChjbGljayk9XCJuYXZpZ2F0ZVRvKCcvJylcIlxyXG4gICAgICAvPlxyXG4gICAgICA8c3BhbiBpZD1cImFwcC1uYW1lXCIgY2xhc3M9XCJhcHBOYW1lXCIgKGNsaWNrKT1cIm5hdmlnYXRlVG8oJy8nKVwiPnt7XHJcbiAgICAgICAgY29uZmlnLmFwcE5hbWVcclxuICAgICAgfX08L3NwYW4+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj48L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInJlcG9ydEJ1dHRvblwiICpuZ0lmPVwidGhpcy5jb25maWcuZXJyb3JfcmVwb3J0XCI+XHJcbiAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgaWQ9XCJyZXBvcnRCdXR0b25cIlxyXG4gICAgICAgICAgY2xhc3M9XCJidXR0b25cIlxyXG4gICAgICAgICAgKGNsaWNrKT1cInJlcG9ydEVycm9yKClcIlxyXG4gICAgICAgICAgbWF0LWljb24tYnV0dG9uXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPG1hdC1pY29uXHJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJGZWhsZXIgbWVsZGVuXCJcclxuICAgICAgICAgICAgc3ZnSWNvbj1cImZlZWRiYWNrX291dGxpbmVcIlxyXG4gICAgICAgICAgPjwvbWF0LWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJvdHRvbVwiPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBpZD1cImdsb3NzYXJ5XCI+XHJcbiAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiR2xvc3Nhcnk/LnRvZ2dsZSgpXCIgbWF0LWljb24tYnV0dG9uPlxyXG4gICAgICAgICAgPG1hdC1pY29uXHJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJHbG9zc2FyIMO2ZmZuZW5cIlxyXG4gICAgICAgICAgICBzdmdJY29uPVwiZ2xvc3NhcnlfZ2VuZXJpY1wiXHJcbiAgICAgICAgICA+PC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhRml4ZWRMYXlvdXRcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm1haW5tZW51LWJ1dHRvblwiPlxyXG4gICAgICAgIDxidXR0b25cclxuICAgICAgICAgIGlkPVwibWVudVwiXHJcbiAgICAgICAgICAoY2xpY2spPVwiTWFpbk1lbnU/LnRvZ2dsZSgpOyBHbG9zc2FyeT8uY2xvc2UoKVwiXHJcbiAgICAgICAgICBtYXQtaWNvbi1idXR0b25cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8bWF0LWljb24gYXJpYS1sYWJlbD1cIk1lbsO8IMO2ZmZuZW5cIj5tZW51PC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxpbWdcclxuICAgICAgICBpZD1cIkxvZ29cIlxyXG4gICAgICAgIFtzcmNdPVwiY29uZmlnLmFwcExvZ29cIlxyXG4gICAgICAgIG9uZXJyb3I9J3RoaXMuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiJ1xyXG4gICAgICAgIChjbGljayk9XCJuYXZpZ2F0ZVRvKCcvJylcIlxyXG4gICAgICAvPlxyXG4gICAgICA8c3BhblxyXG4gICAgICAgIGlkPVwiYXBwLW5hbWVcIlxyXG4gICAgICAgIFtjbGFzcy5hcHAtdGl0bGUtZml4ZWRdPVwiRml4ZWRMYXlvdXRcIlxyXG4gICAgICAgIGNsYXNzPVwiYXBwTmFtZVwiXHJcbiAgICAgICAgKGNsaWNrKT1cIm5hdmlnYXRlVG8oJy8nKVwiXHJcbiAgICAgICAgPnt7IGNvbmZpZy5hcHBOYW1lIH19PC9zcGFuXHJcbiAgICAgID5cclxuICAgICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicmVwb3J0QnV0dG9uXCIgKm5nSWY9XCJ0aGlzLmNvbmZpZy5lcnJvcl9yZXBvcnRcIj5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICBpZD1cInJlcG9ydEJ1dHRvblwiXHJcbiAgICAgICAgICBjbGFzcz1cImJ1dHRvblwiXHJcbiAgICAgICAgICAoY2xpY2spPVwicmVwb3J0RXJyb3IoKVwiXHJcbiAgICAgICAgICBtYXQtaWNvbi1idXR0b25cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8bWF0LWljb25cclxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkZlaGxlciBtZWxkZW5cIlxyXG4gICAgICAgICAgICBzdmdJY29uPVwiZmVlZGJhY2tfb3V0bGluZVwiXHJcbiAgICAgICAgICA+PC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYm90dG9tXCI+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgaWQ9XCJnbG9zc2FyeVwiXHJcbiAgICAgICAgKGNsaWNrKT1cIkdsb3NzYXJ5Py50b2dnbGUoKTsgTWFpbk1lbnU/LmNsb3NlKClcIlxyXG4gICAgICAgIG1hdC1pY29uLWJ1dHRvblxyXG4gICAgICA+XHJcbiAgICAgICAgPG1hdC1pY29uXHJcbiAgICAgICAgICBhcmlhLWxhYmVsPVwiR2xvc3NhciDDtmZmbmVuXCJcclxuICAgICAgICAgIHN2Z0ljb249XCJnbG9zc2FyeV9nZW5lcmljXCJcclxuICAgICAgICA+PC9tYXQtaWNvbj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICA8L21hdC10b29sYmFyPlxyXG4gIDxtYXQtc2lkZW5hdi1jb250YWluZXIgKGJhY2tkcm9wQ2xpY2spPVwiY2xvc2VNZW51KClcIj5cclxuICAgIDxtYXQtc2lkZW5hdlxyXG4gICAgICAjbWFpbm1lbnVcclxuICAgICAgW2ZpeGVkSW5WaWV3cG9ydF09XCIhRml4ZWRMYXlvdXRcIlxyXG4gICAgICBbbW9kZV09XCJGaXhlZExheW91dCA/ICdzaWRlJyA6ICdvdmVyJ1wiXHJcbiAgICAgIGNsYXNzPVwibWFpbm1lbnUtc2lkZW5hdlwiXHJcbiAgICAgIHBvc2l0aW9uPVwic3RhcnRcIlxyXG4gICAgICBkaXNhYmxlQ2xvc2VcclxuICAgID5cclxuICAgICAgPG1hdC10b29sYmFyXHJcbiAgICAgICAgKGNsaWNrKT1cIk1haW5NZW51Py50b2dnbGUoKVwiXHJcbiAgICAgICAgKm5nSWY9XCIhRml4ZWRMYXlvdXRcIlxyXG4gICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXHJcbiAgICAgID5cclxuICAgICAgICBNZW7DvFxyXG4gICAgICA8L21hdC10b29sYmFyPlxyXG4gICAgICA8c29saWQtc2tlbGV0b24tbWFpbi1tZW51XHJcbiAgICAgICAgKHNlbGVjdE1lbnVFbnRyeSk9XCJvbk1lbnVTZWxlY3Rpb25DaGFuZ2VkKClcIlxyXG4gICAgICAgIChvcGVuR2xvc3NhcnlDbGljayk9XCJvbk1lbnVHbG9zc2FyeUNsaWNrKClcIlxyXG4gICAgICA+PC9zb2xpZC1za2VsZXRvbi1tYWluLW1lbnU+XHJcbiAgICA8L21hdC1zaWRlbmF2PlxyXG4gICAgPG1hdC1zaWRlbmF2LWNvbnRlbnQ+XHJcbiAgICAgIDxyb3V0ZXItb3V0bGV0XHJcbiAgICAgICAgKGFjdGl2YXRlKT1cIm9uTGFuZGluZ0dsb3NzYXJ5Q2xpY2soJGV2ZW50KTsgcHJvZmlsZVRpdGxlKCRldmVudClcIlxyXG4gICAgICAgIChkZWFjdGl2YXRlKT1cInVuc3Vic2NyaWJlKClcIlxyXG4gICAgICA+XHJcbiAgICAgIDwvcm91dGVyLW91dGxldD5cclxuICAgIDwvbWF0LXNpZGVuYXYtY29udGVudD5cclxuICAgIDxtYXQtc2lkZW5hdlxyXG4gICAgICAjZ2xvc3NhcnlcclxuICAgICAgW2ZpeGVkSW5WaWV3cG9ydF09XCJ0cnVlXCJcclxuICAgICAgW21vZGVdPVwiJ292ZXInXCJcclxuICAgICAgY2xhc3M9XCJnbG9zc2FyeS1zaWRlbmF2XCJcclxuICAgICAgcG9zaXRpb249XCJlbmRcIlxyXG4gICAgPlxyXG4gICAgICA8bWF0LXRvb2xiYXJcclxuICAgICAgICAoY2xpY2spPVwiR2xvc3Nhcnk/LnRvZ2dsZSgpXCJcclxuICAgICAgICBjbGFzcz1cImdsb3NzYXJ5LXRvb2xiYXJcIlxyXG4gICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXHJcbiAgICAgID5cclxuICAgICAgICBHbG9zc2FyXHJcbiAgICAgIDwvbWF0LXRvb2xiYXI+XHJcbiAgICAgIDxzb2xpZC1nbG9zc2FyeT48L3NvbGlkLWdsb3NzYXJ5PlxyXG4gICAgPC9tYXQtc2lkZW5hdj5cclxuICA8L21hdC1zaWRlbmF2LWNvbnRhaW5lcj5cclxuPC9kaXY+XHJcbiJdfQ==
