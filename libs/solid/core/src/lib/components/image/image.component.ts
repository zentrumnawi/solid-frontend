import { Component, Input } from '@angular/core';
import { ImageModel } from '../../models';

@Component({
  selector: 'solid-core-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  @Input() image?: ImageModel;
  @Input() hasDialog = true;
  @Input() hasAttributions = true;
  @Input() name!: string;
  @Input() view?: string;
  @Input() hasAudio!: boolean;
}
