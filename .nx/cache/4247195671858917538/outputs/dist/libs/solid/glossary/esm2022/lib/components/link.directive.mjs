import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import * as i0 from '@angular/core';
export class RefDirective {
  ref;
  refId;
  highlighted = false;
  get flashClass() {
    return this.highlighted;
  }
  constructor(ref) {
    this.ref = ref;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: RefDirective,
    deps: [{ token: i0.ElementRef }],
    target: i0.ɵɵFactoryTarget.Directive,
  });
  static ɵdir = i0.ɵɵngDeclareDirective({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: RefDirective,
    selector: '[solidGlossaryEntry]',
    inputs: { refId: 'refId', highlighted: 'highlighted' },
    host: { properties: { 'class.flash': 'this.flashClass' } },
    ngImport: i0,
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: RefDirective,
  decorators: [
    {
      type: Directive,
      args: [{ selector: '[solidGlossaryEntry]' }],
    },
  ],
  ctorParameters: function () {
    return [{ type: i0.ElementRef }];
  },
  propDecorators: {
    refId: [
      {
        type: Input,
      },
    ],
    highlighted: [
      {
        type: Input,
      },
    ],
    flashClass: [
      {
        type: HostBinding,
        args: ['class.flash'],
      },
    ],
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL2dsb3NzYXJ5L3NyYy9saWIvY29tcG9uZW50cy9saW5rLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUcxRSxNQUFNLE9BQU8sWUFBWTtJQU1KO0lBTEgsS0FBSyxDQUFVO0lBQ2YsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUNwQyxJQUFnQyxVQUFVO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBQ0QsWUFBbUIsR0FBZTtRQUFmLFFBQUcsR0FBSCxHQUFHLENBQVk7SUFBRyxDQUFDO3VHQU4zQixZQUFZOzJGQUFaLFlBQVk7OzJGQUFaLFlBQVk7a0JBRHhCLFNBQVM7bUJBQUMsRUFBRSxRQUFRLEVBQUUsc0JBQXNCLEVBQUU7aUdBRTdCLEtBQUs7c0JBQXBCLEtBQUs7Z0JBQ1UsV0FBVztzQkFBMUIsS0FBSztnQkFDMEIsVUFBVTtzQkFBekMsV0FBVzt1QkFBQyxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tzb2xpZEdsb3NzYXJ5RW50cnldJyB9KVxyXG5leHBvcnQgY2xhc3MgUmVmRGlyZWN0aXZlIHtcclxuICBASW5wdXQoKSBwdWJsaWMgcmVmSWQhOiBudW1iZXI7XHJcbiAgQElucHV0KCkgcHVibGljIGhpZ2hsaWdodGVkID0gZmFsc2U7XHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mbGFzaCcpIGdldCBmbGFzaENsYXNzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaGlnaGxpZ2h0ZWQ7XHJcbiAgfVxyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWY6IEVsZW1lbnRSZWYpIHt9XHJcbn1cclxuIl19
