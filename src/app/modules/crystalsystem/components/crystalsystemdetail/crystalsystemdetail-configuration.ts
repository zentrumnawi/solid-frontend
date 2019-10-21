export interface CrystalsystemdetailConfiguration {
  name: string;
  displayName: string;
  description: string;
  layers: {
    name: number,
    title: string,
  }[]


}

export const configurations: CrystalsystemdetailConfiguration[] = [
  {
    name: 'cubic',
    displayName: 'kubisch',
    description: 'Für die Seiten gilt: a = b = c <br> Für die Winkel gilt: &alpha; = &beta; = &gamma; = 90&deg;',
    layers: [
      {name: 0, title: '&#123; . . . &#125;'},
      {name: 100, title: '100'},
      {name: 110, title: '110'},
      {name: 111, title: '111'},
    ],
  },
  {
    name: 'hexagonal',
    displayName: 'hexagonal',
    description: 'Für die Seiten gilt: a = b &ne; c <br> Für die Winkel gilt: &alpha; = &beta; = 90&deg; und &gamma; = 120&deg;',
    layers: [
      {name: 0, title: '&#123; . . . &#125;'},
      {name: 100, title: '100'},
      {name: 110, title: '110'},
      {name: 111, title: '111'},
    ],

  },
  {
    name: 'monoclinic',
    displayName: 'monoklin',
    description: 'Für die Seiten gilt: a &ne; b &ne; c <br> Für die Winkel gilt: &alpha; = &beta; = 90&deg; und &gamma; &ne; 90&deg;',
    layers: [
      {name: 0, title: '&#123; . . . &#125;'},
      {name: 100, title: '100'},
      {name: 110, title: '110'},
      {name: 111, title: '111'},
    ],
  },
  {
    name: 'orthorhombic',
    displayName: 'orthorhombisch',
    description: 'Für die Seiten gilt: a &ne; b &ne; c <br> Für die Winkel gilt: &alpha; = &beta; = &gamma; = 90&deg;',
    layers: [
      {name: 0, title: '&#123; . . . &#125;'},
      {name: 100, title: '100'},
      {name: 110, title: '110'},
      {name: 111, title: '111'},
    ],
  },
  {
    name: 'trigonal',
    displayName: 'trigonal',
    description: 'Für die Seiten gilt: a = b = c <br> Für die Winkel gilt: &alpha; = &beta; = &gamma; &ne; 90&deg; <br>(rhomboedrische Aufstellung)',
    layers: [
      {name: 0, title: '&#123; . . . &#125;'},
      {name: 100, title: '100'},
      {name: 110, title: '110'},
      {name: 111, title: '111'},
    ],
  },
  {
    name: 'tetragonal',
    displayName: 'tetragonal',
    description: 'Für die Seiten gilt: a = b &ne; c <br> Für die Winkel gilt: &alpha; = &beta; = &gamma; = 90&deg;',
    layers: [
      {name: 0, title: '&#123; . . . &#125;'},
      {name: 100, title: '100'},
      {name: 110, title: '110'},
      {name: 111, title: '111'},
    ],
  },
  {
    name: 'triclinic',
    displayName: 'triklin',
    description: 'Für die Seiten gilt: a &ne; b &ne; c <br> Für die Winkel gilt: &alpha; &ne; &beta; &ne; &gamma; &ne; 90&deg;',
    layers: [
      {name: 0, title: '&#123; . . . &#125;'},
      {name: 100, title: '100'},
      {name: 110, title: '110'},
      {name: 111, title: '111'},
    ],
  },
];
