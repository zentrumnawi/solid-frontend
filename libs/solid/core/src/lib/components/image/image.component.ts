import { Component, Input } from '@angular/core';
import { ImageModel } from '../../models';
import { ConnectedPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'solid-core-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
  @Input() image?: ImageModel;
  attributionsOpen = false;
  attributionsPositions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
    },
  ];
}
