import * as i0 from '@angular/core';
import {
  Injectable,
  Inject,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  NgModule,
} from '@angular/core';
import * as i1$3 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i1$1 from '@ngxs/store';
import { Action, Selector, State, Select, NgxsModule } from '@ngxs/store';
import { Subject, Observable } from 'rxjs';
import * as i1 from '@angular/common/http';
import { HttpParams, HttpClient } from '@angular/common/http';
import * as i2 from '@zentrumnawi/solid-core';
import {
  MediaModel,
  SOLID_CORE_CONFIG,
  SolidCoreModule,
} from '@zentrumnawi/solid-core';
import { tap, map, takeUntil } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import * as i1$2 from '@angular/common';
import * as i3 from '@angular/forms';
import { UntypedFormControl, Validators } from '@angular/forms';
import * as i4 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i5 from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import * as i6 from '@angular/material/progress-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as i4$1 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i6$1 from '@angular/material/slider';
import { MatSliderModule } from '@angular/material/slider';
import * as i9 from '@angular/material/chips';
import { MatChipsModule } from '@angular/material/chips';
import * as i10 from '@angular/material/button-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import * as i11 from '@angular/material/slide-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import * as i2$1 from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import * as i7 from '@angular/material/progress-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import * as i4$2 from '@angular/material/radio';
import { MatRadioModule } from '@angular/material/radio';
import * as i4$3 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as i5$1 from '@angular/cdk/drag-drop';
import { moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import * as i7$1 from '@angular/material/expansion';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

class LoadQuizQuestions {
  questionCount;
  tags;
  difficulty;
  static type = '[Quiz] questions load';
  constructor(questionCount, tags, difficulty) {
    this.questionCount = questionCount;
    this.tags = tags;
    this.difficulty = difficulty;
  }
}
class StartQuizSession {
  questionCount;
  static type = '[Quiz] session start';
  constructor(questionCount) {
    this.questionCount = questionCount;
  }
}
class EndQuizSession {
  static type = '[Quiz] session end';
}
class QuizQuestionAnswered {
  correct;
  static type = '[Quiz] question answered';
  constructor(correct) {
    this.correct = correct;
  }
}
class LoadQuizMetadata {
  static type = '[Quiz] metadata load';
}
class ToggleExpertMode {
  static type = '[Quiz] expert mode set';
}

var __decorate$3 =
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
var __metadata$3 =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
let QuizState = class QuizState {
  _config;
  _http;
  static getSession(state) {
    return state.session;
  }
  static getMeta(state) {
    return state.metadata;
  }
  static getExpertMode(state) {
    return state.expertMode;
  }
  constructor(_config, _http) {
    this._config = _config;
    this._http = _http;
  }
  setMeta(ctx) {
    return this._http.get(`${this._config.apiUrl}/quizmeta`).pipe(
      tap((res) => {
        ctx.patchState({
          metadata: res,
        });
      })
    );
  }
  setExpertMode(ctx) {
    const state = ctx.getState();
    ctx.setState({ ...state, expertMode: !state.expertMode });
    return;
  }
  set(ctx, { questionCount, tags, difficulty }) {
    let params;
    if (tags == null) tags = [];
    if (tags.length == 0 && difficulty.length == 0) {
      params = new HttpParams().set('count', questionCount);
    } else if (tags.length == 0) {
      params = new HttpParams()
        .set('count', questionCount)
        .set('difficulty', difficulty.toString());
    } else if (difficulty.length == 0) {
      params = new HttpParams()
        .set('count', questionCount)
        .set('tags', JSON.stringify(tags));
    } else {
      params = new HttpParams()
        .set('count', questionCount)
        .set('tags', JSON.stringify(tags))
        .set('difficulty', difficulty.toString());
    }
    return this._http
      .get(`${this._config.apiUrl}/quizsession`, {
        params: params,
      })
      .pipe(
        map((response) => {
          const mapit = (input) => {
            return input.map((question) => {
              return {
                ...question,
                images: question.img.map((p) => new MediaModel(p)),
              };
            });
          };
          return mapit(response);
        }),
        tap((res) => {
          ctx.patchState({
            questions: res,
          });
        })
      );
  }
  startNewSession({ patchState, getState }, { questionCount }) {
    const sessionQuestions = [];
    const questions = getState().questions;
    questionCount =
      questionCount > questions.length ? questions.length : questionCount;
    for (let i = 0; i < questionCount; ) {
      const rnd = Math.floor(Math.random() * questions.length);
      if (sessionQuestions.find((q) => q.id === questions[rnd].id)) {
        continue;
      }
      const rndQuestions = { ...questions[rnd] };
      rndQuestions.answers = [];
      for (let j = 0; j < questions[rnd].answers.length; ) {
        const random = Math.floor(
          Math.random() * questions[rnd].answers.length
        );
        if (
          rndQuestions.answers.find(
            (a) => a.id === questions[rnd].answers[random].id
          )
        )
          continue;
        rndQuestions.answers.push(questions[rnd].answers[random]);
        j++;
      }
      sessionQuestions.push({ answered: 0, ...rndQuestions });
      i++;
    }
    patchState({
      session: {
        progress: 0,
        currentQuestion: 0,
        questions: sessionQuestions,
      },
    });
  }
  endSession({ patchState }) {
    patchState({
      session: null,
    });
  }
  questionAnswered({ patchState, getState }, { correct }) {
    const session = { ...getState().session };
    const answeredQuestion = {
      ...session.questions[session.currentQuestion],
      answered: correct,
    };
    patchState({
      session: {
        currentQuestion: session.currentQuestion + 1,
        progress:
          (100.0 / session.questions.length) * (session.currentQuestion + 1),
        questions: session.questions.map((q) =>
          q.id === answeredQuestion.id ? answeredQuestion : q
        ),
      },
    });
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: QuizState,
    deps: [{ token: SOLID_CORE_CONFIG }, { token: i1.HttpClient }],
    target: i0.ɵɵFactoryTarget.Injectable,
  });
  static ɵprov = i0.ɵɵngDeclareInjectable({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: QuizState,
  });
};
__decorate$3(
  [
    Action(LoadQuizMetadata),
    __metadata$3('design:type', Function),
    __metadata$3('design:paramtypes', [Object]),
    __metadata$3('design:returntype', void 0),
  ],
  QuizState.prototype,
  'setMeta',
  null
);
__decorate$3(
  [
    Action(ToggleExpertMode),
    __metadata$3('design:type', Function),
    __metadata$3('design:paramtypes', [Object]),
    __metadata$3('design:returntype', void 0),
  ],
  QuizState.prototype,
  'setExpertMode',
  null
);
__decorate$3(
  [
    Action(LoadQuizQuestions),
    __metadata$3('design:type', Function),
    __metadata$3('design:paramtypes', [Object, LoadQuizQuestions]),
    __metadata$3('design:returntype', void 0),
  ],
  QuizState.prototype,
  'set',
  null
);
__decorate$3(
  [
    Action(StartQuizSession),
    __metadata$3('design:type', Function),
    __metadata$3('design:paramtypes', [Object, StartQuizSession]),
    __metadata$3('design:returntype', void 0),
  ],
  QuizState.prototype,
  'startNewSession',
  null
);
__decorate$3(
  [
    Action(EndQuizSession),
    __metadata$3('design:type', Function),
    __metadata$3('design:paramtypes', [Object]),
    __metadata$3('design:returntype', void 0),
  ],
  QuizState.prototype,
  'endSession',
  null
);
__decorate$3(
  [
    Action(QuizQuestionAnswered),
    __metadata$3('design:type', Function),
    __metadata$3('design:paramtypes', [Object, QuizQuestionAnswered]),
    __metadata$3('design:returntype', void 0),
  ],
  QuizState.prototype,
  'questionAnswered',
  null
);
__decorate$3(
  [
    Selector(),
    __metadata$3('design:type', Function),
    __metadata$3('design:paramtypes', [Object]),
    __metadata$3('design:returntype', Object),
  ],
  QuizState,
  'getSession',
  null
);
__decorate$3(
  [
    Selector(),
    __metadata$3('design:type', Function),
    __metadata$3('design:paramtypes', [Object]),
    __metadata$3('design:returntype', Object),
  ],
  QuizState,
  'getMeta',
  null
);
__decorate$3(
  [
    Selector(),
    __metadata$3('design:type', Function),
    __metadata$3('design:paramtypes', [Object]),
    __metadata$3('design:returntype', Boolean),
  ],
  QuizState,
  'getExpertMode',
  null
);
QuizState = __decorate$3(
  [
    State({
      name: 'quiz',
      defaults: {
        metadata: null,
        questions: [],
        session: null,
        expertMode: false,
      },
    }),
    __metadata$3('design:paramtypes', [Object, HttpClient]),
  ],
  QuizState
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: QuizState,
  decorators: [
    {
      type: Injectable,
    },
  ],
  ctorParameters: function () {
    return [
      {
        type: undefined,
        decorators: [
          {
            type: Inject,
            args: [SOLID_CORE_CONFIG],
          },
        ],
      },
      { type: i1.HttpClient },
    ];
  },
  propDecorators: {
    setMeta: [],
    setExpertMode: [],
    set: [],
    startNewSession: [],
    endSession: [],
    questionAnswered: [],
  },
});

var __decorate$2 =
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
var __metadata$2 =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
class StartComponent {
  _store;
  metaData$;
  expertMode;
  $destroyed = new Subject();
  expertModeStatus;
  questionCount = 10;
  chosenTags = [];
  chosenDifficulty = [];
  isValid = true;
  tags = [];
  difficulties = [];
  constructor(_store) {
    this._store = _store;
    this.expertModeStatus = false;
  }
  onStartClick() {
    const quizLoaded = this._store.dispatch(
      new LoadQuizQuestions(
        this.questionCount,
        this.chosenTags,
        this.chosenDifficulty
      )
    );
    quizLoaded.subscribe((res) => {
      if (res.quiz.questions.length > 0) {
        this._store.dispatch(new StartQuizSession(this.questionCount));
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    });
  }
  ngOnInit() {
    this._store.select(QuizState.getExpertMode).subscribe((data) => {
      this.expertModeStatus = data;
    });
    this.metaData$?.subscribe((data) => {
      if (data) {
        const tags = [...data.tags];
        const difficulties = [...data.difficulties];
        this.tags = tags.sort();
        this.difficulties = difficulties.sort();
      }
    });
  }
  ngOnDestroy() {
    this.$destroyed.next(true);
  }
  async navigateTo(url) {
    return new Navigate([url]);
  }
  expertModeToggle() {
    this._store.dispatch(new ToggleExpertMode());
  }
  onBackBtnClick() {
    this.navigateTo('/');
  }
  onSliderChange(change) {
    // if (change.value) this.questionCount = change.value;
    // this.isValid = true;
  }
  onButtonToggleChange(change) {
    this.chosenDifficulty = change.value;
    this.isValid = true;
  }
  onTagSelectionChange(change) {
    this.chosenTags = change.value;
    this.isValid = true;
  }
  onDeselectAllTagClick() {
    this.chosenTags = [];
  }
  onDeselectAllDifficultyClick() {
    this.chosenDifficulty = [];
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: StartComponent,
    deps: [{ token: i1$1.Store }],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: StartComponent,
    selector: 'solid-quiz-start',
    ngImport: i0,
    template:
      '<div class="toolbar-container">\n  <div class="toolbar">\n    <button mat-icon-button class="button-back" (click)="onBackBtnClick()">\n      <mat-icon>arrow_back</mat-icon>\n    </button>\n    <div class="title">\n      <h2>Selbsttest</h2>\n    </div>\n  </div>\n</div>\n<mat-card>\n  <mat-card-content class="content-container">\n    <p>\n      Mit diesen Fragen kann der pers\u00F6nliche Wissensstand in verschiedenen\n      Teilbereichen \u00FCberpr\u00FCft werden. Die Fragen werden zuf\u00E4llig aus unserem\n      Fragenpool ausgew\u00E4hlt.\n    </p>\n    <p>\n      Das Feedback gibt genauere Hinweise dar\u00FCber, warum die gegebenen Antworten\n      falsch (oder richtig) waren und zeigt weitere Hintergrundinformationen\n      auf.\n    </p>\n    <p>\n      Das Quiz kann direkt mit einer Auswahl von 10 Fragen gestartet werden.\n    </p>\n    <p>\n      Im <em>Expertenmodus</em> k\u00F6nnen Fragenanzahl, Schwierigkeitsgrad und\n      Themengebiet genauer eingestellt werden.\n    </p>\n  </mat-card-content>\n  <mat-card-actions *ngIf="metaData$ | async as meta; else quizLoading">\n    <div class="button-container">\n      <button\n        class="startBtn"\n        (click)="onStartClick()"\n        mat-raised-button\n        color="primary"\n        [disabled]="!isValid"\n      >\n        Quiz starten\n      </button>\n      <div class="formInvalid" *ngIf="!isValid">\n        <p>\n          Ooops - es gibt keine Fragen mit diesen Eigenschaften. Versuche eine\n          andere Kombination.\n        </p>\n      </div>\n      <mat-slide-toggle\n        class="expBtn"\n        [checked]="expertModeStatus"\n        (change)="expertModeToggle()"\n      >\n        Expertenmodus aktivieren\n      </mat-slide-toggle>\n    </div>\n    <div class="config" *ngIf="expertModeStatus">\n      <div class="row">\n        <div class="controlHeader" id="questionCount">\n          <div class="mat-subheader">Fragenanzahl</div>\n        </div>\n        <div class="controlElement" id="questionCount">\n          <mat-slider\n            min="1"\n            max="30"\n            step="1"\n            (input)="onSliderChange($event)"\n            [(ngModel)]="questionCount"\n          >\n          </mat-slider>\n          <div class="displayValueBox">\n            {{ questionCount }}\n          </div>\n        </div>\n      </div>\n      <div class="row">\n        <div class="controlHeader" id="difficulty">\n          <div class="mat-subheader">Schwierigkeitsgrad</div>\n          <button\n            mat-icon-button\n            class="deselectAllBtn"\n            (click)="onDeselectAllDifficultyClick()"\n            [disabled]="chosenDifficulty.length === 0"\n          >\n            <mat-icon>restart_alt</mat-icon>\n          </button>\n        </div>\n        <div class="controlElement" id="difficulty">\n          <mat-button-toggle-group\n            class="difficulties"\n            multiple\n            (change)="onButtonToggleChange($event)"\n            [(ngModel)]="chosenDifficulty"\n          >\n            <mat-button-toggle\n              *ngFor="let difficulty of difficulties; let i = index"\n              [value]="difficulty"\n              >{{ difficulty }}</mat-button-toggle\n            >\n          </mat-button-toggle-group>\n        </div>\n      </div>\n      <div class="row" *ngIf="tags.length !== 0">\n        <div class="controlHeader" id="tag">\n          <div class="mat-subheader">Tags</div>\n          <button\n            mat-icon-button\n            class="deselectAllBtn"\n            (click)="onDeselectAllTagClick()"\n            [disabled]="chosenTags.length === 0"\n          >\n            <mat-icon>restart_alt</mat-icon>\n          </button>\n        </div>\n        <div class="controlElement" id="tag">\n          <mat-chip-listbox\n            selectable="true"\n            multiple="true"\n            (change)="onTagSelectionChange($event)"\n            [(ngModel)]="chosenTags"\n          >\n            <mat-chip\n              #c="matChip"\n              *ngFor="let tag of tags"\n              [value]="tag"\n              [ngClass]="tags.length > 6 ? \'mat-chip-small\' : \'mat-chip-large\'"\n            >\n              {{ tag }}\n            </mat-chip>\n          </mat-chip-listbox>\n        </div>\n      </div>\n    </div>\n  </mat-card-actions>\n</mat-card>\n<ng-template #quizLoading>\n  <mat-card-content>\n    <mat-spinner color="primary"></mat-spinner>\n  </mat-card-content>\n</ng-template>\n',
    styles: [
      ':host{display:block}mat-card{margin-left:auto;margin-right:auto;max-width:60em;top:67px}@media (max-width: 1141px){mat-card{margin-left:10px;margin-right:10px}}@media (max-width: 440px){mat-card{top:62px}}mat-form-field{width:20em;margin-left:.75em}mat-card-title{font-size:20px;padding-left:20px}mat-card-content mat-spinner{margin-left:auto;margin-right:auto}mat-list{margin-left:2px}mat-form-field{width:85%;padding-left:3%}mat-card-actions{padding:0;margin-left:0;margin-right:0}.content-container{text-align:left;font-size:15px}.mat-standard-chip .mat-chip-remove{color:#fff}.formInvalid{box-sizing:border-box;font-size:11px;color:red;font-style:italic;text-align:center;padding:0 8%}hr{margin:15px}.row{margin-bottom:10px}.displayValueBox{border:solid 2px;padding:6px;height:35px;width:40px;transform:translateY(-3px);font-weight:500;margin-left:4%;text-align:center;border-radius:8px}.mat-slider{width:100%;margin:-10px}.mat-subheader{font-size:15px;padding:16px 0}.controlHeader{float:left;width:100%;display:flex;align-items:center}.controlElement{display:flex;float:left;width:100%;margin-bottom:10px}.content-container{padding:10px 10px 0}.button-container .startBtn{margin:10px 10px 20px!important;border-radius:7px}.button-container .expBtn{margin:10px 10px 20px;padding:0}.deselectAllBtn{color:#ff4500}.row:after{content:"";display:table;clear:both}#difficulty .mat-button-toggle-group{width:100%;border:none;margin-top:10px;justify-content:space-between}#difficulty .mat-button-toggle{width:20%;border-radius:7px;height:39px;font-weight:500}@media (max-width: 440px){#difficulty .mat-button-toggle{margin-right:10px}}@media (min-width: 441px){#difficulty .mat-button-toggle{margin-right:20px}}#difficulty .mat-button-toggle:last-child{margin-right:0}#difficulty ::ng-deep .mat-button-toggle-label-content{line-height:35px}#tag ::ng-deep .mat-chip-list-wrapper{width:100%;margin:0;justify-content:space-between}#tag .mat-chip-list{width:100%}#tag .mat-chip{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:10px 0;display:block;padding:5px 10px;text-align:center}@media (max-width: 440px){#tag .mat-chip-small{width:28%}#tag .mat-chip-large{width:48%}}@media (min-width: 441px){#tag .mat-chip{width:23%}}#tag .mat-standard-chip:focus:after{opacity:0}.mat-subheader{font-weight:500}.button-container{text-align:center;position:relative}.button-container .startBtn{font-size:15px;width:35%}.button-container .expBtn{display:block;font-weight:500}.config{position:relative;padding:0 10px}::ng-deep .mat-select-value-text{display:none}@media (max-width: 999px){.toolbar-container{width:100%}}@media (min-width: 1000px){.toolbar-container{width:calc(100% - 300px)}}.toolbar-container{position:fixed;z-index:2;background-color:#fff;box-shadow:0 4px 2px -2px #0003;transition:top .7s ease-in-out}.toolbar{width:100%;position:relative;min-height:52px}.toolbar .button-back{position:absolute;left:16px;top:50%;transform:translateY(-45%);z-index:999;cursor:pointer}.toolbar .title{display:flex;flex-direction:column;text-align:center;grid-area:header}.toolbar .title h2{font-size:21px;transform:translateY(12px);margin-bottom:-2px}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i1$2.NgClass,
        selector: '[ngClass]',
        inputs: ['class', 'ngClass'],
      },
      {
        kind: 'directive',
        type: i1$2.NgForOf,
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
      },
      {
        kind: 'directive',
        type: i1$2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i3.NgControlStatus,
        selector: '[formControlName],[ngModel],[formControl]',
      },
      {
        kind: 'directive',
        type: i3.NgModel,
        selector: '[ngModel]:not([formControlName]):not([formControl])',
        inputs: ['name', 'disabled', 'ngModel', 'ngModelOptions'],
        outputs: ['ngModelChange'],
        exportAs: ['ngModel'],
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
        kind: 'component',
        type: i6.MatProgressSpinner,
        selector: 'mat-progress-spinner, mat-spinner',
        inputs: ['color', 'mode', 'value', 'diameter', 'strokeWidth'],
        exportAs: ['matProgressSpinner'],
      },
      {
        kind: 'component',
        type: i4$1.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'component',
        type: i6$1.MatSlider,
        selector: 'mat-slider',
        inputs: [
          'color',
          'disableRipple',
          'disabled',
          'discrete',
          'showTickMarks',
          'min',
          'max',
          'step',
          'displayWith',
        ],
        exportAs: ['matSlider'],
      },
      {
        kind: 'component',
        type: i9.MatChip,
        selector: 'mat-basic-chip, [mat-basic-chip], mat-chip, [mat-chip]',
        inputs: [
          'color',
          'disabled',
          'disableRipple',
          'tabIndex',
          'role',
          'id',
          'aria-label',
          'aria-description',
          'value',
          'removable',
          'highlighted',
        ],
        outputs: ['removed', 'destroyed'],
        exportAs: ['matChip'],
      },
      {
        kind: 'component',
        type: i9.MatChipListbox,
        selector: 'mat-chip-listbox',
        inputs: [
          'tabIndex',
          'multiple',
          'aria-orientation',
          'selectable',
          'compareWith',
          'required',
          'hideSingleSelectionIndicator',
          'value',
        ],
        outputs: ['change'],
      },
      {
        kind: 'directive',
        type: i10.MatButtonToggleGroup,
        selector: 'mat-button-toggle-group',
        inputs: [
          'appearance',
          'name',
          'vertical',
          'value',
          'multiple',
          'disabled',
        ],
        outputs: ['valueChange', 'change'],
        exportAs: ['matButtonToggleGroup'],
      },
      {
        kind: 'component',
        type: i10.MatButtonToggle,
        selector: 'mat-button-toggle',
        inputs: [
          'disableRipple',
          'aria-label',
          'aria-labelledby',
          'id',
          'name',
          'value',
          'tabIndex',
          'appearance',
          'checked',
          'disabled',
        ],
        outputs: ['change'],
        exportAs: ['matButtonToggle'],
      },
      {
        kind: 'component',
        type: i11.MatSlideToggle,
        selector: 'mat-slide-toggle',
        inputs: ['disabled', 'disableRipple', 'color', 'tabIndex'],
        exportAs: ['matSlideToggle'],
      },
      { kind: 'pipe', type: i1$2.AsyncPipe, name: 'async' },
    ],
  });
}
__decorate$2(
  [Select(QuizState.getMeta), __metadata$2('design:type', Object)],
  StartComponent.prototype,
  'metaData$',
  void 0
);
__decorate$2(
  [Select(QuizState.getExpertMode), __metadata$2('design:type', Boolean)],
  StartComponent.prototype,
  'expertMode',
  void 0
);
__decorate$2(
  [
    Dispatch(),
    __metadata$2('design:type', Function),
    __metadata$2('design:paramtypes', [String]),
    __metadata$2('design:returntype', Promise),
  ],
  StartComponent.prototype,
  'navigateTo',
  null
);
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: StartComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-quiz-start',
          template:
            '<div class="toolbar-container">\n  <div class="toolbar">\n    <button mat-icon-button class="button-back" (click)="onBackBtnClick()">\n      <mat-icon>arrow_back</mat-icon>\n    </button>\n    <div class="title">\n      <h2>Selbsttest</h2>\n    </div>\n  </div>\n</div>\n<mat-card>\n  <mat-card-content class="content-container">\n    <p>\n      Mit diesen Fragen kann der pers\u00F6nliche Wissensstand in verschiedenen\n      Teilbereichen \u00FCberpr\u00FCft werden. Die Fragen werden zuf\u00E4llig aus unserem\n      Fragenpool ausgew\u00E4hlt.\n    </p>\n    <p>\n      Das Feedback gibt genauere Hinweise dar\u00FCber, warum die gegebenen Antworten\n      falsch (oder richtig) waren und zeigt weitere Hintergrundinformationen\n      auf.\n    </p>\n    <p>\n      Das Quiz kann direkt mit einer Auswahl von 10 Fragen gestartet werden.\n    </p>\n    <p>\n      Im <em>Expertenmodus</em> k\u00F6nnen Fragenanzahl, Schwierigkeitsgrad und\n      Themengebiet genauer eingestellt werden.\n    </p>\n  </mat-card-content>\n  <mat-card-actions *ngIf="metaData$ | async as meta; else quizLoading">\n    <div class="button-container">\n      <button\n        class="startBtn"\n        (click)="onStartClick()"\n        mat-raised-button\n        color="primary"\n        [disabled]="!isValid"\n      >\n        Quiz starten\n      </button>\n      <div class="formInvalid" *ngIf="!isValid">\n        <p>\n          Ooops - es gibt keine Fragen mit diesen Eigenschaften. Versuche eine\n          andere Kombination.\n        </p>\n      </div>\n      <mat-slide-toggle\n        class="expBtn"\n        [checked]="expertModeStatus"\n        (change)="expertModeToggle()"\n      >\n        Expertenmodus aktivieren\n      </mat-slide-toggle>\n    </div>\n    <div class="config" *ngIf="expertModeStatus">\n      <div class="row">\n        <div class="controlHeader" id="questionCount">\n          <div class="mat-subheader">Fragenanzahl</div>\n        </div>\n        <div class="controlElement" id="questionCount">\n          <mat-slider\n            min="1"\n            max="30"\n            step="1"\n            (input)="onSliderChange($event)"\n            [(ngModel)]="questionCount"\n          >\n          </mat-slider>\n          <div class="displayValueBox">\n            {{ questionCount }}\n          </div>\n        </div>\n      </div>\n      <div class="row">\n        <div class="controlHeader" id="difficulty">\n          <div class="mat-subheader">Schwierigkeitsgrad</div>\n          <button\n            mat-icon-button\n            class="deselectAllBtn"\n            (click)="onDeselectAllDifficultyClick()"\n            [disabled]="chosenDifficulty.length === 0"\n          >\n            <mat-icon>restart_alt</mat-icon>\n          </button>\n        </div>\n        <div class="controlElement" id="difficulty">\n          <mat-button-toggle-group\n            class="difficulties"\n            multiple\n            (change)="onButtonToggleChange($event)"\n            [(ngModel)]="chosenDifficulty"\n          >\n            <mat-button-toggle\n              *ngFor="let difficulty of difficulties; let i = index"\n              [value]="difficulty"\n              >{{ difficulty }}</mat-button-toggle\n            >\n          </mat-button-toggle-group>\n        </div>\n      </div>\n      <div class="row" *ngIf="tags.length !== 0">\n        <div class="controlHeader" id="tag">\n          <div class="mat-subheader">Tags</div>\n          <button\n            mat-icon-button\n            class="deselectAllBtn"\n            (click)="onDeselectAllTagClick()"\n            [disabled]="chosenTags.length === 0"\n          >\n            <mat-icon>restart_alt</mat-icon>\n          </button>\n        </div>\n        <div class="controlElement" id="tag">\n          <mat-chip-listbox\n            selectable="true"\n            multiple="true"\n            (change)="onTagSelectionChange($event)"\n            [(ngModel)]="chosenTags"\n          >\n            <mat-chip\n              #c="matChip"\n              *ngFor="let tag of tags"\n              [value]="tag"\n              [ngClass]="tags.length > 6 ? \'mat-chip-small\' : \'mat-chip-large\'"\n            >\n              {{ tag }}\n            </mat-chip>\n          </mat-chip-listbox>\n        </div>\n      </div>\n    </div>\n  </mat-card-actions>\n</mat-card>\n<ng-template #quizLoading>\n  <mat-card-content>\n    <mat-spinner color="primary"></mat-spinner>\n  </mat-card-content>\n</ng-template>\n',
          styles: [
            ':host{display:block}mat-card{margin-left:auto;margin-right:auto;max-width:60em;top:67px}@media (max-width: 1141px){mat-card{margin-left:10px;margin-right:10px}}@media (max-width: 440px){mat-card{top:62px}}mat-form-field{width:20em;margin-left:.75em}mat-card-title{font-size:20px;padding-left:20px}mat-card-content mat-spinner{margin-left:auto;margin-right:auto}mat-list{margin-left:2px}mat-form-field{width:85%;padding-left:3%}mat-card-actions{padding:0;margin-left:0;margin-right:0}.content-container{text-align:left;font-size:15px}.mat-standard-chip .mat-chip-remove{color:#fff}.formInvalid{box-sizing:border-box;font-size:11px;color:red;font-style:italic;text-align:center;padding:0 8%}hr{margin:15px}.row{margin-bottom:10px}.displayValueBox{border:solid 2px;padding:6px;height:35px;width:40px;transform:translateY(-3px);font-weight:500;margin-left:4%;text-align:center;border-radius:8px}.mat-slider{width:100%;margin:-10px}.mat-subheader{font-size:15px;padding:16px 0}.controlHeader{float:left;width:100%;display:flex;align-items:center}.controlElement{display:flex;float:left;width:100%;margin-bottom:10px}.content-container{padding:10px 10px 0}.button-container .startBtn{margin:10px 10px 20px!important;border-radius:7px}.button-container .expBtn{margin:10px 10px 20px;padding:0}.deselectAllBtn{color:#ff4500}.row:after{content:"";display:table;clear:both}#difficulty .mat-button-toggle-group{width:100%;border:none;margin-top:10px;justify-content:space-between}#difficulty .mat-button-toggle{width:20%;border-radius:7px;height:39px;font-weight:500}@media (max-width: 440px){#difficulty .mat-button-toggle{margin-right:10px}}@media (min-width: 441px){#difficulty .mat-button-toggle{margin-right:20px}}#difficulty .mat-button-toggle:last-child{margin-right:0}#difficulty ::ng-deep .mat-button-toggle-label-content{line-height:35px}#tag ::ng-deep .mat-chip-list-wrapper{width:100%;margin:0;justify-content:space-between}#tag .mat-chip-list{width:100%}#tag .mat-chip{overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:10px 0;display:block;padding:5px 10px;text-align:center}@media (max-width: 440px){#tag .mat-chip-small{width:28%}#tag .mat-chip-large{width:48%}}@media (min-width: 441px){#tag .mat-chip{width:23%}}#tag .mat-standard-chip:focus:after{opacity:0}.mat-subheader{font-weight:500}.button-container{text-align:center;position:relative}.button-container .startBtn{font-size:15px;width:35%}.button-container .expBtn{display:block;font-weight:500}.config{position:relative;padding:0 10px}::ng-deep .mat-select-value-text{display:none}@media (max-width: 999px){.toolbar-container{width:100%}}@media (min-width: 1000px){.toolbar-container{width:calc(100% - 300px)}}.toolbar-container{position:fixed;z-index:2;background-color:#fff;box-shadow:0 4px 2px -2px #0003;transition:top .7s ease-in-out}.toolbar{width:100%;position:relative;min-height:52px}.toolbar .button-back{position:absolute;left:16px;top:50%;transform:translateY(-45%);z-index:999;cursor:pointer}.toolbar .title{display:flex;flex-direction:column;text-align:center;grid-area:header}.toolbar .title h2{font-size:21px;transform:translateY(12px);margin-bottom:-2px}\n',
          ],
        },
      ],
    },
  ],
  ctorParameters: function () {
    return [{ type: i1$1.Store }];
  },
  propDecorators: { metaData$: [], expertMode: [], navigateTo: [] },
});

var QuizQuestionType;
(function (QuizQuestionType) {
  QuizQuestionType['SingleChoice'] = 'SC';
  QuizQuestionType['MultipleChoice'] = 'MC';
  QuizQuestionType['TrueFalse'] = 'TF';
  QuizQuestionType['Ranking'] = 'RG';
  QuizQuestionType['Range'] = 'RN';
})(QuizQuestionType || (QuizQuestionType = {}));

class SingleChoiceQuestionComponent {
  question;
  nextQuestionClicked = new EventEmitter();
  selectedAnswer;
  showAnswers = false;
  correct = 0;
  ngOnChanges(changes) {
    if (changes.question.previousValue !== changes.question.currentValue) {
      this.selectedAnswer = undefined;
      this.showAnswers = false;
      this.correct = 0;
    }
  }
  onRadioChange(e) {
    this.selectedAnswer = e.value;
  }
  trackByFn(index, item) {
    return item.id;
  }
  isAnswerCorrect(answer) {
    if (!this.showAnswers) {
      return false;
    }
    return answer.correct;
  }
  isAnswerIncorrect(answer) {
    if (!this.showAnswers) {
      return false;
    }
    return !answer.correct;
  }
  onShowAnswersClick() {
    this.showAnswers = true;
    if (this.selectedAnswer == undefined) this.correct = 0;
    else this.correct = -1;
    this.question.answers.forEach((value) => {
      if (value.id == this.selectedAnswer && value.correct) this.correct = 1;
    });
  }
  onNextQuestionClick() {
    if (this.selectedAnswer == undefined) this.correct = 0;
    this.nextQuestionClicked.emit(this.correct);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SingleChoiceQuestionComponent,
    deps: [],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: SingleChoiceQuestionComponent,
    selector: 'solid-quiz-single-choice-question',
    inputs: { question: 'question' },
    outputs: { nextQuestionClicked: 'nextQuestionClicked' },
    usesOnChanges: true,
    ngImport: i0,
    template:
      '<mat-radio-group\r\n  (change)="onRadioChange($event)"\r\n  [disabled]="showAnswers"\r\n  aria-label="W\u00E4hle ein Antwort aus"\r\n  color="primary"\r\n  class="container"\r\n>\r\n  <mat-radio-button\r\n    *ngFor="let answer of question.answers; trackBy: trackByFn"\r\n    [class.correct]="isAnswerCorrect(answer)"\r\n    [class.incorrect]="isAnswerIncorrect(answer)"\r\n    [value]="answer.id"\r\n  >\r\n    <span class="answer" markdown [data]="answer.text"></span>\r\n    <mat-icon class="correctIcon" *ngIf="showAnswers && answer.correct"\r\n      >check_circle</mat-icon\r\n    >\r\n    <mat-icon class="incorrectIcon" *ngIf="showAnswers && !answer.correct"\r\n      >highlight_off</mat-icon\r\n    >\r\n    <span\r\n      *ngIf="showAnswers && selectedAnswer === answer.id"\r\n      [data]="\r\n        answer.correct ? answer.feedback_correct : answer.feedback_incorrect\r\n      "\r\n      markdown\r\n      class="feedback"\r\n    ></span>\r\n  </mat-radio-button>\r\n</mat-radio-group>\r\n<button\r\n  (click)="onShowAnswersClick()"\r\n  *ngIf="!showAnswers"\r\n  color="primary"\r\n  mat-raised-button\r\n  class="showAnswerBtn"\r\n>\r\n  L\u00F6sungen anzeigen\r\n</button>\r\n<button\r\n  (click)="onNextQuestionClick()"\r\n  *ngIf="showAnswers"\r\n  color="primary"\r\n  mat-raised-button\r\n  class="nextQuestionBtn"\r\n>\r\n  {{ correct === 1 ? \'Richtig,\' : \' Falsch,\' }} n\u00E4chste Frage\r\n</button>\r\n',
    styles: [
      ':host{margin-left:-3px}mat-radio-group{margin-top:7px;display:flex;flex-direction:column}mat-radio-group mat-radio-button:not(:first-child){margin-top:20px}mat-radio-group mat-radio-button ::ng-deep label.mat-radio-label{vertical-align:top}mat-radio-group mat-radio-button ::ng-deep label.mat-radio-label .mat-radio-container{margin-bottom:auto}mat-radio-group mat-radio-button ::ng-deep label.mat-radio-label.correct{font-weight:700}mat-radio-group mat-radio-button ::ng-deep .mat-radio-label-content{display:grid;grid-template-rows:auto;grid-template-columns:auto 20px;white-space:normal}mat-radio-group mat-radio-button ::ng-deep .mat-radio-inner-circle{z-index:0}.answer{grid-row-start:1;grid-column-start:1}.answer ::ng-deep p{margin-bottom:0}.correctIcon,.incorrectIcon{grid-row-start:1;grid-column-start:1;transform:translate(-30px) translateY(-2px);opacity:1;z-index:9999}span.feedback{grid-column-start:1;font-weight:400;margin-top:5px;margin-bottom:-12px}.showAnswerBtn,.nextQuestionBtn{margin-top:23px}::ng-deep .mat-radio-button.mat-radio-disabled .mat-radio-outer-circle{display:none}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i1$2.NgForOf,
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
      },
      {
        kind: 'directive',
        type: i1$2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'component',
        type: i2.MarkdownComponent,
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
        kind: 'directive',
        type: i4$2.MatRadioGroup,
        selector: 'mat-radio-group',
        exportAs: ['matRadioGroup'],
      },
      {
        kind: 'component',
        type: i4$2.MatRadioButton,
        selector: 'mat-radio-button',
        inputs: ['disableRipple', 'tabIndex'],
        exportAs: ['matRadioButton'],
      },
      {
        kind: 'component',
        type: i4$1.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: SingleChoiceQuestionComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-quiz-single-choice-question',
          template:
            '<mat-radio-group\r\n  (change)="onRadioChange($event)"\r\n  [disabled]="showAnswers"\r\n  aria-label="W\u00E4hle ein Antwort aus"\r\n  color="primary"\r\n  class="container"\r\n>\r\n  <mat-radio-button\r\n    *ngFor="let answer of question.answers; trackBy: trackByFn"\r\n    [class.correct]="isAnswerCorrect(answer)"\r\n    [class.incorrect]="isAnswerIncorrect(answer)"\r\n    [value]="answer.id"\r\n  >\r\n    <span class="answer" markdown [data]="answer.text"></span>\r\n    <mat-icon class="correctIcon" *ngIf="showAnswers && answer.correct"\r\n      >check_circle</mat-icon\r\n    >\r\n    <mat-icon class="incorrectIcon" *ngIf="showAnswers && !answer.correct"\r\n      >highlight_off</mat-icon\r\n    >\r\n    <span\r\n      *ngIf="showAnswers && selectedAnswer === answer.id"\r\n      [data]="\r\n        answer.correct ? answer.feedback_correct : answer.feedback_incorrect\r\n      "\r\n      markdown\r\n      class="feedback"\r\n    ></span>\r\n  </mat-radio-button>\r\n</mat-radio-group>\r\n<button\r\n  (click)="onShowAnswersClick()"\r\n  *ngIf="!showAnswers"\r\n  color="primary"\r\n  mat-raised-button\r\n  class="showAnswerBtn"\r\n>\r\n  L\u00F6sungen anzeigen\r\n</button>\r\n<button\r\n  (click)="onNextQuestionClick()"\r\n  *ngIf="showAnswers"\r\n  color="primary"\r\n  mat-raised-button\r\n  class="nextQuestionBtn"\r\n>\r\n  {{ correct === 1 ? \'Richtig,\' : \' Falsch,\' }} n\u00E4chste Frage\r\n</button>\r\n',
          styles: [
            ':host{margin-left:-3px}mat-radio-group{margin-top:7px;display:flex;flex-direction:column}mat-radio-group mat-radio-button:not(:first-child){margin-top:20px}mat-radio-group mat-radio-button ::ng-deep label.mat-radio-label{vertical-align:top}mat-radio-group mat-radio-button ::ng-deep label.mat-radio-label .mat-radio-container{margin-bottom:auto}mat-radio-group mat-radio-button ::ng-deep label.mat-radio-label.correct{font-weight:700}mat-radio-group mat-radio-button ::ng-deep .mat-radio-label-content{display:grid;grid-template-rows:auto;grid-template-columns:auto 20px;white-space:normal}mat-radio-group mat-radio-button ::ng-deep .mat-radio-inner-circle{z-index:0}.answer{grid-row-start:1;grid-column-start:1}.answer ::ng-deep p{margin-bottom:0}.correctIcon,.incorrectIcon{grid-row-start:1;grid-column-start:1;transform:translate(-30px) translateY(-2px);opacity:1;z-index:9999}span.feedback{grid-column-start:1;font-weight:400;margin-top:5px;margin-bottom:-12px}.showAnswerBtn,.nextQuestionBtn{margin-top:23px}::ng-deep .mat-radio-button.mat-radio-disabled .mat-radio-outer-circle{display:none}\n',
          ],
        },
      ],
    },
  ],
  propDecorators: {
    question: [
      {
        type: Input,
      },
    ],
    nextQuestionClicked: [
      {
        type: Output,
      },
    ],
  },
});

class MultipleChoiceQuestionComponent {
  question;
  nextQuestionClicked = new EventEmitter();
  selectedAnswers = [];
  showAnswers = false;
  correct = 0;
  ngOnChanges(changes) {
    if (changes.question.previousValue !== changes.question.currentValue) {
      this.showAnswers = false;
      this.selectedAnswers = [];
      this.correct = 0;
    }
  }
  onSelectChange(e, answer) {
    if (e.checked) {
      this.selectedAnswers.push(answer.id);
    } else {
      this.selectedAnswers = this.selectedAnswers.filter(
        (id) => id !== answer.id
      );
    }
  }
  isAnswerCorrect(answer) {
    if (!this.showAnswers) {
      return false;
    }
    return answer.correct;
  }
  isAnswerIncorrect(answer) {
    if (!this.showAnswers) {
      return false;
    }
    return !answer.correct;
  }
  trackByFn(index, item) {
    return item.id;
  }
  onShowAnswersClick() {
    this.showAnswers = true;
    this.correct = 1;
    let correctAnswers = 0;
    this.question.answers.forEach((answer) => {
      if (answer.correct) {
        correctAnswers++;
        if (!this.selectedAnswers.includes(answer.id)) {
          this.correct = -1;
        }
      }
    });
    if (this.selectedAnswers.length !== correctAnswers) {
      this.correct = -1;
    }
  }
  onNextQuestionClick() {
    if (this.selectedAnswers.length == 0) this.correct = 0;
    this.nextQuestionClicked.emit(this.correct);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: MultipleChoiceQuestionComponent,
    deps: [],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: MultipleChoiceQuestionComponent,
    selector: 'solid-quiz-multiple-choice-question',
    inputs: { question: 'question' },
    outputs: { nextQuestionClicked: 'nextQuestionClicked' },
    usesOnChanges: true,
    ngImport: i0,
    template:
      '<mat-checkbox\r\n  (change)="onSelectChange($event, answer)"\r\n  *ngFor="let answer of question.answers; trackBy: trackByFn"\r\n  [checked]="isAnswerCorrect(answer)"\r\n  [class.correctSelected]="\r\n    isAnswerCorrect(answer) && selectedAnswers.includes(answer.id)\r\n  "\r\n  [class.incorrectSelected]="\r\n    isAnswerIncorrect(answer) && selectedAnswers.includes(answer.id)\r\n  "\r\n  [class.correctUnselected]="\r\n    isAnswerCorrect(answer) && !selectedAnswers.includes(answer.id)\r\n  "\r\n  [class.incorrectUnselected]="\r\n    isAnswerIncorrect(answer) && !selectedAnswers.includes(answer.id)\r\n  "\r\n  [disabled]="showAnswers"\r\n  [indeterminate]="isAnswerIncorrect(answer)"\r\n  color="primary"\r\n>\r\n  <span class="answer" markdown [data]="answer.text"></span>\r\n  <span\r\n    class="feedback"\r\n    *ngIf="showAnswers && selectedAnswers.includes(answer.id)"\r\n    [data]="\r\n      answer.correct ? answer.feedback_correct : answer.feedback_incorrect\r\n    "\r\n    markdown\r\n  ></span>\r\n</mat-checkbox>\r\n<button\r\n  (click)="onShowAnswersClick()"\r\n  *ngIf="!showAnswers"\r\n  color="primary"\r\n  mat-raised-button\r\n  class="showAnswerBtn"\r\n>\r\n  L\u00F6sungen anzeigen\r\n</button>\r\n<button\r\n  (click)="onNextQuestionClick()"\r\n  *ngIf="showAnswers"\r\n  color="primary"\r\n  mat-raised-button\r\n  class="nextQuestionBtn"\r\n>\r\n  {{ correct === 1 ? \'Richtig,\' : \' Falsch,\' }} n\u00E4chste Frage\r\n</button>\r\n',
    styles: [
      '@charset "UTF-8";mat-checkbox{width:100%;margin-bottom:14px}mat-checkbox ::ng-deep .correctunselected span.mat-checkbox-label,mat-checkbox ::ng-deep .correctselected span.mat-checkbox-label{font-weight:700}mat-checkbox ::ng-deep span.mat-checkbox-label{display:flex;flex-direction:column;width:calc(100% - 24px);white-space:normal;line-height:28px}mat-checkbox ::ng-deep label.mat-checkbox-layout{vertical-align:top;width:100%}mat-checkbox ::ng-deep span.mat-checkbox-inner-container{margin-top:4px;margin-bottom:auto;margin-right:10px}mat-checkbox ::ng-deep .mat-checkbox-frame{border-radius:20px;height:20px;width:20px}mat-checkbox ::ng-deep .mat-checkbox-background{border-radius:20px;height:20px;width:20px}mat-checkbox ::ng-deep .mat-checkbox-mixedmark{height:16px;width:16px;background-color:#fff;border-radius:20px;position:relative}mat-checkbox ::ng-deep .mat-checkbox-mixedmark:after{position:absolute;top:3px;left:0;right:0;content:"\\d7";font-size:16px;font-weight:700;line-height:10px;text-align:center}.answer ::ng-deep p{margin-bottom:0}span.feedback{font-weight:400;margin-top:6px;margin-bottom:-12px}.showAnswerBtn,.nextQuestionBtn{margin-top:10px}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i1$2.NgForOf,
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
      },
      {
        kind: 'directive',
        type: i1$2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'component',
        type: i2.MarkdownComponent,
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
        type: i4$3.MatCheckbox,
        selector: 'mat-checkbox',
        inputs: ['disableRipple', 'color', 'tabIndex'],
        exportAs: ['matCheckbox'],
      },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: MultipleChoiceQuestionComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-quiz-multiple-choice-question',
          template:
            '<mat-checkbox\r\n  (change)="onSelectChange($event, answer)"\r\n  *ngFor="let answer of question.answers; trackBy: trackByFn"\r\n  [checked]="isAnswerCorrect(answer)"\r\n  [class.correctSelected]="\r\n    isAnswerCorrect(answer) && selectedAnswers.includes(answer.id)\r\n  "\r\n  [class.incorrectSelected]="\r\n    isAnswerIncorrect(answer) && selectedAnswers.includes(answer.id)\r\n  "\r\n  [class.correctUnselected]="\r\n    isAnswerCorrect(answer) && !selectedAnswers.includes(answer.id)\r\n  "\r\n  [class.incorrectUnselected]="\r\n    isAnswerIncorrect(answer) && !selectedAnswers.includes(answer.id)\r\n  "\r\n  [disabled]="showAnswers"\r\n  [indeterminate]="isAnswerIncorrect(answer)"\r\n  color="primary"\r\n>\r\n  <span class="answer" markdown [data]="answer.text"></span>\r\n  <span\r\n    class="feedback"\r\n    *ngIf="showAnswers && selectedAnswers.includes(answer.id)"\r\n    [data]="\r\n      answer.correct ? answer.feedback_correct : answer.feedback_incorrect\r\n    "\r\n    markdown\r\n  ></span>\r\n</mat-checkbox>\r\n<button\r\n  (click)="onShowAnswersClick()"\r\n  *ngIf="!showAnswers"\r\n  color="primary"\r\n  mat-raised-button\r\n  class="showAnswerBtn"\r\n>\r\n  L\u00F6sungen anzeigen\r\n</button>\r\n<button\r\n  (click)="onNextQuestionClick()"\r\n  *ngIf="showAnswers"\r\n  color="primary"\r\n  mat-raised-button\r\n  class="nextQuestionBtn"\r\n>\r\n  {{ correct === 1 ? \'Richtig,\' : \' Falsch,\' }} n\u00E4chste Frage\r\n</button>\r\n',
          styles: [
            '@charset "UTF-8";mat-checkbox{width:100%;margin-bottom:14px}mat-checkbox ::ng-deep .correctunselected span.mat-checkbox-label,mat-checkbox ::ng-deep .correctselected span.mat-checkbox-label{font-weight:700}mat-checkbox ::ng-deep span.mat-checkbox-label{display:flex;flex-direction:column;width:calc(100% - 24px);white-space:normal;line-height:28px}mat-checkbox ::ng-deep label.mat-checkbox-layout{vertical-align:top;width:100%}mat-checkbox ::ng-deep span.mat-checkbox-inner-container{margin-top:4px;margin-bottom:auto;margin-right:10px}mat-checkbox ::ng-deep .mat-checkbox-frame{border-radius:20px;height:20px;width:20px}mat-checkbox ::ng-deep .mat-checkbox-background{border-radius:20px;height:20px;width:20px}mat-checkbox ::ng-deep .mat-checkbox-mixedmark{height:16px;width:16px;background-color:#fff;border-radius:20px;position:relative}mat-checkbox ::ng-deep .mat-checkbox-mixedmark:after{position:absolute;top:3px;left:0;right:0;content:"\\d7";font-size:16px;font-weight:700;line-height:10px;text-align:center}.answer ::ng-deep p{margin-bottom:0}span.feedback{font-weight:400;margin-top:6px;margin-bottom:-12px}.showAnswerBtn,.nextQuestionBtn{margin-top:10px}\n',
          ],
        },
      ],
    },
  ],
  propDecorators: {
    question: [
      {
        type: Input,
      },
    ],
    nextQuestionClicked: [
      {
        type: Output,
      },
    ],
  },
});

class TrueFalseQuestionComponent {
  question;
  nextQuestionClicked = new EventEmitter();
  selectedAnswer;
  showAnswers = false;
  correct = -1;
  ngOnChanges(changes) {
    if (changes.question.previousValue !== changes.question.currentValue) {
      this.showAnswers = false;
      this.correct = -1;
    }
  }
  onTrueClick() {
    this.selectedAnswer = true;
  }
  onFalseClick() {
    this.selectedAnswer = false;
  }
  onShowAnswersClick() {
    this.showAnswers = true;
    if (this.selectedAnswer == this.question.answers[0].correct) {
      this.correct = 1;
    } else {
      this.correct = -1;
    }
  }
  onNextQuestionClick() {
    this.nextQuestionClicked.emit(this.correct);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: TrueFalseQuestionComponent,
    deps: [],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: TrueFalseQuestionComponent,
    selector: 'solid-quiz-true-false-question',
    inputs: { question: 'question' },
    outputs: { nextQuestionClicked: 'nextQuestionClicked' },
    usesOnChanges: true,
    ngImport: i0,
    template:
      '<div class="button-container">\r\n  <button\r\n    class="trueBtn"\r\n    [disabled]="showAnswers"\r\n    mat-stroked-button\r\n    [class.correctUnselected]="showAnswers && question.answers[0].correct"\r\n    [class.incorrectUnselected]="showAnswers && !question.answers[0].correct"\r\n    [class.correctSelected]="\r\n      showAnswers && question.answers[0].correct && selectedAnswer\r\n    "\r\n    [class.incorrectSelected]="\r\n      showAnswers && !question.answers[0].correct && selectedAnswer\r\n    "\r\n    (click)="onTrueClick()"\r\n  >\r\n    Wahr\r\n  </button>\r\n  <button\r\n    class="falseBtn"\r\n    [disabled]="showAnswers"\r\n    mat-stroked-button\r\n    [class.correctUnselected]="showAnswers && !question.answers[0].correct"\r\n    [class.incorrectUnselected]="showAnswers && question.answers[0].correct"\r\n    [class.correctSelected]="\r\n      showAnswers && !question.answers[0].correct && !selectedAnswer\r\n    "\r\n    [class.incorrectSelected]="\r\n      showAnswers && question.answers[0].correct && !selectedAnswer\r\n    "\r\n    (click)="onFalseClick()"\r\n  >\r\n    Falsch\r\n  </button>\r\n</div>\r\n\r\n<div class="feedback" *ngIf="showAnswers">\r\n  <mat-icon\r\n    class="correctIcon"\r\n    *ngIf="question.answers[0].correct === selectedAnswer && showAnswers"\r\n  >\r\n    check\r\n  </mat-icon>\r\n  <mat-icon\r\n    class="incorrectIcon"\r\n    *ngIf="question.answers[0].correct !== selectedAnswer && showAnswers"\r\n  >\r\n    highlight_off\r\n  </mat-icon>\r\n  <span\r\n    class="feedback-text"\r\n    markdown\r\n    [data]="\r\n      selectedAnswer === question.answers[0].correct\r\n        ? question.answers[0].feedback_correct\r\n        : question.answers[0].feedback_incorrect\r\n    "\r\n  ></span>\r\n</div>\r\n\r\n<div>\r\n  <button\r\n    [disabled]="selectedAnswer === undefined"\r\n    (click)="onShowAnswersClick()"\r\n    *ngIf="!showAnswers"\r\n    color="primary"\r\n    mat-raised-button\r\n    class="showAnswerBtn"\r\n  >\r\n    L\u00F6sungen anzeigen\r\n  </button>\r\n  <button\r\n    (click)="onNextQuestionClick()"\r\n    *ngIf="showAnswers"\r\n    color="primary"\r\n    mat-raised-button\r\n    class="nextQuestionBtn"\r\n  >\r\n    {{ correct === 1 ? \'Richtig,\' : \' Falsch,\' }} n\u00E4chste Frage\r\n  </button>\r\n</div>\r\n',
    styles: [
      ':host{margin-left:-8px}.button-container{display:block;margin:0 5px 16px}.button-container .trueBtn{border-radius:5px;min-height:44px;width:100%;font-size:15px;margin-bottom:15px;font-weight:500;border:solid 2px lightgray}.button-container .trueBtn.correctUnselected{border:solid 3px}.button-container .trueBtn.incorrectUnselected{border:solid 2px}.button-container .falseBtn{border-radius:5px;min-height:44px;width:100%;font-size:15px;font-weight:500;border:solid 2px lightgray}.button-container .falseBtn.correctUnselected{border:solid 3px}.button-container .falseBtn.incorrectUnselected{border:solid 2px}.feedback{display:grid;grid-template-columns:0fr 10fr;column-gap:9px;align-items:center}.correctIcon,.incorrectIcon{justify-self:end;font-weight:700}span.feedback-text{margin-top:10px;font-weight:500;text-align:justify}.mat-typography p{align-self:center;margin:0}.showAnswerBtn,.nextQuestionBtn{margin-top:10px}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i1$2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'component',
        type: i2.MarkdownComponent,
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
        type: i4$1.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: TrueFalseQuestionComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-quiz-true-false-question',
          template:
            '<div class="button-container">\r\n  <button\r\n    class="trueBtn"\r\n    [disabled]="showAnswers"\r\n    mat-stroked-button\r\n    [class.correctUnselected]="showAnswers && question.answers[0].correct"\r\n    [class.incorrectUnselected]="showAnswers && !question.answers[0].correct"\r\n    [class.correctSelected]="\r\n      showAnswers && question.answers[0].correct && selectedAnswer\r\n    "\r\n    [class.incorrectSelected]="\r\n      showAnswers && !question.answers[0].correct && selectedAnswer\r\n    "\r\n    (click)="onTrueClick()"\r\n  >\r\n    Wahr\r\n  </button>\r\n  <button\r\n    class="falseBtn"\r\n    [disabled]="showAnswers"\r\n    mat-stroked-button\r\n    [class.correctUnselected]="showAnswers && !question.answers[0].correct"\r\n    [class.incorrectUnselected]="showAnswers && question.answers[0].correct"\r\n    [class.correctSelected]="\r\n      showAnswers && !question.answers[0].correct && !selectedAnswer\r\n    "\r\n    [class.incorrectSelected]="\r\n      showAnswers && question.answers[0].correct && !selectedAnswer\r\n    "\r\n    (click)="onFalseClick()"\r\n  >\r\n    Falsch\r\n  </button>\r\n</div>\r\n\r\n<div class="feedback" *ngIf="showAnswers">\r\n  <mat-icon\r\n    class="correctIcon"\r\n    *ngIf="question.answers[0].correct === selectedAnswer && showAnswers"\r\n  >\r\n    check\r\n  </mat-icon>\r\n  <mat-icon\r\n    class="incorrectIcon"\r\n    *ngIf="question.answers[0].correct !== selectedAnswer && showAnswers"\r\n  >\r\n    highlight_off\r\n  </mat-icon>\r\n  <span\r\n    class="feedback-text"\r\n    markdown\r\n    [data]="\r\n      selectedAnswer === question.answers[0].correct\r\n        ? question.answers[0].feedback_correct\r\n        : question.answers[0].feedback_incorrect\r\n    "\r\n  ></span>\r\n</div>\r\n\r\n<div>\r\n  <button\r\n    [disabled]="selectedAnswer === undefined"\r\n    (click)="onShowAnswersClick()"\r\n    *ngIf="!showAnswers"\r\n    color="primary"\r\n    mat-raised-button\r\n    class="showAnswerBtn"\r\n  >\r\n    L\u00F6sungen anzeigen\r\n  </button>\r\n  <button\r\n    (click)="onNextQuestionClick()"\r\n    *ngIf="showAnswers"\r\n    color="primary"\r\n    mat-raised-button\r\n    class="nextQuestionBtn"\r\n  >\r\n    {{ correct === 1 ? \'Richtig,\' : \' Falsch,\' }} n\u00E4chste Frage\r\n  </button>\r\n</div>\r\n',
          styles: [
            ':host{margin-left:-8px}.button-container{display:block;margin:0 5px 16px}.button-container .trueBtn{border-radius:5px;min-height:44px;width:100%;font-size:15px;margin-bottom:15px;font-weight:500;border:solid 2px lightgray}.button-container .trueBtn.correctUnselected{border:solid 3px}.button-container .trueBtn.incorrectUnselected{border:solid 2px}.button-container .falseBtn{border-radius:5px;min-height:44px;width:100%;font-size:15px;font-weight:500;border:solid 2px lightgray}.button-container .falseBtn.correctUnselected{border:solid 3px}.button-container .falseBtn.incorrectUnselected{border:solid 2px}.feedback{display:grid;grid-template-columns:0fr 10fr;column-gap:9px;align-items:center}.correctIcon,.incorrectIcon{justify-self:end;font-weight:700}span.feedback-text{margin-top:10px;font-weight:500;text-align:justify}.mat-typography p{align-self:center;margin:0}.showAnswerBtn,.nextQuestionBtn{margin-top:10px}\n',
          ],
        },
      ],
    },
  ],
  propDecorators: {
    question: [
      {
        type: Input,
      },
    ],
    nextQuestionClicked: [
      {
        type: Output,
      },
    ],
  },
});

class RankingQuestionComponent {
  question;
  nextQuestionClicked = new EventEmitter();
  showAnswers;
  correct = 0;
  index;
  answersList = [];
  hasSubsequence = false;
  subsequence = [];
  ngOnInit() {
    for (let i = 0; i < this.question.answers.length; ++i) {
      this.answersList.push({
        text: this.question.answers[i].text,
        correct_position: this.question.answers[i].ranking_position,
      });
    }
  }
  ngOnChanges(changes) {
    if (changes.question.previousValue !== changes.question.currentValue) {
      this.showAnswers = false;
      this.correct = 0;
    }
  }
  drop(event) {
    this.correct = -1;
    moveItemInArray(this.answersList, event.previousIndex, event.currentIndex);
  }
  onShowAnswersClick() {
    this.showAnswers = true;
    this.index = this.question.answers.findIndex((res) => {
      return res.ranking_position == 1;
    });
    this.hasSubsequence = this.question.answers[this.index].subsequences;
    let maxLength = 2; // change later if needed
    let count = 0;
    let sub = [];
    this.answersList.forEach((value, index, array) => {
      if (
        array[index].correct_position ==
          array[index + 1]?.correct_position - 1 &&
        array[index].correct_position != index + 1
      ) {
        sub.push(array[index].correct_position);
      } else {
        if (array[index].correct_position == index + 1) count++;
        sub.push(array[index].correct_position);
        if (sub.length > maxLength) {
          this.subsequence = sub;
          maxLength = sub.length;
        }
        sub = [];
      }
    });
    if (this.correct != 0)
      this.correct = count == this.answersList.length ? 1 : -1;
    this.hasSubsequence = maxLength < 3 ? false : true;
  }
  isCorrectPosition(answer) {
    if (!this.showAnswers) {
      return false;
    }
    return this.answersList.indexOf(answer) + 1 == answer.correct_position;
  }
  isInCorrectPosition(answer) {
    if (!this.showAnswers) {
      return false;
    }
    return this.answersList.indexOf(answer) + 1 != answer.correct_position;
  }
  onNextQuestionClick() {
    this.nextQuestionClicked.emit(this.correct);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: RankingQuestionComponent,
    deps: [],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: RankingQuestionComponent,
    selector: 'solid-quiz-ranking-question',
    inputs: { question: 'question' },
    outputs: { nextQuestionClicked: 'nextQuestionClicked' },
    usesOnChanges: true,
    ngImport: i0,
    template:
      '<div\r\n  cdkDropList\r\n  class="ranking-list"\r\n  (cdkDropListDropped)="drop($event)"\r\n  [cdkDropListDisabled]="showAnswers"\r\n>\r\n  <div\r\n    class="ranking-box"\r\n    cdkDrag\r\n    [class.correctPosition]="isCorrectPosition(answer)"\r\n    [class.incorrectPosition]="isInCorrectPosition(answer)"\r\n    [class.subsequence]="\r\n      hasSubsequence &&\r\n      subsequence.includes(answer.correct_position) &&\r\n      correct === -1\r\n    "\r\n    *ngFor="let answer of answersList; let index = index"\r\n  >\r\n    <p class="answerText" [data]="answer.text" markdown></p>\r\n    <!--p>{{ answer.text }}gg</p-->\r\n    <div class="feedback-icon" *ngIf="showAnswers">\r\n      <mat-icon\r\n        *ngIf="\r\n          (!subsequence.includes(answer.correct_position) &&\r\n            answer.correct_position === index + 1) ||\r\n          correct === 1\r\n        "\r\n        >check</mat-icon\r\n      >\r\n      <mat-icon\r\n        *ngIf="\r\n          !subsequence.includes(answer.correct_position) &&\r\n          answer.correct_position !== index + 1\r\n        "\r\n        >highlight_off</mat-icon\r\n      >\r\n      <mat-icon\r\n        *ngIf="\r\n          hasSubsequence &&\r\n          subsequence.includes(answer.correct_position) &&\r\n          correct === -1\r\n        "\r\n        svgIcon="semicorrect"\r\n      ></mat-icon>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class="feedback-container" *ngIf="showAnswers">\r\n  <mat-icon class="correctIcon" *ngIf="correct === 1"> check_circle </mat-icon>\r\n  <mat-icon class="incorrectIcon" *ngIf="correct === -1 || correct === 0">\r\n    highlight_off\r\n  </mat-icon>\r\n  <span\r\n    class="feedback"\r\n    markdown\r\n    *ngIf="showAnswers"\r\n    [data]="\r\n      correct === 1\r\n        ? this.question.answers[index].feedback_correct\r\n        : hasSubsequence\r\n        ? this.question.answers[index].feedback_subsequences\r\n        : this.question.answers[index].feedback_incorrect\r\n    "\r\n  >\r\n  </span>\r\n</div>\r\n<button\r\n  (click)="onShowAnswersClick()"\r\n  *ngIf="!showAnswers"\r\n  color="primary"\r\n  mat-raised-button\r\n  class="showAnswerBtn"\r\n>\r\n  L\u00F6sungen anzeigen\r\n</button>\r\n<button\r\n  (click)="onNextQuestionClick()"\r\n  *ngIf="showAnswers"\r\n  color="primary"\r\n  mat-raised-button\r\n  class="nextQuestionBtn"\r\n>\r\n  {{ correct === 1 ? \'Richtig,\' : \' Falsch,\' }} n\u00E4chste Frage\r\n</button>\r\n',
    styles: [
      '.ranking-list{width:100%;max-width:100%;border:solid 1px #ccc;min-height:60px;display:block;background:#fff;border-radius:4px;overflow:hidden;margin-bottom:15px}.ranking-box{padding:20px 10px;border-bottom:solid 1px #ccc;color:#000000de;display:flex;flex-direction:row;align-items:center;justify-content:space-between;box-sizing:border-box;cursor:move;background:#fff;font-size:14px;max-height:61px}.ranking-box ::ng-deep p{margin-bottom:0!important}.feedback-container{grid-column-start:1;grid-column-end:4;grid-row-start:3;display:flex;justify-self:stretch;margin:0 4px}.feedback-container .correctIcon,.feedback-container .incorrectIcon{margin:4px;font-weight:400}.feedback-container .feedback{margin:6px}.cdk-drag-preview{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f}.cdk-drag-placeholder{opacity:0}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.ranking-box:last-child{border:none}.ranking-list.cdk-drop-list-dragging .ranking-box:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}span.feedback{font-weight:400}.showAnswerBtn,.nextQuestionBtn{margin-top:15px}.feedback-icon{display:contents}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i1$2.NgForOf,
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
      },
      {
        kind: 'directive',
        type: i1$2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'component',
        type: i2.MarkdownComponent,
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
        type: i4$1.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'directive',
        type: i5$1.CdkDropList,
        selector: '[cdkDropList], cdk-drop-list',
        inputs: [
          'cdkDropListConnectedTo',
          'cdkDropListData',
          'cdkDropListOrientation',
          'id',
          'cdkDropListLockAxis',
          'cdkDropListDisabled',
          'cdkDropListSortingDisabled',
          'cdkDropListEnterPredicate',
          'cdkDropListSortPredicate',
          'cdkDropListAutoScrollDisabled',
          'cdkDropListAutoScrollStep',
        ],
        outputs: [
          'cdkDropListDropped',
          'cdkDropListEntered',
          'cdkDropListExited',
          'cdkDropListSorted',
        ],
        exportAs: ['cdkDropList'],
      },
      {
        kind: 'directive',
        type: i5$1.CdkDrag,
        selector: '[cdkDrag]',
        inputs: [
          'cdkDragData',
          'cdkDragLockAxis',
          'cdkDragRootElement',
          'cdkDragBoundary',
          'cdkDragStartDelay',
          'cdkDragFreeDragPosition',
          'cdkDragDisabled',
          'cdkDragConstrainPosition',
          'cdkDragPreviewClass',
          'cdkDragPreviewContainer',
        ],
        outputs: [
          'cdkDragStarted',
          'cdkDragReleased',
          'cdkDragEnded',
          'cdkDragEntered',
          'cdkDragExited',
          'cdkDragDropped',
          'cdkDragMoved',
        ],
        exportAs: ['cdkDrag'],
      },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: RankingQuestionComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-quiz-ranking-question',
          template:
            '<div\r\n  cdkDropList\r\n  class="ranking-list"\r\n  (cdkDropListDropped)="drop($event)"\r\n  [cdkDropListDisabled]="showAnswers"\r\n>\r\n  <div\r\n    class="ranking-box"\r\n    cdkDrag\r\n    [class.correctPosition]="isCorrectPosition(answer)"\r\n    [class.incorrectPosition]="isInCorrectPosition(answer)"\r\n    [class.subsequence]="\r\n      hasSubsequence &&\r\n      subsequence.includes(answer.correct_position) &&\r\n      correct === -1\r\n    "\r\n    *ngFor="let answer of answersList; let index = index"\r\n  >\r\n    <p class="answerText" [data]="answer.text" markdown></p>\r\n    <!--p>{{ answer.text }}gg</p-->\r\n    <div class="feedback-icon" *ngIf="showAnswers">\r\n      <mat-icon\r\n        *ngIf="\r\n          (!subsequence.includes(answer.correct_position) &&\r\n            answer.correct_position === index + 1) ||\r\n          correct === 1\r\n        "\r\n        >check</mat-icon\r\n      >\r\n      <mat-icon\r\n        *ngIf="\r\n          !subsequence.includes(answer.correct_position) &&\r\n          answer.correct_position !== index + 1\r\n        "\r\n        >highlight_off</mat-icon\r\n      >\r\n      <mat-icon\r\n        *ngIf="\r\n          hasSubsequence &&\r\n          subsequence.includes(answer.correct_position) &&\r\n          correct === -1\r\n        "\r\n        svgIcon="semicorrect"\r\n      ></mat-icon>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class="feedback-container" *ngIf="showAnswers">\r\n  <mat-icon class="correctIcon" *ngIf="correct === 1"> check_circle </mat-icon>\r\n  <mat-icon class="incorrectIcon" *ngIf="correct === -1 || correct === 0">\r\n    highlight_off\r\n  </mat-icon>\r\n  <span\r\n    class="feedback"\r\n    markdown\r\n    *ngIf="showAnswers"\r\n    [data]="\r\n      correct === 1\r\n        ? this.question.answers[index].feedback_correct\r\n        : hasSubsequence\r\n        ? this.question.answers[index].feedback_subsequences\r\n        : this.question.answers[index].feedback_incorrect\r\n    "\r\n  >\r\n  </span>\r\n</div>\r\n<button\r\n  (click)="onShowAnswersClick()"\r\n  *ngIf="!showAnswers"\r\n  color="primary"\r\n  mat-raised-button\r\n  class="showAnswerBtn"\r\n>\r\n  L\u00F6sungen anzeigen\r\n</button>\r\n<button\r\n  (click)="onNextQuestionClick()"\r\n  *ngIf="showAnswers"\r\n  color="primary"\r\n  mat-raised-button\r\n  class="nextQuestionBtn"\r\n>\r\n  {{ correct === 1 ? \'Richtig,\' : \' Falsch,\' }} n\u00E4chste Frage\r\n</button>\r\n',
          styles: [
            '.ranking-list{width:100%;max-width:100%;border:solid 1px #ccc;min-height:60px;display:block;background:#fff;border-radius:4px;overflow:hidden;margin-bottom:15px}.ranking-box{padding:20px 10px;border-bottom:solid 1px #ccc;color:#000000de;display:flex;flex-direction:row;align-items:center;justify-content:space-between;box-sizing:border-box;cursor:move;background:#fff;font-size:14px;max-height:61px}.ranking-box ::ng-deep p{margin-bottom:0!important}.feedback-container{grid-column-start:1;grid-column-end:4;grid-row-start:3;display:flex;justify-self:stretch;margin:0 4px}.feedback-container .correctIcon,.feedback-container .incorrectIcon{margin:4px;font-weight:400}.feedback-container .feedback{margin:6px}.cdk-drag-preview{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px #0003,0 8px 10px 1px #00000024,0 3px 14px 2px #0000001f}.cdk-drag-placeholder{opacity:0}.cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.ranking-box:last-child{border:none}.ranking-list.cdk-drop-list-dragging .ranking-box:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}span.feedback{font-weight:400}.showAnswerBtn,.nextQuestionBtn{margin-top:15px}.feedback-icon{display:contents}\n',
          ],
        },
      ],
    },
  ],
  propDecorators: {
    question: [
      {
        type: Input,
      },
    ],
    nextQuestionClicked: [
      {
        type: Output,
      },
    ],
  },
});

class RangeQuestionComponent {
  question;
  nextQuestionClicked = new EventEmitter();
  correct = -2;
  showAnswers;
  sliderPosition = this.question?.answers[0].range_min;
  onShowAnswersClick() {
    this.showAnswers = true;
    const tolerance = this.question.answers[0].tolerance;
    const correctValue = this.question.answers[0].range_value;
    const max = this.question.answers[0].range_max;
    const min = this.question.answers[0].range_min;
    if (this.correct != -2) {
      if (Math.abs(this.sliderPosition - correctValue) <= tolerance)
        this.correct = 1;
    } else this.correct = 0;
    setTimeout(() => {
      const correctThumb = document.getElementById('correctThumb');
      const selectedThumb = document.getElementById('selectedThumb');
      const toleranceBar = document.getElementById('toleranceBar');
      const slider = document.getElementById('slider');
      if (slider && correctThumb && toleranceBar && selectedThumb) {
        const scalingFactor = (slider.offsetWidth - 14) / (max - min);
        const correctPos = (correctValue - min) * scalingFactor;
        const toleranceWidth = 2 * tolerance * scalingFactor;
        const selectedPos = (this.sliderPosition - min) * scalingFactor;
        correctThumb.style.left = correctPos - 10 + 'px';
        if (this.correct === 1 && this.sliderPosition - correctValue !== 0) {
          toleranceBar.style.width = toleranceWidth + 'px';
          toleranceBar.style.left = correctPos - toleranceWidth / 2 + 'px';
        } else {
          toleranceBar.style.visibility = 'hidden';
        }
        if (this.correct === 0 || this.sliderPosition - correctValue === 0) {
          selectedThumb.style.visibility = 'hidden';
        } else {
          selectedThumb.style.left = selectedPos - 10 + 'px';
        }
      }
    }, 5);
  }
  onSliderChange(value) {
    this.correct = -1;
  }
  onNextQuestionClick() {
    this.nextQuestionClicked.emit(this.correct);
  }
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: RangeQuestionComponent,
    deps: [],
    target: i0.ɵɵFactoryTarget.Component,
  });
  static ɵcmp = i0.ɵɵngDeclareComponent({
    minVersion: '14.0.0',
    version: '16.2.9',
    type: RangeQuestionComponent,
    selector: 'solid-quiz-range-question',
    inputs: { question: 'question' },
    outputs: { nextQuestionClicked: 'nextQuestionClicked' },
    ngImport: i0,
    template:
      '<div class="visualFeedbackContainer">\n  <div\n    id="correctThumb"\n    *ngIf="showAnswers"\n    [class.correct]="correct === 1"\n    [class.incorrect]="correct === -1 || correct === 0"\n  >\n    <p>{{ question.answers[0].range_value }}</p>\n  </div>\n  <div id="toleranceBar" *ngIf="showAnswers"></div>\n</div>\n<div class="range-container">\n  <span\n    class="minTick"\n    [class.correct]="showAnswers && correct === 1"\n    [class.incorrect]="(showAnswers && correct === -1) || correct === 0"\n  ></span>\n  <p class="minLabel">{{ question.answers[0].range_min }}</p>\n\n  <mat-slider\n    id="slider"\n    thumbLabel\n    [disabled]="showAnswers"\n    [min]="question.answers[0].range_min"\n    [max]="question.answers[0].range_max"\n    [step]="question.answers[0].range_step"\n    [class.correctRange]="showAnswers && correct === 1"\n    [class.incorrectRange]="(showAnswers && correct === -1) || correct === 0"\n    [(ngModel)]="sliderPosition"\n  >\n    <input (valueChange)="onSliderChange($event)" matSliderThumb />\n  </mat-slider>\n  <p class="maxLabel">{{ question.answers[0].range_max }}</p>\n  <span class="maxTick"></span>\n</div>\n\n<div class="visualFeedbackContainer">\n  <div\n    id="selectedThumb"\n    [class.correct]="showAnswers && correct === 1"\n    [class.incorrect]="(showAnswers && correct === -1) || correct === 0"\n    *ngIf="showAnswers"\n  >\n    <p>{{ sliderPosition }}</p>\n  </div>\n</div>\n\n<div class="feedback-container" *ngIf="showAnswers">\n  <mat-icon class="correctIcon" *ngIf="correct === 1"> check_circle </mat-icon>\n  <mat-icon class="incorrectIcon" *ngIf="correct === -1 || correct === 0">\n    highlight_off\n  </mat-icon>\n  <span\n    class="feedback"\n    markdown\n    [data]="\n      correct === 1\n        ? this.question.answers[0].feedback_correct\n        : this.question.answers[0].feedback_incorrect\n    "\n  >\n  </span>\n</div>\n\n<div>\n  <button\n    (click)="onShowAnswersClick()"\n    *ngIf="!showAnswers"\n    color="primary"\n    mat-raised-button\n    class="showAnswerBtn"\n  >\n    L\u00F6sungen anzeigen\n  </button>\n  <button\n    (click)="onNextQuestionClick()"\n    *ngIf="showAnswers"\n    color="primary"\n    mat-raised-button\n    class="nextQuestionBtn"\n  >\n    {{ correct === 1 ? \'Richtig,\' : \' Falsch,\' }} n\u00E4chste Frage\n  </button>\n</div>\n',
    styles: [
      '.range-container{display:grid;grid-template-columns:1fr 9fr 1fr;grid-template-rows:auto;place-items:center;margin:0 4px}.minTick{content:"";grid-row-start:2;justify-self:start;transform:translate(2px) translateY(-37px);grid-column-start:1;height:18px;width:7px}.minLabel{grid-column-start:1;justify-self:start;font-size:14px;font-weight:700;grid-row-start:2;transform:translate(2px)}.maxLabel{grid-column-start:3;justify-self:end;font-size:14px;font-weight:700;grid-row-start:2;transform:translate(-4px)}.maxTick{content:"";border-right:0px;grid-row-start:2;transform:translate(-7px) translateY(-37px);justify-self:end;grid-column-start:3;height:18px;width:7px;background-color:#d3d3d3}.feedback-container{display:flex;margin:0 4px}.feedback-container .correctIcon,.feedback-container .incorrectIcon{margin:4px;font-weight:400;overflow:visible}.feedback-container .feedback{margin:6px}::ng-deep .range-container .mat-slider{min-width:100%;grid-column-start:1;grid-column-end:4;grid-row-start:1}::ng-deep .range-container .mat-slider-wrapper{top:24px}::ng-deep .range-container .mat-slider-horizontal .mat-slider-track-wrapper{height:6px}::ng-deep .range-container .mat-slider.mat-slider-horizontal .mat-slider-track-background{height:100%;background-color:#d3d3d3}::ng-deep .range-container .mat-slider.mat-slider-horizontal .mat-slider-track-fill{height:100%}::ng-deep .range-container .mat-slider.mat-accent .mat-slider-thumb{background-color:#fff;height:26px;width:26px;bottom:-15px;border:solid 3px lightgray;transform:scale(.75)}::ng-deep .range-container .mat-slider:not(.mat-slider-disabled).cdk-focused.mat-slider-thumb-label-showing .mat-slider-thumb{transform:scale(.75)}::ng-deep .range-container .mat-slider.mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb{border-color:#d3d3d3!important}::ng-deep .range-container .mat-slider-horizontal .mat-slider-thumb-label{top:-45px}.visualFeedbackContainer{height:4px;margin:10px 4px 0}.visualFeedbackContainer #correctThumb{position:relative;width:28px;height:28px;top:-15px;border-radius:50% 50% 0;transform:rotate(45deg);display:flex;align-items:center;justify-content:center;z-index:100}.visualFeedbackContainer #correctThumb p{font-weight:500;font-size:12px;margin:0;transform:rotate(-45deg);color:#fff}.visualFeedbackContainer #toleranceBar{position:relative;width:5px;height:15px;top:-37px}.visualFeedbackContainer #selectedThumb{position:relative;width:28px;height:28px;top:-45px;border-radius:0 50% 50%;transform:rotate(45deg);display:flex;align-items:center;justify-content:center;z-index:200}.visualFeedbackContainer #selectedThumb p{font-weight:500;font-size:12px;margin:0;transform:rotate(-45deg);color:#000}.visualFeedbackContainer #valueLabel{position:relative;font-size:12px;font-weight:500;top:-32px}.showAnswerBtn,.nextQuestionBtn{margin-top:10px}\n',
    ],
    dependencies: [
      {
        kind: 'directive',
        type: i1$2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i3.NgControlStatus,
        selector: '[formControlName],[ngModel],[formControl]',
      },
      {
        kind: 'directive',
        type: i3.NgModel,
        selector: '[ngModel]:not([formControlName]):not([formControl])',
        inputs: ['name', 'disabled', 'ngModel', 'ngModelOptions'],
        outputs: ['ngModelChange'],
        exportAs: ['ngModel'],
      },
      {
        kind: 'component',
        type: i2.MarkdownComponent,
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
        type: i4$1.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'component',
        type: i6$1.MatSlider,
        selector: 'mat-slider',
        inputs: [
          'color',
          'disableRipple',
          'disabled',
          'discrete',
          'showTickMarks',
          'min',
          'max',
          'step',
          'displayWith',
        ],
        exportAs: ['matSlider'],
      },
      {
        kind: 'directive',
        type: i6$1.MatSliderThumb,
        selector: 'input[matSliderThumb]',
        inputs: ['value'],
        outputs: ['valueChange', 'dragStart', 'dragEnd'],
        exportAs: ['matSliderThumb'],
      },
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: RangeQuestionComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: 'solid-quiz-range-question',
          template:
            '<div class="visualFeedbackContainer">\n  <div\n    id="correctThumb"\n    *ngIf="showAnswers"\n    [class.correct]="correct === 1"\n    [class.incorrect]="correct === -1 || correct === 0"\n  >\n    <p>{{ question.answers[0].range_value }}</p>\n  </div>\n  <div id="toleranceBar" *ngIf="showAnswers"></div>\n</div>\n<div class="range-container">\n  <span\n    class="minTick"\n    [class.correct]="showAnswers && correct === 1"\n    [class.incorrect]="(showAnswers && correct === -1) || correct === 0"\n  ></span>\n  <p class="minLabel">{{ question.answers[0].range_min }}</p>\n\n  <mat-slider\n    id="slider"\n    thumbLabel\n    [disabled]="showAnswers"\n    [min]="question.answers[0].range_min"\n    [max]="question.answers[0].range_max"\n    [step]="question.answers[0].range_step"\n    [class.correctRange]="showAnswers && correct === 1"\n    [class.incorrectRange]="(showAnswers && correct === -1) || correct === 0"\n    [(ngModel)]="sliderPosition"\n  >\n    <input (valueChange)="onSliderChange($event)" matSliderThumb />\n  </mat-slider>\n  <p class="maxLabel">{{ question.answers[0].range_max }}</p>\n  <span class="maxTick"></span>\n</div>\n\n<div class="visualFeedbackContainer">\n  <div\n    id="selectedThumb"\n    [class.correct]="showAnswers && correct === 1"\n    [class.incorrect]="(showAnswers && correct === -1) || correct === 0"\n    *ngIf="showAnswers"\n  >\n    <p>{{ sliderPosition }}</p>\n  </div>\n</div>\n\n<div class="feedback-container" *ngIf="showAnswers">\n  <mat-icon class="correctIcon" *ngIf="correct === 1"> check_circle </mat-icon>\n  <mat-icon class="incorrectIcon" *ngIf="correct === -1 || correct === 0">\n    highlight_off\n  </mat-icon>\n  <span\n    class="feedback"\n    markdown\n    [data]="\n      correct === 1\n        ? this.question.answers[0].feedback_correct\n        : this.question.answers[0].feedback_incorrect\n    "\n  >\n  </span>\n</div>\n\n<div>\n  <button\n    (click)="onShowAnswersClick()"\n    *ngIf="!showAnswers"\n    color="primary"\n    mat-raised-button\n    class="showAnswerBtn"\n  >\n    L\u00F6sungen anzeigen\n  </button>\n  <button\n    (click)="onNextQuestionClick()"\n    *ngIf="showAnswers"\n    color="primary"\n    mat-raised-button\n    class="nextQuestionBtn"\n  >\n    {{ correct === 1 ? \'Richtig,\' : \' Falsch,\' }} n\u00E4chste Frage\n  </button>\n</div>\n',
          styles: [
            '.range-container{display:grid;grid-template-columns:1fr 9fr 1fr;grid-template-rows:auto;place-items:center;margin:0 4px}.minTick{content:"";grid-row-start:2;justify-self:start;transform:translate(2px) translateY(-37px);grid-column-start:1;height:18px;width:7px}.minLabel{grid-column-start:1;justify-self:start;font-size:14px;font-weight:700;grid-row-start:2;transform:translate(2px)}.maxLabel{grid-column-start:3;justify-self:end;font-size:14px;font-weight:700;grid-row-start:2;transform:translate(-4px)}.maxTick{content:"";border-right:0px;grid-row-start:2;transform:translate(-7px) translateY(-37px);justify-self:end;grid-column-start:3;height:18px;width:7px;background-color:#d3d3d3}.feedback-container{display:flex;margin:0 4px}.feedback-container .correctIcon,.feedback-container .incorrectIcon{margin:4px;font-weight:400;overflow:visible}.feedback-container .feedback{margin:6px}::ng-deep .range-container .mat-slider{min-width:100%;grid-column-start:1;grid-column-end:4;grid-row-start:1}::ng-deep .range-container .mat-slider-wrapper{top:24px}::ng-deep .range-container .mat-slider-horizontal .mat-slider-track-wrapper{height:6px}::ng-deep .range-container .mat-slider.mat-slider-horizontal .mat-slider-track-background{height:100%;background-color:#d3d3d3}::ng-deep .range-container .mat-slider.mat-slider-horizontal .mat-slider-track-fill{height:100%}::ng-deep .range-container .mat-slider.mat-accent .mat-slider-thumb{background-color:#fff;height:26px;width:26px;bottom:-15px;border:solid 3px lightgray;transform:scale(.75)}::ng-deep .range-container .mat-slider:not(.mat-slider-disabled).cdk-focused.mat-slider-thumb-label-showing .mat-slider-thumb{transform:scale(.75)}::ng-deep .range-container .mat-slider.mat-slider-min-value.mat-slider-thumb-label-showing .mat-slider-thumb{border-color:#d3d3d3!important}::ng-deep .range-container .mat-slider-horizontal .mat-slider-thumb-label{top:-45px}.visualFeedbackContainer{height:4px;margin:10px 4px 0}.visualFeedbackContainer #correctThumb{position:relative;width:28px;height:28px;top:-15px;border-radius:50% 50% 0;transform:rotate(45deg);display:flex;align-items:center;justify-content:center;z-index:100}.visualFeedbackContainer #correctThumb p{font-weight:500;font-size:12px;margin:0;transform:rotate(-45deg);color:#fff}.visualFeedbackContainer #toleranceBar{position:relative;width:5px;height:15px;top:-37px}.visualFeedbackContainer #selectedThumb{position:relative;width:28px;height:28px;top:-45px;border-radius:0 50% 50%;transform:rotate(45deg);display:flex;align-items:center;justify-content:center;z-index:200}.visualFeedbackContainer #selectedThumb p{font-weight:500;font-size:12px;margin:0;transform:rotate(-45deg);color:#000}.visualFeedbackContainer #valueLabel{position:relative;font-size:12px;font-weight:500;top:-32px}.showAnswerBtn,.nextQuestionBtn{margin-top:10px}\n',
          ],
        },
      ],
    },
  ],
  propDecorators: {
    question: [
      {
        type: Input,
      },
    ],
    nextQuestionClicked: [
      {
        type: Output,
      },
    ],
  },
});

var __decorate$1 =
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
var __metadata$1 =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
class QuestionComponent {
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
    deps: [{ token: i1$1.Store }, { token: i2$1.MatDialog }],
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
        type: i1$2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i1$2.NgSwitch,
        selector: '[ngSwitch]',
        inputs: ['ngSwitch'],
      },
      {
        kind: 'directive',
        type: i1$2.NgSwitchCase,
        selector: '[ngSwitchCase]',
        inputs: ['ngSwitchCase'],
      },
      {
        kind: 'component',
        type: i2.MarkdownComponent,
        selector: '[markdown]',
        inputs: ['inline', 'data', 'appendData'],
      },
      {
        kind: 'component',
        type: i2.MediaComponent,
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
        type: i4.MatMiniFabButton,
        selector: 'button[mat-mini-fab]',
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
        type: i5.MatCardContent,
        selector: 'mat-card-content',
      },
      {
        kind: 'component',
        type: i5.MatCardHeader,
        selector: 'mat-card-header',
      },
      {
        kind: 'directive',
        type: i5.MatCardTitle,
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
        type: i4$1.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'directive',
        type: i2$1.MatDialogClose,
        selector: '[mat-dialog-close], [matDialogClose]',
        inputs: ['aria-label', 'type', 'mat-dialog-close', 'matDialogClose'],
        exportAs: ['matDialogClose'],
      },
      {
        kind: 'directive',
        type: i2$1.MatDialogContent,
        selector:
          '[mat-dialog-content], mat-dialog-content, [matDialogContent]',
      },
      {
        kind: 'directive',
        type: i2$1.MatDialogActions,
        selector:
          '[mat-dialog-actions], mat-dialog-actions, [matDialogActions]',
        inputs: ['align'],
      },
      {
        kind: 'component',
        type: SingleChoiceQuestionComponent,
        selector: 'solid-quiz-single-choice-question',
        inputs: ['question'],
        outputs: ['nextQuestionClicked'],
      },
      {
        kind: 'component',
        type: MultipleChoiceQuestionComponent,
        selector: 'solid-quiz-multiple-choice-question',
        inputs: ['question'],
        outputs: ['nextQuestionClicked'],
      },
      {
        kind: 'component',
        type: TrueFalseQuestionComponent,
        selector: 'solid-quiz-true-false-question',
        inputs: ['question'],
        outputs: ['nextQuestionClicked'],
      },
      {
        kind: 'component',
        type: RankingQuestionComponent,
        selector: 'solid-quiz-ranking-question',
        inputs: ['question'],
        outputs: ['nextQuestionClicked'],
      },
      {
        kind: 'component',
        type: RangeQuestionComponent,
        selector: 'solid-quiz-range-question',
        inputs: ['question'],
        outputs: ['nextQuestionClicked'],
      },
      { kind: 'pipe', type: i1$2.AsyncPipe, name: 'async' },
    ],
  });
}
__decorate$1(
  [Select(QuizState.getSession), __metadata$1('design:type', Observable)],
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
    return [{ type: i1$1.Store }, { type: i2$1.MatDialog }];
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

const QuizFeedback = {
  e0: [
    'Das war zum Aufwärmen - die nächste Runde wird bestimmt besser!',
    'Kein Grund zur Frustration - einfach durchatmen und die nächste Runde starten.',
    'Noch ein Kaffee und eine neue Chance?',
  ],
  lt25: [
    '{{correctPercentage}}% richtig - da ist noch etwas Luft nach oben...',
    'Einfach noch eine Runde starten - da geht bestimmt noch was!',
    'Beim nächsten Mal sind bestimmt mehr Antworten richtig!',
  ],
  lt50: [
    '{{correctPercentage}}% - noch nicht die Hälfte, aber da war schon Schönes dabei.',
    'Vielleicht braucht es noch ein bisschen Übung?',
    'In der nächsten Runde werden es bestimmt noch mehr richtige Antworten!',
  ],
  lt75: [
    '{{correctPercentage}}% ist ein ganz gutes Ergebnis! Geht da noch mehr?',
    'Das klappt ja ganz gut, aber ein bisschen mehr wird es beim nächsten Mal bestimmt!',
    'Die Hälfte war mindestens richtig! Eine Runde geht bestimmt noch.',
  ],
  ge75: [
    '{{correctPercentage}}%! Das ist ein prima Ergebnis.',
    'Beim nächsten Mal werden bestimmt die 100% geknackt!',
    'Nicht schlecht - ein paar % fehlen noch zum Gipfel!',
  ],
  e100: [
    'Alle Fragen richtig!? Beeindruckend...',
    'Na, da kann man wohl nicht mehr viel beibringen.',
    'Na? Klappt es mit den 100% auch bei der nächsten Runde?',
  ],
  nan: [
    'Rock bottom, I hope for your sake you nuked that level!',
    'Wenn gar keine Frage beantwortet wurde, gibt es auch keine Gummipunkte!',
    'Ein verweigerter Selbsttest? Come on!',
  ],
};

class EndComponent {
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
    deps: [{ token: i1$1.Store }],
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
        type: i1$2.NgForOf,
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
      },
      {
        kind: 'directive',
        type: i1$2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'component',
        type: i2.MarkdownComponent,
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
        type: i4$1.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'component',
        type: i7$1.MatExpansionPanel,
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
        type: i7$1.MatExpansionPanelHeader,
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
    return [{ type: i1$1.Store }];
  },
  propDecorators: {
    stopQuiz: [
      {
        type: Output,
      },
    ],
  },
});

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
class MainComponent {
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
    deps: [{ token: i1$1.Store }],
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
        type: i1$2.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      { kind: 'component', type: StartComponent, selector: 'solid-quiz-start' },
      {
        kind: 'component',
        type: QuestionComponent,
        selector: 'solid-quiz-question',
        inputs: ['question'],
        outputs: ['stopQuiz'],
      },
      {
        kind: 'component',
        type: EndComponent,
        selector: 'solid-quiz-end',
        outputs: ['stopQuiz'],
      },
      { kind: 'pipe', type: i1$2.AsyncPipe, name: 'async' },
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
    return [{ type: i1$1.Store }];
  },
  propDecorators: { QuizSession: [] },
});

const routes = [
  { path: '', component: MainComponent, data: { title: 'Selbsttest' } },
];
// This workaround is required for the "old" angular compiler in production mode. Ivy library publishing is not supported until angular 10.
// https://github.com/ng-packagr/ng-packagr/issues/767
const routerChildModule = RouterModule.forChild(routes);
const ngxsFeatureModule = NgxsModule.forFeature([QuizState]);
class SolidQuizModule {
  static ɵfac = i0.ɵɵngDeclareFactory({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidQuizModule,
    deps: [],
    target: i0.ɵɵFactoryTarget.NgModule,
  });
  static ɵmod = i0.ɵɵngDeclareNgModule({
    minVersion: '14.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidQuizModule,
    declarations: [
      StartComponent,
      MainComponent,
      QuestionComponent,
      EndComponent,
      SingleChoiceQuestionComponent,
      MultipleChoiceQuestionComponent,
      TrueFalseQuestionComponent,
      RankingQuestionComponent,
      RangeQuestionComponent,
    ],
    imports: [
      SolidCoreModule,
      i1$3.RouterModule,
      i1$1.ɵNgxsFeatureModule,
      MatButtonModule,
      MatCardModule,
      MatCheckboxModule,
      MatFormFieldModule,
      MatInputModule,
      MatProgressBarModule,
      MatRadioModule,
      MatProgressSpinnerModule,
      MatIconModule,
      MatExpansionModule,
      MatSliderModule,
      MatChipsModule,
      MatAutocompleteModule,
      MatListModule,
      MatSelectModule,
      MatDialogModule,
      DragDropModule,
      MatButtonToggleModule,
      MatSlideToggleModule,
    ],
  });
  static ɵinj = i0.ɵɵngDeclareInjector({
    minVersion: '12.0.0',
    version: '16.2.9',
    ngImport: i0,
    type: SolidQuizModule,
    imports: [
      SolidCoreModule,
      routerChildModule,
      ngxsFeatureModule,
      MatButtonModule,
      MatCardModule,
      MatCheckboxModule,
      MatFormFieldModule,
      MatInputModule,
      MatProgressBarModule,
      MatRadioModule,
      MatProgressSpinnerModule,
      MatIconModule,
      MatExpansionModule,
      MatSliderModule,
      MatChipsModule,
      MatAutocompleteModule,
      MatListModule,
      MatSelectModule,
      MatDialogModule,
      DragDropModule,
      MatButtonToggleModule,
      MatSlideToggleModule,
    ],
  });
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: '12.0.0',
  version: '16.2.9',
  ngImport: i0,
  type: SolidQuizModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          declarations: [
            StartComponent,
            MainComponent,
            QuestionComponent,
            EndComponent,
            SingleChoiceQuestionComponent,
            MultipleChoiceQuestionComponent,
            TrueFalseQuestionComponent,
            RankingQuestionComponent,
            RangeQuestionComponent,
          ],
          imports: [
            SolidCoreModule,
            routerChildModule,
            ngxsFeatureModule,
            MatButtonModule,
            MatCardModule,
            MatCheckboxModule,
            MatFormFieldModule,
            MatInputModule,
            MatProgressBarModule,
            MatRadioModule,
            MatProgressSpinnerModule,
            MatIconModule,
            MatExpansionModule,
            MatSliderModule,
            MatChipsModule,
            MatAutocompleteModule,
            MatListModule,
            MatSelectModule,
            MatDialogModule,
            DragDropModule,
            MatButtonToggleModule,
            MatSlideToggleModule,
          ],
        },
      ],
    },
  ],
});

/**
 * Generated bundle index. Do not edit.
 */

export { SolidQuizModule, ngxsFeatureModule, routerChildModule, routes };
//# sourceMappingURL=zentrumnawi-solid-quiz.mjs.map
