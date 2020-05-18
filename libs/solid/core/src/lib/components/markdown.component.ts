import { MarkdownService } from '../services/markdown.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';

/* tslint:disable:component-selector */
@Component({
  selector: '[markdown]',
  template: '<ng-content></ng-content>',
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

  public onDataChange() {
    if (this._data) {
      this.innerHTML = this._md.compile(this._data, this._inline);
    } else {
      this.innerHTML = '';
    }
  }
}
