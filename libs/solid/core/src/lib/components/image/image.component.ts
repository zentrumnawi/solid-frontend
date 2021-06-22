import { Component, Input } from '@angular/core';
import { ImageModel, MediaModel } from '../../models';

@Component({
  selector: 'solid-core-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  @Input() image?: ImageModel;
  @Input() mediaObject?: MediaModel;
  @Input() hasDialog = true;
  @Input() hasAttributions = true;
  @Input() name!: string;
  @Input() view?: string;
  @Input() hasAudio!: boolean;
}
