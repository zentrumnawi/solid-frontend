import { MarkdownService } from '../../services/markdown.service';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[markdown]',
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    class: 'md-rendered',
  },
  styleUrls: ['./markdown.component.scss'],
})
export class MarkdownComponent {
  @Input() public set inline(value: boolean) {
    this._inline = value;
    this.onDataChange();
  }
  @HostBinding('innerHTML') public innerHTML = '';
  private _data = '';
  private _inline = false;
  @HostBinding('class.md-inline') public inlineClass = () => this._inline;
  constructor(private _md: MarkdownService) {}

  @Input()
  public set data(value: string) {
    this._data = value;
    this.onDataChange();
  }

  @Input() public set appendData(value: string) {
    if (value !== null) {
      this.innerHTML =
        this._md.compile(this._data, this._inline) +
        `<span class="media-object-title"> | ${value}<span>`;
    }
  }

  public onDataChange() {
    if (this._data) {
      this.innerHTML = this._md.compile(this._data, this._inline);
    } else {
      this.innerHTML = '';
    }
  }
}
