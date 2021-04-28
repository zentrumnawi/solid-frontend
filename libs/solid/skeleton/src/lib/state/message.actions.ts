import { MessageModel } from './message.model';

export namespace MessageActions {
  export class LoadEntries {
    static readonly type = '[Message] load entries';
    constructor() {}
  }

  export class RemoveEntry {
    static readonly type = '[Message] remove entries';
    constructor(public item: MessageModel) {}
  }

  export class MarkAsRead {
    static readonly type = '[Message] mark entry as read';
    constructor(public item: MessageModel) {}
  }
}
