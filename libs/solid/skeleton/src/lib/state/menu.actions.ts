import { MenuItem } from './menu.model';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace MenuActions {
  export class SetEntries {
    static readonly type = '[Menu] set entries';
    constructor(public items: MenuItem[]) {}
  }
}
