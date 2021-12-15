import { MenuItem } from './menu.model';

export class SetMenuEntries {
  static readonly type = '[Menu] set entries';
  constructor(public items: MenuItem[]) {}
}
