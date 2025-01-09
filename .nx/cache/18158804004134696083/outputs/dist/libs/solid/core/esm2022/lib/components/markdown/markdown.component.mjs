import { MarkdownService } from '../../services/markdown.service';
import { Component, HostBinding, Input } from '@angular/core';
import * as i0 from '@angular/core';
import * as i1 from '../../services/markdown.service';
export class MarkdownComponent {
  _md;
  set inline(value) {
    this._inline = value;
    this.onDataChange();
  }
  innerHTML = '';
  _data = '';
  _inline = false;
  inlineClass = () => this._inline;
  constructor(_md) {
    this._md = _md;
  }
  set data(value) {
    this._data = value;
    this.onDataChange();
  }
  set appendData(value) {
    if (value !== null) {
      this.innerHTML =
        this._md.compile(this._data, this._inline) +
        `<span class="media-object-title"> | ${value}<span>`;
    }
  }
  onDataChange() {
    if (this._data) {
      this.innerHTML = this._md.compile(this._data, this._inline);
    } else {
      this.innerHTML = '';
    }
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MarkdownComponent,
    deps: [{ token: i1.MarkdownService }],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: MarkdownComponent,
    selector: '[markdown]',
    inputs: { inline: 'inline', data: 'data', appendData: 'appendData' },
    host: {
      properties: {
        innerHTML: 'this.innerHTML',
        'class.md-inline': 'this.inlineClass',
      },
      classAttribute: 'md-rendered',
    },
    ngImport: i0,
    template: '<ng-content></ng-content>',
    isInline: true,
    styles: [
      ':host .md-rendered p{margin-bottom:.5em}:host .md-rendered span.md-overline{text-decoration:overline}\n',
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: MarkdownComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: '[markdown]',
          template: '<ng-content></ng-content>',
          host: {
            class: 'md-rendered',
          },
          styles: [
            ':host .md-rendered p{margin-bottom:.5em}:host .md-rendered span.md-overline{text-decoration:overline}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [{ type: i1.MarkdownService }];
  },
  propDecorators: {
    inline: [
      {
        type: Input,
      },
    ],
    innerHTML: [
      {
        type: HostBinding,
        args: ['innerHTML'],
      },
    ],
    inlineClass: [
      {
        type: HostBinding,
        args: ['class.md-inline'],
      },
    ],
    data: [
      {
        type: Input,
      },
    ],
    appendData: [
      {
        type: Input,
      },
    ],
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2Rvd24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9jb3JlL3NyYy9saWIvY29tcG9uZW50cy9tYXJrZG93bi9tYXJrZG93bi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBWTlELE1BQU0sT0FBTyxpQkFBaUI7SUFVUjtJQVRwQixJQUFvQixNQUFNLENBQUMsS0FBYztRQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUNnQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDWCxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBRWUsV0FBVyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEUsWUFBb0IsR0FBb0I7UUFBcEIsUUFBRyxHQUFILEdBQUcsQ0FBaUI7SUFBRyxDQUFDO0lBRTVDLElBQ1csSUFBSSxDQUFDLEtBQWE7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFvQixVQUFVLENBQUMsS0FBYTtRQUMxQyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFNBQVM7Z0JBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUMxQyx1Q0FBdUMsS0FBSyxRQUFRLENBQUM7U0FDeEQ7SUFDSCxDQUFDO0lBRU0sWUFBWTtRQUNqQixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzdEO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztTQUNyQjtJQUNILENBQUM7dUdBaENVLGlCQUFpQjsyRkFBakIsaUJBQWlCLHVQQVBsQiwyQkFBMkI7OzJGQU8xQixpQkFBaUI7a0JBVjdCLFNBQVM7K0JBRUUsWUFBWSxZQUNaLDJCQUEyQixRQUUvQjt3QkFDSixLQUFLLEVBQUUsYUFBYTtxQkFDckI7c0dBSW1CLE1BQU07c0JBQXpCLEtBQUs7Z0JBSTJCLFNBQVM7c0JBQXpDLFdBQVc7dUJBQUMsV0FBVztnQkFJZSxXQUFXO3NCQUFqRCxXQUFXO3VCQUFDLGlCQUFpQjtnQkFJbkIsSUFBSTtzQkFEZCxLQUFLO2dCQU1jLFVBQVU7c0JBQTdCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYXJrZG93blNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9tYXJrZG93bi5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvY29tcG9uZW50LXNlbGVjdG9yXHJcbiAgc2VsZWN0b3I6ICdbbWFya2Rvd25dJyxcclxuICB0ZW1wbGF0ZTogJzxuZy1jb250ZW50PjwvbmctY29udGVudD4nLFxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taG9zdC1tZXRhZGF0YS1wcm9wZXJ0eVxyXG4gIGhvc3Q6IHtcclxuICAgIGNsYXNzOiAnbWQtcmVuZGVyZWQnLFxyXG4gIH0sXHJcbiAgc3R5bGVVcmxzOiBbJy4vbWFya2Rvd24uY29tcG9uZW50LnNjc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE1hcmtkb3duQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBwdWJsaWMgc2V0IGlubGluZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5faW5saW5lID0gdmFsdWU7XHJcbiAgICB0aGlzLm9uRGF0YUNoYW5nZSgpO1xyXG4gIH1cclxuICBASG9zdEJpbmRpbmcoJ2lubmVySFRNTCcpIHB1YmxpYyBpbm5lckhUTUwgPSAnJztcclxuICBwcml2YXRlIF9kYXRhID0gJyc7XHJcbiAgcHJpdmF0ZSBfaW5saW5lID0gZmFsc2U7XHJcblxyXG4gIEBIb3N0QmluZGluZygnY2xhc3MubWQtaW5saW5lJykgcHVibGljIGlubGluZUNsYXNzID0gKCkgPT4gdGhpcy5faW5saW5lO1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21kOiBNYXJrZG93blNlcnZpY2UpIHt9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgcHVibGljIHNldCBkYXRhKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcclxuICAgIHRoaXMub25EYXRhQ2hhbmdlKCk7XHJcbiAgfVxyXG5cclxuICBASW5wdXQoKSBwdWJsaWMgc2V0IGFwcGVuZERhdGEodmFsdWU6IHN0cmluZykge1xyXG4gICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuaW5uZXJIVE1MID1cclxuICAgICAgICB0aGlzLl9tZC5jb21waWxlKHRoaXMuX2RhdGEsIHRoaXMuX2lubGluZSkgK1xyXG4gICAgICAgIGA8c3BhbiBjbGFzcz1cIm1lZGlhLW9iamVjdC10aXRsZVwiPiB8ICR7dmFsdWV9PHNwYW4+YDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkRhdGFDaGFuZ2UoKSB7XHJcbiAgICBpZiAodGhpcy5fZGF0YSkge1xyXG4gICAgICB0aGlzLmlubmVySFRNTCA9IHRoaXMuX21kLmNvbXBpbGUodGhpcy5fZGF0YSwgdGhpcy5faW5saW5lKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5uZXJIVE1MID0gJyc7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==
