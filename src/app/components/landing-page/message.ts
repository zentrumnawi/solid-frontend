export interface Message {
  id: number;
  validFrom?: Date;
  validTo?: Date;
  title: string;
  content: string;
}

export const messages: Message[] = [
  { id: 1,
    title: 'Version 1.0.0',
    content: 'Dies ist die erste Version im neuen Release der App. In den kommenden Tagen werden weitere Updates folgen. Stay tuned!',
    validTo: new Date(2019, 9, 31, 12, 30),
  },
  { id: 2,
    title: 'Version 1.0.3',
    content: 'Diese Version enthält einige kleinere Korrekturen und eine neue Darstellung der Quizfragen. Viel Vergnügen beim Quizzen!',
    validFrom: new Date(2019, 9, 31, 12, 30),
    validTo: new Date(2019, 11, 1, 12, 30),
  },
  { id: 3,
    title: 'Version 1.1.0',
    content: 'Neu in diesem Release: <ul><li>Überarbeiteter Bestimmungshelfer (jetzt mit Beispielbildern!)</li><li>15 neue Audiotexte in der Galerie (vor allem Silikate)</li><li>korrekte Formeldarstellung in den Steckbriefen</li><li>allgemeine Verbesserungen und Fehlerbehebungen</li></ul>',
    validFrom: new Date(2019, 10, 18, 12, 0),
  },
];
