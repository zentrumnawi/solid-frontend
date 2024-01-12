import { Component, Input } from '@angular/core';
import { MessageModel } from '../../models/message.model';

@Component({
  selector: 'solid-skeleton-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent {
  @Input() messages!: MessageModel[];
  @Input() tabIndex!: number;
}
