import { Injectable } from '@angular/core';
import introJs from 'intro.js';

@Injectable({ providedIn: 'root' })
export class IntroService {
  introJS: any;

  featureOne(callback: (target: any) => void) {
    this.introJS = introJs();
    // this.introJS.start();
    this.introJS
      .setOptions({
        steps: [
          {
            element: '#step1',
            intro:
              'Welcome to Feature One! On this page you can see all of your AR projects',
          },
          // {
          //   element: '#step2',
          //   intro: 'Press on the box above to create a new AR experience',
          //   position: 'left',
          // },
          // {
          //   element: '#step3',
          //   intro: 'Press on the box above to create a new AR experience',
          // },
          {
            element: '#step30',
            intro: 'Press on the box above to create a new AR experience',
          },
          {
            element: '#step31',
            intro: 'Press on the box above to create a new AR experience',
          },
          {
            element: '#step32',
            intro: 'Press on the box above to create a new AR experience',
          },
          {
            element: '#step33',
            intro: 'Press on the box above to create a new AR experience',
          },
          {
            element: '#step35',
            intro: 'Press on the box above to create a new AR experience',
          },
          {
            element: '#step34',
            intro: 'Press on the box above to create a new AR experience',
          },
        ],
        // hints: [
        //   { hint: 'First hint', element: '#hint1', hintPosition: ' left' },
        //   {
        //     hint: 'Second hint',
        //     element: '#hint2',
        //     hintAnimation: false,
        //     hintPosition: ' left',
        //   },
        // ],
      })
      .onbeforechange(callback)
      // .showHints()
      .start();

    // this.introJS.showHints().start();
  }

  featureTwo() {
    this.introJS = introJs();
    // this.introJS.start();
    this.introJS
      .setOptions({
        hints: [
          {
            hint: 'First hint',
            element: '#hint1',
            hintPosition: 'bottom-middle',
          },
          {
            hint: 'Second hint',
            element: '#hint2',
            hintAnimation: false,
            hintPosition: 'bottom-middle',
          },
        ],
      })
      .start();

    this.introJS.showHints().start();
  }
}
