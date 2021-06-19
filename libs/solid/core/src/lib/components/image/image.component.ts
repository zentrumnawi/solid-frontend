import { Component, Input } from '@angular/core';
import { ImageModel, MediaModel } from '../../models';

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
  @Input() mediaObject?: MediaModel;
  @Input() hasDialog = true;
  @Input() hasAttributions = true;
  @Input() name!: string;
  @Input() view?: string;
}
