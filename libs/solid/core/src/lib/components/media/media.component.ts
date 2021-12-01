import { Component, Input } from '@angular/core';
import { ImageModel, MediaModel } from '../../models';

@Component({
  selector: 'solid-core-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent {
  @Input() image?: ImageModel;
  @Input() mediaObject?: MediaModel;
  @Input() hasDialog = true;
  @Input() hasAttributions = true;
  @Input() name!: string;
  @Input() view?: string;
  @Input() hasAudio!: boolean;
  @Input() hasControlPanel = true;
  @Input() hasDescription!: boolean;
  @Input() hasDescriptionToggle!: boolean;
  @Input() slideshowPageChanged!: number;
}
