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
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  FeedbackService,
  SOLID_SKELETON_FEEDBACK_SERVICE,
} from '../../services/feedback.service';
import { MenuState } from '../../state/menu.state';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common';
import * as i2 from '@angular/router';
import * as i3 from '@angular/material/core';
import * as i4 from '@angular/material/list';
import * as i5 from '../../services/feedback.service';
export class MainMenuComponent {
  feedback;
  selectMenuEntry = new EventEmitter();
  MenuItems;
  openGlossaryClick = new EventEmitter();
  messages;
  msgNumber;
  constructor(feedback) {
    this.feedback = feedback;
    this.messages = localStorage.getItem('solid_skeleton_messages');
    this.msgNumber = 0;
  }
  ngOnInit() {
    const msgObj = JSON.parse(this.messages);
    msgObj?.forEach((msg) => {
      if (msg.unread && msg.type != 'CL') this.msgNumber++;
    });
  }
  onMenuItemSelected(item) {
    if (item === 'info') this.msgNumber = 0;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MainMenuComponent,
    deps: [{ token: SOLID_SKELETON_FEEDBACK_SERVICE }],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: MainMenuComponent,
    selector: 'solid-skeleton-main-menu',
    outputs: {
      selectMenuEntry: 'selectMenuEntry',
      openGlossaryClick: 'openGlossaryClick',
    },
    ngImport: i0,
    template:
      '<!-- Without Dropdown Version -->\r\n<div class="main-menu-container">\r\n  <mat-nav-list id="menu">\r\n    <ng-container *ngFor="let item of MenuItems | async; let index = index">\r\n      <mat-list-item\r\n        *ngIf="item.route === \'info\'"\r\n        (click)="openGlossaryClick.emit()"\r\n      >\r\n        <h3 matLine>Glossar</h3>\r\n      </mat-list-item>\r\n      <mat-list-item\r\n        (click)="selectMenuEntry.emit(); onMenuItemSelected(item.route)"\r\n        [class.active]="item.active"\r\n        [routerLink]="item.route"\r\n        [queryParams]="{ directTo: msgNumber > 0 ? \'news\' : undefined }"\r\n      >\r\n        <h3 matLine>\r\n          {{ item.title }}\r\n        </h3>\r\n      </mat-list-item>\r\n    </ng-container>\r\n    <mat-list-item (click)="feedback.showDialog()" *ngIf="feedback">\r\n      <h3 matLine>Kontakt</h3>\r\n    </mat-list-item>\r\n  </mat-nav-list>\r\n</div>\r\n<!-- Slideshow Dropdown Version -->\r\n<!-- <div class="main-menu-container">\r\n  <mat-accordion>\r\n    <ng-container *ngFor="let menuItem of MenuItems | async">\r\n      <mat-expansion-panel\r\n        (click)="navigateTo(menuItem.route)"\r\n        *ngIf="menuItem.name !== \'slideshow\'"\r\n        [class.active]="menuItem.active"\r\n        hideToggle\r\n      >\r\n        <mat-expansion-panel-header>\r\n          <mat-panel-title\r\n            ><h3 matLine>{{ menuItem.title }}</h3></mat-panel-title\r\n          >\r\n        </mat-expansion-panel-header>\r\n      </mat-expansion-panel>\r\n      <mat-expansion-panel *ngIf="menuItem.name === \'slideshow\'" hideToggle>\r\n        <mat-expansion-panel-header [class.active]="menuItem.active">\r\n          <mat-panel-title\r\n            ><h3 matLine>{{ menuItem.title }}</h3></mat-panel-title\r\n          >\r\n        </mat-expansion-panel-header>\r\n        <mat-nav-list *ngIf="CategoriesItems | async as categories">\r\n          <mat-list-item\r\n            (click)="navigateTo(menuItem.route + \'/\' + category.slug)"\r\n            *ngFor="let category of categories"\r\n          >\r\n            <span matLine>{{ category.name }}</span>\r\n          </mat-list-item>\r\n        </mat-nav-list>\r\n      </mat-expansion-panel>\r\n    </ng-container>\r\n    <mat-expansion-panel\r\n      (click)="feedback.showDialog()"\r\n      *ngIf="feedback"\r\n      hideToggle\r\n    >\r\n      <mat-expansion-panel-header>\r\n        <mat-panel-title><h3 matLine>Kontakt</h3></mat-panel-title>\r\n      </mat-expansion-panel-header>\r\n    </mat-expansion-panel>\r\n  </mat-accordion>\r\n</div> -->\r\n',
    styles: [
      'mat-accordion{padding:0;display:inline-block;width:300px;overflow-y:auto;overflow-x:hidden}mat-accordion ::ng-deep .mat-line{margin-bottom:0!important}mat-accordion ::ng-deep .mat-expansion-panel-header{padding:0 16px!important;height:48px!important}mat-accordion ::ng-deep .mat-expansion-panel:not([class*=mat-elevation-z]){box-shadow:none!important}mat-accordion ::ng-deep .mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:0!important;border-bottom-left-radius:0!important}mat-accordion ::ng-deep .mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:0!important;border-top-left-radius:0!important}mat-accordion ::ng-deep .mat-expansion-panel-spacing{margin:0!important}mat-accordion ::ng-deep .mat-expansion-panel{border-radius:0!important}mat-accordion ::ng-deep .mat-expansion-panel-body{padding:0!important}mat-nav-list{padding:0;display:inline-block;width:300px;overflow-y:auto;overflow-x:hidden}mat-nav-list mat-list-item{height:56px!important}.main-menu-container{height:100%;width:300px;overflow-y:auto}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i1.NgForOf,
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
      },
      {
        kind: 'directive',
        type: i1.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i2.RouterLink,
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
        kind: 'directive',
        type: i3.MatLine,
        selector: '[mat-line], [matLine]',
      },
      {
        kind: 'component',
        type: i4.MatNavList,
        selector: 'mat-nav-list',
        exportAs: ['matNavList'],
      },
      {
        kind: 'component',
        type: i4.MatListItem,
        selector: 'mat-list-item, a[mat-list-item], button[mat-list-item]',
        inputs: ['activated'],
        exportAs: ['matListItem'],
      },
      { kind: 'pipe', type: i1.AsyncPipe, name: 'async' },
    ],
  });
}
__decorate(
  [Select(MenuState.getMenuItems), __metadata('design:type', Observable)],
  MainMenuComponent.prototype,
  'MenuItems',
  void 0
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: MainMenuComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-skeleton-main-menu',
          template:
            '<!-- Without Dropdown Version -->\r\n<div class="main-menu-container">\r\n  <mat-nav-list id="menu">\r\n    <ng-container *ngFor="let item of MenuItems | async; let index = index">\r\n      <mat-list-item\r\n        *ngIf="item.route === \'info\'"\r\n        (click)="openGlossaryClick.emit()"\r\n      >\r\n        <h3 matLine>Glossar</h3>\r\n      </mat-list-item>\r\n      <mat-list-item\r\n        (click)="selectMenuEntry.emit(); onMenuItemSelected(item.route)"\r\n        [class.active]="item.active"\r\n        [routerLink]="item.route"\r\n        [queryParams]="{ directTo: msgNumber > 0 ? \'news\' : undefined }"\r\n      >\r\n        <h3 matLine>\r\n          {{ item.title }}\r\n        </h3>\r\n      </mat-list-item>\r\n    </ng-container>\r\n    <mat-list-item (click)="feedback.showDialog()" *ngIf="feedback">\r\n      <h3 matLine>Kontakt</h3>\r\n    </mat-list-item>\r\n  </mat-nav-list>\r\n</div>\r\n<!-- Slideshow Dropdown Version -->\r\n<!-- <div class="main-menu-container">\r\n  <mat-accordion>\r\n    <ng-container *ngFor="let menuItem of MenuItems | async">\r\n      <mat-expansion-panel\r\n        (click)="navigateTo(menuItem.route)"\r\n        *ngIf="menuItem.name !== \'slideshow\'"\r\n        [class.active]="menuItem.active"\r\n        hideToggle\r\n      >\r\n        <mat-expansion-panel-header>\r\n          <mat-panel-title\r\n            ><h3 matLine>{{ menuItem.title }}</h3></mat-panel-title\r\n          >\r\n        </mat-expansion-panel-header>\r\n      </mat-expansion-panel>\r\n      <mat-expansion-panel *ngIf="menuItem.name === \'slideshow\'" hideToggle>\r\n        <mat-expansion-panel-header [class.active]="menuItem.active">\r\n          <mat-panel-title\r\n            ><h3 matLine>{{ menuItem.title }}</h3></mat-panel-title\r\n          >\r\n        </mat-expansion-panel-header>\r\n        <mat-nav-list *ngIf="CategoriesItems | async as categories">\r\n          <mat-list-item\r\n            (click)="navigateTo(menuItem.route + \'/\' + category.slug)"\r\n            *ngFor="let category of categories"\r\n          >\r\n            <span matLine>{{ category.name }}</span>\r\n          </mat-list-item>\r\n        </mat-nav-list>\r\n      </mat-expansion-panel>\r\n    </ng-container>\r\n    <mat-expansion-panel\r\n      (click)="feedback.showDialog()"\r\n      *ngIf="feedback"\r\n      hideToggle\r\n    >\r\n      <mat-expansion-panel-header>\r\n        <mat-panel-title><h3 matLine>Kontakt</h3></mat-panel-title>\r\n      </mat-expansion-panel-header>\r\n    </mat-expansion-panel>\r\n  </mat-accordion>\r\n</div> -->\r\n',
          styles: [
            'mat-accordion{padding:0;display:inline-block;width:300px;overflow-y:auto;overflow-x:hidden}mat-accordion ::ng-deep .mat-line{margin-bottom:0!important}mat-accordion ::ng-deep .mat-expansion-panel-header{padding:0 16px!important;height:48px!important}mat-accordion ::ng-deep .mat-expansion-panel:not([class*=mat-elevation-z]){box-shadow:none!important}mat-accordion ::ng-deep .mat-accordion .mat-expansion-panel:last-of-type{border-bottom-right-radius:0!important;border-bottom-left-radius:0!important}mat-accordion ::ng-deep .mat-accordion .mat-expansion-panel:first-of-type{border-top-right-radius:0!important;border-top-left-radius:0!important}mat-accordion ::ng-deep .mat-expansion-panel-spacing{margin:0!important}mat-accordion ::ng-deep .mat-expansion-panel{border-radius:0!important}mat-accordion ::ng-deep .mat-expansion-panel-body{padding:0!important}mat-nav-list{padding:0;display:inline-block;width:300px;overflow-y:auto;overflow-x:hidden}mat-nav-list mat-list-item{height:56px!important}.main-menu-container{height:100%;width:300px;overflow-y:auto}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: i5.FeedbackService,
        decorators: [
          {
            type: Inject,
            args: [SOLID_SKELETON_FEEDBACK_SERVICE],
          },
        ],
      },
    ];
  },
  propDecorators: {
    selectMenuEntry: [
      {
        type: Output,
      },
    ],
    MenuItems: [],
    openGlossaryClick: [
      {
        type: Output,
      },
    ],
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvc2tlbGV0b24vc3JjL2xpYi9jb21wb25lbnRzL21haW4tbWVudS9tYWluLW1lbnUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9za2VsZXRvbi9zcmMvbGliL2NvbXBvbmVudHMvbWFpbi1tZW51L21haW4tbWVudS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQVUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDckMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQ0wsZUFBZSxFQUNmLCtCQUErQixHQUNoQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7OztBQVFuRCxNQUFNLE9BQU8saUJBQWlCO0lBVW5CO0lBVFEsZUFBZSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFFL0MsU0FBUyxDQUEwQjtJQUN6QixpQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ2hELFFBQVEsQ0FBTTtJQUNmLFNBQVMsQ0FBUztJQUV6QixZQUVTLFFBQXlCO1FBQXpCLGFBQVEsR0FBUixRQUFRLENBQWlCO1FBRWhDLElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFTSxRQUFRO1FBQ2IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1lBQzNCLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUk7Z0JBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLGtCQUFrQixDQUFDLElBQVk7UUFDcEMsSUFBSSxJQUFJLEtBQUssTUFBTTtZQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLENBQUM7dUdBekJVLGlCQUFpQixrQkFTbEIsK0JBQStCOzJGQVQ5QixpQkFBaUIseUpDZjlCLHlqRkFxRUE7O0FEbkRTO0lBRE4sTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7OEJBQ1osVUFBVTtvREFBYTsyRkFIL0IsaUJBQWlCO2tCQUw3QixTQUFTOytCQUNFLDBCQUEwQjs7MEJBYWpDLE1BQU07MkJBQUMsK0JBQStCOzRDQVJ4QixlQUFlO3NCQUEvQixNQUFNO2dCQUVBLFNBQVMsTUFDQyxpQkFBaUI7c0JBQWpDLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5qZWN0LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTZWxlY3QgfSBmcm9tICdAbmd4cy9zdG9yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtcclxuICBGZWVkYmFja1NlcnZpY2UsXHJcbiAgU09MSURfU0tFTEVUT05fRkVFREJBQ0tfU0VSVklDRSxcclxufSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9mZWVkYmFjay5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTWVudVN0YXRlIH0gZnJvbSAnLi4vLi4vc3RhdGUvbWVudS5zdGF0ZSc7XHJcbmltcG9ydCB7IE1lbnVJdGVtIH0gZnJvbSAnLi4vLi4vc3RhdGUvbWVudS5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NvbGlkLXNrZWxldG9uLW1haW4tbWVudScsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21haW4tbWVudS5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbWFpbi1tZW51LmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYWluTWVudUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQE91dHB1dCgpIHB1YmxpYyBzZWxlY3RNZW51RW50cnkgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQFNlbGVjdChNZW51U3RhdGUuZ2V0TWVudUl0ZW1zKVxyXG4gIHB1YmxpYyBNZW51SXRlbXMhOiBPYnNlcnZhYmxlPE1lbnVJdGVtW10+O1xyXG4gIEBPdXRwdXQoKSBwdWJsaWMgb3Blbkdsb3NzYXJ5Q2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgcHJpdmF0ZSBtZXNzYWdlczogYW55O1xyXG4gIHB1YmxpYyBtc2dOdW1iZXI6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBASW5qZWN0KFNPTElEX1NLRUxFVE9OX0ZFRURCQUNLX1NFUlZJQ0UpXHJcbiAgICBwdWJsaWMgZmVlZGJhY2s6IEZlZWRiYWNrU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5tZXNzYWdlcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzb2xpZF9za2VsZXRvbl9tZXNzYWdlcycpO1xyXG4gICAgdGhpcy5tc2dOdW1iZXIgPSAwO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgY29uc3QgbXNnT2JqID0gSlNPTi5wYXJzZSh0aGlzLm1lc3NhZ2VzKTtcclxuICAgIG1zZ09iaj8uZm9yRWFjaCgobXNnOiBhbnkpID0+IHtcclxuICAgICAgaWYgKG1zZy51bnJlYWQgJiYgbXNnLnR5cGUgIT0gJ0NMJykgdGhpcy5tc2dOdW1iZXIrKztcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uTWVudUl0ZW1TZWxlY3RlZChpdGVtOiBzdHJpbmcpIHtcclxuICAgIGlmIChpdGVtID09PSAnaW5mbycpIHRoaXMubXNnTnVtYmVyID0gMDtcclxuICB9XHJcbn1cclxuIiwiPCEtLSBXaXRob3V0IERyb3Bkb3duIFZlcnNpb24gLS0+XHJcbjxkaXYgY2xhc3M9XCJtYWluLW1lbnUtY29udGFpbmVyXCI+XHJcbiAgPG1hdC1uYXYtbGlzdCBpZD1cIm1lbnVcIj5cclxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgTWVudUl0ZW1zIHwgYXN5bmM7IGxldCBpbmRleCA9IGluZGV4XCI+XHJcbiAgICAgIDxtYXQtbGlzdC1pdGVtXHJcbiAgICAgICAgKm5nSWY9XCJpdGVtLnJvdXRlID09PSAnaW5mbydcIlxyXG4gICAgICAgIChjbGljayk9XCJvcGVuR2xvc3NhcnlDbGljay5lbWl0KClcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPGgzIG1hdExpbmU+R2xvc3NhcjwvaDM+XHJcbiAgICAgIDwvbWF0LWxpc3QtaXRlbT5cclxuICAgICAgPG1hdC1saXN0LWl0ZW1cclxuICAgICAgICAoY2xpY2spPVwic2VsZWN0TWVudUVudHJ5LmVtaXQoKTsgb25NZW51SXRlbVNlbGVjdGVkKGl0ZW0ucm91dGUpXCJcclxuICAgICAgICBbY2xhc3MuYWN0aXZlXT1cIml0ZW0uYWN0aXZlXCJcclxuICAgICAgICBbcm91dGVyTGlua109XCJpdGVtLnJvdXRlXCJcclxuICAgICAgICBbcXVlcnlQYXJhbXNdPVwieyBkaXJlY3RUbzogbXNnTnVtYmVyID4gMCA/ICduZXdzJyA6IHVuZGVmaW5lZCB9XCJcclxuICAgICAgPlxyXG4gICAgICAgIDxoMyBtYXRMaW5lPlxyXG4gICAgICAgICAge3sgaXRlbS50aXRsZSB9fVxyXG4gICAgICAgIDwvaDM+XHJcbiAgICAgIDwvbWF0LWxpc3QtaXRlbT5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPG1hdC1saXN0LWl0ZW0gKGNsaWNrKT1cImZlZWRiYWNrLnNob3dEaWFsb2coKVwiICpuZ0lmPVwiZmVlZGJhY2tcIj5cclxuICAgICAgPGgzIG1hdExpbmU+S29udGFrdDwvaDM+XHJcbiAgICA8L21hdC1saXN0LWl0ZW0+XHJcbiAgPC9tYXQtbmF2LWxpc3Q+XHJcbjwvZGl2PlxyXG48IS0tIFNsaWRlc2hvdyBEcm9wZG93biBWZXJzaW9uIC0tPlxyXG48IS0tIDxkaXYgY2xhc3M9XCJtYWluLW1lbnUtY29udGFpbmVyXCI+XHJcbiAgPG1hdC1hY2NvcmRpb24+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBtZW51SXRlbSBvZiBNZW51SXRlbXMgfCBhc3luY1wiPlxyXG4gICAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbFxyXG4gICAgICAgIChjbGljayk9XCJuYXZpZ2F0ZVRvKG1lbnVJdGVtLnJvdXRlKVwiXHJcbiAgICAgICAgKm5nSWY9XCJtZW51SXRlbS5uYW1lICE9PSAnc2xpZGVzaG93J1wiXHJcbiAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJtZW51SXRlbS5hY3RpdmVcIlxyXG4gICAgICAgIGhpZGVUb2dnbGVcclxuICAgICAgPlxyXG4gICAgICAgIDxtYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cclxuICAgICAgICAgIDxtYXQtcGFuZWwtdGl0bGVcclxuICAgICAgICAgICAgPjxoMyBtYXRMaW5lPnt7IG1lbnVJdGVtLnRpdGxlIH19PC9oMz48L21hdC1wYW5lbC10aXRsZVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+XHJcbiAgICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbD5cclxuICAgICAgPG1hdC1leHBhbnNpb24tcGFuZWwgKm5nSWY9XCJtZW51SXRlbS5uYW1lID09PSAnc2xpZGVzaG93J1wiIGhpZGVUb2dnbGU+XHJcbiAgICAgICAgPG1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyIFtjbGFzcy5hY3RpdmVdPVwibWVudUl0ZW0uYWN0aXZlXCI+XHJcbiAgICAgICAgICA8bWF0LXBhbmVsLXRpdGxlXHJcbiAgICAgICAgICAgID48aDMgbWF0TGluZT57eyBtZW51SXRlbS50aXRsZSB9fTwvaDM+PC9tYXQtcGFuZWwtdGl0bGVcclxuICAgICAgICAgID5cclxuICAgICAgICA8L21hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxyXG4gICAgICAgIDxtYXQtbmF2LWxpc3QgKm5nSWY9XCJDYXRlZ29yaWVzSXRlbXMgfCBhc3luYyBhcyBjYXRlZ29yaWVzXCI+XHJcbiAgICAgICAgICA8bWF0LWxpc3QtaXRlbVxyXG4gICAgICAgICAgICAoY2xpY2spPVwibmF2aWdhdGVUbyhtZW51SXRlbS5yb3V0ZSArICcvJyArIGNhdGVnb3J5LnNsdWcpXCJcclxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGNhdGVnb3J5IG9mIGNhdGVnb3JpZXNcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8c3BhbiBtYXRMaW5lPnt7IGNhdGVnb3J5Lm5hbWUgfX08L3NwYW4+XHJcbiAgICAgICAgICA8L21hdC1saXN0LWl0ZW0+XHJcbiAgICAgICAgPC9tYXQtbmF2LWxpc3Q+XHJcbiAgICAgIDwvbWF0LWV4cGFuc2lvbi1wYW5lbD5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPG1hdC1leHBhbnNpb24tcGFuZWxcclxuICAgICAgKGNsaWNrKT1cImZlZWRiYWNrLnNob3dEaWFsb2coKVwiXHJcbiAgICAgICpuZ0lmPVwiZmVlZGJhY2tcIlxyXG4gICAgICBoaWRlVG9nZ2xlXHJcbiAgICA+XHJcbiAgICAgIDxtYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cclxuICAgICAgICA8bWF0LXBhbmVsLXRpdGxlPjxoMyBtYXRMaW5lPktvbnRha3Q8L2gzPjwvbWF0LXBhbmVsLXRpdGxlPlxyXG4gICAgICA8L21hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyPlxyXG4gICAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsPlxyXG4gIDwvbWF0LWFjY29yZGlvbj5cclxuPC9kaXY+IC0tPlxyXG4iXX0=
