import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Observable } from 'rxjs';
import { SelectedDirective } from '../selected.directive';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common';
import * as i2 from '@zentrumnawi/solid-core';
import * as i3 from '../selected.directive';
export class GridComponent {
  selectedElements;
  profiles;
  selectedProfileId;
  selectedProfileType;
  selectProfile = new EventEmitter();
  isDiveApp = false;
  selectProfileTitle = new EventEmitter();
  hasControlPanel;
  trackByFn(index, profile) {
    return profile.id;
  }
  ngAfterViewInit() {
    this.selectedElements.changes.subscribe(() => {
      this.scrollTo();
    });
    this.scrollTo();
  }
  scrollTo() {
    setTimeout(() => {
      const card = this.selectedElements.first || null;
      if (!card) {
        return;
      }
      card.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    });
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: GridComponent,
    deps: [],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: GridComponent,
    selector: 'solid-profile-grid',
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
    viewQueries: [
      {
        propertyName: 'selectedElements',
        predicate: SelectedDirective,
        descendants: true,
        read: ElementRef,
      },
    ],
    ngImport: i0,
    template:
      '<ng-container\r\n  *ngFor="let profile of profiles | async; let i = index; trackBy: trackByFn"\r\n>\r\n  <div\r\n    *ngIf="\r\n      selectedProfileId === profile.id &&\r\n      selectedProfileType === profile.def_type\r\n    "\r\n    (click)="\r\n      selectProfile.emit({ id: profile.id, type: profile.def_type });\r\n      selectProfileTitle.emit(profile.name)\r\n    "\r\n    class="card mat-elevation-z2 selected"\r\n    solidProfileSelected\r\n  >\r\n    <ng-container\r\n      *ngTemplateOutlet="cardContent; context: { profile: profile }"\r\n    ></ng-container>\r\n  </div>\r\n  <div\r\n    *ngIf="selectedProfileId !== profile.id"\r\n    (click)="\r\n      selectProfile.emit({ id: profile.id, type: profile.def_type });\r\n      selectProfileTitle.emit(profile.name)\r\n    "\r\n    class="card mat-elevation-z2"\r\n  >\r\n    <ng-container\r\n      *ngTemplateOutlet="cardContent; context: { profile: profile }"\r\n    ></ng-container>\r\n  </div>\r\n</ng-container>\r\n\r\n<ng-template #cardContent let-profile="profile">\r\n  <div *ngIf="isDiveApp" class="title" [data]="profile.name" markdown></div>\r\n  <div *ngIf="!isDiveApp" class="title" [innerHTML]="profile.name"></div>\r\n  <div class="subtitle">{{ profile.sub_name }}</div>\r\n  <solid-core-media\r\n    *ngIf="profile.mediaObjects.length > 0; else noImage"\r\n    [mediaObject]="profile.mediaObjects[0]"\r\n    [hasAttributions]="false"\r\n    [hasDialog]="false"\r\n    [view]="\'grid\'"\r\n    [hasControlPanel]="false"\r\n  ></solid-core-media>\r\n  <ng-template #noImage>\r\n    <img class="noimage" src="assets/profile/no_thumbnail.svg" />\r\n  </ng-template>\r\n</ng-template>\r\n',
    styles: [
      ':host{display:flex;flex-flow:row wrap;justify-content:space-evenly;overflow-y:auto}div.card{cursor:pointer;margin:1em;max-width:200px;height:185px;width:200px;display:flex;border-radius:.25em;flex-direction:column}div.card div.subtitle,div.card div.title{padding:.5em .5em 0;font-weight:500;font-size:14px}div.card div.subtitle ::ng-deep p,div.card div.title ::ng-deep p{margin-bottom:0}div.card div.subtitle{padding-top:0;height:2em;font-weight:400}div.card solid-core-media{border-bottom-right-radius:.25em;border-bottom-left-radius:.25em;height:100px}div.card .noimage{height:100px}\n',
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
        type: i1.NgTemplateOutlet,
        selector: '[ngTemplateOutlet]',
        inputs: [
          'ngTemplateOutletContext',
          'ngTemplateOutlet',
          'ngTemplateOutletInjector',
        ],
      },
      {
        kind: 'component',
        type: i2.MarkdownComponent,
        selector: '[markdown]',
        inputs: ['inline', 'data', 'appendData'],
      },
      {
        kind: 'component',
        type: i2.MediaComponent,
        selector: 'solid-core-media',
        inputs: [
          'image',
          'mediaObject',
          'hasDialog',
          'hasAttributions',
          'name',
          'view',
          'hasAudio',
          'hasControlPanel',
          'hasDescription',
          'hasDescriptionToggle',
          'slideshowPageChanged',
          'hasNavigationInDialog',
        ],
        outputs: ['NextDialogEmitter', 'PrevDialogEmitter'],
      },
      {
        kind: 'directive',
        type: i3.SelectedDirective,
        selector: '[solidProfileSelected]',
      },
      { kind: 'pipe', type: i1.AsyncPipe, name: 'async' },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: GridComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-profile-grid',
          template:
            '<ng-container\r\n  *ngFor="let profile of profiles | async; let i = index; trackBy: trackByFn"\r\n>\r\n  <div\r\n    *ngIf="\r\n      selectedProfileId === profile.id &&\r\n      selectedProfileType === profile.def_type\r\n    "\r\n    (click)="\r\n      selectProfile.emit({ id: profile.id, type: profile.def_type });\r\n      selectProfileTitle.emit(profile.name)\r\n    "\r\n    class="card mat-elevation-z2 selected"\r\n    solidProfileSelected\r\n  >\r\n    <ng-container\r\n      *ngTemplateOutlet="cardContent; context: { profile: profile }"\r\n    ></ng-container>\r\n  </div>\r\n  <div\r\n    *ngIf="selectedProfileId !== profile.id"\r\n    (click)="\r\n      selectProfile.emit({ id: profile.id, type: profile.def_type });\r\n      selectProfileTitle.emit(profile.name)\r\n    "\r\n    class="card mat-elevation-z2"\r\n  >\r\n    <ng-container\r\n      *ngTemplateOutlet="cardContent; context: { profile: profile }"\r\n    ></ng-container>\r\n  </div>\r\n</ng-container>\r\n\r\n<ng-template #cardContent let-profile="profile">\r\n  <div *ngIf="isDiveApp" class="title" [data]="profile.name" markdown></div>\r\n  <div *ngIf="!isDiveApp" class="title" [innerHTML]="profile.name"></div>\r\n  <div class="subtitle">{{ profile.sub_name }}</div>\r\n  <solid-core-media\r\n    *ngIf="profile.mediaObjects.length > 0; else noImage"\r\n    [mediaObject]="profile.mediaObjects[0]"\r\n    [hasAttributions]="false"\r\n    [hasDialog]="false"\r\n    [view]="\'grid\'"\r\n    [hasControlPanel]="false"\r\n  ></solid-core-media>\r\n  <ng-template #noImage>\r\n    <img class="noimage" src="assets/profile/no_thumbnail.svg" />\r\n  </ng-template>\r\n</ng-template>\r\n',
          styles: [
            ':host{display:flex;flex-flow:row wrap;justify-content:space-evenly;overflow-y:auto}div.card{cursor:pointer;margin:1em;max-width:200px;height:185px;width:200px;display:flex;border-radius:.25em;flex-direction:column}div.card div.subtitle,div.card div.title{padding:.5em .5em 0;font-weight:500;font-size:14px}div.card div.subtitle ::ng-deep p,div.card div.title ::ng-deep p{margin-bottom:0}div.card div.subtitle{padding-top:0;height:2em;font-weight:400}div.card solid-core-media{border-bottom-right-radius:.25em;border-bottom-left-radius:.25em;height:100px}div.card .noimage{height:100px}\n',
          ],
        },
      ],
    },
  ],
  propDecorators: {
    selectedElements: [
      {
        type: ViewChildren,
        args: [SelectedDirective, { read: ElementRef }],
      },
    ],
    profiles: [
      {
        type: Input,
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
    selectProfile: [
      {
        type: Output,
      },
    ],
    isDiveApp: [
      {
        type: Input,
      },
    ],
    selectProfileTitle: [
      {
        type: Output,
      },
    ],
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3Byb2ZpbGUvc3JjL2xpYi9jb21wb25lbnRzL2dyaWQvZ3JpZC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3Byb2ZpbGUvc3JjL2xpYi9jb21wb25lbnRzL2dyaWQvZ3JpZC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1QsWUFBWSxHQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFbEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7Ozs7O0FBTzFELE1BQU0sT0FBTyxhQUFhO0lBRWpCLGdCQUFnQixDQUF5QjtJQUN2QyxRQUFRLENBQXlCO0lBQ2pDLGlCQUFpQixDQUFVO0lBQzNCLG1CQUFtQixDQUFVO0lBQzVCLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFFdkMsQ0FBQztJQUNLLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDakIsa0JBQWtCLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUNuRCxlQUFlLENBQVc7SUFDMUIsU0FBUyxDQUFDLEtBQWEsRUFBRSxPQUFnQjtRQUM5QyxPQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVNLGVBQWU7UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQzNDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRU0sUUFBUTtRQUNiLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztZQUNqRCxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNULE9BQU87YUFDUjtZQUNELElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDO2dCQUNoQyxRQUFRLEVBQUUsUUFBUTtnQkFDbEIsS0FBSyxFQUFFLFNBQVM7YUFDakIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO3VHQWxDVSxhQUFhOzJGQUFiLGFBQWEsb1VBQ1YsaUJBQWlCLDJCQUFVLFVBQVUsNkJDcEJyRCxpckRBaURBOzsyRkQ5QmEsYUFBYTtrQkFMekIsU0FBUzsrQkFDRSxvQkFBb0I7OEJBTXZCLGdCQUFnQjtzQkFEdEIsWUFBWTt1QkFBQyxpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7Z0JBRTVDLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csaUJBQWlCO3NCQUF6QixLQUFLO2dCQUNHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFDSSxhQUFhO3NCQUF0QixNQUFNO2dCQUdFLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0ksa0JBQWtCO3NCQUEzQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgUXVlcnlMaXN0LFxyXG4gIFZpZXdDaGlsZHJlbixcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBQcm9maWxlIH0gZnJvbSAnLi4vLi4vc3RhdGUvcHJvZmlsZS5tb2RlbCc7XHJcbmltcG9ydCB7IFNlbGVjdGVkRGlyZWN0aXZlIH0gZnJvbSAnLi4vc2VsZWN0ZWQuZGlyZWN0aXZlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc29saWQtcHJvZmlsZS1ncmlkJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZ3JpZC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vZ3JpZC5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgR3JpZENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG4gIEBWaWV3Q2hpbGRyZW4oU2VsZWN0ZWREaXJlY3RpdmUsIHsgcmVhZDogRWxlbWVudFJlZiB9KVxyXG4gIHB1YmxpYyBzZWxlY3RlZEVsZW1lbnRzITogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xyXG4gIEBJbnB1dCgpIHByb2ZpbGVzITogT2JzZXJ2YWJsZTxQcm9maWxlW10+O1xyXG4gIEBJbnB1dCgpIHNlbGVjdGVkUHJvZmlsZUlkPzogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIHNlbGVjdGVkUHJvZmlsZVR5cGU/OiBzdHJpbmc7XHJcbiAgQE91dHB1dCgpIHNlbGVjdFByb2ZpbGUgPSBuZXcgRXZlbnRFbWl0dGVyPFxyXG4gICAgbnVtYmVyIHwgeyBpZDogbnVtYmVyOyB0eXBlOiBzdHJpbmcgfVxyXG4gID4oKTtcclxuICBASW5wdXQoKSBpc0RpdmVBcHAgPSBmYWxzZTtcclxuICBAT3V0cHV0KCkgc2VsZWN0UHJvZmlsZVRpdGxlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcbiAgcHVibGljIGhhc0NvbnRyb2xQYW5lbCE6IGJvb2xlYW47XHJcbiAgcHVibGljIHRyYWNrQnlGbihpbmRleDogbnVtYmVyLCBwcm9maWxlOiBQcm9maWxlKSB7XHJcbiAgICByZXR1cm4gcHJvZmlsZS5pZDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdGVkRWxlbWVudHMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnNjcm9sbFRvKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2Nyb2xsVG8oKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzY3JvbGxUbygpIHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBjb25zdCBjYXJkID0gdGhpcy5zZWxlY3RlZEVsZW1lbnRzLmZpcnN0IHx8IG51bGw7XHJcbiAgICAgIGlmICghY2FyZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjYXJkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoe1xyXG4gICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcclxuICAgICAgICBibG9jazogJ25lYXJlc3QnLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCI8bmctY29udGFpbmVyXHJcbiAgKm5nRm9yPVwibGV0IHByb2ZpbGUgb2YgcHJvZmlsZXMgfCBhc3luYzsgbGV0IGkgPSBpbmRleDsgdHJhY2tCeTogdHJhY2tCeUZuXCJcclxuPlxyXG4gIDxkaXZcclxuICAgICpuZ0lmPVwiXHJcbiAgICAgIHNlbGVjdGVkUHJvZmlsZUlkID09PSBwcm9maWxlLmlkICYmXHJcbiAgICAgIHNlbGVjdGVkUHJvZmlsZVR5cGUgPT09IHByb2ZpbGUuZGVmX3R5cGVcclxuICAgIFwiXHJcbiAgICAoY2xpY2spPVwiXHJcbiAgICAgIHNlbGVjdFByb2ZpbGUuZW1pdCh7IGlkOiBwcm9maWxlLmlkLCB0eXBlOiBwcm9maWxlLmRlZl90eXBlIH0pO1xyXG4gICAgICBzZWxlY3RQcm9maWxlVGl0bGUuZW1pdChwcm9maWxlLm5hbWUpXHJcbiAgICBcIlxyXG4gICAgY2xhc3M9XCJjYXJkIG1hdC1lbGV2YXRpb24tejIgc2VsZWN0ZWRcIlxyXG4gICAgc29saWRQcm9maWxlU2VsZWN0ZWRcclxuICA+XHJcbiAgICA8bmctY29udGFpbmVyXHJcbiAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2FyZENvbnRlbnQ7IGNvbnRleHQ6IHsgcHJvZmlsZTogcHJvZmlsZSB9XCJcclxuICAgID48L25nLWNvbnRhaW5lcj5cclxuICA8L2Rpdj5cclxuICA8ZGl2XHJcbiAgICAqbmdJZj1cInNlbGVjdGVkUHJvZmlsZUlkICE9PSBwcm9maWxlLmlkXCJcclxuICAgIChjbGljayk9XCJcclxuICAgICAgc2VsZWN0UHJvZmlsZS5lbWl0KHsgaWQ6IHByb2ZpbGUuaWQsIHR5cGU6IHByb2ZpbGUuZGVmX3R5cGUgfSk7XHJcbiAgICAgIHNlbGVjdFByb2ZpbGVUaXRsZS5lbWl0KHByb2ZpbGUubmFtZSlcclxuICAgIFwiXHJcbiAgICBjbGFzcz1cImNhcmQgbWF0LWVsZXZhdGlvbi16MlwiXHJcbiAgPlxyXG4gICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAqbmdUZW1wbGF0ZU91dGxldD1cImNhcmRDb250ZW50OyBjb250ZXh0OiB7IHByb2ZpbGU6IHByb2ZpbGUgfVwiXHJcbiAgICA+PC9uZy1jb250YWluZXI+XHJcbiAgPC9kaXY+XHJcbjwvbmctY29udGFpbmVyPlxyXG5cclxuPG5nLXRlbXBsYXRlICNjYXJkQ29udGVudCBsZXQtcHJvZmlsZT1cInByb2ZpbGVcIj5cclxuICA8ZGl2ICpuZ0lmPVwiaXNEaXZlQXBwXCIgY2xhc3M9XCJ0aXRsZVwiIFtkYXRhXT1cInByb2ZpbGUubmFtZVwiIG1hcmtkb3duPjwvZGl2PlxyXG4gIDxkaXYgKm5nSWY9XCIhaXNEaXZlQXBwXCIgY2xhc3M9XCJ0aXRsZVwiIFtpbm5lckhUTUxdPVwicHJvZmlsZS5uYW1lXCI+PC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cInN1YnRpdGxlXCI+e3sgcHJvZmlsZS5zdWJfbmFtZSB9fTwvZGl2PlxyXG4gIDxzb2xpZC1jb3JlLW1lZGlhXHJcbiAgICAqbmdJZj1cInByb2ZpbGUubWVkaWFPYmplY3RzLmxlbmd0aCA+IDA7IGVsc2Ugbm9JbWFnZVwiXHJcbiAgICBbbWVkaWFPYmplY3RdPVwicHJvZmlsZS5tZWRpYU9iamVjdHNbMF1cIlxyXG4gICAgW2hhc0F0dHJpYnV0aW9uc109XCJmYWxzZVwiXHJcbiAgICBbaGFzRGlhbG9nXT1cImZhbHNlXCJcclxuICAgIFt2aWV3XT1cIidncmlkJ1wiXHJcbiAgICBbaGFzQ29udHJvbFBhbmVsXT1cImZhbHNlXCJcclxuICA+PC9zb2xpZC1jb3JlLW1lZGlhPlxyXG4gIDxuZy10ZW1wbGF0ZSAjbm9JbWFnZT5cclxuICAgIDxpbWcgY2xhc3M9XCJub2ltYWdlXCIgc3JjPVwiYXNzZXRzL3Byb2ZpbGUvbm9fdGh1bWJuYWlsLnN2Z1wiIC8+XHJcbiAgPC9uZy10ZW1wbGF0ZT5cclxuPC9uZy10ZW1wbGF0ZT5cclxuIl19
