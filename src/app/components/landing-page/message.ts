export interface Message {
  id: number;
  validFrom?: Date;
  validTo?: Date;
  title: string;
  content: string;
}

export const messages: Message[] = [
  { id: 1, title: 'Version 1.0.0', content: 'Dies ist die erste Version der App.'},
];
