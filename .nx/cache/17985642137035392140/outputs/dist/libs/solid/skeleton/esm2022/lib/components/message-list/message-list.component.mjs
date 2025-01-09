import { Component, Input } from '@angular/core';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common';
import * as i2 from '@zentrumnawi/solid-core';
import * as i3 from '@angular/material/core';
import * as i4 from '@angular/material/list';
export class MessageListComponent {
  messages;
  tabIndex;
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MessageListComponent,
    deps: [],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: MessageListComponent,
    selector: 'solid-skeleton-message-list',
    inputs: { messages: 'messages', tabIndex: 'tabIndex' },
    ngImport: i0,
    template:
      '<mat-list>\r\n  <mat-list-item *ngFor="let msg of messages">\r\n    <h3 matLine [ngStyle]="{ fontWeight: msg.unread ? \'500\' : \'normal\' }">\r\n      {{ msg.title\r\n      }}<span *ngIf="msg.valid_from"\r\n        >&nbsp;|&nbsp;{{ msg.valid_from | date: \'dd.MM.yyyy\' }}</span\r\n      >\r\n      <span *ngIf="msg.valid_to"\r\n        >&nbsp;- {{ msg.valid_to | date: \'dd.MM.yyyy\' }}</span\r\n      >\r\n    </h3>\r\n    <div class="content-container">\r\n      <img\r\n        *ngIf="msg.img"\r\n        [src]="msg.img.img.thumbnail"\r\n        [alt]="msg.img.img_alt"\r\n      />\r\n      <div\r\n        class="text"\r\n        *ngIf="msg.text !== \'\'"\r\n        [data]="msg.text"\r\n        markdown\r\n        matLine\r\n      ></div>\r\n    </div>\r\n  </mat-list-item>\r\n</mat-list>\r\n',
    styles: [
      'mat-list{padding:.8rem 1rem 1rem}mat-list-item{margin-top:0}mat-list-item ::ng-deep p{margin-block-end:0}mat-list-item ::ng-deep h3.mat-line{padding-bottom:.5em}mat-list-item ::ng-deep .mat-list-item-content{padding:0!important;flex-direction:column!important;align-items:baseline!important}mat-list-item ::ng-deep .mat-line.md-rendered{padding-left:.22rem!important;white-space:normal!important}mat-list-item img{float:left;margin:5px 10px 1px 5px}mat-list-item .content-container{width:100%}mat-list-item .text{overflow:inherit;font-size:14px!important}mat-list-item:not(:first-child) h3{padding-top:.5em}mat-list-item:not(:last-child){padding-bottom:.8em!important}\n',
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
        type: i1.NgStyle,
        selector: '[ngStyle]',
        inputs: ['ngStyle'],
      },
      {
        kind: 'component',
        type: i2.MarkdownComponent,
        selector: '[markdown]',
        inputs: ['inline', 'data', 'appendData'],
      },
      {
        kind: 'directive',
        type: i3.MatLine,
        selector: '[mat-line], [matLine]',
      },
      {
        kind: 'component',
        type: i4.MatList,
        selector: 'mat-list',
        exportAs: ['matList'],
      },
      {
        kind: 'component',
        type: i4.MatListItem,
        selector: 'mat-list-item, a[mat-list-item], button[mat-list-item]',
        inputs: ['activated'],
        exportAs: ['matListItem'],
      },
      { kind: 'pipe', type: i1.DatePipe, name: 'date' },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: MessageListComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-skeleton-message-list',
          template:
            '<mat-list>\r\n  <mat-list-item *ngFor="let msg of messages">\r\n    <h3 matLine [ngStyle]="{ fontWeight: msg.unread ? \'500\' : \'normal\' }">\r\n      {{ msg.title\r\n      }}<span *ngIf="msg.valid_from"\r\n        >&nbsp;|&nbsp;{{ msg.valid_from | date: \'dd.MM.yyyy\' }}</span\r\n      >\r\n      <span *ngIf="msg.valid_to"\r\n        >&nbsp;- {{ msg.valid_to | date: \'dd.MM.yyyy\' }}</span\r\n      >\r\n    </h3>\r\n    <div class="content-container">\r\n      <img\r\n        *ngIf="msg.img"\r\n        [src]="msg.img.img.thumbnail"\r\n        [alt]="msg.img.img_alt"\r\n      />\r\n      <div\r\n        class="text"\r\n        *ngIf="msg.text !== \'\'"\r\n        [data]="msg.text"\r\n        markdown\r\n        matLine\r\n      ></div>\r\n    </div>\r\n  </mat-list-item>\r\n</mat-list>\r\n',
          styles: [
            'mat-list{padding:.8rem 1rem 1rem}mat-list-item{margin-top:0}mat-list-item ::ng-deep p{margin-block-end:0}mat-list-item ::ng-deep h3.mat-line{padding-bottom:.5em}mat-list-item ::ng-deep .mat-list-item-content{padding:0!important;flex-direction:column!important;align-items:baseline!important}mat-list-item ::ng-deep .mat-line.md-rendered{padding-left:.22rem!important;white-space:normal!important}mat-list-item img{float:left;margin:5px 10px 1px 5px}mat-list-item .content-container{width:100%}mat-list-item .text{overflow:inherit;font-size:14px!important}mat-list-item:not(:first-child) h3{padding-top:.5em}mat-list-item:not(:last-child){padding-bottom:.8em!important}\n',
          ],
        },
      ],
    },
  ],
  propDecorators: {
    messages: [
      {
        type: Input,
      },
    ],
    tabIndex: [
      {
        type: Input,
      },
    ],
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvc2tlbGV0b24vc3JjL2xpYi9jb21wb25lbnRzL21lc3NhZ2UtbGlzdC9tZXNzYWdlLWxpc3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9za2VsZXRvbi9zcmMvbGliL2NvbXBvbmVudHMvbWVzc2FnZS1saXN0L21lc3NhZ2UtbGlzdC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBUWpELE1BQU0sT0FBTyxvQkFBb0I7SUFDdEIsUUFBUSxDQUFrQjtJQUMxQixRQUFRLENBQVU7dUdBRmhCLG9CQUFvQjsyRkFBcEIsb0JBQW9CLDJIQ1JqQywreUJBMkJBOzsyRkRuQmEsb0JBQW9CO2tCQUxoQyxTQUFTOytCQUNFLDZCQUE2Qjs4QkFLOUIsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNZXNzYWdlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWVzc2FnZS5tb2RlbCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3NvbGlkLXNrZWxldG9uLW1lc3NhZ2UtbGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL21lc3NhZ2UtbGlzdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbWVzc2FnZS1saXN0LmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZXNzYWdlTGlzdENvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgbWVzc2FnZXMhOiBNZXNzYWdlTW9kZWxbXTtcclxuICBASW5wdXQoKSB0YWJJbmRleCE6IG51bWJlcjtcclxufVxyXG4iLCI8bWF0LWxpc3Q+XHJcbiAgPG1hdC1saXN0LWl0ZW0gKm5nRm9yPVwibGV0IG1zZyBvZiBtZXNzYWdlc1wiPlxyXG4gICAgPGgzIG1hdExpbmUgW25nU3R5bGVdPVwieyBmb250V2VpZ2h0OiBtc2cudW5yZWFkID8gJzUwMCcgOiAnbm9ybWFsJyB9XCI+XHJcbiAgICAgIHt7IG1zZy50aXRsZVxyXG4gICAgICB9fTxzcGFuICpuZ0lmPVwibXNnLnZhbGlkX2Zyb21cIlxyXG4gICAgICAgID4mbmJzcDt8Jm5ic3A7e3sgbXNnLnZhbGlkX2Zyb20gfCBkYXRlOiAnZGQuTU0ueXl5eScgfX08L3NwYW5cclxuICAgICAgPlxyXG4gICAgICA8c3BhbiAqbmdJZj1cIm1zZy52YWxpZF90b1wiXHJcbiAgICAgICAgPiZuYnNwOy0ge3sgbXNnLnZhbGlkX3RvIHwgZGF0ZTogJ2RkLk1NLnl5eXknIH19PC9zcGFuXHJcbiAgICAgID5cclxuICAgIDwvaDM+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29udGVudC1jb250YWluZXJcIj5cclxuICAgICAgPGltZ1xyXG4gICAgICAgICpuZ0lmPVwibXNnLmltZ1wiXHJcbiAgICAgICAgW3NyY109XCJtc2cuaW1nLmltZy50aHVtYm5haWxcIlxyXG4gICAgICAgIFthbHRdPVwibXNnLmltZy5pbWdfYWx0XCJcclxuICAgICAgLz5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzPVwidGV4dFwiXHJcbiAgICAgICAgKm5nSWY9XCJtc2cudGV4dCAhPT0gJydcIlxyXG4gICAgICAgIFtkYXRhXT1cIm1zZy50ZXh0XCJcclxuICAgICAgICBtYXJrZG93blxyXG4gICAgICAgIG1hdExpbmVcclxuICAgICAgPjwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9tYXQtbGlzdC1pdGVtPlxyXG48L21hdC1saXN0PlxyXG4iXX0=
