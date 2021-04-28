import { MenuItem } from './menu.model';

export namespace MenuActions {
  export class SetEntries {
    static readonly type = '[Menu] set entries';
    constructor(public items: MenuItem[]) {}
  }
}
