import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngxs/store';
import { EndQuizSession, StartQuizSession } from '../../state/quiz.actions';
import { QuizFeedback } from './end-feedback';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UntypedFormControl, Validators } from '@angular/forms';
import * as i0 from '@angular/core';
import * as i1 from '@ngxs/store';
import * as i2 from '@angular/common';
import * as i3 from '@zentrumnawi/solid-core';
import * as i4 from '@angular/material/button';
import * as i5 from '@angular/material/card';
import * as i6 from '@angular/material/icon';
import * as i7 from '@angular/material/expansion';
export class EndComponent {
  _store;
  $destroyed = new Subject();
  questionCount = new UntypedFormControl(10, [Validators.min(1)]);
  QuizSession = null;
  FeedbackText = '';
  correctQuestions = 0;
  correctPercentage = 0;
  answeredQuestions = 0;
  stopQuiz = new EventEmitter();
  constructor(_store) {
    this._store = _store;
    this._store
      .select((s) => s.quiz.session)
      .pipe(takeUntil(this.$destroyed))
      .subscribe((session) => {
        if (session) {
          this.QuizSession = session;
          this.questionCount.setValue(session.questions.length);
          this.correctQuestions = session.questions
            .map((q) => q.answered)
            .reduce((curr, val) => (val === 1 ? curr + 1 : curr), 0);
          this.answeredQuestions = session.questions
            .map((q) => q.answered)
            .reduce((curr, val) => (val !== 0 ? curr + 1 : curr), 0);
          this.correctPercentage =
            this.correctQuestions / this.answeredQuestions;
          let feedbacks = [];
          if (this.correctPercentage === 0) {
            feedbacks = QuizFeedback.e0;
          } else if (this.correctPercentage < 0.25) {
            feedbacks = QuizFeedback.lt25;
          } else if (this.correctPercentage < 0.5) {
            feedbacks = QuizFeedback.lt50;
          } else if (this.correctPercentage < 0.75) {
            feedbacks = QuizFeedback.lt75;
          } else if (this.correctPercentage === 1) {
            feedbacks = QuizFeedback.e100;
          } else if (isNaN(this.correctPercentage)) {
            feedbacks = QuizFeedback.nan;
          } else {
            feedbacks = QuizFeedback.ge75;
          }
          this.FeedbackText =
            feedbacks[Math.floor(Math.random() * feedbacks.length)];
          this.FeedbackText = this.FeedbackText.replace(
            '{{correctPercentage}}',
            Math.round(100 * this.correctPercentage).toString(10)
          );
        }
      });
  }
  onRestartClick() {
    this._store.dispatch(new StartQuizSession(this.questionCount.value));
    this.stopQuiz.emit(false);
  }
  onStartClick() {
    this._store.dispatch(new EndQuizSession());
    this.stopQuiz.emit(false);
  }
  ngOnDestroy() {
    this.$destroyed.next(true);
  }
  onBackBtnClick() {
    this._store.dispatch(new EndQuizSession());
    this.stopQuiz.emit(false);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: EndComponent,
    deps: [{ token: i1.Store }],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: EndComponent,
    selector: 'solid-quiz-end',
    outputs: { stopQuiz: 'stopQuiz' },
    ngImport: i0,
    template:
      '<div class="toolbar-container">\r\n  <div class="toolbar">\r\n    <button mat-icon-button class="button-back" (click)="onBackBtnClick()">\r\n      <mat-icon>arrow_back</mat-icon>\r\n    </button>\r\n    <div class="title">\r\n      <h2>Selbsttest - Auswertung</h2>\r\n    </div>\r\n  </div>\r\n</div>\r\n<mat-card *ngIf="QuizSession">\r\n  <mat-card-content class="quizEval">\r\n    <p class="resultText">\r\n      {{ correctQuestions }} von {{ answeredQuestions }} Fragen wurden richtig\r\n      beantwortet.\r\n    </p>\r\n    <p [data]="FeedbackText" markdown></p>\r\n  </mat-card-content>\r\n  <mat-card-actions>\r\n    <div class="button-container">\r\n      <button\r\n        class="startBtn"\r\n        (click)="onStartClick()"\r\n        mat-raised-button\r\n        color="primary"\r\n      >\r\n        Neues Quiz starten\r\n      </button>\r\n\r\n      <button\r\n        class="restartBtn"\r\n        (click)="onRestartClick()"\r\n        mat-raised-button\r\n        color="primary"\r\n      >\r\n        Quiz wiederholen\r\n      </button>\r\n    </div>\r\n  </mat-card-actions>\r\n  <mat-expansion-panel MatAccordionDisplayMode="flat">\r\n    <mat-expansion-panel-header>Details</mat-expansion-panel-header>\r\n    <div\r\n      class="answerDetails"\r\n      *ngFor="let question of QuizSession.questions; let i = index"\r\n    >\r\n      <mat-icon class="correctIcon" *ngIf="question.answered === 1">\r\n        check_circle\r\n      </mat-icon>\r\n      <mat-icon class="incorrectIcon" *ngIf="question.answered === -1">\r\n        cancel\r\n      </mat-icon>\r\n      <mat-icon class="unansweredIcon" *ngIf="question.answered === 0">\r\n        remove_circle\r\n      </mat-icon>\r\n      <div class="questionText">\r\n        <span class="questionHeader">Frage {{ i + 1 }}: </span>\r\n        <span [data]="question.text" [inline]="true" markdown></span>\r\n      </div>\r\n    </div>\r\n  </mat-expansion-panel>\r\n  <mat-card-footer>\r\n    <p class="footnote">\r\n      Als richtig wurde eine Frage nur dann gez\u00E4hlt, wenn alle richtigen\r\n      Antworten und keine falschen ausgew\u00E4hlt wurden.\r\n    </p>\r\n  </mat-card-footer>\r\n</mat-card>\r\n',
    styles: [
      ':host{display:block}mat-card{margin-left:auto;margin-right:auto;max-width:60em;top:67px}@media (max-width: 1141px){mat-card{margin-left:10px;margin-right:10px}}mat-card-content mat-spinner{margin-left:auto;margin-right:auto}mat-form-field{margin-left:.75em}@media (max-width: 999px){mat-card{top:62px}.toolbar-container{width:100%}}@media (min-width: 1000px){.toolbar-container{width:calc(100% - 300px)}}.toolbar-container{position:fixed;z-index:2;background-color:#fff;box-shadow:0 4px 2px -2px #0003;transition:top .7s ease-in-out}.toolbar{width:100%;position:relative;min-height:52px}.toolbar .button-back{position:absolute;left:16px;top:50%;transform:translateY(-45%);z-index:999;cursor:pointer}.toolbar .title{display:flex;flex-direction:column;text-align:center;grid-area:header}.toolbar .title h2{font-size:21px;transform:translateY(12px);margin-bottom:-2px}@media (min-width: 441px){mat-expansion-panel{width:95%;margin:auto}.button-container{display:flex;justify-content:space-evenly}.button-container .startBtn,.button-container .restartBtn{margin:7px 0!important;font-size:15px;width:45%}}@media (max-width: 440px){mat-expansion-panel{width:93%;margin:auto}.button-container{display:block;text-align:center}.button-container .startBtn,.button-container .restartBtn{width:90%}}.button-container .startBtn,.button-container .restartBtn{margin:7px 0!important;font-size:15px}.mat-expansion-panel-header{font-size:16px;font-weight:500}.quizEval{margin:1em}.answerDetails{margin:0 .5em 1.5em 0;display:-webkit-box}.correctIcon,.incorrectIcon,.unansweredIcon{transform:translateY(-3px) translate(-5px);opacity:1}.questionText{margin-left:.5em}.questionHeader{font-weight:500;margin-bottom:.5em}.resultText{font-weight:500;font-size:15px}.footnote{font-size:smaller;font-style:oblique;margin:2em;text-align:center}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i2.NgForOf,
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
      },
      {
        kind: 'directive',
        type: i2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'component',
        type: i3.MarkdownComponent,
        selector: '[markdown]',
        inputs: ['inline', 'data', 'appendData'],
      },
      {
        kind: 'component',
        type: i4.MatButton,
        selector:
          '    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'component',
        type: i4.MatIconButton,
        selector: 'button[mat-icon-button]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'component',
        type: i5.MatCard,
        selector: 'mat-card',
        inputs: ['appearance'],
        exportAs: ['matCard'],
      },
      {
        kind: 'directive',
        type: i5.MatCardActions,
        selector: 'mat-card-actions',
        inputs: ['align'],
        exportAs: ['matCardActions'],
      },
      {
        kind: 'directive',
        type: i5.MatCardContent,
        selector: 'mat-card-content',
      },
      {
        kind: 'directive',
        type: i5.MatCardFooter,
        selector: 'mat-card-footer',
      },
      {
        kind: 'component',
        type: i6.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'component',
        type: i7.MatExpansionPanel,
        selector: 'mat-expansion-panel',
        inputs: ['disabled', 'expanded', 'hideToggle', 'togglePosition'],
        outputs: [
          'opened',
          'closed',
          'expandedChange',
          'afterExpand',
          'afterCollapse',
        ],
        exportAs: ['matExpansionPanel'],
      },
      {
        kind: 'component',
        type: i7.MatExpansionPanelHeader,
        selector: 'mat-expansion-panel-header',
        inputs: ['tabIndex', 'expandedHeight', 'collapsedHeight'],
      },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: EndComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-quiz-end',
          template:
            '<div class="toolbar-container">\r\n  <div class="toolbar">\r\n    <button mat-icon-button class="button-back" (click)="onBackBtnClick()">\r\n      <mat-icon>arrow_back</mat-icon>\r\n    </button>\r\n    <div class="title">\r\n      <h2>Selbsttest - Auswertung</h2>\r\n    </div>\r\n  </div>\r\n</div>\r\n<mat-card *ngIf="QuizSession">\r\n  <mat-card-content class="quizEval">\r\n    <p class="resultText">\r\n      {{ correctQuestions }} von {{ answeredQuestions }} Fragen wurden richtig\r\n      beantwortet.\r\n    </p>\r\n    <p [data]="FeedbackText" markdown></p>\r\n  </mat-card-content>\r\n  <mat-card-actions>\r\n    <div class="button-container">\r\n      <button\r\n        class="startBtn"\r\n        (click)="onStartClick()"\r\n        mat-raised-button\r\n        color="primary"\r\n      >\r\n        Neues Quiz starten\r\n      </button>\r\n\r\n      <button\r\n        class="restartBtn"\r\n        (click)="onRestartClick()"\r\n        mat-raised-button\r\n        color="primary"\r\n      >\r\n        Quiz wiederholen\r\n      </button>\r\n    </div>\r\n  </mat-card-actions>\r\n  <mat-expansion-panel MatAccordionDisplayMode="flat">\r\n    <mat-expansion-panel-header>Details</mat-expansion-panel-header>\r\n    <div\r\n      class="answerDetails"\r\n      *ngFor="let question of QuizSession.questions; let i = index"\r\n    >\r\n      <mat-icon class="correctIcon" *ngIf="question.answered === 1">\r\n        check_circle\r\n      </mat-icon>\r\n      <mat-icon class="incorrectIcon" *ngIf="question.answered === -1">\r\n        cancel\r\n      </mat-icon>\r\n      <mat-icon class="unansweredIcon" *ngIf="question.answered === 0">\r\n        remove_circle\r\n      </mat-icon>\r\n      <div class="questionText">\r\n        <span class="questionHeader">Frage {{ i + 1 }}: </span>\r\n        <span [data]="question.text" [inline]="true" markdown></span>\r\n      </div>\r\n    </div>\r\n  </mat-expansion-panel>\r\n  <mat-card-footer>\r\n    <p class="footnote">\r\n      Als richtig wurde eine Frage nur dann gez\u00E4hlt, wenn alle richtigen\r\n      Antworten und keine falschen ausgew\u00E4hlt wurden.\r\n    </p>\r\n  </mat-card-footer>\r\n</mat-card>\r\n',
          styles: [
            ':host{display:block}mat-card{margin-left:auto;margin-right:auto;max-width:60em;top:67px}@media (max-width: 1141px){mat-card{margin-left:10px;margin-right:10px}}mat-card-content mat-spinner{margin-left:auto;margin-right:auto}mat-form-field{margin-left:.75em}@media (max-width: 999px){mat-card{top:62px}.toolbar-container{width:100%}}@media (min-width: 1000px){.toolbar-container{width:calc(100% - 300px)}}.toolbar-container{position:fixed;z-index:2;background-color:#fff;box-shadow:0 4px 2px -2px #0003;transition:top .7s ease-in-out}.toolbar{width:100%;position:relative;min-height:52px}.toolbar .button-back{position:absolute;left:16px;top:50%;transform:translateY(-45%);z-index:999;cursor:pointer}.toolbar .title{display:flex;flex-direction:column;text-align:center;grid-area:header}.toolbar .title h2{font-size:21px;transform:translateY(12px);margin-bottom:-2px}@media (min-width: 441px){mat-expansion-panel{width:95%;margin:auto}.button-container{display:flex;justify-content:space-evenly}.button-container .startBtn,.button-container .restartBtn{margin:7px 0!important;font-size:15px;width:45%}}@media (max-width: 440px){mat-expansion-panel{width:93%;margin:auto}.button-container{display:block;text-align:center}.button-container .startBtn,.button-container .restartBtn{width:90%}}.button-container .startBtn,.button-container .restartBtn{margin:7px 0!important;font-size:15px}.mat-expansion-panel-header{font-size:16px;font-weight:500}.quizEval{margin:1em}.answerDetails{margin:0 .5em 1.5em 0;display:-webkit-box}.correctIcon,.incorrectIcon,.unansweredIcon{transform:translateY(-3px) translate(-5px);opacity:1}.questionText{margin-left:.5em}.questionHeader{font-weight:500;margin-bottom:.5em}.resultText{font-weight:500;font-size:15px}.footnote{font-size:smaller;font-style:oblique;margin:2em;text-align:center}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [{ type: i1.Store }];
  },
  propDecorators: {
    stopQuiz: [
      {
        type: Output,
      },
    ],
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvcXVpei9zcmMvbGliL2NvbXBvbmVudHMvZW5kL2VuZC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3F1aXovc3JjL2xpYi9jb21wb25lbnRzL2VuZC9lbmQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQWEsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFcEMsT0FBTyxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7OztBQU9oRSxNQUFNLE9BQU8sWUFBWTtJQVVIO0lBVFosVUFBVSxHQUFHLElBQUksT0FBTyxFQUFXLENBQUM7SUFDNUMsYUFBYSxHQUFHLElBQUksa0JBQWtCLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEUsV0FBVyxHQUF1QixJQUFJLENBQUM7SUFDdkMsWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUNsQixnQkFBZ0IsR0FBRyxDQUFDLENBQUM7SUFDckIsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLGlCQUFpQixHQUFHLENBQUMsQ0FBQztJQUNaLFFB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QUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQ3RELENBQUM7YUFDSDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksY0FBYyxFQUFFLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxjQUFjO1FBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7dUdBckVVLFlBQVk7MkZBQVosWUFBWSx5RkNkekIsbXNFQW1FQTs7MkZEckRhLFlBQVk7a0JBTHhCLFNBQVM7K0JBQ0UsZ0JBQWdCOzRGQVloQixRQUFRO3NCQUFqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5neHMvc3RvcmUnO1xyXG5pbXBvcnQgeyBRdWl6U2Vzc2lvbiB9IGZyb20gJy4uLy4uL3N0YXRlL3F1aXoubW9kZWwnO1xyXG5pbXBvcnQgeyBFbmRRdWl6U2Vzc2lvbiwgU3RhcnRRdWl6U2Vzc2lvbiB9IGZyb20gJy4uLy4uL3N0YXRlL3F1aXouYWN0aW9ucyc7XHJcbmltcG9ydCB7IFF1aXpGZWVkYmFjayB9IGZyb20gJy4vZW5kLWZlZWRiYWNrJztcclxuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFVudHlwZWRGb3JtQ29udHJvbCwgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc29saWQtcXVpei1lbmQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9lbmQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2VuZC5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRW5kQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcclxuICBwcml2YXRlICRkZXN0cm95ZWQgPSBuZXcgU3ViamVjdDxib29sZWFuPigpO1xyXG4gIHF1ZXN0aW9uQ291bnQgPSBuZXcgVW50eXBlZEZvcm1Db250cm9sKDEwLCBbVmFsaWRhdG9ycy5taW4oMSldKTtcclxuICBRdWl6U2Vzc2lvbjogUXVpelNlc3Npb24gfCBudWxsID0gbnVsbDtcclxuICBGZWVkYmFja1RleHQgPSAnJztcclxuICBjb3JyZWN0UXVlc3Rpb25zID0gMDtcclxuICBjb3JyZWN0UGVyY2VudGFnZSA9IDA7XHJcbiAgYW5zd2VyZWRRdWVzdGlvbnMgPSAwO1xyXG4gIEBPdXRwdXQoKSBzdG9wUXVpeiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfc3RvcmU6IFN0b3JlKSB7XHJcbiAgICB0aGlzLl9zdG9yZVxyXG4gICAgICAuc2VsZWN0KChzKSA9PiBzLnF1aXouc2Vzc2lvbilcclxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuJGRlc3Ryb3llZCkpXHJcbiAgICAgIC5zdWJzY3JpYmUoKHNlc3Npb246IFF1aXpTZXNzaW9uIHwgbnVsbCkgPT4ge1xyXG4gICAgICAgIGlmIChzZXNzaW9uKSB7XHJcbiAgICAgICAgICB0aGlzLlF1aXpTZXNzaW9uID0gc2Vzc2lvbjtcclxuICAgICAgICAgIHRoaXMucXVlc3Rpb25Db3VudC5zZXRWYWx1ZShzZXNzaW9uLnF1ZXN0aW9ucy5sZW5ndGgpO1xyXG4gICAgICAgICAgdGhpcy5jb3JyZWN0UXVlc3Rpb25zID0gc2Vzc2lvbi5xdWVzdGlvbnNcclxuICAgICAgICAgICAgLm1hcCgocSkgPT4gcS5hbnN3ZXJlZClcclxuICAgICAgICAgICAgLnJlZHVjZSgoY3VyciwgdmFsKSA9PiAodmFsID09PSAxID8gY3VyciArIDEgOiBjdXJyKSwgMCBhcyBudW1iZXIpO1xyXG4gICAgICAgICAgdGhpcy5hbnN3ZXJlZFF1ZXN0aW9ucyA9IHNlc3Npb24ucXVlc3Rpb25zXHJcbiAgICAgICAgICAgIC5tYXAoKHEpID0+IHEuYW5zd2VyZWQpXHJcbiAgICAgICAgICAgIC5yZWR1Y2UoKGN1cnIsIHZhbCkgPT4gKHZhbCAhPT0gMCA/IGN1cnIgKyAxIDogY3VyciksIDAgYXMgbnVtYmVyKTtcclxuICAgICAgICAgIHRoaXMuY29ycmVjdFBlcmNlbnRhZ2UgPVxyXG4gICAgICAgICAgICB0aGlzLmNvcnJlY3RRdWVzdGlvbnMgLyB0aGlzLmFuc3dlcmVkUXVlc3Rpb25zO1xyXG4gICAgICAgICAgbGV0IGZlZWRiYWNrczogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICAgIGlmICh0aGlzLmNvcnJlY3RQZXJjZW50YWdlID09PSAwKSB7XHJcbiAgICAgICAgICAgIGZlZWRiYWNrcyA9IFF1aXpGZWVkYmFjay5lMDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb3JyZWN0UGVyY2VudGFnZSA8IDAuMjUpIHtcclxuICAgICAgICAgICAgZmVlZGJhY2tzID0gUXVpekZlZWRiYWNrLmx0MjU7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29ycmVjdFBlcmNlbnRhZ2UgPCAwLjUpIHtcclxuICAgICAgICAgICAgZmVlZGJhY2tzID0gUXVpekZlZWRiYWNrLmx0NTA7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29ycmVjdFBlcmNlbnRhZ2UgPCAwLjc1KSB7XHJcbiAgICAgICAgICAgIGZlZWRiYWNrcyA9IFF1aXpGZWVkYmFjay5sdDc1O1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNvcnJlY3RQZXJjZW50YWdlID09PSAxKSB7XHJcbiAgICAgICAgICAgIGZlZWRiYWNrcyA9IFF1aXpGZWVkYmFjay5lMTAwO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChpc05hTih0aGlzLmNvcnJlY3RQZXJjZW50YWdlKSkge1xyXG4gICAgICAgICAgICBmZWVkYmFja3MgPSBRdWl6RmVlZGJhY2submFuO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZmVlZGJhY2tzID0gUXVpekZlZWRiYWNrLmdlNzU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLkZlZWRiYWNrVGV4dCA9XHJcbiAgICAgICAgICAgIGZlZWRiYWNrc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBmZWVkYmFja3MubGVuZ3RoKV07XHJcbiAgICAgICAgICB0aGlzLkZlZWRiYWNrVGV4dCA9IHRoaXMuRmVlZGJhY2tUZXh0LnJlcGxhY2UoXHJcbiAgICAgICAgICAgICd7e2NvcnJlY3RQZXJjZW50YWdlfX0nLFxyXG4gICAgICAgICAgICBNYXRoLnJvdW5kKDEwMCAqIHRoaXMuY29ycmVjdFBlcmNlbnRhZ2UpLnRvU3RyaW5nKDEwKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgb25SZXN0YXJ0Q2xpY2soKSB7XHJcbiAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChuZXcgU3RhcnRRdWl6U2Vzc2lvbih0aGlzLnF1ZXN0aW9uQ291bnQudmFsdWUpKTtcclxuICAgIHRoaXMuc3RvcFF1aXouZW1pdChmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBvblN0YXJ0Q2xpY2soKSB7XHJcbiAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChuZXcgRW5kUXVpelNlc3Npb24oKSk7XHJcbiAgICB0aGlzLnN0b3BRdWl6LmVtaXQoZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLiRkZXN0cm95ZWQubmV4dCh0cnVlKTtcclxuICB9XHJcblxyXG4gIG9uQmFja0J0bkNsaWNrKCkge1xyXG4gICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2gobmV3IEVuZFF1aXpTZXNzaW9uKCkpO1xyXG4gICAgdGhpcy5zdG9wUXVpei5lbWl0KGZhbHNlKTtcclxuICB9XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cInRvb2xiYXItY29udGFpbmVyXCI+XHJcbiAgPGRpdiBjbGFzcz1cInRvb2xiYXJcIj5cclxuICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIGNsYXNzPVwiYnV0dG9uLWJhY2tcIiAoY2xpY2spPVwib25CYWNrQnRuQ2xpY2soKVwiPlxyXG4gICAgICA8bWF0LWljb24+YXJyb3dfYmFjazwvbWF0LWljb24+XHJcbiAgICA8L2J1dHRvbj5cclxuICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPlxyXG4gICAgICA8aDI+U2VsYnN0dGVzdCAtIEF1c3dlcnR1bmc8L2gyPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG48bWF0LWNhcmQgKm5nSWY9XCJRdWl6U2Vzc2lvblwiPlxyXG4gIDxtYXQtY2FyZC1jb250ZW50IGNsYXNzPVwicXVpekV2YWxcIj5cclxuICAgIDxwIGNsYXNzPVwicmVzdWx0VGV4dFwiPlxyXG4gICAgICB7eyBjb3JyZWN0UXVlc3Rpb25zIH19IHZvbiB7eyBhbnN3ZXJlZFF1ZXN0aW9ucyB9fSBGcmFnZW4gd3VyZGVuIHJpY2h0aWdcclxuICAgICAgYmVhbnR3b3J0ZXQuXHJcbiAgICA8L3A+XHJcbiAgICA8cCBbZGF0YV09XCJGZWVkYmFja1RleHRcIiBtYXJrZG93bj48L3A+XHJcbiAgPC9tYXQtY2FyZC1jb250ZW50PlxyXG4gIDxtYXQtY2FyZC1hY3Rpb25zPlxyXG4gICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1jb250YWluZXJcIj5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIGNsYXNzPVwic3RhcnRCdG5cIlxyXG4gICAgICAgIChjbGljayk9XCJvblN0YXJ0Q2xpY2soKVwiXHJcbiAgICAgICAgbWF0LXJhaXNlZC1idXR0b25cclxuICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxyXG4gICAgICA+XHJcbiAgICAgICAgTmV1ZXMgUXVpeiBzdGFydGVuXHJcbiAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIGNsYXNzPVwicmVzdGFydEJ0blwiXHJcbiAgICAgICAgKGNsaWNrKT1cIm9uUmVzdGFydENsaWNrKClcIlxyXG4gICAgICAgIG1hdC1yYWlzZWQtYnV0dG9uXHJcbiAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcclxuICAgICAgPlxyXG4gICAgICAgIFF1aXogd2llZGVyaG9sZW5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICA8L21hdC1jYXJkLWFjdGlvbnM+XHJcbiAgPG1hdC1leHBhbnNpb24tcGFuZWwgTWF0QWNjb3JkaW9uRGlzcGxheU1vZGU9XCJmbGF0XCI+XHJcbiAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+RGV0YWlsczwvbWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+XHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzPVwiYW5zd2VyRGV0YWlsc1wiXHJcbiAgICAgICpuZ0Zvcj1cImxldCBxdWVzdGlvbiBvZiBRdWl6U2Vzc2lvbi5xdWVzdGlvbnM7IGxldCBpID0gaW5kZXhcIlxyXG4gICAgPlxyXG4gICAgICA8bWF0LWljb24gY2xhc3M9XCJjb3JyZWN0SWNvblwiICpuZ0lmPVwicXVlc3Rpb24uYW5zd2VyZWQgPT09IDFcIj5cclxuICAgICAgICBjaGVja19jaXJjbGVcclxuICAgICAgPC9tYXQtaWNvbj5cclxuICAgICAgPG1hdC1pY29uIGNsYXNzPVwiaW5jb3JyZWN0SWNvblwiICpuZ0lmPVwicXVlc3Rpb24uYW5zd2VyZWQgPT09IC0xXCI+XHJcbiAgICAgICAgY2FuY2VsXHJcbiAgICAgIDwvbWF0LWljb24+XHJcbiAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInVuYW5zd2VyZWRJY29uXCIgKm5nSWY9XCJxdWVzdGlvbi5hbnN3ZXJlZCA9PT0gMFwiPlxyXG4gICAgICAgIHJlbW92ZV9jaXJjbGVcclxuICAgICAgPC9tYXQtaWNvbj5cclxuICAgICAgPGRpdiBjbGFzcz1cInF1ZXN0aW9uVGV4dFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwicXVlc3Rpb25IZWFkZXJcIj5GcmFnZSB7eyBpICsgMSB9fTogPC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIFtkYXRhXT1cInF1ZXN0aW9uLnRleHRcIiBbaW5saW5lXT1cInRydWVcIiBtYXJrZG93bj48L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsPlxyXG4gIDxtYXQtY2FyZC1mb290ZXI+XHJcbiAgICA8cCBjbGFzcz1cImZvb3Rub3RlXCI+XHJcbiAgICAgIEFscyByaWNodGlnIHd1cmRlIGVpbmUgRnJhZ2UgbnVyIGRhbm4gZ2V6w6RobHQsIHdlbm4gYWxsZSByaWNodGlnZW5cclxuICAgICAgQW50d29ydGVuIHVuZCBrZWluZSBmYWxzY2hlbiBhdXNnZXfDpGhsdCB3dXJkZW4uXHJcbiAgICA8L3A+XHJcbiAgPC9tYXQtY2FyZC1mb290ZXI+XHJcbjwvbWF0LWNhcmQ+XHJcbiJdfQ==
