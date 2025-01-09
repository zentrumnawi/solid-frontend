import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common';
import * as i2 from '@zentrumnawi/solid-core';
import * as i3 from '@angular/material/list';
export class ListComponent {
  profiles;
  selectProfile = new EventEmitter();
  selectProfileTitle = new EventEmitter();
  selectedProfileId;
  selectedProfileType;
  isDiveApp = false;
  trackByFn(index, profile) {
    return profile.id;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: ListComponent,
    deps: [],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: ListComponent,
    selector: 'solid-profile-list',
    inputs: {
      profiles: 'profiles',
      selectedProfileId: 'selectedProfileId',
      selectedProfileType: 'selectedProfileType',
      isDiveApp: 'isDiveApp',
    },
    outputs: {
      selectProfile: 'selectProfile',
      selectProfileTitle: 'selectProfileTitle',
    },
    ngImport: i0,
    template:
      '<mat-list role="list">\r\n  <ng-container *ngIf="profiles | async as profilesArr">\r\n    <mat-list-item\r\n      (click)="\r\n        selectProfile.emit({ id: profile.id, type: profile.def_type });\r\n        selectProfileTitle.emit(profile.name)\r\n      "\r\n      *ngFor="let profile of profilesArr; trackBy: trackByFn"\r\n    >\r\n      <div\r\n        class="profile-title"\r\n        [class.selected]="\r\n          selectedProfileId === profile.id &&\r\n          selectedProfileType === profile.def_type\r\n        "\r\n      >\r\n        <span\r\n          *ngIf="isDiveApp"\r\n          class="name"\r\n          [data]="profile.name"\r\n          markdown\r\n        ></span>\r\n        <span *ngIf="!isDiveApp" class="name" [innerHTML]="profile.name"></span>\r\n        <span>{{ profile.sub_name }}</span>\r\n      </div>\r\n    </mat-list-item>\r\n    <mat-list-item *ngIf="profilesArr.length === 0"\r\n      >Keine Suchergebnisse vorhanden\r\n    </mat-list-item>\r\n  </ng-container>\r\n</mat-list>\r\n',
    styles: [
      'mat-list-item{margin-bottom:.5em;cursor:pointer}div.profile-title{display:flex;flex-direction:column}div.profile-title span.name ::ng-deep p{margin-bottom:0}.selected{font-weight:700}.thumbnail{height:2em;width:2em;border-radius:50%;margin-right:.5em}\n',
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
        kind: 'component',
        type: i2.MarkdownComponent,
        selector: '[markdown]',
        inputs: ['inline', 'data', 'appendData'],
      },
      {
        kind: 'component',
        type: i3.MatList,
        selector: 'mat-list',
        exportAs: ['matList'],
      },
      {
        kind: 'component',
        type: i3.MatListItem,
        selector: 'mat-list-item, a[mat-list-item], button[mat-list-item]',
        inputs: ['activated'],
        exportAs: ['matListItem'],
      },
      { kind: 'pipe', type: i1.AsyncPipe, name: 'async' },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: ListComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-profile-list',
          template:
            '<mat-list role="list">\r\n  <ng-container *ngIf="profiles | async as profilesArr">\r\n    <mat-list-item\r\n      (click)="\r\n        selectProfile.emit({ id: profile.id, type: profile.def_type });\r\n        selectProfileTitle.emit(profile.name)\r\n      "\r\n      *ngFor="let profile of profilesArr; trackBy: trackByFn"\r\n    >\r\n      <div\r\n        class="profile-title"\r\n        [class.selected]="\r\n          selectedProfileId === profile.id &&\r\n          selectedProfileType === profile.def_type\r\n        "\r\n      >\r\n        <span\r\n          *ngIf="isDiveApp"\r\n          class="name"\r\n          [data]="profile.name"\r\n          markdown\r\n        ></span>\r\n        <span *ngIf="!isDiveApp" class="name" [innerHTML]="profile.name"></span>\r\n        <span>{{ profile.sub_name }}</span>\r\n      </div>\r\n    </mat-list-item>\r\n    <mat-list-item *ngIf="profilesArr.length === 0"\r\n      >Keine Suchergebnisse vorhanden\r\n    </mat-list-item>\r\n  </ng-container>\r\n</mat-list>\r\n',
          styles: [
            'mat-list-item{margin-bottom:.5em;cursor:pointer}div.profile-title{display:flex;flex-direction:column}div.profile-title span.name ::ng-deep p{margin-bottom:0}.selected{font-weight:700}.thumbnail{height:2em;width:2em;border-radius:50%;margin-right:.5em}\n',
          ],
        },
      ],
    },
  ],
  propDecorators: {
    profiles: [
      {
        type: Input,
      },
    ],
    selectProfile: [
      {
        type: Output,
      },
    ],
    selectProfileTitle: [
      {
        type: Output,
      },
    ],
    selectedProfileId: [
      {
        type: Input,
      },
    ],
    selectedProfileType: [
      {
        type: Input,
      },
    ],
    isDiveApp: [
      {
        type: Input,
      },
    ],
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3Byb2ZpbGUvc3JjL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3Byb2ZpbGUvc3JjL2xpYi9jb21wb25lbnRzL2xpc3QvbGlzdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7O0FBT2xDLE1BQU0sT0FBTyxhQUFhO0lBQ2YsUUFBUSxDQUF5QjtJQUNoQyxhQUFhLEdBQUcsSUFBSSxZQUFZLEVBRXZDLENBQUM7SUFDTSxrQkFBa0IsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBQ2pELGlCQUFpQixDQUFVO0lBQzNCLG1CQUFtQixDQUFVO0lBQzdCLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFFcEIsU0FBUyxDQUFDLEtBQWEsRUFBRSxPQUFnQjtRQUM5QyxPQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUM7SUFDcEIsQ0FBQzt1R0FaVSxhQUFhOzJGQUFiLGFBQWEsK1JDVDFCLHNoQ0ErQkE7OzJGRHRCYSxhQUFhO2tCQUx6QixTQUFTOytCQUNFLG9CQUFvQjs4QkFLckIsUUFBUTtzQkFBaEIsS0FBSztnQkFDSSxhQUFhO3NCQUF0QixNQUFNO2dCQUdHLGtCQUFrQjtzQkFBM0IsTUFBTTtnQkFDRSxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBQ0csbUJBQW1CO3NCQUEzQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQcm9maWxlIH0gZnJvbSAnLi4vLi4vc3RhdGUvcHJvZmlsZS5tb2RlbCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc29saWQtcHJvZmlsZS1saXN0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbGlzdC5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlzdENvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgcHJvZmlsZXMhOiBPYnNlcnZhYmxlPFByb2ZpbGVbXT47XHJcbiAgQE91dHB1dCgpIHNlbGVjdFByb2ZpbGUgPSBuZXcgRXZlbnRFbWl0dGVyPFxyXG4gICAgbnVtYmVyIHwgeyBpZDogbnVtYmVyOyB0eXBlOiBzdHJpbmcgfVxyXG4gID4oKTtcclxuICBAT3V0cHV0KCkgc2VsZWN0UHJvZmlsZVRpdGxlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcbiAgQElucHV0KCkgc2VsZWN0ZWRQcm9maWxlSWQ/OiBudW1iZXI7XHJcbiAgQElucHV0KCkgc2VsZWN0ZWRQcm9maWxlVHlwZT86IHN0cmluZztcclxuICBASW5wdXQoKSBpc0RpdmVBcHAgPSBmYWxzZTtcclxuXHJcbiAgcHVibGljIHRyYWNrQnlGbihpbmRleDogbnVtYmVyLCBwcm9maWxlOiBQcm9maWxlKSB7XHJcbiAgICByZXR1cm4gcHJvZmlsZS5pZDtcclxuICB9XHJcbn1cclxuIiwiPG1hdC1saXN0IHJvbGU9XCJsaXN0XCI+XHJcbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInByb2ZpbGVzIHwgYXN5bmMgYXMgcHJvZmlsZXNBcnJcIj5cclxuICAgIDxtYXQtbGlzdC1pdGVtXHJcbiAgICAgIChjbGljayk9XCJcclxuICAgICAgICBzZWxlY3RQcm9maWxlLmVtaXQoeyBpZDogcHJvZmlsZS5pZCwgdHlwZTogcHJvZmlsZS5kZWZfdHlwZSB9KTtcclxuICAgICAgICBzZWxlY3RQcm9maWxlVGl0bGUuZW1pdChwcm9maWxlLm5hbWUpXHJcbiAgICAgIFwiXHJcbiAgICAgICpuZ0Zvcj1cImxldCBwcm9maWxlIG9mIHByb2ZpbGVzQXJyOyB0cmFja0J5OiB0cmFja0J5Rm5cIlxyXG4gICAgPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3M9XCJwcm9maWxlLXRpdGxlXCJcclxuICAgICAgICBbY2xhc3Muc2VsZWN0ZWRdPVwiXHJcbiAgICAgICAgICBzZWxlY3RlZFByb2ZpbGVJZCA9PT0gcHJvZmlsZS5pZCAmJlxyXG4gICAgICAgICAgc2VsZWN0ZWRQcm9maWxlVHlwZSA9PT0gcHJvZmlsZS5kZWZfdHlwZVxyXG4gICAgICAgIFwiXHJcbiAgICAgID5cclxuICAgICAgICA8c3BhblxyXG4gICAgICAgICAgKm5nSWY9XCJpc0RpdmVBcHBcIlxyXG4gICAgICAgICAgY2xhc3M9XCJuYW1lXCJcclxuICAgICAgICAgIFtkYXRhXT1cInByb2ZpbGUubmFtZVwiXHJcbiAgICAgICAgICBtYXJrZG93blxyXG4gICAgICAgID48L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gKm5nSWY9XCIhaXNEaXZlQXBwXCIgY2xhc3M9XCJuYW1lXCIgW2lubmVySFRNTF09XCJwcm9maWxlLm5hbWVcIj48L3NwYW4+XHJcbiAgICAgICAgPHNwYW4+e3sgcHJvZmlsZS5zdWJfbmFtZSB9fTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L21hdC1saXN0LWl0ZW0+XHJcbiAgICA8bWF0LWxpc3QtaXRlbSAqbmdJZj1cInByb2ZpbGVzQXJyLmxlbmd0aCA9PT0gMFwiXHJcbiAgICAgID5LZWluZSBTdWNoZXJnZWJuaXNzZSB2b3JoYW5kZW5cclxuICAgIDwvbWF0LWxpc3QtaXRlbT5cclxuICA8L25nLWNvbnRhaW5lcj5cclxuPC9tYXQtbGlzdD5cclxuIl19
