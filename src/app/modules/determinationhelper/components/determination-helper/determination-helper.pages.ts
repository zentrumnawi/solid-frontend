export interface Page {
  id: number;
  title: string;
  contentPath: string;
  content?: string;
  //images: [{img_path: string, img_description: string, img_header: string}]; //okay, das geht so offenbar nicht...
}

export const pages: Page[] = [
  {
    id: 1,
    title: 'Abstrakt',
    contentPath: '/assets/determination/pages/abstract.md',
    /*images: [
        {
          img_path: '../assets/helper/idiomorphes_aeusseres.jpg',
          img_description: '',
          img_header: 'Idiomorphes Äußeres (Spinelloktaeder)'
        },
        {
          img_path: '../assets/helper/xenomorphes_aeusseres.jpg',
          img_description: '',
          img_header: 'Xenomorphes Äußeres (Labradorit im Gestein)'
        }
      ]*/
  },
  {
    id: 2,
    title: 'Allgemeines Äußeres',
    contentPath: '/assets/determination/pages/appearance.md'
  },
  {
    id: 3,
    title: 'Allgemeines Aussehen',
    contentPath: '/assets/determination/pages/appearance.md'
  },
  {
    id: 4,
    title: 'Kristallsystem',
    contentPath: '/assets/determination/pages/crystalsystem.md'
  },
  {
    id: 5,
    title: 'Habitus',
    contentPath: '/assets/determination/pages/habit.md'
  },
  {
    id: 6,
    title: 'Tracht',
    contentPath: '/assets/determination/pages/faces.md'
  },
  {
    id: 7,
    title: 'Bruch',
    contentPath: '/assets/determination/pages/fracture.md'
  },
  {
    id: 8,
    title: 'Spaltbarkeit',
    contentPath: '/assets/determination/pages/cleavage.md'
  },
  {
    id: 9,
    title: 'Glanz',
    contentPath: '/assets/determination/pages/lustre.md'
  },
  {
    id: 10,
    title: 'Farbe',
    contentPath: '/assets/determination/pages/color.md'
  },
  {
    id: 11,
    title: 'Transparenz',
    contentPath: '/assets/determination/pages/opacity.md'
  },
  {
    id: 12,
    title: 'Besonderheiten',
    contentPath: '/assets/determination/pages/misc.md'
  },
  {
    id: 13,
    title: 'Abschluss',
    contentPath: '/assets/determination/pages/final.md'
  }
];
