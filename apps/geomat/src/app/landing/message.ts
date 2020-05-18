export interface Message {
  id: number;
  validFrom?: Date;
  validTo?: Date;
  title: string;
  content: string;
}

export const messages: Message[] = [
  {
    id: 1,
    title: 'Version 1.0.0',
    content:
      'Dies ist die erste Version im neuen Release der App. In den kommenden Tagen werden weitere Updates folgen. Stay tuned!',
    validTo: new Date(2019, 9, 31, 12, 30),
  },
  {
    id: 2,
    title: 'Version 1.0.3',
    content:
      'Diese Version enthält einige kleinere Korrekturen und eine neue Darstellung der Quizfragen. Viel Vergnügen beim Quizzen!',
    validFrom: new Date(2019, 9, 31, 12, 30),
    validTo: new Date(2019, 11, 1, 12, 30),
  },
  {
    id: 3,
    title: 'Version 1.1.0',
    content:
      'Neu in diesem Release: <ul><li>Überarbeiteter Bestimmungshelfer (jetzt mit Beispielbildern!)</li><li>15 neue Audiotexte in der Galerie (vor allem Silikate)</li><li>korrekte Formeldarstellung in den Steckbriefen</li><li>allgemeine Verbesserungen und Fehlerbehebungen</li></ul>',
    validFrom: new Date(2019, 10, 21, 10, 0),
  },
  {
    id: 4,
    title: 'GeoMat-Adventskalender - Start',
    content:
      'Es geht los! Beim GeoMat-Adventskalender findet ihr vor dem Raum 1.102 im Geozentrum zu jedem Tag ein Handstück, das es zu bestimmen gilt!<br>Ihr könnt Euer Ergebnis in einen der Zettel eintragen und diesen bis zum 13.01.2020 in die kleine Box legen.<br><br>Wir starten mit einem ganz besonderen Stück: Hier lohnt es sich, ganz genau hinzusehen und auch die Lupe zu verwenden. Auch für gestern haben wir verspätet noch ein Handstück bereit gelegt.',
    validFrom: new Date(2019, 11, 3, 0, 0),
    validTo: new Date(2019, 11, 6, 0, 0),
  },
  {
    id: 5,
    title: 'GeoMat-Adventskalender',
    content:
      'Beim heutigen Handstück empfiehlt es sich, die Farbe des Handstückes in Kombination mit den kleinen dunklen Kristallen genau zu betrachten. ',
    validFrom: new Date(2019, 11, 4, 0, 0),
    validTo: new Date(2019, 11, 7, 0, 0),
  },
  {
    id: 6,
    title: 'GeoMat-Adventskalender',
    content: 'Achte heute auf die Kristallform!',
    validFrom: new Date(2019, 11, 5, 0, 0),
    validTo: new Date(2019, 11, 10, 0, 0),
  },
  {
    id: 7,
    title: 'GeoMat-Adventskalender',
    content: 'In diesem Handstück verstecken sich 3 Minerale. ',
    validFrom: new Date(2019, 11, 6, 0, 0),
    validTo: new Date(2019, 11, 11, 0, 0),
  },
  {
    id: 8,
    title: 'GeoMat-Adventskalender',
    content: 'Neue Woche - neues Glück: Heute sind nur 2 Mineralnamen gesucht!',
    validFrom: new Date(2019, 11, 9, 0, 0),
    validTo: new Date(2019, 11, 12, 0, 0),
  },
  {
    id: 9,
    title: 'GeoMat-Adventskalender',
    content:
      'Beschreibe die kleinen aufgewachsenen Kristalle und schau genau hin! Das graue Umgebungsgestein kannst du vernachlässigen.',
    validFrom: new Date(2019, 11, 10, 0, 0),
    validTo: new Date(2019, 11, 13, 0, 0),
  },
  {
    id: 10,
    title: 'GeoMat-Adventskalender',
    content:
      'In diesem Handstück verstecken sich 4 Minerale, die jeweils in einer anderen Übungsstunde in der Präsenzveranstaltung GeoMat behandelt wurden. ',
    validFrom: new Date(2019, 11, 11, 0, 0),
    validTo: new Date(2019, 11, 14, 0, 0),
  },
  {
    id: 11,
    title: 'GeoMat-Adventskalender',
    content:
      'Bei diesem Handstück ist die Farbe der Kristalle in der Mitte besonders deutlich ausgebildet. ',
    validFrom: new Date(2019, 11, 12, 0, 0),
    validTo: new Date(2019, 11, 17, 0, 0),
  },
  {
    id: 12,
    title: 'GeoMat-Adventskalender',
    content: 'Dieses Handstück finden auch die Tutoren tricky.. ',
    validFrom: new Date(2019, 11, 13, 0, 0),
    validTo: new Date(2019, 11, 18, 0, 0),
  },
  {
    id: 13,
    title: 'GeoMat-Adventskalender',
    content: 'Neue Woche - neues Glück: Heute ist nur 1 Mineralname gesucht!',
    validFrom: new Date(2019, 11, 16, 0, 0),
    validTo: new Date(2019, 11, 19, 0, 0),
  },
  {
    id: 14,
    title: 'GeoMat-Adventskalender',
    content:
      'Diese grünen stängeligen Kristalle könnten dir aus der Übung bekannt vorkommen..',
    validFrom: new Date(2019, 11, 17, 0, 0),
    validTo: new Date(2019, 11, 20, 0, 0),
  },
  {
    id: 15,
    title: 'GeoMat-Adventskalender',
    content:
      'Heute lohnt es sich besonders das Handstück einmal in die Hand zu nehmen. ',
    validFrom: new Date(2019, 11, 18, 0, 0),
    validTo: new Date(2019, 11, 21, 0, 0),
  },
  {
    id: 16,
    title: 'GeoMat-Adventskalender',
    content: '1 Paragenese - 2 Minerale - 2 Varietäten',
    validFrom: new Date(2019, 11, 19, 0, 0),
    validTo: new Date(2019, 11, 23, 0, 0),
  },
  {
    id: 17,
    title: 'GeoMat-Adventskalender',
    content:
      'Zum Abschluss noch etwas Leichteres: ein Gestein mit großen Einkristallen. Deinen ausgefüllten Zettel kannst du vor Raum 1.102 in die kleine Box werfen. Diese wird am 13.01.2020 final geleert und ausgewertet. Anschließend wird am schwarzen Brett bekannt gegeben, wer gewonnen hat. Wir hoffen du hattet Spaß am Adventskalender und wünschen dir Frohe Weihnachten!',
    validFrom: new Date(2019, 11, 20, 0, 0),
    validTo: new Date(2019, 11, 23, 0, 0),
  },
];
