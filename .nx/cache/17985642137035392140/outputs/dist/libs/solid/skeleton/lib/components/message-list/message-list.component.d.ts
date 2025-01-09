import { MessageModel } from '../../models/message.model';
import * as i0 from '@angular/core';
export declare class MessageListComponent {
  messages: MessageModel[];
  tabIndex: number;
  static ɵfac: i0.ɵɵFactoryDeclaration<MessageListComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    MessageListComponent,
    'solid-skeleton-message-list',
    never,
    {
      messages: { alias: 'messages'; required: false };
      tabIndex: { alias: 'tabIndex'; required: false };
    },
    {},
    never,
    never,
    false,
    never
  >;
}
