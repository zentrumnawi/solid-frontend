import { Component, Input, OnInit } from '@angular/core';
import { PhotographModel } from './photograph.model';

@Component({
  selector: 'solid-core-photograph',
  templateUrl: './image-model.component.html',
  styleUrls: ['./image-model.component.scss'],
})
export class ImageComponent {
  @Input() image?: PhotographModel;
}
