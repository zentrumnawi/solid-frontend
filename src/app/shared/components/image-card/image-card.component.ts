import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
})
export class ImageCardComponent {
  @Input('src') ImagePath!: string;
  @Input('heading') Heading!: string;
  public ImageLoaded = false;

  public onImageLoaded() {
    this.ImageLoaded = true;
  }
}


