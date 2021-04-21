import { Component, Input, NgZone } from '@angular/core';
import { ImageModel } from '../../models';

@Component({
  selector: 'solid-core-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss'],
})
export class ImageDetailComponent {
  @Input() image?: ImageModel;
  @Input() hasDialog!: boolean;
  @Input() hasAttributions!: boolean;
  @Input() name!: string;
}
