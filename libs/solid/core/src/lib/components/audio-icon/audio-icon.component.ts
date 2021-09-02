import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'solid-core-audio-icon',
  templateUrl: './audio-icon.component.svg',
  styleUrls: ['./audio-icon.component.scss'],
})
export class AudioIconComponent implements OnChanges {
  @Input() title!: string;

  ngOnChanges(): void {
    this.shortenTitle();
  }

  shortenTitle() {
    if (this.title.length > 15) {
      this.title = this.title.slice(0, 18) + '...';
    }
  }
}
