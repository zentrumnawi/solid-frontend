import { MenuItem } from './menu.model';
export declare class SetMenuEntries {
  items: MenuItem[];
  static readonly type = '[Menu] set entries';
  constructor(items: MenuItem[]);
}
