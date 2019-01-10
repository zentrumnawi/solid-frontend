export interface GlossaryEntryModel {
  id: string;
  header: string;
  description: string;
}

export type GlossaryEntriesOrdered = { [key: string]:GlossaryEntryModel[] };

export const glossaryInitialState = {};
