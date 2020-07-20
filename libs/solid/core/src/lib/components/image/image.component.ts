import { Component, Input } from '@angular/core';
import { ImageModel } from '../../models';

@Component({
  selector: 'solid-core-image',
  templateUrl: './image.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ImageComponent {
  @Input() image?: ImageModel;
  @Input() dialogDisabled = false;
  @Input() attributionsDisabled = false;
}
