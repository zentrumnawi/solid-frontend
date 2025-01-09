import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageModel, MediaModel } from '../../models';
import * as i0 from '@angular/core';
import * as i1 from '../media-detail/media-detail.component';
export class MediaComponent {
  image;
  mediaObject;
  hasDialog = true;
  hasAttributions = true;
  name;
  view;
  hasAudio;
  hasControlPanel = true;
  hasDescription;
  hasDescriptionToggle;
  slideshowPageChanged;
  hasNavigationInDialog;
  NextDialogEmitter = new EventEmitter();
  PrevDialogEmitter = new EventEmitter();
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MediaComponent,
    deps: [],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: MediaComponent,
    selector: 'solid-core-media',
    inputs: {
      image: 'image',
      mediaObject: 'mediaObject',
      hasDialog: 'hasDialog',
      hasAttributions: 'hasAttributions',
      name: 'name',
      view: 'view',
      hasAudio: 'hasAudio',
      hasControlPanel: 'hasControlPanel',
      hasDescription: 'hasDescription',
      hasDescriptionToggle: 'hasDescriptionToggle',
      slideshowPageChanged: 'slideshowPageChanged',
      hasNavigationInDialog: 'hasNavigationInDialog',
    },
    outputs: {
      NextDialogEmitter: 'NextDialogEmitter',
      PrevDialogEmitter: 'PrevDialogEmitter',
    },
    ngImport: i0,
    template:
      '<solid-core-media-detail\r\n  [mediaObject]="mediaObject"\r\n  [image]="image"\r\n  [name]="name"\r\n  [hasDialog]="hasDialog"\r\n  [hasAttributions]="hasAttributions"\r\n  [view]="view"\r\n  [hasAudio]="hasAudio"\r\n  [hasControlPanel]="hasControlPanel"\r\n  [hasDescription]="hasDescription"\r\n  [hasDescriptionToggle]="hasDescriptionToggle"\r\n  [slideshowPageChanged]="slideshowPageChanged"\r\n  (NextDialogEmitter)="NextDialogEmitter.emit()"\r\n  (PrevDialogEmitter)="PrevDialogEmitter.emit()"\r\n  [hasNavigationInDialog]="hasNavigationInDialog"\r\n></solid-core-media-detail>\r\n',
    styles: [
      ':host{display:block}solid-core-media-detail{height:100%;width:100%;position:relative}\n',
    ],
    dependencies: [
      {
        kind: 'component',
        type: i1.MediaDetailComponent,
        selector: 'solid-core-media-detail',
        inputs: [
          'image',
          'mediaObject',
          'hasDialog',
          'hasAttributions',
          'name',
          'view',
          'hasControlPanel',
          'hasAudio',
          'hasDescription',
          'hasDescriptionToggle',
          'slideshowPageChanged',
          'hasNavigationInDialog',
        ],
        outputs: ['NextDialogEmitter', 'PrevDialogEmitter'],
      },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: MediaComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-core-media',
          template:
            '<solid-core-media-detail\r\n  [mediaObject]="mediaObject"\r\n  [image]="image"\r\n  [name]="name"\r\n  [hasDialog]="hasDialog"\r\n  [hasAttributions]="hasAttributions"\r\n  [view]="view"\r\n  [hasAudio]="hasAudio"\r\n  [hasControlPanel]="hasControlPanel"\r\n  [hasDescription]="hasDescription"\r\n  [hasDescriptionToggle]="hasDescriptionToggle"\r\n  [slideshowPageChanged]="slideshowPageChanged"\r\n  (NextDialogEmitter)="NextDialogEmitter.emit()"\r\n  (PrevDialogEmitter)="PrevDialogEmitter.emit()"\r\n  [hasNavigationInDialog]="hasNavigationInDialog"\r\n></solid-core-media-detail>\r\n',
          styles: [
            ':host{display:block}solid-core-media-detail{height:100%;width:100%;position:relative}\n',
          ],
        },
      ],
    },
  ],
  propDecorators: {
    image: [
      {
        type: Input,
      },
    ],
    mediaObject: [
      {
        type: Input,
      },
    ],
    hasDialog: [
      {
        type: Input,
      },
    ],
    hasAttributions: [
      {
        type: Input,
      },
    ],
    name: [
      {
        type: Input,
      },
    ],
    view: [
      {
        type: Input,
      },
    ],
    hasAudio: [
      {
        type: Input,
      },
    ],
    hasControlPanel: [
      {
        type: Input,
      },
    ],
    hasDescription: [
      {
        type: Input,
      },
    ],
    hasDescriptionToggle: [
      {
        type: Input,
      },
    ],
    slideshowPageChanged: [
      {
        type: Input,
      },
    ],
    hasNavigationInDialog: [
      {
        type: Input,
      },
    ],
    NextDialogEmitter: [
      {
        type: Output,
      },
    ],
    PrevDialogEmitter: [
      {
        type: Output,
      },
    ],
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9jb3JlL3NyYy9saWIvY29tcG9uZW50cy9tZWRpYS9tZWRpYS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL2NvcmUvc3JjL2xpYi9jb21wb25lbnRzL21lZGlhL21lZGlhLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7OztBQU90RCxNQUFNLE9BQU8sY0FBYztJQUNoQixLQUFLLENBQWM7SUFDbkIsV0FBVyxDQUFjO0lBQ3pCLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDakIsZUFBZSxHQUFHLElBQUksQ0FBQztJQUN2QixJQUFJLENBQVU7SUFDZCxJQUFJLENBQVU7SUFDZCxRQUFRLENBQVc7SUFDbkIsZUFBZSxHQUFHLElBQUksQ0FBQztJQUN2QixjQUFjLENBQVc7SUFDekIsb0JBQW9CLENBQVc7SUFDL0Isb0JBQW9CLENBQVU7SUFDOUIscUJBQXFCLENBQVc7SUFDL0IsaUJBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUN2QyxpQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO3VHQWR0QyxjQUFjOzJGQUFkLGNBQWMsNmdCQ1IzQix5bUJBZ0JBOzsyRkRSYSxjQUFjO2tCQUwxQixTQUFTOytCQUNFLGtCQUFrQjs4QkFLbkIsS0FBSztzQkFBYixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csb0JBQW9CO3NCQUE1QixLQUFLO2dCQUNHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFDRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBQ0ksaUJBQWlCO3NCQUExQixNQUFNO2dCQUNHLGlCQUFpQjtzQkFBMUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEltYWdlTW9kZWwsIE1lZGlhTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzb2xpZC1jb3JlLW1lZGlhJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbWVkaWEuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL21lZGlhLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZWRpYUNvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgaW1hZ2U/OiBJbWFnZU1vZGVsO1xyXG4gIEBJbnB1dCgpIG1lZGlhT2JqZWN0PzogTWVkaWFNb2RlbDtcclxuICBASW5wdXQoKSBoYXNEaWFsb2cgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGhhc0F0dHJpYnV0aW9ucyA9IHRydWU7XHJcbiAgQElucHV0KCkgbmFtZSE6IHN0cmluZztcclxuICBASW5wdXQoKSB2aWV3Pzogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGhhc0F1ZGlvITogYm9vbGVhbjtcclxuICBASW5wdXQoKSBoYXNDb250cm9sUGFuZWwgPSB0cnVlO1xyXG4gIEBJbnB1dCgpIGhhc0Rlc2NyaXB0aW9uITogYm9vbGVhbjtcclxuICBASW5wdXQoKSBoYXNEZXNjcmlwdGlvblRvZ2dsZSE6IGJvb2xlYW47XHJcbiAgQElucHV0KCkgc2xpZGVzaG93UGFnZUNoYW5nZWQhOiBudW1iZXI7XHJcbiAgQElucHV0KCkgaGFzTmF2aWdhdGlvbkluRGlhbG9nITogYm9vbGVhbjtcclxuICBAT3V0cHV0KCkgTmV4dERpYWxvZ0VtaXR0ZXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIFByZXZEaWFsb2dFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG59XHJcbiIsIjxzb2xpZC1jb3JlLW1lZGlhLWRldGFpbFxyXG4gIFttZWRpYU9iamVjdF09XCJtZWRpYU9iamVjdFwiXHJcbiAgW2ltYWdlXT1cImltYWdlXCJcclxuICBbbmFtZV09XCJuYW1lXCJcclxuICBbaGFzRGlhbG9nXT1cImhhc0RpYWxvZ1wiXHJcbiAgW2hhc0F0dHJpYnV0aW9uc109XCJoYXNBdHRyaWJ1dGlvbnNcIlxyXG4gIFt2aWV3XT1cInZpZXdcIlxyXG4gIFtoYXNBdWRpb109XCJoYXNBdWRpb1wiXHJcbiAgW2hhc0NvbnRyb2xQYW5lbF09XCJoYXNDb250cm9sUGFuZWxcIlxyXG4gIFtoYXNEZXNjcmlwdGlvbl09XCJoYXNEZXNjcmlwdGlvblwiXHJcbiAgW2hhc0Rlc2NyaXB0aW9uVG9nZ2xlXT1cImhhc0Rlc2NyaXB0aW9uVG9nZ2xlXCJcclxuICBbc2xpZGVzaG93UGFnZUNoYW5nZWRdPVwic2xpZGVzaG93UGFnZUNoYW5nZWRcIlxyXG4gIChOZXh0RGlhbG9nRW1pdHRlcik9XCJOZXh0RGlhbG9nRW1pdHRlci5lbWl0KClcIlxyXG4gIChQcmV2RGlhbG9nRW1pdHRlcik9XCJQcmV2RGlhbG9nRW1pdHRlci5lbWl0KClcIlxyXG4gIFtoYXNOYXZpZ2F0aW9uSW5EaWFsb2ddPVwiaGFzTmF2aWdhdGlvbkluRGlhbG9nXCJcclxuPjwvc29saWQtY29yZS1tZWRpYS1kZXRhaWw+XHJcbiJdfQ==
