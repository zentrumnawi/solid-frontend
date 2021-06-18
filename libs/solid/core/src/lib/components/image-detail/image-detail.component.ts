import { Component, Input, NgZone } from '@angular/core';
import { ImageModel, MediaModel } from '../../models';

@Component({
  selector: 'solid-core-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss'],
})
export class ImageDetailComponent {
  @Input() image?: MediaModel;
  @Input() hasDialog!: boolean;
  @Input() hasAttributions!: boolean;
  @Input() name!: string;
  @Input() view?: string;
  @Input()
  hasControlPanel!: boolean | 'false';
}
