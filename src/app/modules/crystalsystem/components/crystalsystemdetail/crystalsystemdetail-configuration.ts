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
      {name: 100, title: '&lt;100&gt;'},
      {name: 110, title: '&lt;110&gt;'},
      {name: 111, title: '&lt;111&gt;'},
    ],
  },
  {
    name: 'hexagonal',
    displayName: 'hexagonal',
    description: 'Für die Seiten gilt: a = b &ne; c <br> Für die Winkel gilt: &alpha; = &beta; = 90&deg; und &gamma; = 120&deg;',
    layers: [
      {name: 0, title: '&#123; . . . &#125;'},
      {name: 100, title: '[0001]'},
      {name: 110, title: '[0100]'},
      {name: 111, title: '[1200]'},
    ],

  },
  {
    name: 'monoclinic',
    displayName: 'monoklin',
    description: 'Für die Seiten gilt: a &ne; b &ne; c <br> Für die Winkel gilt: &alpha; = &beta; = 90&deg; und &gamma; &ne; 90&deg;',
    layers: [
      {name: 0, title: '&#123; . . . &#125;'},
      {name: 100, title: '[001]'}
    ],
  },
  {
    name: 'orthorhombic',
    displayName: 'orthorhombisch',
    description: 'Für die Seiten gilt: a &ne; b &ne; c <br> Für die Winkel gilt: &alpha; = &beta; = &gamma; = 90&deg;',
    layers: [
      {name: 0, title: '&#123; . . . &#125;'},
      {name: 100, title: '[100]'},
      {name: 110, title: '[010]'},
      {name: 111, title: '[001]'}
    ],
  },
  {
    name: 'trigonal',
    displayName: 'trigonal',
    description: 'Für die Seiten gilt: a = b = c <br> Für die Winkel gilt: &alpha; = &beta; = &gamma; &ne; 90&deg; <br>(rhomboedrische Aufstellung)',
    layers: [
      {name: 0, title: '&#123; . . . &#125;'},
      {name: 100, title: '[111] &lt;1-10&gt;'}
    ],
  },
  {
    name: 'tetragonal',
    displayName: 'tetragonal',
    description: 'Für die Seiten gilt: a = b &ne; c <br> Für die Winkel gilt: &alpha; = &beta; = &gamma; = 90&deg;',
    layers: [
      {name: 0, title: '&#123; . . . &#125;'},
      {name: 100, title: '[001]'},
      {name: 110, title: '&lt;100&gt;'},
      {name: 111, title: '&lt;110&gt;'},
    ],
  },
  {
    name: 'triclinic',
    displayName: 'triklin',
    description: 'Für die Seiten gilt: a &ne; b &ne; c <br> Für die Winkel gilt: &alpha; &ne; &beta; &ne; &gamma; &ne; 90&deg;',
    layers: [],
  },
];