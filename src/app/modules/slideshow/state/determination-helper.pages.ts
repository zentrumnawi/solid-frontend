import {Slideshow} from "./slideshow.model";

export const determinationhelper: Slideshow = {
  title: 'Bestimmungshelfer',
  id: 'determination',
  pages: [
    {
      id: 1,
      title:
        'Abstrakt',
      contentPath:
        '/assets/determination/pages/abstract.md',
      images:
        [
          {
            url: '/assets/determination/images/helper_abstract_determination.svg',
            description: '',
            title: '',
            subtitle: '',
          },
        ],
    }
    ,
    {
      id: 2,
      title:
        'Allgemeines Aussehen',
      contentPath:
        '/assets/determination/pages/appearance.md',
      images:
        [
          {
          url: '/assets/determination/images/helper_appearance_idiomorph_Spinell.jpg',
          description: 'idiomorphes Äußeres (Spinelloktaeder)',
          title: 'idiomorphes Äußeres',
          subtitle: 'Spinelloktaeder',
          },
          {
            url: '/assets/determination/images/helper_appearance_xenomorph_Labradorit.jpg',
            description: 'xenomorphes Äußeres (Labradorit im Gestein)',
            title: 'xenomorphes Äußeres',
            subtitle: 'Labradorit im Gestein',
          },
          {
              url: '/assets/determination/images/helper_appearance_hypidiomorph_Amethyst.jpg',
              description: 'hypidiomorphes Äußeres (Amethyst im Gestein)',
              title: 'hypidiomorphes Äußeres',
              subtitle: 'Amethyst im Gestein',
          },
        ],
    }
    ,
    {
      id: 3,
      title:
        'Kristallsystem',
      contentPath:
        '/assets/determination/pages/crystalsystem.md',
      images:
        [
          {
            url: '/assets/determination/images/helper_crystalsystem_cubic_Pyrit.jpg',
            description: 'Kubisches Kristallsystem (Pyrit)',
            title: 'kubisches Kristallsystem',
            subtitle: 'Pyrit',
          },
          {
            url: '/assets/determination/images/helper_crystalsystem_hexagonal_Aquamarin.jpg',
            description: 'Hexagonales Kristallsystem (Aquamarin)',
            title: 'hexagonales Kristallsystem',
            subtitle: 'Aquamarin',
          },
          {
            url: '/assets/determination/images/helper_crystalsystem_trigonal_Korund.jpg',
            description: 'Trigonales Kristallsystem (Korund)',
            title: 'trigonales Kristallsystem',
            subtitle: 'Korund',
          },          
        ],
    }
    ,
    {
      id: 4,
      title:
        'Habitus',
      contentPath:
        '/assets/determination/pages/habit.md',
      images:
        [
          {
            url: '/assets/determination/images/helper_habit_schematic.svg',
            description: 'Habitus - schematische Darstellung',
            title: 'Habitus - Beispiele',
            subtitle: 'Diese schematische Abbildung zeigt unterschiedlichen Habitus an 3 hexagonalen Körpern.',
          },
          {
            url: '/assets/determination/images/helper_habit_Fluoritoktaeder.jpg',
            description: 'Habitus - Fluoritoktaeder (isometrischer Habitus)',
            title: 'isometrischer Habitus',
            subtitle: 'Fluorit-Oktaeder',
          },
          {
            url: '/assets/determination/images/helper_habit_Rutil.jpg',
            description: 'Habitus - Rutil (prismatischer Habitus)',
            title: 'prismatischer Habitus',
            subtitle: 'Rutil',
          },
        ],
    }
    ,
    {
      id: 5,
      title:
        'Tracht',
      contentPath:
        '/assets/determination/pages/faces.md',
      images:
        [
          {
            url: '/assets/determination/images/helper_faces_schematic.svg',
            description: 'Tracht - schematische Darstellung',
            title: 'Tracht - Beispiele',
            subtitle: 'Die schematische Abbildung zeigt mehrere Trachten an 5 kubischen Körpern.',
          },
          {
            url: '/assets/determination/images/helper_faces_GrossularSpinell.jpg',
            description: 'Tracht - Grossular vs. Spinell',
            title: 'Grossular vs. Spinell',
            subtitle: 'Der flächenreiche Granat im Vergleich mit dem flächenärmeren Spinelloktaeder. Beide kristallisieren im kubischen Kristallsystem.',
          },
          {
            url: '/assets/determination/images/helper_faces_Apatit.jpg',
            description: 'Tracht - Apatit',
            title: 'Apatit',
            subtitle: 'Die beiden Apatit-Handstücke zeigen unterschiedliche Tracht (und unterschiedlichen Habitus) im hexagonalen Kristallsystem.',
          },
        ],
    }
    ,
    {
      id: 6,
      title:
        'Bruch',
      contentPath:
        '/assets/determination/pages/fracture.md',
      images:
        [
          {
            url: '/assets/determination/images/helper_fracture_Olivin.svg',
            description: 'muscheliger Bruch - Olivin',
            title: 'muscheliger Bruch',
            subtitle: 'Olivin',
          },
          {
            url: '/assets/determination/images/helper_fracture_Flint.jpg',
            description: 'unebener Bruch - Flint',
            title: 'muscheliger Bruch',
            subtitle: 'Flint',
          },
          {
            url: '/assets/determination/images/helper_fracture_Vesuvian.jpg',
            description: 'Bruch - Vesuvian',
            title: 'unebener Bruch',
            subtitle: 'Vesuvian',
          },
        ],
    }
    ,
    {
      id: 7,
      title:
        'Spaltbarkeit',
      contentPath:
        '/assets/determination/pages/cleavage.md',
      images:
        [
          {
            url: '/assets/determination/images/helper_cleavage_Calcit.jpg',
            description: 'vollkommene Spaltbarkeit - Calcit',
            title: 'vollkommene Spaltbarkeit',
            subtitle: 'Calcit',
          },
          {
            url: '/assets/determination/images/helper_cleavage_Phlogopit.jpg',
            description: 'höchst vollkommene Spaltbarkeit - Phlogopit',
            title: 'höchst vollkommene Spaltbarkeit',
            subtitle: 'Phlogopit',
          },
          {
            url: '/assets/determination/images/helper_cleavage_Bergkristall.jpg',
            description: 'keine Spaltbarkeit - Bergkristall',
            title: 'keine Spaltbarkeit',
            subtitle: 'Bergkristall',
          },
        ],
    }
    ,
    {
      id: 8,
      title:
        'Glanz',
      contentPath:
        '/assets/determination/pages/lustre.md',
      images:
        [
          {
            url: '/assets/determination/images/helper_lustre_Markasit.jpg',
            description: 'Metallglanz - Markasit',
            title: 'Metalglanz',
            subtitle: 'Markasit',
          },
          {
            url: '/assets/determination/images/helper_lustre_Bergkristall.jpg',
            description: 'Glasglanz - Bergkristall',
            title: 'Glasglanz',
            subtitle: 'Bergkristall',
          },
          {
            url: '/assets/determination/images/helper_lustre_Opal.jpg',
            description: 'Perlmuttglanz - Opal',
            title: 'Perlmuttglanz',
            subtitle: 'Opal',
          },
          {
            url: '/assets/determination/images/helper_lustre_Kaolinit.jpg',
            description: 'Mattglanz - Kaolinit',
            title: 'Mattglanz',
            subtitle: 'Kaolinit',
          },
        ],
    }
    ,
    {
      id: 9,
      title:
        'Farbe',
      contentPath:
        '/assets/determination/pages/color.md',
      images:
        [
          {
            url: '/assets/determination/images/helper_color_Aquamarin.jpg',
            description: 'Farbe - Aquamarin (blau)',
            title: 'Aquamarin',
            subtitle: 'blau',
          },
          {
            url: '/assets/determination/images/helper_color_Goshenit.jpg',
            description: 'Farbe - Goshenit (farblos)',
            title: 'Goshenit',
            subtitle: 'farblos',
          },
          {
            url: '/assets/determination/images/helper_color_Elbait.jpg',
            description: 'Farbe - Elbait (grün)',
            title: 'Elbait',
            subtitle: 'grün',
          },
          {
            url: '/assets/determination/images/helper_color_Schoerl.jpg',
            description: 'Farbe - Schoerl (schwarz)',
            title: 'Schoerl',
            subtitle: 'schwarz',
          },
          {
            url: '/assets/determination/images/helper_color_Azurit.jpg',
            description: 'Farbe - Azurit (azurblau)',
            title: 'Azurit',
            subtitle: 'azurblau',
          },
        ],
    }
    ,
    {
      id: 10,
      title:
        'Transparenz',
      contentPath:
        '/assets/determination/pages/opacity.md',
      images:
        [
          {
            url: '/assets/determination/images/helper_opacity_Topas.jpg',
            description: 'Tansparenz - Topas (durchsichtig)',
            title: 'Topas',
            subtitle: 'durchsichtig',
          },
          {
            url: '/assets/determination/images/helper_opacity_Augit.jpg',
            description: 'Transparenz - Augit',
            title: 'Augit',
            subtitle: 'opak',
          },

        ],
    }
    ,
    {
      id: 11,
      title:
        'Besonderheiten',
      contentPath:
        '/assets/determination/pages/misc.md',
      images:
        [
          {
            url: '/assets/determination/images/helper_misc_Chlorit.jpg',
            description: 'Besonderheiten - Antophyllit (Paragenese)',
            title: 'Paragenese',
            subtitle: 'Klinochlor auf Quarz',
          },
          {
            url: '/assets/determination/images/helper_misc_Staurolith.jpg',
            description: 'Besonderheiten - Antophyllit (Durchkreuzungszwilling)',
            title: 'Durchkreuzungszwilling',
            subtitle: 'Staurolith',
          },
          {
            url: '/assets/determination/images/helper_misc_Labradorit.jpg',
            description: 'Besonderheiten - Labradorit (Pleochroismus)',
            title: 'Pleochroismus',
            subtitle: 'Labradorit',
          },          
          {
            url: '/assets/determination/images/helper_misc_Antophyllit.jpg',
            description: 'Besonderheiten - Antophyllit (Verwachsungen)',
            title: 'Verwachsungen',
            subtitle: 'Antophyllit',
          },        
        ],
    }
    ,
    {
      id: 12,
      title:
        'Abschluss',
      contentPath:
        '/assets/determination/pages/final.md',
      images:
        [],
    },
  ],
};
