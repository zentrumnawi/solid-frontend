export interface Page {
    id: number;
    title: string;
    content: string;
    //images: [{img_path: string, img_description: string, img_header: string}]; //okay, das geht so offenbar nicht...
  }
  
  export const pages: Page[] = [
    {
        id: 1,
        title: 'Abstrakt',
        content: 'assets/determination/pages/abstract.md',
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
        content: 'assets/determination/pages/appearance.md'

    },
    {
        id: 3,
        title: 'Allgemeines Aussehen',
        content: 'assets/determination/pages/appearance.md'

    },
    {
        id: 4,
        title: 'Kristallsystem',
        content: 'assets/determination/pages/crystalsystem.md'

    },
    {
        id: 5,
        title: 'Habitus',
        content: 'assets/determination/pages/habit.md'

    },
    {
        id: 6,
        title: 'Tracht',
        content: 'assets/determination/pages/faces.md'

    },
    {
        id: 7,
        title: 'Bruch',
        content: 'assets/determination/pages/fracture.md'

    },
    {
        id: 8,
        title: 'Spaltbarkeit',
        content: 'assets/determination/pages/cleavage.md'

    },
    {
        id: 9,
        title: 'Glanz',
        content: 'assets/determination/pages/lustre.md'

    },
    {
        id: 10,
        title: 'Farbe',
        content: 'assets/determination/pages/color.md'

    },
    {
        id: 11,
        title: 'Transparenz',
        content: 'assets/determination/pages/opacity.md'

    },
    {
        id: 12,
        title: 'Besonderheiten',
        content: 'assets/determination/pages/misc.md'

    },
    {
        id: 13,
        title: 'Abschluss',
        content: 'assets/determination/pages/final.md'

    }
  ];
  