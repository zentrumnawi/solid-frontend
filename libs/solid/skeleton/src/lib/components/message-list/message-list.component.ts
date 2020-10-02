import { Component, Input } from '@angular/core';
import { MessageModel } from '../../state/message.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'solid-skeleton-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent {
  @Input() messages: Observable<MessageModel[]> = of([]);

  public trackByFn(index: number, msg: MessageModel): number {
    return msg.id;
  }
}
