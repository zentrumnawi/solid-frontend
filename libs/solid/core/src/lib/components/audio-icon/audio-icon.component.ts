import { Component, Input } from '@angular/core';

@Component({
  selector: 'solid-core-audio-icon',
  templateUrl: './audio-icon.component.svg',
  styleUrls: ['./audio-icon.component.scss'],
})
export class AudioIconComponent {
  @Input() title!: string;
}
