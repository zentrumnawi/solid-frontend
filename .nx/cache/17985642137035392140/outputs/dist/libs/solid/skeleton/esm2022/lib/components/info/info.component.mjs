import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { SOLID_SKELETON_CONFIG } from '../../solid-skeleton-config';
import { ActivatedRoute } from '@angular/router';
import { MessageType } from '../../models/message.model';
import { Subject, takeUntil } from 'rxjs';
import { MessagesService } from '../../services/messages.service';
import * as i0 from '@angular/core';
import * as i1 from '@angular/router';
import * as i2 from '../../services/messages.service';
import * as i3 from '@angular/common';
import * as i4 from '@angular/forms';
import * as i5 from '@angular/material/button';
import * as i6 from '@angular/material/icon';
import * as i7 from '@angular/material/list';
import * as i8 from '@angular/material/tabs';
import * as i9 from '@angular/material/slide-toggle';
import * as i10 from '../message-list/message-list.component';
export class InfoComponent {
  msgService;
  destroy$ = new Subject();
  tourLandingChecked = false;
  tourProfileChecked = false;
  landingChecked = false;
  messagesLoading = true;
  route;
  profileTitle = '';
  changeLogMsg = [];
  newsMsg = [];
  messages = [];
  prevTab = -1;
  InfoPageContentComponent;
  PrivacyContentComponent;
  tabIndex = 0;
  info_container;
  constructor(cfg, route, msgService) {
    this.msgService = msgService;
    this.InfoPageContentComponent = cfg.infoPageContent;
    this.PrivacyContentComponent = cfg.privacyContent;
    this.profileTitle = cfg.routingConfig.profile.title;
    this.landingChecked =
      localStorage.getItem('hide_landing_banner') === 'false';
    this.tourLandingChecked =
      localStorage.getItem('hide_landing_tour') === 'false';
    this.tourProfileChecked =
      localStorage.getItem('hide_profile_tour') === 'false';
    this.route = route;
  }
  ngOnInit() {
    this.getMessages();
    this.navigateTab();
    if (this.tabIndex === 2) {
      this.prevTab = 2;
      this.updateMessages(MessageType.Notice);
    } else if (this.tabIndex === 3) {
      this.prevTab = 3;
      this.updateMessages(MessageType.Changelog);
    }
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.msgService.updateMessageState(this.messages);
  }
  moveTabToPrivacy(event) {
    event.preventDefault();
    this.tabIndex = 1;
  }
  scrollToTop() {
    const info_container = this.info_container;
    if (!info_container || info_container.nativeElement.scrollTop === 0) {
      return;
    }
    info_container.nativeElement.scrollTop = 0;
  }
  toggleChange() {
    if (this.tourLandingChecked)
      localStorage.setItem('hide_landing_tour', 'false');
    else localStorage.setItem('hide_landing_tour', 'true');
    if (this.tourProfileChecked)
      localStorage.setItem('hide_profile_tour', 'false');
    else localStorage.setItem('hide_profile_tour', 'true');
    if (this.landingChecked)
      localStorage.setItem('hide_landing_banner', 'false');
    else localStorage.setItem('hide_landing_banner', 'true');
  }
  onSelectedIndexChange(index) {
    if (this.prevTab === 2 || this.prevTab === 3) {
      this.msgService.updateMessageState(this.messages);
    }
    if (index === 2) {
      this.updateMessages(MessageType.Notice);
    } else if (index === 3) {
      this.updateMessages(MessageType.Changelog);
    }
    this.prevTab = index;
  }
  getMessages() {
    this.messagesLoading = true;
    this.msgService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe((msgs) => {
        this.newsMsg = msgs.filter((msg) => {
          return msg.type !== MessageType.Changelog;
        });
        this.changeLogMsg = msgs.filter((msg) => {
          return msg.type === MessageType.Changelog;
        });
        this.messages = msgs;
        this.messagesLoading = false;
      });
  }
  navigateTab() {
    const directTo = this.route.snapshot.queryParams.directTo;
    switch (directTo) {
      case 'privacy':
        this.tabIndex = 1;
        break;
      case 'news':
        this.tabIndex = 2;
        break;
      default:
        this.tabIndex = 0;
        break;
    }
  }
  updateMessages(type) {
    switch (type) {
      case MessageType.Changelog:
        this.messages = this.messages.map((msg) => {
          if (msg.type === MessageType.Changelog) {
            return { ...msg, unread: false };
          } else {
            return msg;
          }
        });
        break;
      case MessageType.Notice:
      case MessageType.Series:
        this.messages = this.messages.map((msg) => {
          if (msg.type !== MessageType.Changelog) {
            return { ...msg, unread: false };
          } else {
            return msg;
          }
        });
        break;
      default:
        return;
    }
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: InfoComponent,
    deps: [
      { token: SOLID_SKELETON_CONFIG },
      { token: i1.ActivatedRoute },
      { token: i2.MessagesService },
    ],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: InfoComponent,
    selector: 'solid-skeleton-info',
    viewQueries: [
      {
        propertyName: 'info_container',
        first: true,
        predicate: ['info_container'],
        descendants: true,
      },
    ],
    ngImport: i0,
    template:
      '<div class="container" *ngIf="!messagesLoading">\r\n  <div class="info-container" #info_container>\r\n    <div class="button-back-container">\r\n      <button id="backBtn" mat-icon-button class="button-back" routerLink="">\r\n        <mat-icon>arrow_back</mat-icon>\r\n      </button>\r\n    </div>\r\n    <mat-tab-group\r\n      [(selectedIndex)]="tabIndex"\r\n      (selectedIndexChange)="onSelectedIndexChange($event)"\r\n    >\r\n      <mat-tab label="Info">\r\n        <ng-container\r\n          *ngComponentOutlet="InfoPageContentComponent"\r\n        ></ng-container>\r\n        <p class="privacy">\r\n          Beachten Sie auch die\r\n          <a class="info-link" (click)="moveTabToPrivacy($event)" href=""\r\n            >Datenschutzerkl\u00E4rung</a\r\n          >\r\n          gem\u00E4\u00DF Art 13. EU DSGVO.\r\n        </p>\r\n      </mat-tab>\r\n      <mat-tab label="Datenschutz">\r\n        <ng-container\r\n          *ngComponentOutlet="PrivacyContentComponent"\r\n        ></ng-container>\r\n      </mat-tab>\r\n      <mat-tab label="News" *ngIf="newsMsg.length > 0">\r\n        <solid-skeleton-message-list\r\n          [messages]="newsMsg"\r\n          [tabIndex]="tabIndex"\r\n        ></solid-skeleton-message-list>\r\n      </mat-tab>\r\n      <mat-tab label="Changelog" *ngIf="changeLogMsg.length > 0">\r\n        <solid-skeleton-message-list\r\n          [messages]="changeLogMsg"\r\n          [tabIndex]="tabIndex"\r\n        >\r\n        </solid-skeleton-message-list>\r\n      </mat-tab>\r\n      <mat-tab label="Einstellungen">\r\n        <div class="setting-container">\r\n          <div mat-subheader class="hint">\r\n            Hinweis: Alle Einstellungen werden nur auf diesem Ger\u00E4t gespeichert.\r\n          </div>\r\n\r\n          <mat-list id="setting" class="setting-list">\r\n            <div mat-subheader>Startseite</div>\r\n            <mat-list-item>\r\n              <mat-slide-toggle\r\n                (change)="toggleChange()"\r\n                [(ngModel)]="landingChecked"\r\n              >\r\n                Willkommensnachricht anzeigen\r\n              </mat-slide-toggle>\r\n            </mat-list-item>\r\n            <mat-list-item>\r\n              <mat-slide-toggle\r\n                (change)="toggleChange()"\r\n                [(ngModel)]="tourLandingChecked"\r\n              >\r\n                Tour anzeigen\r\n              </mat-slide-toggle>\r\n            </mat-list-item>\r\n            <div mat-subheader class="hint" *ngIf="tourLandingChecked">\r\n              Die Tour wird beim n\u00E4chsten Besuch der Startseite angezeigt.\r\n            </div>\r\n            <div mat-subheader>{{ profileTitle }}</div>\r\n            <mat-list-item>\r\n              <mat-slide-toggle\r\n                (change)="toggleChange()"\r\n                [(ngModel)]="tourProfileChecked"\r\n              >\r\n                Tour anzeigen\r\n              </mat-slide-toggle>\r\n            </mat-list-item>\r\n            <div mat-subheader class="hint" *ngIf="tourProfileChecked">\r\n              Die Tour wird beim n\u00E4chsten Besuch der\r\n              {{ profileTitle }} angezeigt.\r\n            </div>\r\n          </mat-list>\r\n        </div>\r\n      </mat-tab>\r\n    </mat-tab-group>\r\n  </div>\r\n</div>\r\n',
    styles: [
      '.container{height:100%;overflow:hidden}.container mat-tab-group ::ng-deep .mat-tab-header{box-shadow:0 4px 2px -2px #0003;height:56px;border-bottom:0;background-color:#fff;margin-left:60px;position:fixed;width:calc(100% - 56px);z-index:999}.container mat-tab-group ::ng-deep .mat-tab-label{height:56px}.container mat-tab-group ::ng-deep .mat-tab-body-wrapper{position:relative;margin-top:40px}.container mat-tab-group ::ng-deep .mat-tab-body-wrapper .mat-list{margin-top:1.5em}.info-container{overflow-y:auto;height:100%;z-index:-999}.info-container .button-back-container{background-color:#fff;box-shadow:0 4px 2px -2px #0003;height:56px;width:64px;position:absolute;z-index:99}.info-container .button-back-container .button-back{position:absolute;left:16px;top:8px}.privacy{margin-top:-1rem;padding:0 1rem 1rem}.setting-container{padding:.8rem 1rem 1rem}.setting-container mat-slide-toggle{margin:7px 0;display:block;font-size:14px}.hint{font-style:italic;font-size:12px}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i3.NgComponentOutlet,
        selector: '[ngComponentOutlet]',
        inputs: [
          'ngComponentOutlet',
          'ngComponentOutletInputs',
          'ngComponentOutletInjector',
          'ngComponentOutletContent',
          'ngComponentOutletNgModule',
          'ngComponentOutletNgModuleFactory',
        ],
      },
      {
        kind: 'directive',
        type: i3.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i4.NgControlStatus,
        selector: '[formControlName],[ngModel],[formControl]',
      },
      {
        kind: 'directive',
        type: i4.NgModel,
        selector: '[ngModel]:not([formControlName]):not([formControl])',
        inputs: ['name', 'disabled', 'ngModel', 'ngModelOptions'],
        outputs: ['ngModelChange'],
        exportAs: ['ngModel'],
      },
      {
        kind: 'directive',
        type: i1.RouterLink,
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
        type: i5.MatIconButton,
        selector: 'button[mat-icon-button]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'component',
        type: i6.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'component',
        type: i7.MatList,
        selector: 'mat-list',
        exportAs: ['matList'],
      },
      {
        kind: 'component',
        type: i7.MatListItem,
        selector: 'mat-list-item, a[mat-list-item], button[mat-list-item]',
        inputs: ['activated'],
        exportAs: ['matListItem'],
      },
      {
        kind: 'directive',
        type: i7.MatListSubheaderCssMatStyler,
        selector: '[mat-subheader], [matSubheader]',
      },
      {
        kind: 'component',
        type: i8.MatTab,
        selector: 'mat-tab',
        inputs: ['disabled'],
        exportAs: ['matTab'],
      },
      {
        kind: 'component',
        type: i8.MatTabGroup,
        selector: 'mat-tab-group',
        inputs: [
          'color',
          'disableRipple',
          'fitInkBarToContent',
          'mat-stretch-tabs',
        ],
        exportAs: ['matTabGroup'],
      },
      {
        kind: 'component',
        type: i9.MatSlideToggle,
        selector: 'mat-slide-toggle',
        inputs: ['disabled', 'disableRipple', 'color', 'tabIndex'],
        exportAs: ['matSlideToggle'],
      },
      {
        kind: 'component',
        type: i10.MessageListComponent,
        selector: 'solid-skeleton-message-list',
        inputs: ['messages', 'tabIndex'],
      },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: InfoComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-skeleton-info',
          template:
            '<div class="container" *ngIf="!messagesLoading">\r\n  <div class="info-container" #info_container>\r\n    <div class="button-back-container">\r\n      <button id="backBtn" mat-icon-button class="button-back" routerLink="">\r\n        <mat-icon>arrow_back</mat-icon>\r\n      </button>\r\n    </div>\r\n    <mat-tab-group\r\n      [(selectedIndex)]="tabIndex"\r\n      (selectedIndexChange)="onSelectedIndexChange($event)"\r\n    >\r\n      <mat-tab label="Info">\r\n        <ng-container\r\n          *ngComponentOutlet="InfoPageContentComponent"\r\n        ></ng-container>\r\n        <p class="privacy">\r\n          Beachten Sie auch die\r\n          <a class="info-link" (click)="moveTabToPrivacy($event)" href=""\r\n            >Datenschutzerkl\u00E4rung</a\r\n          >\r\n          gem\u00E4\u00DF Art 13. EU DSGVO.\r\n        </p>\r\n      </mat-tab>\r\n      <mat-tab label="Datenschutz">\r\n        <ng-container\r\n          *ngComponentOutlet="PrivacyContentComponent"\r\n        ></ng-container>\r\n      </mat-tab>\r\n      <mat-tab label="News" *ngIf="newsMsg.length > 0">\r\n        <solid-skeleton-message-list\r\n          [messages]="newsMsg"\r\n          [tabIndex]="tabIndex"\r\n        ></solid-skeleton-message-list>\r\n      </mat-tab>\r\n      <mat-tab label="Changelog" *ngIf="changeLogMsg.length > 0">\r\n        <solid-skeleton-message-list\r\n          [messages]="changeLogMsg"\r\n          [tabIndex]="tabIndex"\r\n        >\r\n        </solid-skeleton-message-list>\r\n      </mat-tab>\r\n      <mat-tab label="Einstellungen">\r\n        <div class="setting-container">\r\n          <div mat-subheader class="hint">\r\n            Hinweis: Alle Einstellungen werden nur auf diesem Ger\u00E4t gespeichert.\r\n          </div>\r\n\r\n          <mat-list id="setting" class="setting-list">\r\n            <div mat-subheader>Startseite</div>\r\n            <mat-list-item>\r\n              <mat-slide-toggle\r\n                (change)="toggleChange()"\r\n                [(ngModel)]="landingChecked"\r\n              >\r\n                Willkommensnachricht anzeigen\r\n              </mat-slide-toggle>\r\n            </mat-list-item>\r\n            <mat-list-item>\r\n              <mat-slide-toggle\r\n                (change)="toggleChange()"\r\n                [(ngModel)]="tourLandingChecked"\r\n              >\r\n                Tour anzeigen\r\n              </mat-slide-toggle>\r\n            </mat-list-item>\r\n            <div mat-subheader class="hint" *ngIf="tourLandingChecked">\r\n              Die Tour wird beim n\u00E4chsten Besuch der Startseite angezeigt.\r\n            </div>\r\n            <div mat-subheader>{{ profileTitle }}</div>\r\n            <mat-list-item>\r\n              <mat-slide-toggle\r\n                (change)="toggleChange()"\r\n                [(ngModel)]="tourProfileChecked"\r\n              >\r\n                Tour anzeigen\r\n              </mat-slide-toggle>\r\n            </mat-list-item>\r\n            <div mat-subheader class="hint" *ngIf="tourProfileChecked">\r\n              Die Tour wird beim n\u00E4chsten Besuch der\r\n              {{ profileTitle }} angezeigt.\r\n            </div>\r\n          </mat-list>\r\n        </div>\r\n      </mat-tab>\r\n    </mat-tab-group>\r\n  </div>\r\n</div>\r\n',
          styles: [
            '.container{height:100%;overflow:hidden}.container mat-tab-group ::ng-deep .mat-tab-header{box-shadow:0 4px 2px -2px #0003;height:56px;border-bottom:0;background-color:#fff;margin-left:60px;position:fixed;width:calc(100% - 56px);z-index:999}.container mat-tab-group ::ng-deep .mat-tab-label{height:56px}.container mat-tab-group ::ng-deep .mat-tab-body-wrapper{position:relative;margin-top:40px}.container mat-tab-group ::ng-deep .mat-tab-body-wrapper .mat-list{margin-top:1.5em}.info-container{overflow-y:auto;height:100%;z-index:-999}.info-container .button-back-container{background-color:#fff;box-shadow:0 4px 2px -2px #0003;height:56px;width:64px;position:absolute;z-index:99}.info-container .button-back-container .button-back{position:absolute;left:16px;top:8px}.privacy{margin-top:-1rem;padding:0 1rem 1rem}.setting-container{padding:.8rem 1rem 1rem}.setting-container mat-slide-toggle{margin:7px 0;display:block;font-size:14px}.hint{font-style:italic;font-size:12px}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [SOLID_SKELETON_CONFIG],
          },
        ],
      },
      { type: i1.ActivatedRoute },
      { type: i2.MessagesService },
    ];
  },
  propDecorators: {
    info_container: [
      {
        type: ViewChild,
        args: ['info_container'],
      },
    ],
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3NrZWxldG9uL3NyYy9saWIvY29tcG9uZW50cy9pbmZvL2luZm8uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9za2VsZXRvbi9zcmMvbGliL2NvbXBvbmVudHMvaW5mby9pbmZvLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFJTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUVMLHFCQUFxQixHQUN0QixNQUFNLDZCQUE2QixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRCxPQUFPLEVBQWdCLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7Ozs7Ozs7O0FBT2xFLE1BQU0sT0FBTyxhQUFhO0lBMEJkO0lBekJILFFBQVEsR0FBa0IsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUV4QyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7SUFDM0Isa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0lBQzNCLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDdkIsZUFBZSxHQUFHLElBQUksQ0FBQztJQUV2QixLQUFLLENBQWlCO0lBQ3RCLFlBQVksR0FBRyxFQUFFLENBQUM7SUFFbEIsWUFBWSxHQUFtQixFQUFFLENBQUM7SUFDbEMsT0FBTyxHQUFtQixFQUFFLENBQUM7SUFDN0IsUUFBUSxHQUFtQixFQUFFLENBQUM7SUFFOUIsT0FBTyxHQUFHLENBQUMsQ0FBQyxD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QztxQkFDbEM7eUJBQU07d0JBQ0wsT0FBTyxHQUFHLENBQUM7cUJBQ1o7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNSO2dCQUNFLE9BQU87U0FDVjtJQUNILENBQUM7dUdBMUpVLGFBQWEsa0JBd0JkLHFCQUFxQjsyRkF4QnBCLGFBQWEsNktDdkIxQiw4eUdBdUZBOzsyRkRoRWEsYUFBYTtrQkFMekIsU0FBUzsrQkFDRSxxQkFBcUI7OzBCQTRCNUIsTUFBTTsyQkFBQyxxQkFBcUI7dUdBSEssY0FBYztzQkFBakQsU0FBUzt1QkFBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEluamVjdCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIFR5cGUsXHJcbiAgVmlld0NoaWxkLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIEludGVybmFsU29saWRTa2VsZXRvbkNvbmZpZyxcclxuICBTT0xJRF9TS0VMRVRPTl9DT05GSUcsXHJcbn0gZnJvbSAnLi4vLi4vc29saWQtc2tlbGV0b24tY29uZmlnJztcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBNZXNzYWdlTW9kZWwsIE1lc3NhZ2VUeXBlIH0gZnJvbSAnLi4vLi4vbW9kZWxzL21lc3NhZ2UubW9kZWwnO1xyXG5pbXBvcnQgeyBTdWJqZWN0LCB0YWtlVW50aWwgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgTWVzc2FnZXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbWVzc2FnZXMuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NvbGlkLXNrZWxldG9uLWluZm8nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9pbmZvLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9pbmZvLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJbmZvQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHB1YmxpYyBkZXN0cm95JDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XHJcblxyXG4gIHB1YmxpYyB0b3VyTGFuZGluZ0NoZWNrZWQgPSBmYWxzZTtcclxuICBwdWJsaWMgdG91clByb2ZpbGVDaGVja2VkID0gZmFsc2U7XHJcbiAgcHVibGljIGxhbmRpbmdDaGVja2VkID0gZmFsc2U7XHJcbiAgcHVibGljIG1lc3NhZ2VzTG9hZGluZyA9IHRydWU7XHJcblxyXG4gIHB1YmxpYyByb3V0ZTogQWN0aXZhdGVkUm91dGU7XHJcbiAgcHVibGljIHByb2ZpbGVUaXRsZSA9ICcnO1xyXG5cclxuICBwdWJsaWMgY2hhbmdlTG9nTXNnOiBNZXNzYWdlTW9kZWxbXSA9IFtdO1xyXG4gIHB1YmxpYyBuZXdzTXNnOiBNZXNzYWdlTW9kZWxbXSA9IFtdO1xyXG4gIHB1YmxpYyBtZXNzYWdlczogTWVzc2FnZU1vZGVsW10gPSBbXTtcclxuXHJcbiAgcHVibGljIHByZXZUYWIgPSAtMTtcclxuXHJcbiAgcHVibGljIEluZm9QYWdlQ29udGVudENvbXBvbmVudDogVHlwZTxhbnk+O1xyXG4gIHB1YmxpYyBQcml2YWN5Q29udGVudENvbXBvbmVudDogVHlwZTxhbnk+O1xyXG5cclxuICB0YWJJbmRleCA9IDA7XHJcbiAgQFZpZXdDaGlsZCgnaW5mb19jb250YWluZXInKSBwdWJsaWMgaW5mb19jb250YWluZXI/OiBFbGVtZW50UmVmO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIEBJbmplY3QoU09MSURfU0tFTEVUT05fQ09ORklHKSBjZmc6IEludGVybmFsU29saWRTa2VsZXRvbkNvbmZpZyxcclxuICAgIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgbXNnU2VydmljZTogTWVzc2FnZXNTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLkluZm9QYWdlQ29udGVudENvbXBvbmVudCA9IGNmZy5pbmZvUGFnZUNvbnRlbnQ7XHJcbiAgICB0aGlzLlByaXZhY3lDb250ZW50Q29tcG9uZW50ID0gY2ZnLnByaXZhY3lDb250ZW50O1xyXG4gICAgdGhpcy5wcm9maWxlVGl0bGUgPSBjZmcucm91dGluZ0NvbmZpZy5wcm9maWxlLnRpdGxlO1xyXG4gICAgdGhpcy5sYW5kaW5nQ2hlY2tlZCA9XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdoaWRlX2xhbmRpbmdfYmFubmVyJykgPT09ICdmYWxzZSc7XHJcbiAgICB0aGlzLnRvdXJMYW5kaW5nQ2hlY2tlZCA9XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdoaWRlX2xhbmRpbmdfdG91cicpID09PSAnZmFsc2UnO1xyXG4gICAgdGhpcy50b3VyUHJvZmlsZUNoZWNrZWQgPVxyXG4gICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGlkZV9wcm9maWxlX3RvdXInKSA9PT0gJ2ZhbHNlJztcclxuICAgIHRoaXMucm91dGUgPSByb3V0ZTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5nZXRNZXNzYWdlcygpO1xyXG4gICAgdGhpcy5uYXZpZ2F0ZVRhYigpO1xyXG5cclxuICAgIGlmICh0aGlzLnRhYkluZGV4ID09PSAyKSB7XHJcbiAgICAgIHRoaXMucHJldlRhYiA9IDI7XHJcbiAgICAgIHRoaXMudXBkYXRlTWVzc2FnZXMoTWVzc2FnZVR5cGUuTm90aWNlKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy50YWJJbmRleCA9PT0gMykge1xyXG4gICAgICB0aGlzLnByZXZUYWIgPSAzO1xyXG4gICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2VzKE1lc3NhZ2VUeXBlLkNoYW5nZWxvZyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xyXG4gICAgdGhpcy5kZXN0cm95JC5jb21wbGV0ZSgpO1xyXG4gICAgdGhpcy5tc2dTZXJ2aWNlLnVwZGF0ZU1lc3NhZ2VTdGF0ZSh0aGlzLm1lc3NhZ2VzKTtcclxuICB9XHJcblxyXG4gIG1vdmVUYWJUb1ByaXZhY3koZXZlbnQ6IGFueSkge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMudGFiSW5kZXggPSAxO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNjcm9sbFRvVG9wKCkge1xyXG4gICAgY29uc3QgaW5mb19jb250YWluZXIgPSB0aGlzLmluZm9fY29udGFpbmVyO1xyXG4gICAgaWYgKCFpbmZvX2NvbnRhaW5lciB8fCBpbmZvX2NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9PT0gMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpbmZvX2NvbnRhaW5lci5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IDA7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdG9nZ2xlQ2hhbmdlKCkge1xyXG4gICAgaWYgKHRoaXMudG91ckxhbmRpbmdDaGVja2VkKVxyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnaGlkZV9sYW5kaW5nX3RvdXInLCAnZmFsc2UnKTtcclxuICAgIGVsc2UgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2hpZGVfbGFuZGluZ190b3VyJywgJ3RydWUnKTtcclxuICAgIGlmICh0aGlzLnRvdXJQcm9maWxlQ2hlY2tlZClcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2hpZGVfcHJvZmlsZV90b3VyJywgJ2ZhbHNlJyk7XHJcbiAgICBlbHNlIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdoaWRlX3Byb2ZpbGVfdG91cicsICd0cnVlJyk7XHJcbiAgICBpZiAodGhpcy5sYW5kaW5nQ2hlY2tlZClcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2hpZGVfbGFuZGluZ19iYW5uZXInLCAnZmFsc2UnKTtcclxuICAgIGVsc2UgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2hpZGVfbGFuZGluZ19iYW5uZXInLCAndHJ1ZScpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uU2VsZWN0ZWRJbmRleENoYW5nZShpbmRleDogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5wcmV2VGFiID09PSAyIHx8IHRoaXMucHJldlRhYiA9PT0gMykge1xyXG4gICAgICB0aGlzLm1zZ1NlcnZpY2UudXBkYXRlTWVzc2FnZVN0YXRlKHRoaXMubWVzc2FnZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpbmRleCA9PT0gMikge1xyXG4gICAgICB0aGlzLnVwZGF0ZU1lc3NhZ2VzKE1lc3NhZ2VUeXBlLk5vdGljZSk7XHJcbiAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAzKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlTWVzc2FnZXMoTWVzc2FnZVR5cGUuQ2hhbmdlbG9nKTtcclxuICAgIH1cclxuICAgIHRoaXMucHJldlRhYiA9IGluZGV4O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE1lc3NhZ2VzKCkge1xyXG4gICAgdGhpcy5tZXNzYWdlc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5tc2dTZXJ2aWNlLm1lc3NhZ2VzJFxyXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKG1zZ3MpID0+IHtcclxuICAgICAgICB0aGlzLm5ld3NNc2cgPSBtc2dzLmZpbHRlcigobXNnOiBNZXNzYWdlTW9kZWwpID0+IHtcclxuICAgICAgICAgIHJldHVybiBtc2cudHlwZSAhPT0gTWVzc2FnZVR5cGUuQ2hhbmdlbG9nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlTG9nTXNnID0gbXNncy5maWx0ZXIoKG1zZzogTWVzc2FnZU1vZGVsKSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gbXNnLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkNoYW5nZWxvZztcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm1lc3NhZ2VzID0gbXNncztcclxuICAgICAgICB0aGlzLm1lc3NhZ2VzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuYXZpZ2F0ZVRhYigpIHtcclxuICAgIGNvbnN0IGRpcmVjdFRvID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5xdWVyeVBhcmFtcy5kaXJlY3RUbztcclxuICAgIHN3aXRjaCAoZGlyZWN0VG8pIHtcclxuICAgICAgY2FzZSAncHJpdmFjeSc6XHJcbiAgICAgICAgdGhpcy50YWJJbmRleCA9IDE7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICduZXdzJzpcclxuICAgICAgICB0aGlzLnRhYkluZGV4ID0gMjtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhpcy50YWJJbmRleCA9IDA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdXBkYXRlTWVzc2FnZXModHlwZTogTWVzc2FnZVR5cGUpIHtcclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlIE1lc3NhZ2VUeXBlLkNoYW5nZWxvZzpcclxuICAgICAgICB0aGlzLm1lc3NhZ2VzID0gdGhpcy5tZXNzYWdlcy5tYXAoKG1zZzogTWVzc2FnZU1vZGVsKSA9PiB7XHJcbiAgICAgICAgICBpZiAobXNnLnR5cGUgPT09IE1lc3NhZ2VUeXBlLkNoYW5nZWxvZykge1xyXG4gICAgICAgICAgICByZXR1cm4geyAuLi5tc2csIHVucmVhZDogZmFsc2UgfTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtc2c7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgTWVzc2FnZVR5cGUuTm90aWNlOlxyXG4gICAgICBjYXNlIE1lc3NhZ2VUeXBlLlNlcmllczpcclxuICAgICAgICB0aGlzLm1lc3NhZ2VzID0gdGhpcy5tZXNzYWdlcy5tYXAoKG1zZzogTWVzc2FnZU1vZGVsKSA9PiB7XHJcbiAgICAgICAgICBpZiAobXNnLnR5cGUgIT09IE1lc3NhZ2VUeXBlLkNoYW5nZWxvZykge1xyXG4gICAgICAgICAgICByZXR1cm4geyAuLi5tc2csIHVucmVhZDogZmFsc2UgfTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtc2c7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCIgKm5nSWY9XCIhbWVzc2FnZXNMb2FkaW5nXCI+XHJcbiAgPGRpdiBjbGFzcz1cImluZm8tY29udGFpbmVyXCIgI2luZm9fY29udGFpbmVyPlxyXG4gICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1iYWNrLWNvbnRhaW5lclwiPlxyXG4gICAgICA8YnV0dG9uIGlkPVwiYmFja0J0blwiIG1hdC1pY29uLWJ1dHRvbiBjbGFzcz1cImJ1dHRvbi1iYWNrXCIgcm91dGVyTGluaz1cIlwiPlxyXG4gICAgICAgIDxtYXQtaWNvbj5hcnJvd19iYWNrPC9tYXQtaWNvbj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxtYXQtdGFiLWdyb3VwXHJcbiAgICAgIFsoc2VsZWN0ZWRJbmRleCldPVwidGFiSW5kZXhcIlxyXG4gICAgICAoc2VsZWN0ZWRJbmRleENoYW5nZSk9XCJvblNlbGVjdGVkSW5kZXhDaGFuZ2UoJGV2ZW50KVwiXHJcbiAgICA+XHJcbiAgICAgIDxtYXQtdGFiIGxhYmVsPVwiSW5mb1wiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXJcclxuICAgICAgICAgICpuZ0NvbXBvbmVudE91dGxldD1cIkluZm9QYWdlQ29udGVudENvbXBvbmVudFwiXHJcbiAgICAgICAgPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDxwIGNsYXNzPVwicHJpdmFjeVwiPlxyXG4gICAgICAgICAgQmVhY2h0ZW4gU2llIGF1Y2ggZGllXHJcbiAgICAgICAgICA8YSBjbGFzcz1cImluZm8tbGlua1wiIChjbGljayk9XCJtb3ZlVGFiVG9Qcml2YWN5KCRldmVudClcIiBocmVmPVwiXCJcclxuICAgICAgICAgICAgPkRhdGVuc2NodXR6ZXJrbMOkcnVuZzwvYVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgZ2Vtw6TDnyBBcnQgMTMuIEVVIERTR1ZPLlxyXG4gICAgICAgIDwvcD5cclxuICAgICAgPC9tYXQtdGFiPlxyXG4gICAgICA8bWF0LXRhYiBsYWJlbD1cIkRhdGVuc2NodXR6XCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgICAgKm5nQ29tcG9uZW50T3V0bGV0PVwiUHJpdmFjeUNvbnRlbnRDb21wb25lbnRcIlxyXG4gICAgICAgID48L25nLWNvbnRhaW5lcj5cclxuICAgICAgPC9tYXQtdGFiPlxyXG4gICAgICA8bWF0LXRhYiBsYWJlbD1cIk5ld3NcIiAqbmdJZj1cIm5ld3NNc2cubGVuZ3RoID4gMFwiPlxyXG4gICAgICAgIDxzb2xpZC1za2VsZXRvbi1tZXNzYWdlLWxpc3RcclxuICAgICAgICAgIFttZXNzYWdlc109XCJuZXdzTXNnXCJcclxuICAgICAgICAgIFt0YWJJbmRleF09XCJ0YWJJbmRleFwiXHJcbiAgICAgICAgPjwvc29saWQtc2tlbGV0b24tbWVzc2FnZS1saXN0PlxyXG4gICAgICA8L21hdC10YWI+XHJcbiAgICAgIDxtYXQtdGFiIGxhYmVsPVwiQ2hhbmdlbG9nXCIgKm5nSWY9XCJjaGFuZ2VMb2dNc2cubGVuZ3RoID4gMFwiPlxyXG4gICAgICAgIDxzb2xpZC1za2VsZXRvbi1tZXNzYWdlLWxpc3RcclxuICAgICAgICAgIFttZXNzYWdlc109XCJjaGFuZ2VMb2dNc2dcIlxyXG4gICAgICAgICAgW3RhYkluZGV4XT1cInRhYkluZGV4XCJcclxuICAgICAgICA+XHJcbiAgICAgICAgPC9zb2xpZC1za2VsZXRvbi1tZXNzYWdlLWxpc3Q+XHJcbiAgICAgIDwvbWF0LXRhYj5cclxuICAgICAgPG1hdC10YWIgbGFiZWw9XCJFaW5zdGVsbHVuZ2VuXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmctY29udGFpbmVyXCI+XHJcbiAgICAgICAgICA8ZGl2IG1hdC1zdWJoZWFkZXIgY2xhc3M9XCJoaW50XCI+XHJcbiAgICAgICAgICAgIEhpbndlaXM6IEFsbGUgRWluc3RlbGx1bmdlbiB3ZXJkZW4gbnVyIGF1ZiBkaWVzZW0gR2Vyw6R0IGdlc3BlaWNoZXJ0LlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPG1hdC1saXN0IGlkPVwic2V0dGluZ1wiIGNsYXNzPVwic2V0dGluZy1saXN0XCI+XHJcbiAgICAgICAgICAgIDxkaXYgbWF0LXN1YmhlYWRlcj5TdGFydHNlaXRlPC9kaXY+XHJcbiAgICAgICAgICAgIDxtYXQtbGlzdC1pdGVtPlxyXG4gICAgICAgICAgICAgIDxtYXQtc2xpZGUtdG9nZ2xlXHJcbiAgICAgICAgICAgICAgICAoY2hhbmdlKT1cInRvZ2dsZUNoYW5nZSgpXCJcclxuICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwibGFuZGluZ0NoZWNrZWRcIlxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIFdpbGxrb21tZW5zbmFjaHJpY2h0IGFuemVpZ2VuXHJcbiAgICAgICAgICAgICAgPC9tYXQtc2xpZGUtdG9nZ2xlPlxyXG4gICAgICAgICAgICA8L21hdC1saXN0LWl0ZW0+XHJcbiAgICAgICAgICAgIDxtYXQtbGlzdC1pdGVtPlxyXG4gICAgICAgICAgICAgIDxtYXQtc2xpZGUtdG9nZ2xlXHJcbiAgICAgICAgICAgICAgICAoY2hhbmdlKT1cInRvZ2dsZUNoYW5nZSgpXCJcclxuICAgICAgICAgICAgICAgIFsobmdNb2RlbCldPVwidG91ckxhbmRpbmdDaGVja2VkXCJcclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICBUb3VyIGFuemVpZ2VuXHJcbiAgICAgICAgICAgICAgPC9tYXQtc2xpZGUtdG9nZ2xlPlxyXG4gICAgICAgICAgICA8L21hdC1saXN0LWl0ZW0+XHJcbiAgICAgICAgICAgIDxkaXYgbWF0LXN1YmhlYWRlciBjbGFzcz1cImhpbnRcIiAqbmdJZj1cInRvdXJMYW5kaW5nQ2hlY2tlZFwiPlxyXG4gICAgICAgICAgICAgIERpZSBUb3VyIHdpcmQgYmVpbSBuw6RjaHN0ZW4gQmVzdWNoIGRlciBTdGFydHNlaXRlIGFuZ2V6ZWlndC5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgbWF0LXN1YmhlYWRlcj57eyBwcm9maWxlVGl0bGUgfX08L2Rpdj5cclxuICAgICAgICAgICAgPG1hdC1saXN0LWl0ZW0+XHJcbiAgICAgICAgICAgICAgPG1hdC1zbGlkZS10b2dnbGVcclxuICAgICAgICAgICAgICAgIChjaGFuZ2UpPVwidG9nZ2xlQ2hhbmdlKClcIlxyXG4gICAgICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJ0b3VyUHJvZmlsZUNoZWNrZWRcIlxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIFRvdXIgYW56ZWlnZW5cclxuICAgICAgICAgICAgICA8L21hdC1zbGlkZS10b2dnbGU+XHJcbiAgICAgICAgICAgIDwvbWF0LWxpc3QtaXRlbT5cclxuICAgICAgICAgICAgPGRpdiBtYXQtc3ViaGVhZGVyIGNsYXNzPVwiaGludFwiICpuZ0lmPVwidG91clByb2ZpbGVDaGVja2VkXCI+XHJcbiAgICAgICAgICAgICAgRGllIFRvdXIgd2lyZCBiZWltIG7DpGNoc3RlbiBCZXN1Y2ggZGVyXHJcbiAgICAgICAgICAgICAge3sgcHJvZmlsZVRpdGxlIH19IGFuZ2V6ZWlndC5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L21hdC1saXN0PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L21hdC10YWI+XHJcbiAgICA8L21hdC10YWItZ3JvdXA+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=
