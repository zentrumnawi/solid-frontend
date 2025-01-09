var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EndQuizSession, LoadQuizMetadata } from '../../state/quiz.actions';
import { QuizState } from '../../state/quiz.state';
import * as i0 from '@angular/core';
import * as i1 from '@ngxs/store';
import * as i2 from '@angular/common';
import * as i3 from '../start/start.component';
import * as i4 from '../question/question.component';
import * as i5 from '../end/end.component';
export class MainComponent {
  store;
  QuizSession;
  stopQuiz = false;
  constructor(store) {
    this.store = store;
    store.dispatch(new LoadQuizMetadata());
  }
  ngOnDestroy() {
    this.store.dispatch(new EndQuizSession());
  }
  setStopQuiz(stopQuiz) {
    this.stopQuiz = stopQuiz;
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MainComponent,
    deps: [{ token: i1.Store }],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: MainComponent,
    selector: 'solid-quiz-main',
    ngImport: i0,
    template:
      '<ng-container *ngIf="QuizSession | async as quizSession; else quizStart">\r\n  <div *ngIf="quizSession.progress !== 100 && !stopQuiz; else quizEnd">\r\n    <solid-quiz-question\r\n      [question]="quizSession.questions[quizSession.currentQuestion]"\r\n      (stopQuiz)="setStopQuiz($event)"\r\n    ></solid-quiz-question>\r\n  </div>\r\n</ng-container>\r\n<ng-template #quizStart>\r\n  <solid-quiz-start></solid-quiz-start>\r\n</ng-template>\r\n<ng-template #quizEnd>\r\n  <solid-quiz-end (stopQuiz)="setStopQuiz($event)"></solid-quiz-end>\r\n</ng-template>\r\n',
    styles: [':host{display:block}\n'],
    dependencies: [
      {
        kind: 'directive',
        type: i2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'component',
        type: i3.StartComponent,
        selector: 'solid-quiz-start',
      },
      {
        kind: 'component',
        type: i4.QuestionComponent,
        selector: 'solid-quiz-question',
        inputs: ['question'],
        outputs: ['stopQuiz'],
      },
      {
        kind: 'component',
        type: i5.EndComponent,
        selector: 'solid-quiz-end',
        outputs: ['stopQuiz'],
      },
      { kind: 'pipe', type: i2.AsyncPipe, name: 'async' },
    ],
  });
}
__decorate(
  [Select(QuizState.getSession), __metadata('design:type', Observable)],
  MainComponent.prototype,
  'QuizSession',
  void 0
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: MainComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-quiz-main',
          template:
            '<ng-container *ngIf="QuizSession | async as quizSession; else quizStart">\r\n  <div *ngIf="quizSession.progress !== 100 && !stopQuiz; else quizEnd">\r\n    <solid-quiz-question\r\n      [question]="quizSession.questions[quizSession.currentQuestion]"\r\n      (stopQuiz)="setStopQuiz($event)"\r\n    ></solid-quiz-question>\r\n  </div>\r\n</ng-container>\r\n<ng-template #quizStart>\r\n  <solid-quiz-start></solid-quiz-start>\r\n</ng-template>\r\n<ng-template #quizEnd>\r\n  <solid-quiz-end (stopQuiz)="setStopQuiz($event)"></solid-quiz-end>\r\n</ng-template>\r\n',
          styles: [':host{display:block}\n'],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [{ type: i1.Store }];
  },
  propDecorators: { QuizSession: [] },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3F1aXovc3JjL2xpYi9jb21wb25lbnRzL21haW4vbWFpbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3F1aXovc3JjL2xpYi9jb21wb25lbnRzL21haW4vbWFpbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFbEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7OztBQU9uRCxNQUFNLE9BQU8sYUFBYTtJQUtKO0lBSHBCLFdBQVcsQ0FBa0M7SUFDN0MsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUVqQixZQUFvQixLQUFZO1FBQVosVUFBSyxHQUFMLEtBQUssQ0FBTztRQUM5QixLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxjQUFjLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxXQUFXLENBQUMsUUFBaUI7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQzt1R0FmVSxhQUFhOzJGQUFiLGFBQWEsdURDWjFCLDhqQkFjQTs7QURBRTtJQURDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDOzhCQUNmLFVBQVU7a0RBQXFCOzJGQUZsQyxhQUFhO2tCQUx6QixTQUFTOytCQUNFLGlCQUFpQjs0RkFNM0IsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNlbGVjdCwgU3RvcmUgfSBmcm9tICdAbmd4cy9zdG9yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgUXVpelNlc3Npb24gfSBmcm9tICcuLi8uLi9zdGF0ZS9xdWl6Lm1vZGVsJztcclxuaW1wb3J0IHsgRW5kUXVpelNlc3Npb24sIExvYWRRdWl6TWV0YWRhdGEgfSBmcm9tICcuLi8uLi9zdGF0ZS9xdWl6LmFjdGlvbnMnO1xyXG5pbXBvcnQgeyBRdWl6U3RhdGUgfSBmcm9tICcuLi8uLi9zdGF0ZS9xdWl6LnN0YXRlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc29saWQtcXVpei1tYWluJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbWFpbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbWFpbi5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgQFNlbGVjdChRdWl6U3RhdGUuZ2V0U2Vzc2lvbilcclxuICBRdWl6U2Vzc2lvbiE6IE9ic2VydmFibGU8UXVpelNlc3Npb24gfCBudWxsPjtcclxuICBzdG9wUXVpeiA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JlOiBTdG9yZSkge1xyXG4gICAgc3RvcmUuZGlzcGF0Y2gobmV3IExvYWRRdWl6TWV0YWRhdGEoKSk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEVuZFF1aXpTZXNzaW9uKCkpO1xyXG4gIH1cclxuXHJcbiAgc2V0U3RvcFF1aXooc3RvcFF1aXo6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuc3RvcFF1aXogPSBzdG9wUXVpejtcclxuICB9XHJcbn1cclxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cIlF1aXpTZXNzaW9uIHwgYXN5bmMgYXMgcXVpelNlc3Npb247IGVsc2UgcXVpelN0YXJ0XCI+XHJcbiAgPGRpdiAqbmdJZj1cInF1aXpTZXNzaW9uLnByb2dyZXNzICE9PSAxMDAgJiYgIXN0b3BRdWl6OyBlbHNlIHF1aXpFbmRcIj5cclxuICAgIDxzb2xpZC1xdWl6LXF1ZXN0aW9uXHJcbiAgICAgIFtxdWVzdGlvbl09XCJxdWl6U2Vzc2lvbi5xdWVzdGlvbnNbcXVpelNlc3Npb24uY3VycmVudFF1ZXN0aW9uXVwiXHJcbiAgICAgIChzdG9wUXVpeik9XCJzZXRTdG9wUXVpeigkZXZlbnQpXCJcclxuICAgID48L3NvbGlkLXF1aXotcXVlc3Rpb24+XHJcbiAgPC9kaXY+XHJcbjwvbmctY29udGFpbmVyPlxyXG48bmctdGVtcGxhdGUgI3F1aXpTdGFydD5cclxuICA8c29saWQtcXVpei1zdGFydD48L3NvbGlkLXF1aXotc3RhcnQ+XHJcbjwvbmctdGVtcGxhdGU+XHJcbjxuZy10ZW1wbGF0ZSAjcXVpekVuZD5cclxuICA8c29saWQtcXVpei1lbmQgKHN0b3BRdWl6KT1cInNldFN0b3BRdWl6KCRldmVudClcIj48L3NvbGlkLXF1aXotZW5kPlxyXG48L25nLXRlbXBsYXRlPlxyXG4iXX0=
