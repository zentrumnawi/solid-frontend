import {GlossaryEntriesOrdered} from "./glossary.state";

export class GlossarySetAction {
  static readonly type = '[Glossary] SetEntries';

  constructor(public entries: GlossaryEntriesOrdered) {
  }
}
