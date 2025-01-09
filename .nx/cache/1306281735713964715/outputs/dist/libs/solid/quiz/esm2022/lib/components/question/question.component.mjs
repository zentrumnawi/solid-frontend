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
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { QuizQuestionType } from '../../state/quiz.model';
import { Select, Store } from '@ngxs/store';
import { EndQuizSession, QuizQuestionAnswered } from '../../state/quiz.actions';
import { QuizState } from '../../state/quiz.state';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import * as i0 from '@angular/core';
import * as i1 from '@ngxs/store';
import * as i2 from '@angular/material/dialog';
import * as i3 from '@angular/common';
import * as i4 from '@zentrumnawi/solid-core';
import * as i5 from '@angular/material/button';
import * as i6 from '@angular/material/card';
import * as i7 from '@angular/material/progress-bar';
import * as i8 from '@angular/material/icon';
import * as i9 from '../single-choice-question/single-choice-question.component';
import * as i10 from '../multiple-choice-question/multiple-choice-question.component';
import * as i11 from '../true-false-question/true-false-question.component';
import * as i12 from '../ranking-question/ranking-question.component';
import * as i13 from '../range-question/range-question.component';
export class QuestionComponent {
  _store;
  dialog;
  question;
  stopQuiz = new EventEmitter();
  QuestionTypes = QuizQuestionType;
  ImageIndex = 0;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  QuizSession;
  backPopup;
  skipPopup;
  constructor(_store, dialog) {
    this._store = _store;
    this.dialog = dialog;
  }
  onNextQuestionClicked(correct) {
    if (this.question) {
      this._store.dispatch(new QuizQuestionAnswered(correct));
    }
    this.ImageIndex = 0;
  }
  swipe(currentIndex, imageLength, action = this.SWIPE_ACTION.RIGHT) {
    if (currentIndex > imageLength || currentIndex < 0) {
      return;
    }
    if (action === this.SWIPE_ACTION.LEFT) {
      const isLast = currentIndex === imageLength - 1;
      this.ImageIndex = isLast ? 0 : currentIndex + 1;
    }
    if (action === this.SWIPE_ACTION.RIGHT) {
      const isFirst = currentIndex === 0;
      this.ImageIndex = isFirst ? imageLength - 1 : currentIndex - 1;
    }
  }
  onChartBtnClick() {
    this.dialog.open(this.skipPopup, { panelClass: 'custom-dialog-container' });
  }
  onSkipToEnd() {
    this.stopQuiz.emit(true);
  }
  onBackBtnClick() {
    this.dialog.open(this.backPopup, { panelClass: 'custom-dialog-container' });
  }
  onBackToStart() {
    this._store.dispatch(new EndQuizSession());
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: QuestionComponent,
    deps: [{ token: i1.Store }, { token: i2.MatDialog }],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: QuestionComponent,
    selector: 'solid-quiz-question',
    inputs: { question: 'question' },
    outputs: { stopQuiz: 'stopQuiz' },
    viewQueries: [
      {
        propertyName: 'backPopup',
        first: true,
        predicate: ['backPopup'],
        descendants: true,
        read: TemplateRef,
      },
      {
        propertyName: 'skipPopup',
        first: true,
        predicate: ['skipPopup'],
        descendants: true,
        read: TemplateRef,
      },
    ],
    ngImport: i0,
    template:
      '<ng-container *ngIf="question && QuizSession | async as quizSession">\r\n  <div class="toolbar-container" #toolbar>\r\n    <div class="toolbar">\r\n      <button mat-icon-button class="button-back" (click)="onBackBtnClick()">\r\n        <mat-icon>arrow_back</mat-icon>\r\n      </button>\r\n      <button mat-icon-button class="button-close" (click)="onChartBtnClick()">\r\n        <mat-icon>bar_chart</mat-icon>\r\n      </button>\r\n      <div class="step-actions">\r\n        <div class="title">\r\n          <h2>\r\n            Fragen {{ quizSession.currentQuestion + 1 }} von\r\n            {{ quizSession.questions.length }}\r\n          </h2>\r\n          <p\r\n            class="question-info"\r\n            *ngIf="question.tags.length !== 0; else withoutTags"\r\n          >\r\n            Tags: {{ question.tags.join(\' \') }} | Schwierigkeit:\r\n            {{ question.difficulty }}\r\n          </p>\r\n          <ng-template #withoutTags\r\n            >Schwierigkeit: {{ question.difficulty }}</ng-template\r\n          >\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <mat-progress-bar\r\n      mode="determinate"\r\n      [value]="quizSession.progress + 100 / quizSession.questions.length"\r\n    ></mat-progress-bar>\r\n  </div>\r\n  <mat-card>\r\n    <mat-card-header>\r\n      <mat-card-title>\r\n        <p [data]="question.text" markdown></p>\r\n      </mat-card-title>\r\n    </mat-card-header>\r\n    <mat-card-content>\r\n      <div *ngIf="question.images.length > 0" class="image-container">\r\n        <button\r\n          mat-mini-fab\r\n          class="button-before"\r\n          color="accent"\r\n          *ngIf="question.images.length > 1"\r\n          (click)="\r\n            swipe(ImageIndex, question.images.length, SWIPE_ACTION.RIGHT)\r\n          "\r\n        >\r\n          <mat-icon aria-label="Vorheriger Schritt">navigate_before</mat-icon>\r\n        </button>\r\n        <solid-core-media\r\n          (swiperight)="swipe(ImageIndex, question.images.length, $event.type)"\r\n          (swipeleft)="swipe(ImageIndex, question.images.length, $event.type)"\r\n          [mediaObject]="question.images[ImageIndex]"\r\n          [hasDialog]="true"\r\n          [hasAudio]="false"\r\n          [hasAttributions]="true"\r\n        ></solid-core-media>\r\n        <button\r\n          class="button-next"\r\n          color="accent"\r\n          mat-mini-fab\r\n          *ngIf="question.images.length > 1"\r\n          (click)="swipe(ImageIndex, question.images.length, SWIPE_ACTION.LEFT)"\r\n        >\r\n          <mat-icon aria-label="N\u00E4chster Schritt">navigate_next</mat-icon>\r\n        </button>\r\n      </div>\r\n      <ng-container [ngSwitch]="question.type">\r\n        <mat-card-content\r\n          *ngSwitchCase="QuestionTypes.SingleChoice"\r\n          class="single-choice"\r\n        >\r\n          <solid-quiz-single-choice-question\r\n            [question]="question"\r\n            (nextQuestionClicked)="onNextQuestionClicked($event)"\r\n          >\r\n          </solid-quiz-single-choice-question>\r\n        </mat-card-content>\r\n\r\n        <mat-card-content\r\n          *ngSwitchCase="QuestionTypes.MultipleChoice"\r\n          class="multiple-choice"\r\n        >\r\n          <solid-quiz-multiple-choice-question\r\n            [question]="question"\r\n            (nextQuestionClicked)="onNextQuestionClicked($event)"\r\n          >\r\n          </solid-quiz-multiple-choice-question>\r\n        </mat-card-content>\r\n\r\n        <mat-card-content\r\n          *ngSwitchCase="QuestionTypes.TrueFalse"\r\n          class="true-false"\r\n        >\r\n          <solid-quiz-true-false-question\r\n            [question]="question"\r\n            (nextQuestionClicked)="onNextQuestionClicked($event)"\r\n          >\r\n          </solid-quiz-true-false-question>\r\n        </mat-card-content>\r\n\r\n        <mat-card-content *ngSwitchCase="QuestionTypes.Ranking" class="ranking">\r\n          <solid-quiz-ranking-question\r\n            [question]="question"\r\n            (nextQuestionClicked)="onNextQuestionClicked($event)"\r\n          >\r\n          </solid-quiz-ranking-question>\r\n        </mat-card-content>\r\n\r\n        <mat-card-content *ngSwitchCase="QuestionTypes.Range" class="range">\r\n          <solid-quiz-range-question\r\n            [question]="question"\r\n            (nextQuestionClicked)="onNextQuestionClicked($event)"\r\n          >\r\n          </solid-quiz-range-question>\r\n        </mat-card-content>\r\n      </ng-container>\r\n    </mat-card-content>\r\n  </mat-card>\r\n  <ng-template #backPopup>\r\n    <div class="closeDialog">\r\n      <p class="closeDialogTitle">Quiz abbrechen</p>\r\n      <button class="popUpCloseBtn" mat-icon-button mat-dialog-close>\r\n        <mat-icon>close</mat-icon>\r\n      </button>\r\n    </div>\r\n    <mat-dialog-content>\r\n      <p>M\u00F6chtest Du dieses Quiz abbrechen ?</p>\r\n    </mat-dialog-content>\r\n    <mat-dialog-actions>\r\n      <button\r\n        class="backBtn"\r\n        mat-button\r\n        [mat-dialog-close]="true"\r\n        (click)="onBackToStart()"\r\n      >\r\n        Ja\r\n      </button>\r\n      <button class="cancelBtn" mat-button mat-dialog-close cdkFocusInitial>\r\n        Nein\r\n      </button>\r\n    </mat-dialog-actions>\r\n  </ng-template>\r\n\r\n  <ng-template #skipPopup>\r\n    <div class="closeDialog">\r\n      <p class="closeDialogTitle">Quiz beenden</p>\r\n      <button class="popUpCloseBtn" mat-icon-button mat-dialog-close>\r\n        <mat-icon>close</mat-icon>\r\n      </button>\r\n    </div>\r\n    <mat-dialog-content>\r\n      <p>M\u00F6chtest Du dieses Quiz beenden und zur Auswertung springen?</p>\r\n    </mat-dialog-content>\r\n    <mat-dialog-actions>\r\n      <button\r\n        class="backBtn"\r\n        mat-button\r\n        [mat-dialog-close]="true"\r\n        (click)="onSkipToEnd()"\r\n      >\r\n        Ja\r\n      </button>\r\n      <button class="cancelBtn" mat-button mat-dialog-close cdkFocusInitial>\r\n        Nein\r\n      </button>\r\n    </mat-dialog-actions>\r\n  </ng-template>\r\n</ng-container>\r\n',
    styles: [
      'mat-card{margin-left:auto;margin-right:auto;max-width:60em;top:71px}mat-card .mat-card-header .mat-card-title{font-size:16px;font-weight:500;margin:5px 0 20px -14px}@media (max-width: 1141px){mat-card{margin-left:10px;margin-right:10px}}solid-core-media{width:100%}solid-core-media ::ng-deep solid-core-image-detail solid-core-image-toolbar div.dziToolbar{margin-right:.3em}.image-container{height:40vh;display:flex;overflow-x:auto;overflow-y:hidden;margin-left:.5rem;margin-right:.5rem;margin-bottom:1.5rem;position:relative}.image-container .button-before{position:absolute;left:1em;top:50%;z-index:999}.image-container .button-next{position:absolute;right:1rem;top:50%;z-index:999}mat-card-content.single-choice{display:flex;flex-direction:column;margin-left:.5rem}mat-card-content.multiple-choice{display:flex;flex-direction:column}mat-card-content.true-false{display:flex;flex-direction:column}mat-card-content.ranking{display:flex;flex-direction:column}@media (max-width: 999px){.toolbar-container{width:100%}}@media (min-width: 1000px){.toolbar-container{width:calc(100% - 300px)}}.toolbar-container{position:fixed;z-index:2;background-color:#fff;box-shadow:0 4px 2px -2px #0003;transition:top .7s ease-in-out}.toolbar{width:100%;position:relative;min-height:52px}.toolbar .button-back{position:absolute;left:16px;top:50%;transform:translateY(-45%)}.toolbar .button-close{position:absolute;right:16px;top:50%;transform:translateY(-45%)}.toolbar .step-actions{max-width:530px;display:grid;grid-template-areas:"previous header next";grid-template-columns:40px auto 40px;margin-left:auto;margin-right:auto;align-items:center}@media (min-width: 451px) and (max-width: 530px){.toolbar .step-actions{max-width:350px}}@media (min-width: 531px) and (max-width: 645px){.toolbar .step-actions{max-width:400px}}@media (min-width: 646px) and (max-width: 700px){.toolbar .step-actions{max-width:500px}}.toolbar .button-left{grid-area:previous}.toolbar .button-right{grid-area:next}.toolbar .title{display:flex;flex-direction:column;text-align:center;grid-area:header}.toolbar .title h2{margin-bottom:-2px;font-size:19px}.toolbar .title p.question-info{margin-bottom:0}@media (max-width: 450px){mat-card{top:66px}}mat-progress-bar ::ng-deep .mat-progress-bar-buffer{background-color:#fff}.title{display:flex;flex-direction:column;text-align:center;grid-area:header}.title h2{margin-bottom:-2px}.title span{margin-bottom:0}::ng-deep .custom-dialog-container .mat-dialog-container{width:330px;min-height:165px;padding:5px;overflow:unset}::ng-deep .custom-dialog-container .closeDialog{display:flex;justify-content:space-between}::ng-deep .custom-dialog-container .closeDialogTitle{font-size:14;font-weight:500;margin-left:15px}::ng-deep .custom-dialog-container .popUpCloseBtn{float:right;margin-top:2px}::ng-deep .custom-dialog-container .mat-dialog-content{padding:0 1em;margin:5px}::ng-deep .custom-dialog-container .mat-dialog-content p{margin-top:15px;font-size:15px}::ng-deep .custom-dialog-container .mat-dialog-actions{justify-content:space-between;padding:0 8px;min-height:42px;margin-bottom:2px}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i3.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i3.NgSwitch,
        selector: '[ngSwitch]',
        inputs: ['ngSwitch'],
      },
      {
        kind: 'directive',
        type: i3.NgSwitchCase,
        selector: '[ngSwitchCase]',
        inputs: ['ngSwitchCase'],
      },
      {
        kind: 'component',
        type: i4.MarkdownComponent,
        selector: '[markdown]',
        inputs: ['inline', 'data', 'appendData'],
      },
      {
        kind: 'component',
        type: i4.MediaComponent,
        selector: 'solid-core-media',
        inputs: [
          'image',
          'mediaObject',
          'hasDialog',
          'hasAttributions',
          'name',
          'view',
          'hasAudio',
          'hasControlPanel',
          'hasDescription',
          'hasDescriptionToggle',
          'slideshowPageChanged',
          'hasNavigationInDialog',
        ],
        outputs: ['NextDialogEmitter', 'PrevDialogEmitter'],
      },
      {
        kind: 'component',
        type: i5.MatButton,
        selector:
          '    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'component',
        type: i5.MatIconButton,
        selector: 'button[mat-icon-button]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'component',
        type: i5.MatMiniFabButton,
        selector: 'button[mat-mini-fab]',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'component',
        type: i6.MatCard,
        selector: 'mat-card',
        inputs: ['appearance'],
        exportAs: ['matCard'],
      },
      {
        kind: 'directive',
        type: i6.MatCardContent,
        selector: 'mat-card-content',
      },
      {
        kind: 'component',
        type: i6.MatCardHeader,
        selector: 'mat-card-header',
      },
      {
        kind: 'directive',
        type: i6.MatCardTitle,
        selector: 'mat-card-title, [mat-card-title], [matCardTitle]',
      },
      {
        kind: 'component',
        type: i7.MatProgressBar,
        selector: 'mat-progress-bar',
        inputs: ['color', 'value', 'bufferValue', 'mode'],
        outputs: ['animationEnd'],
        exportAs: ['matProgressBar'],
      },
      {
        kind: 'component',
        type: i8.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'directive',
        type: i2.MatDialogClose,
        selector: '[mat-dialog-close], [matDialogClose]',
        inputs: ['aria-label', 'type', 'mat-dialog-close', 'matDialogClose'],
        exportAs: ['matDialogClose'],
      },
      {
        kind: 'directive',
        type: i2.MatDialogContent,
        selector:
          '[mat-dialog-content], mat-dialog-content, [matDialogContent]',
      },
      {
        kind: 'directive',
        type: i2.MatDialogActions,
        selector:
          '[mat-dialog-actions], mat-dialog-actions, [matDialogActions]',
        inputs: ['align'],
      },
      {
        kind: 'component',
        type: i9.SingleChoiceQuestionComponent,
        selector: 'solid-quiz-single-choice-question',
        inputs: ['question'],
        outputs: ['nextQuestionClicked'],
      },
      {
        kind: 'component',
        type: i10.MultipleChoiceQuestionComponent,
        selector: 'solid-quiz-multiple-choice-question',
        inputs: ['question'],
        outputs: ['nextQuestionClicked'],
      },
      {
        kind: 'component',
        type: i11.TrueFalseQuestionComponent,
        selector: 'solid-quiz-true-false-question',
        inputs: ['question'],
        outputs: ['nextQuestionClicked'],
      },
      {
        kind: 'component',
        type: i12.RankingQuestionComponent,
        selector: 'solid-quiz-ranking-question',
        inputs: ['question'],
        outputs: ['nextQuestionClicked'],
      },
      {
        kind: 'component',
        type: i13.RangeQuestionComponent,
        selector: 'solid-quiz-range-question',
        inputs: ['question'],
        outputs: ['nextQuestionClicked'],
      },
      { kind: 'pipe', type: i3.AsyncPipe, name: 'async' },
    ],
  });
}
__decorate(
  [Select(QuizState.getSession), __metadata('design:type', Observable)],
  QuestionComponent.prototype,
  'QuizSession',
  void 0
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: QuestionComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-quiz-question',
          template:
            '<ng-container *ngIf="question && QuizSession | async as quizSession">\r\n  <div class="toolbar-container" #toolbar>\r\n    <div class="toolbar">\r\n      <button mat-icon-button class="button-back" (click)="onBackBtnClick()">\r\n        <mat-icon>arrow_back</mat-icon>\r\n      </button>\r\n      <button mat-icon-button class="button-close" (click)="onChartBtnClick()">\r\n        <mat-icon>bar_chart</mat-icon>\r\n      </button>\r\n      <div class="step-actions">\r\n        <div class="title">\r\n          <h2>\r\n            Fragen {{ quizSession.currentQuestion + 1 }} von\r\n            {{ quizSession.questions.length }}\r\n          </h2>\r\n          <p\r\n            class="question-info"\r\n            *ngIf="question.tags.length !== 0; else withoutTags"\r\n          >\r\n            Tags: {{ question.tags.join(\' \') }} | Schwierigkeit:\r\n            {{ question.difficulty }}\r\n          </p>\r\n          <ng-template #withoutTags\r\n            >Schwierigkeit: {{ question.difficulty }}</ng-template\r\n          >\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <mat-progress-bar\r\n      mode="determinate"\r\n      [value]="quizSession.progress + 100 / quizSession.questions.length"\r\n    ></mat-progress-bar>\r\n  </div>\r\n  <mat-card>\r\n    <mat-card-header>\r\n      <mat-card-title>\r\n        <p [data]="question.text" markdown></p>\r\n      </mat-card-title>\r\n    </mat-card-header>\r\n    <mat-card-content>\r\n      <div *ngIf="question.images.length > 0" class="image-container">\r\n        <button\r\n          mat-mini-fab\r\n          class="button-before"\r\n          color="accent"\r\n          *ngIf="question.images.length > 1"\r\n          (click)="\r\n            swipe(ImageIndex, question.images.length, SWIPE_ACTION.RIGHT)\r\n          "\r\n        >\r\n          <mat-icon aria-label="Vorheriger Schritt">navigate_before</mat-icon>\r\n        </button>\r\n        <solid-core-media\r\n          (swiperight)="swipe(ImageIndex, question.images.length, $event.type)"\r\n          (swipeleft)="swipe(ImageIndex, question.images.length, $event.type)"\r\n          [mediaObject]="question.images[ImageIndex]"\r\n          [hasDialog]="true"\r\n          [hasAudio]="false"\r\n          [hasAttributions]="true"\r\n        ></solid-core-media>\r\n        <button\r\n          class="button-next"\r\n          color="accent"\r\n          mat-mini-fab\r\n          *ngIf="question.images.length > 1"\r\n          (click)="swipe(ImageIndex, question.images.length, SWIPE_ACTION.LEFT)"\r\n        >\r\n          <mat-icon aria-label="N\u00E4chster Schritt">navigate_next</mat-icon>\r\n        </button>\r\n      </div>\r\n      <ng-container [ngSwitch]="question.type">\r\n        <mat-card-content\r\n          *ngSwitchCase="QuestionTypes.SingleChoice"\r\n          class="single-choice"\r\n        >\r\n          <solid-quiz-single-choice-question\r\n            [question]="question"\r\n            (nextQuestionClicked)="onNextQuestionClicked($event)"\r\n          >\r\n          </solid-quiz-single-choice-question>\r\n        </mat-card-content>\r\n\r\n        <mat-card-content\r\n          *ngSwitchCase="QuestionTypes.MultipleChoice"\r\n          class="multiple-choice"\r\n        >\r\n          <solid-quiz-multiple-choice-question\r\n            [question]="question"\r\n            (nextQuestionClicked)="onNextQuestionClicked($event)"\r\n          >\r\n          </solid-quiz-multiple-choice-question>\r\n        </mat-card-content>\r\n\r\n        <mat-card-content\r\n          *ngSwitchCase="QuestionTypes.TrueFalse"\r\n          class="true-false"\r\n        >\r\n          <solid-quiz-true-false-question\r\n            [question]="question"\r\n            (nextQuestionClicked)="onNextQuestionClicked($event)"\r\n          >\r\n          </solid-quiz-true-false-question>\r\n        </mat-card-content>\r\n\r\n        <mat-card-content *ngSwitchCase="QuestionTypes.Ranking" class="ranking">\r\n          <solid-quiz-ranking-question\r\n            [question]="question"\r\n            (nextQuestionClicked)="onNextQuestionClicked($event)"\r\n          >\r\n          </solid-quiz-ranking-question>\r\n        </mat-card-content>\r\n\r\n        <mat-card-content *ngSwitchCase="QuestionTypes.Range" class="range">\r\n          <solid-quiz-range-question\r\n            [question]="question"\r\n            (nextQuestionClicked)="onNextQuestionClicked($event)"\r\n          >\r\n          </solid-quiz-range-question>\r\n        </mat-card-content>\r\n      </ng-container>\r\n    </mat-card-content>\r\n  </mat-card>\r\n  <ng-template #backPopup>\r\n    <div class="closeDialog">\r\n      <p class="closeDialogTitle">Quiz abbrechen</p>\r\n      <button class="popUpCloseBtn" mat-icon-button mat-dialog-close>\r\n        <mat-icon>close</mat-icon>\r\n      </button>\r\n    </div>\r\n    <mat-dialog-content>\r\n      <p>M\u00F6chtest Du dieses Quiz abbrechen ?</p>\r\n    </mat-dialog-content>\r\n    <mat-dialog-actions>\r\n      <button\r\n        class="backBtn"\r\n        mat-button\r\n        [mat-dialog-close]="true"\r\n        (click)="onBackToStart()"\r\n      >\r\n        Ja\r\n      </button>\r\n      <button class="cancelBtn" mat-button mat-dialog-close cdkFocusInitial>\r\n        Nein\r\n      </button>\r\n    </mat-dialog-actions>\r\n  </ng-template>\r\n\r\n  <ng-template #skipPopup>\r\n    <div class="closeDialog">\r\n      <p class="closeDialogTitle">Quiz beenden</p>\r\n      <button class="popUpCloseBtn" mat-icon-button mat-dialog-close>\r\n        <mat-icon>close</mat-icon>\r\n      </button>\r\n    </div>\r\n    <mat-dialog-content>\r\n      <p>M\u00F6chtest Du dieses Quiz beenden und zur Auswertung springen?</p>\r\n    </mat-dialog-content>\r\n    <mat-dialog-actions>\r\n      <button\r\n        class="backBtn"\r\n        mat-button\r\n        [mat-dialog-close]="true"\r\n        (click)="onSkipToEnd()"\r\n      >\r\n        Ja\r\n      </button>\r\n      <button class="cancelBtn" mat-button mat-dialog-close cdkFocusInitial>\r\n        Nein\r\n      </button>\r\n    </mat-dialog-actions>\r\n  </ng-template>\r\n</ng-container>\r\n',
          styles: [
            'mat-card{margin-left:auto;margin-right:auto;max-width:60em;top:71px}mat-card .mat-card-header .mat-card-title{font-size:16px;font-weight:500;margin:5px 0 20px -14px}@media (max-width: 1141px){mat-card{margin-left:10px;margin-right:10px}}solid-core-media{width:100%}solid-core-media ::ng-deep solid-core-image-detail solid-core-image-toolbar div.dziToolbar{margin-right:.3em}.image-container{height:40vh;display:flex;overflow-x:auto;overflow-y:hidden;margin-left:.5rem;margin-right:.5rem;margin-bottom:1.5rem;position:relative}.image-container .button-before{position:absolute;left:1em;top:50%;z-index:999}.image-container .button-next{position:absolute;right:1rem;top:50%;z-index:999}mat-card-content.single-choice{display:flex;flex-direction:column;margin-left:.5rem}mat-card-content.multiple-choice{display:flex;flex-direction:column}mat-card-content.true-false{display:flex;flex-direction:column}mat-card-content.ranking{display:flex;flex-direction:column}@media (max-width: 999px){.toolbar-container{width:100%}}@media (min-width: 1000px){.toolbar-container{width:calc(100% - 300px)}}.toolbar-container{position:fixed;z-index:2;background-color:#fff;box-shadow:0 4px 2px -2px #0003;transition:top .7s ease-in-out}.toolbar{width:100%;position:relative;min-height:52px}.toolbar .button-back{position:absolute;left:16px;top:50%;transform:translateY(-45%)}.toolbar .button-close{position:absolute;right:16px;top:50%;transform:translateY(-45%)}.toolbar .step-actions{max-width:530px;display:grid;grid-template-areas:"previous header next";grid-template-columns:40px auto 40px;margin-left:auto;margin-right:auto;align-items:center}@media (min-width: 451px) and (max-width: 530px){.toolbar .step-actions{max-width:350px}}@media (min-width: 531px) and (max-width: 645px){.toolbar .step-actions{max-width:400px}}@media (min-width: 646px) and (max-width: 700px){.toolbar .step-actions{max-width:500px}}.toolbar .button-left{grid-area:previous}.toolbar .button-right{grid-area:next}.toolbar .title{display:flex;flex-direction:column;text-align:center;grid-area:header}.toolbar .title h2{margin-bottom:-2px;font-size:19px}.toolbar .title p.question-info{margin-bottom:0}@media (max-width: 450px){mat-card{top:66px}}mat-progress-bar ::ng-deep .mat-progress-bar-buffer{background-color:#fff}.title{display:flex;flex-direction:column;text-align:center;grid-area:header}.title h2{margin-bottom:-2px}.title span{margin-bottom:0}::ng-deep .custom-dialog-container .mat-dialog-container{width:330px;min-height:165px;padding:5px;overflow:unset}::ng-deep .custom-dialog-container .closeDialog{display:flex;justify-content:space-between}::ng-deep .custom-dialog-container .closeDialogTitle{font-size:14;font-weight:500;margin-left:15px}::ng-deep .custom-dialog-container .popUpCloseBtn{float:right;margin-top:2px}::ng-deep .custom-dialog-container .mat-dialog-content{padding:0 1em;margin:5px}::ng-deep .custom-dialog-container .mat-dialog-content p{margin-top:15px;font-size:15px}::ng-deep .custom-dialog-container .mat-dialog-actions{justify-content:space-between;padding:0 8px;min-height:42px;margin-bottom:2px}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [{ type: i1.Store }, { type: i2.MatDialog }];
  },
  propDecorators: {
    question: [
      {
        type: Input,
      },
    ],
    stopQuiz: [
      {
        type: Output,
      },
    ],
    QuizSession: [],
    backPopup: [
      {
        type: ViewChild,
        args: ['backPopup', { read: TemplateRef }],
      },
    ],
    skipPopup: [
      {
        type: ViewChild,
        args: ['skipPopup', { read: TemplateRef }],
      },
    ],
  },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlc3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9xdWl6L3NyYy9saWIvY29tcG9uZW50cy9xdWVzdGlvbi9xdWVzdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3F1aXovc3JjL2xpYi9jb21wb25lbnRzL3F1ZXN0aW9uL3F1ZXN0aW9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUwsZ0JBQWdCLEdBRWpCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDNUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FBT3JELE1BQU0sT0FBTyxpQkFBaUI7SUFjUjtJQUF1QjtJQWIzQixRQUFRLENBQWdCO0lBQzlCLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBRTFDLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQztJQUNqQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLFlBQVksR0FBRyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxDQUFDO0lBRzFELFdBQVcsQ0FBa0M7SUFFRSxTQUFTLENBQW9CO0lBQzdCLFNBQVMsQ0FBb0I7SUFFNUUsWUFBb0IsTUFBYSxFQUFVLE1BQWlCO1FBQXhDLFdBQU0sR0FBTixNQUFNLENBQU87UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFXO0lBQUcsQ0FBQztJQUVoRSxxQkFBcUIsQ0FBQyxPQUFlO1FBQ25DLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDekQ7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsS0FBSyxDQUNILFlBQW9CLEVBQ3BCLFdBQW1CLEVBQ25CLFNBQWlCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSztRQUV4QyxJQUFJLFlBQVksR0FBRyxXQUFXLElBQUksWUFBWSxHQUFHLENBQUMsRUFBRTtZQUNsRCxPQUFPO1NBQ1I7UUFDRCxJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRTtZQUNyQyxNQUFNLE1BQU0sR0FBRyxZQUFZLEtBQUssV0FBVyxHQUFHLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsSUFBSSxNQUFNLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUU7WUFDdEMsTUFBTSxPQUFPLEdBQUcsWUFBWSxLQUFLLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztTQUNoRTtJQUNILENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLFVBQVUsRUFBRSx5QkFBeUIsRUFBRSxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxVQUFVLEVBQUUseUJBQXlCLEVBQUUsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxjQUFjLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7dUdBdkRVLGlCQUFpQjsyRkFBakIsaUJBQWlCLG1OQVdJLFdBQVcsaUdBQ1gsV0FBVyw2QkNwQzdDLG1vTUE0S0E7O0FEM0lFO0lBREMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7OEJBQ2YsVUFBVTtzREFBcUI7MkZBVGxDLGlCQUFpQjtrQkFMN0IsU0FBUzsrQkFDRSxxQkFBcUI7b0hBS2YsUUFBUTtzQkFBdkIsS0FBSztnQkFDSSxRQUFRO3NCQUFqQixNQUFNO2dCQU9QLFdBQVcsTUFFb0MsU0FBUztzQkFBdkQsU0FBUzt1QkFBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFO2dCQUNFLFNBQVM7c0JBQXZELFNBQVM7dUJBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge1xyXG4gIFF1aXpRdWVzdGlvbixcclxuICBRdWl6UXVlc3Rpb25UeXBlLFxyXG4gIFF1aXpTZXNzaW9uLFxyXG59IGZyb20gJy4uLy4uL3N0YXRlL3F1aXoubW9kZWwnO1xyXG5pbXBvcnQgeyBTZWxlY3QsIFN0b3JlIH0gZnJvbSAnQG5neHMvc3RvcmUnO1xyXG5pbXBvcnQgeyBFbmRRdWl6U2Vzc2lvbiwgUXVpelF1ZXN0aW9uQW5zd2VyZWQgfSBmcm9tICcuLi8uLi9zdGF0ZS9xdWl6LmFjdGlvbnMnO1xyXG5pbXBvcnQgeyBRdWl6U3RhdGUgfSBmcm9tICcuLi8uLi9zdGF0ZS9xdWl6LnN0YXRlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzb2xpZC1xdWl6LXF1ZXN0aW9uJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vcXVlc3Rpb24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3F1ZXN0aW9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkNvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgcHVibGljIHF1ZXN0aW9uITogUXVpelF1ZXN0aW9uO1xyXG4gIEBPdXRwdXQoKSBzdG9wUXVpeiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcbiAgcHVibGljIFF1ZXN0aW9uVHlwZXMgPSBRdWl6UXVlc3Rpb25UeXBlO1xyXG4gIHB1YmxpYyBJbWFnZUluZGV4ID0gMDtcclxuICBTV0lQRV9BQ1RJT04gPSB7IExFRlQ6ICdzd2lwZWxlZnQnLCBSSUdIVDogJ3N3aXBlcmlnaHQnIH07XHJcblxyXG4gIEBTZWxlY3QoUXVpelN0YXRlLmdldFNlc3Npb24pXHJcbiAgUXVpelNlc3Npb24hOiBPYnNlcnZhYmxlPFF1aXpTZXNzaW9uIHwgbnVsbD47XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ2JhY2tQb3B1cCcsIHsgcmVhZDogVGVtcGxhdGVSZWYgfSkgYmFja1BvcHVwITogVGVtcGxhdGVSZWY8YW55PjtcclxuICBAVmlld0NoaWxkKCdza2lwUG9wdXAnLCB7IHJlYWQ6IFRlbXBsYXRlUmVmIH0pIHNraXBQb3B1cCE6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3N0b3JlOiBTdG9yZSwgcHJpdmF0ZSBkaWFsb2c6IE1hdERpYWxvZykge31cclxuXHJcbiAgb25OZXh0UXVlc3Rpb25DbGlja2VkKGNvcnJlY3Q6IG51bWJlcikge1xyXG4gICAgaWYgKHRoaXMucXVlc3Rpb24pIHtcclxuICAgICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2gobmV3IFF1aXpRdWVzdGlvbkFuc3dlcmVkKGNvcnJlY3QpKTtcclxuICAgIH1cclxuICAgIHRoaXMuSW1hZ2VJbmRleCA9IDA7XHJcbiAgfVxyXG5cclxuICBzd2lwZShcclxuICAgIGN1cnJlbnRJbmRleDogbnVtYmVyLFxyXG4gICAgaW1hZ2VMZW5ndGg6IG51bWJlcixcclxuICAgIGFjdGlvbjogc3RyaW5nID0gdGhpcy5TV0lQRV9BQ1RJT04uUklHSFRcclxuICApIHtcclxuICAgIGlmIChjdXJyZW50SW5kZXggPiBpbWFnZUxlbmd0aCB8fCBjdXJyZW50SW5kZXggPCAwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChhY3Rpb24gPT09IHRoaXMuU1dJUEVfQUNUSU9OLkxFRlQpIHtcclxuICAgICAgY29uc3QgaXNMYXN0ID0gY3VycmVudEluZGV4ID09PSBpbWFnZUxlbmd0aCAtIDE7XHJcbiAgICAgIHRoaXMuSW1hZ2VJbmRleCA9IGlzTGFzdCA/IDAgOiBjdXJyZW50SW5kZXggKyAxO1xyXG4gICAgfVxyXG4gICAgaWYgKGFjdGlvbiA9PT0gdGhpcy5TV0lQRV9BQ1RJT04uUklHSFQpIHtcclxuICAgICAgY29uc3QgaXNGaXJzdCA9IGN1cnJlbnRJbmRleCA9PT0gMDtcclxuICAgICAgdGhpcy5JbWFnZUluZGV4ID0gaXNGaXJzdCA/IGltYWdlTGVuZ3RoIC0gMSA6IGN1cnJlbnRJbmRleCAtIDE7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkNoYXJ0QnRuQ2xpY2soKSB7XHJcbiAgICB0aGlzLmRpYWxvZy5vcGVuKHRoaXMuc2tpcFBvcHVwLCB7IHBhbmVsQ2xhc3M6ICdjdXN0b20tZGlhbG9nLWNvbnRhaW5lcicgfSk7XHJcbiAgfVxyXG5cclxuICBvblNraXBUb0VuZCgpIHtcclxuICAgIHRoaXMuc3RvcFF1aXouZW1pdCh0cnVlKTtcclxuICB9XHJcblxyXG4gIG9uQmFja0J0bkNsaWNrKCkge1xyXG4gICAgdGhpcy5kaWFsb2cub3Blbih0aGlzLmJhY2tQb3B1cCwgeyBwYW5lbENsYXNzOiAnY3VzdG9tLWRpYWxvZy1jb250YWluZXInIH0pO1xyXG4gIH1cclxuXHJcbiAgb25CYWNrVG9TdGFydCgpIHtcclxuICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKG5ldyBFbmRRdWl6U2Vzc2lvbigpKTtcclxuICB9XHJcbn1cclxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cInF1ZXN0aW9uICYmIFF1aXpTZXNzaW9uIHwgYXN5bmMgYXMgcXVpelNlc3Npb25cIj5cclxuICA8ZGl2IGNsYXNzPVwidG9vbGJhci1jb250YWluZXJcIiAjdG9vbGJhcj5cclxuICAgIDxkaXYgY2xhc3M9XCJ0b29sYmFyXCI+XHJcbiAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIGNsYXNzPVwiYnV0dG9uLWJhY2tcIiAoY2xpY2spPVwib25CYWNrQnRuQ2xpY2soKVwiPlxyXG4gICAgICAgIDxtYXQtaWNvbj5hcnJvd19iYWNrPC9tYXQtaWNvbj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIGNsYXNzPVwiYnV0dG9uLWNsb3NlXCIgKGNsaWNrKT1cIm9uQ2hhcnRCdG5DbGljaygpXCI+XHJcbiAgICAgICAgPG1hdC1pY29uPmJhcl9jaGFydDwvbWF0LWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwic3RlcC1hY3Rpb25zXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+XHJcbiAgICAgICAgICA8aDI+XHJcbiAgICAgICAgICAgIEZyYWdlbiB7eyBxdWl6U2Vzc2lvbi5jdXJyZW50UXVlc3Rpb24gKyAxIH19IHZvblxyXG4gICAgICAgICAgICB7eyBxdWl6U2Vzc2lvbi5xdWVzdGlvbnMubGVuZ3RoIH19XHJcbiAgICAgICAgICA8L2gyPlxyXG4gICAgICAgICAgPHBcclxuICAgICAgICAgICAgY2xhc3M9XCJxdWVzdGlvbi1pbmZvXCJcclxuICAgICAgICAgICAgKm5nSWY9XCJxdWVzdGlvbi50YWdzLmxlbmd0aCAhPT0gMDsgZWxzZSB3aXRob3V0VGFnc1wiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIFRhZ3M6IHt7IHF1ZXN0aW9uLnRhZ3Muam9pbignICcpIH19IHwgU2Nod2llcmlna2VpdDpcclxuICAgICAgICAgICAge3sgcXVlc3Rpb24uZGlmZmljdWx0eSB9fVxyXG4gICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgPG5nLXRlbXBsYXRlICN3aXRob3V0VGFnc1xyXG4gICAgICAgICAgICA+U2Nod2llcmlna2VpdDoge3sgcXVlc3Rpb24uZGlmZmljdWx0eSB9fTwvbmctdGVtcGxhdGVcclxuICAgICAgICAgID5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxtYXQtcHJvZ3Jlc3MtYmFyXHJcbiAgICAgIG1vZGU9XCJkZXRlcm1pbmF0ZVwiXHJcbiAgICAgIFt2YWx1ZV09XCJxdWl6U2Vzc2lvbi5wcm9ncmVzcyArIDEwMCAvIHF1aXpTZXNzaW9uLnF1ZXN0aW9ucy5sZW5ndGhcIlxyXG4gICAgPjwvbWF0LXByb2dyZXNzLWJhcj5cclxuICA8L2Rpdj5cclxuICA8bWF0LWNhcmQ+XHJcbiAgICA8bWF0LWNhcmQtaGVhZGVyPlxyXG4gICAgICA8bWF0LWNhcmQtdGl0bGU+XHJcbiAgICAgICAgPHAgW2RhdGFdPVwicXVlc3Rpb24udGV4dFwiIG1hcmtkb3duPjwvcD5cclxuICAgICAgPC9tYXQtY2FyZC10aXRsZT5cclxuICAgIDwvbWF0LWNhcmQtaGVhZGVyPlxyXG4gICAgPG1hdC1jYXJkLWNvbnRlbnQ+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJxdWVzdGlvbi5pbWFnZXMubGVuZ3RoID4gMFwiIGNsYXNzPVwiaW1hZ2UtY29udGFpbmVyXCI+XHJcbiAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgbWF0LW1pbmktZmFiXHJcbiAgICAgICAgICBjbGFzcz1cImJ1dHRvbi1iZWZvcmVcIlxyXG4gICAgICAgICAgY29sb3I9XCJhY2NlbnRcIlxyXG4gICAgICAgICAgKm5nSWY9XCJxdWVzdGlvbi5pbWFnZXMubGVuZ3RoID4gMVwiXHJcbiAgICAgICAgICAoY2xpY2spPVwiXHJcbiAgICAgICAgICAgIHN3aXBlKEltYWdlSW5kZXgsIHF1ZXN0aW9uLmltYWdlcy5sZW5ndGgsIFNXSVBFX0FDVElPTi5SSUdIVClcclxuICAgICAgICAgIFwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPG1hdC1pY29uIGFyaWEtbGFiZWw9XCJWb3JoZXJpZ2VyIFNjaHJpdHRcIj5uYXZpZ2F0ZV9iZWZvcmU8L21hdC1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDxzb2xpZC1jb3JlLW1lZGlhXHJcbiAgICAgICAgICAoc3dpcGVyaWdodCk9XCJzd2lwZShJbWFnZUluZGV4LCBxdWVzdGlvbi5pbWFnZXMubGVuZ3RoLCAkZXZlbnQudHlwZSlcIlxyXG4gICAgICAgICAgKHN3aXBlbGVmdCk9XCJzd2lwZShJbWFnZUluZGV4LCBxdWVzdGlvbi5pbWFnZXMubGVuZ3RoLCAkZXZlbnQudHlwZSlcIlxyXG4gICAgICAgICAgW21lZGlhT2JqZWN0XT1cInF1ZXN0aW9uLmltYWdlc1tJbWFnZUluZGV4XVwiXHJcbiAgICAgICAgICBbaGFzRGlhbG9nXT1cInRydWVcIlxyXG4gICAgICAgICAgW2hhc0F1ZGlvXT1cImZhbHNlXCJcclxuICAgICAgICAgIFtoYXNBdHRyaWJ1dGlvbnNdPVwidHJ1ZVwiXHJcbiAgICAgICAgPjwvc29saWQtY29yZS1tZWRpYT5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICBjbGFzcz1cImJ1dHRvbi1uZXh0XCJcclxuICAgICAgICAgIGNvbG9yPVwiYWNjZW50XCJcclxuICAgICAgICAgIG1hdC1taW5pLWZhYlxyXG4gICAgICAgICAgKm5nSWY9XCJxdWVzdGlvbi5pbWFnZXMubGVuZ3RoID4gMVwiXHJcbiAgICAgICAgICAoY2xpY2spPVwic3dpcGUoSW1hZ2VJbmRleCwgcXVlc3Rpb24uaW1hZ2VzLmxlbmd0aCwgU1dJUEVfQUNUSU9OLkxFRlQpXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8bWF0LWljb24gYXJpYS1sYWJlbD1cIk7DpGNoc3RlciBTY2hyaXR0XCI+bmF2aWdhdGVfbmV4dDwvbWF0LWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJxdWVzdGlvbi50eXBlXCI+XHJcbiAgICAgICAgPG1hdC1jYXJkLWNvbnRlbnRcclxuICAgICAgICAgICpuZ1N3aXRjaENhc2U9XCJRdWVzdGlvblR5cGVzLlNpbmdsZUNob2ljZVwiXHJcbiAgICAgICAgICBjbGFzcz1cInNpbmdsZS1jaG9pY2VcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxzb2xpZC1xdWl6LXNpbmdsZS1jaG9pY2UtcXVlc3Rpb25cclxuICAgICAgICAgICAgW3F1ZXN0aW9uXT1cInF1ZXN0aW9uXCJcclxuICAgICAgICAgICAgKG5leHRRdWVzdGlvbkNsaWNrZWQpPVwib25OZXh0UXVlc3Rpb25DbGlja2VkKCRldmVudClcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgPC9zb2xpZC1xdWl6LXNpbmdsZS1jaG9pY2UtcXVlc3Rpb24+XHJcbiAgICAgICAgPC9tYXQtY2FyZC1jb250ZW50PlxyXG5cclxuICAgICAgICA8bWF0LWNhcmQtY29udGVudFxyXG4gICAgICAgICAgKm5nU3dpdGNoQ2FzZT1cIlF1ZXN0aW9uVHlwZXMuTXVsdGlwbGVDaG9pY2VcIlxyXG4gICAgICAgICAgY2xhc3M9XCJtdWx0aXBsZS1jaG9pY2VcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxzb2xpZC1xdWl6LW11bHRpcGxlLWNob2ljZS1xdWVzdGlvblxyXG4gICAgICAgICAgICBbcXVlc3Rpb25dPVwicXVlc3Rpb25cIlxyXG4gICAgICAgICAgICAobmV4dFF1ZXN0aW9uQ2xpY2tlZCk9XCJvbk5leHRRdWVzdGlvbkNsaWNrZWQoJGV2ZW50KVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICA8L3NvbGlkLXF1aXotbXVsdGlwbGUtY2hvaWNlLXF1ZXN0aW9uPlxyXG4gICAgICAgIDwvbWF0LWNhcmQtY29udGVudD5cclxuXHJcbiAgICAgICAgPG1hdC1jYXJkLWNvbnRlbnRcclxuICAgICAgICAgICpuZ1N3aXRjaENhc2U9XCJRdWVzdGlvblR5cGVzLlRydWVGYWxzZVwiXHJcbiAgICAgICAgICBjbGFzcz1cInRydWUtZmFsc2VcIlxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxzb2xpZC1xdWl6LXRydWUtZmFsc2UtcXVlc3Rpb25cclxuICAgICAgICAgICAgW3F1ZXN0aW9uXT1cInF1ZXN0aW9uXCJcclxuICAgICAgICAgICAgKG5leHRRdWVzdGlvbkNsaWNrZWQpPVwib25OZXh0UXVlc3Rpb25DbGlja2VkKCRldmVudClcIlxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgPC9zb2xpZC1xdWl6LXRydWUtZmFsc2UtcXVlc3Rpb24+XHJcbiAgICAgICAgPC9tYXQtY2FyZC1jb250ZW50PlxyXG5cclxuICAgICAgICA8bWF0LWNhcmQtY29udGVudCAqbmdTd2l0Y2hDYXNlPVwiUXVlc3Rpb25UeXBlcy5SYW5raW5nXCIgY2xhc3M9XCJyYW5raW5nXCI+XHJcbiAgICAgICAgICA8c29saWQtcXVpei1yYW5raW5nLXF1ZXN0aW9uXHJcbiAgICAgICAgICAgIFtxdWVzdGlvbl09XCJxdWVzdGlvblwiXHJcbiAgICAgICAgICAgIChuZXh0UXVlc3Rpb25DbGlja2VkKT1cIm9uTmV4dFF1ZXN0aW9uQ2xpY2tlZCgkZXZlbnQpXCJcclxuICAgICAgICAgID5cclxuICAgICAgICAgIDwvc29saWQtcXVpei1yYW5raW5nLXF1ZXN0aW9uPlxyXG4gICAgICAgIDwvbWF0LWNhcmQtY29udGVudD5cclxuXHJcbiAgICAgICAgPG1hdC1jYXJkLWNvbnRlbnQgKm5nU3dpdGNoQ2FzZT1cIlF1ZXN0aW9uVHlwZXMuUmFuZ2VcIiBjbGFzcz1cInJhbmdlXCI+XHJcbiAgICAgICAgICA8c29saWQtcXVpei1yYW5nZS1xdWVzdGlvblxyXG4gICAgICAgICAgICBbcXVlc3Rpb25dPVwicXVlc3Rpb25cIlxyXG4gICAgICAgICAgICAobmV4dFF1ZXN0aW9uQ2xpY2tlZCk9XCJvbk5leHRRdWVzdGlvbkNsaWNrZWQoJGV2ZW50KVwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICA8L3NvbGlkLXF1aXotcmFuZ2UtcXVlc3Rpb24+XHJcbiAgICAgICAgPC9tYXQtY2FyZC1jb250ZW50PlxyXG4gICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvbWF0LWNhcmQtY29udGVudD5cclxuICA8L21hdC1jYXJkPlxyXG4gIDxuZy10ZW1wbGF0ZSAjYmFja1BvcHVwPlxyXG4gICAgPGRpdiBjbGFzcz1cImNsb3NlRGlhbG9nXCI+XHJcbiAgICAgIDxwIGNsYXNzPVwiY2xvc2VEaWFsb2dUaXRsZVwiPlF1aXogYWJicmVjaGVuPC9wPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwicG9wVXBDbG9zZUJ0blwiIG1hdC1pY29uLWJ1dHRvbiBtYXQtZGlhbG9nLWNsb3NlPlxyXG4gICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8bWF0LWRpYWxvZy1jb250ZW50PlxyXG4gICAgICA8cD5Nw7ZjaHRlc3QgRHUgZGllc2VzIFF1aXogYWJicmVjaGVuID88L3A+XHJcbiAgICA8L21hdC1kaWFsb2ctY29udGVudD5cclxuICAgIDxtYXQtZGlhbG9nLWFjdGlvbnM+XHJcbiAgICAgIDxidXR0b25cclxuICAgICAgICBjbGFzcz1cImJhY2tCdG5cIlxyXG4gICAgICAgIG1hdC1idXR0b25cclxuICAgICAgICBbbWF0LWRpYWxvZy1jbG9zZV09XCJ0cnVlXCJcclxuICAgICAgICAoY2xpY2spPVwib25CYWNrVG9TdGFydCgpXCJcclxuICAgICAgPlxyXG4gICAgICAgIEphXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiY2FuY2VsQnRuXCIgbWF0LWJ1dHRvbiBtYXQtZGlhbG9nLWNsb3NlIGNka0ZvY3VzSW5pdGlhbD5cclxuICAgICAgICBOZWluXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9tYXQtZGlhbG9nLWFjdGlvbnM+XHJcbiAgPC9uZy10ZW1wbGF0ZT5cclxuXHJcbiAgPG5nLXRlbXBsYXRlICNza2lwUG9wdXA+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY2xvc2VEaWFsb2dcIj5cclxuICAgICAgPHAgY2xhc3M9XCJjbG9zZURpYWxvZ1RpdGxlXCI+UXVpeiBiZWVuZGVuPC9wPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwicG9wVXBDbG9zZUJ0blwiIG1hdC1pY29uLWJ1dHRvbiBtYXQtZGlhbG9nLWNsb3NlPlxyXG4gICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8bWF0LWRpYWxvZy1jb250ZW50PlxyXG4gICAgICA8cD5Nw7ZjaHRlc3QgRHUgZGllc2VzIFF1aXogYmVlbmRlbiB1bmQgenVyIEF1c3dlcnR1bmcgc3ByaW5nZW4/PC9wPlxyXG4gICAgPC9tYXQtZGlhbG9nLWNvbnRlbnQ+XHJcbiAgICA8bWF0LWRpYWxvZy1hY3Rpb25zPlxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgY2xhc3M9XCJiYWNrQnRuXCJcclxuICAgICAgICBtYXQtYnV0dG9uXHJcbiAgICAgICAgW21hdC1kaWFsb2ctY2xvc2VdPVwidHJ1ZVwiXHJcbiAgICAgICAgKGNsaWNrKT1cIm9uU2tpcFRvRW5kKClcIlxyXG4gICAgICA+XHJcbiAgICAgICAgSmFcclxuICAgICAgPC9idXR0b24+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJjYW5jZWxCdG5cIiBtYXQtYnV0dG9uIG1hdC1kaWFsb2ctY2xvc2UgY2RrRm9jdXNJbml0aWFsPlxyXG4gICAgICAgIE5laW5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L21hdC1kaWFsb2ctYWN0aW9ucz5cclxuICA8L25nLXRlbXBsYXRlPlxyXG48L25nLWNvbnRhaW5lcj5cclxuIl19
