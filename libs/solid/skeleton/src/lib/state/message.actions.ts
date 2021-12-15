import { MessageModel } from './message.model';

export class LoadMessageEntries {
  static readonly type = '[Message] load entries';
}

export class RemoveMessageEntry {
  static readonly type = '[Message] remove entries';
  constructor(public item: MessageModel) {}
}

export class MarkMessageAsRead {
  static readonly type = '[Message] mark entry as read';
  constructor(public item: MessageModel) {}
}
