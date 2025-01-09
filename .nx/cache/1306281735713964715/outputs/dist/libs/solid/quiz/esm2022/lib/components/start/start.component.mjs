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
import {
  LoadQuizQuestions,
  StartQuizSession,
  ToggleExpertMode,
} from '../../state/quiz.actions';
import { Subject } from 'rxjs';
import { QuizState } from '../../state/quiz.state';
import { Navigate } from '@ngxs/router-plugin';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import * as i0 from '@angular/core';
import * as i1 from '@ngxs/store';
import * as i2 from '@angular/common';
import * as i3 from '@angular/forms';
import * as i4 from '@angular/material/button';
import * as i5 from '@angular/material/card';
import * as i6 from '@angular/material/progress-spinner';
import * as i7 from '@angular/material/icon';
import * as i8 from '@angular/material/slider';
import * as i9 from '@angular/material/chips';
import * as i10 from '@angular/material/button-toggle';
import * as i11 from '@angular/material/slide-toggle';
export class StartComponent {
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
    deps: [{ token: i1.Store }],
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
        type: i2.NgClass,
        selector: '[ngClass]',
        inputs: ['class', 'ngClass'],
      },
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
        type: i7.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'component',
        type: i8.MatSlider,
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
      { kind: 'pipe', type: i2.AsyncPipe, name: 'async' },
    ],
  });
}
__decorate(
  [Select(QuizState.getMeta), __metadata('design:type', Object)],
  StartComponent.prototype,
  'metaData$',
  void 0
);
__decorate(
  [Select(QuizState.getExpertMode), __metadata('design:type', Boolean)],
  StartComponent.prototype,
  'expertMode',
  void 0
);
__decorate(
  [
    Dispatch(),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String]),
    __metadata('design:returntype', Promise),
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
    return [{ type: i1.Store }];
  },
  propDecorators: { metaData$: [], expertMode: [], navigateTo: [] },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9xdWl6L3NyYy9saWIvY29tcG9uZW50cy9zdGFydC9zdGFydC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3F1aXovc3JjL2xpYi9jb21wb25lbnRzL3N0YXJ0L3N0YXJ0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzVDLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsZ0JBQWdCLEVBQ2hCLGdCQUFnQixHQUNqQixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRW5ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7Ozs7Ozs7Ozs7QUFVekQsTUFBTSxPQUFPLGNBQWM7SUFZTDtJQVhPLFNBQVMsQ0FBbUM7SUFDdEMsVUFBVSxDQUFtQjtJQUN0RCxVQUFVLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUNuQyxnQkFBZ0IsQ0FBVTtJQUMxQixhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQ25CLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFDaEIsZ0JBQWdCLEdBQWEsRUFBRSxDQUFDO0lBQ2hDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDZixJQUFJLEdBQWEsRUFBRSxDQUFDO0lBQ3BCLFlBQVksR0FBYSxFQUFFLENBQUM7SUFFNUIsWUFB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QURySDZCO0lBQTFCLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDOztpREFBNkM7QUFDdEM7SUFBaEMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7O2tEQUE4QjtBQW1EakQ7SUFEWixRQUFRLEVBQUU7Ozs7Z0RBR1Y7MkZBdkRVLGNBQWM7a0JBTDFCLFNBQVM7K0JBQ0Usa0JBQWtCOzRGQUtELFNBQVMsTUFDSCxVQUFVLE1BbUQ5QixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VsZWN0LCBTdG9yZSB9IGZyb20gJ0BuZ3hzL3N0b3JlJztcbmltcG9ydCB7XG4gIExvYWRRdWl6UXVlc3Rpb25zLFxuICBTdGFydFF1aXpTZXNzaW9uLFxuICBUb2dnbGVFeHBlcnRNb2RlLFxufSBmcm9tICcuLi8uLi9zdGF0ZS9xdWl6LmFjdGlvbnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUXVpelN0YXRlIH0gZnJvbSAnLi4vLi4vc3RhdGUvcXVpei5zdGF0ZSc7XG5pbXBvcnQgeyBRdWl6TWV0YWRhdGEgfSBmcm9tICcuLi8uLi9zdGF0ZS9xdWl6Lm1vZGVsJztcbmltcG9ydCB7IE5hdmlnYXRlIH0gZnJvbSAnQG5neHMvcm91dGVyLXBsdWdpbic7XG5pbXBvcnQgeyBEaXNwYXRjaCB9IGZyb20gJ0BuZ3hzLWxhYnMvZGlzcGF0Y2gtZGVjb3JhdG9yJztcbmltcG9ydCB7IE1hdEJ1dHRvblRvZ2dsZUNoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2J1dHRvbi10b2dnbGUnO1xuaW1wb3J0IHsgTWF0Q2hpcExpc3Rib3hDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGlwcyc7XG5pbXBvcnQgeyBNYXRTbGlkZXJDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zbGlkZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzb2xpZC1xdWl6LXN0YXJ0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3N0YXJ0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc3RhcnQuY29tcG9uZW50LnNjc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgU3RhcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIEBTZWxlY3QoUXVpelN0YXRlLmdldE1ldGEpIG1ldGFEYXRhJCE6IE9ic2VydmFibGU8UXVpek1ldGFkYXRhPiB8IG51bGw7XG4gIEBTZWxlY3QoUXVpelN0YXRlLmdldEV4cGVydE1vZGUpIGV4cGVydE1vZGUhOiBib29sZWFuIHwgZmFsc2U7XG4gIHByaXZhdGUgJGRlc3Ryb3llZCA9IG5ldyBTdWJqZWN0KCk7XG4gIGV4cGVydE1vZGVTdGF0dXM6IGJvb2xlYW47XG4gIHF1ZXN0aW9uQ291bnQgPSAxMDtcbiAgY2hvc2VuVGFncyA9IFtdO1xuICBjaG9zZW5EaWZmaWN1bHR5OiBudW1iZXJbXSA9IFtdO1xuICBpc1ZhbGlkID0gdHJ1ZTtcbiAgdGFnczogc3RyaW5nW10gPSBbXTtcbiAgZGlmZmljdWx0aWVzOiBudW1iZXJbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3N0b3JlOiBTdG9yZSkge1xuICAgIHRoaXMuZXhwZXJ0TW9kZVN0YXR1cyA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIG9uU3RhcnRDbGljaygpIHtcbiAgICBjb25zdCBxdWl6TG9hZGVkID0gdGhpcy5fc3RvcmUuZGlzcGF0Y2goXG4gICAgICBuZXcgTG9hZFF1aXpRdWVzdGlvbnMoXG4gICAgICAgIHRoaXMucXVlc3Rpb25Db3VudCxcbiAgICAgICAgdGhpcy5jaG9zZW5UYWdzLFxuICAgICAgICB0aGlzLmNob3NlbkRpZmZpY3VsdHlcbiAgICAgIClcbiAgICApO1xuICAgIHF1aXpMb2FkZWQuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMucXVpei5xdWVzdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChuZXcgU3RhcnRRdWl6U2Vzc2lvbih0aGlzLnF1ZXN0aW9uQ291bnQpKTtcbiAgICAgICAgdGhpcy5pc1ZhbGlkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fc3RvcmUuc2VsZWN0KFF1aXpTdGF0ZS5nZXRFeHBlcnRNb2RlKS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgIHRoaXMuZXhwZXJ0TW9kZVN0YXR1cyA9IGRhdGE7XG4gICAgfSk7XG4gICAgdGhpcy5tZXRhRGF0YSQ/LnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgY29uc3QgdGFncyA9IFsuLi5kYXRhLnRhZ3NdO1xuICAgICAgICBjb25zdCBkaWZmaWN1bHRpZXMgPSBbLi4uZGF0YS5kaWZmaWN1bHRpZXNdO1xuICAgICAgICB0aGlzLnRhZ3MgPSB0YWdzLnNvcnQoKTtcbiAgICAgICAgdGhpcy5kaWZmaWN1bHRpZXMgPSBkaWZmaWN1bHRpZXMuc29ydCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy4kZGVzdHJveWVkLm5leHQodHJ1ZSk7XG4gIH1cblxuICBARGlzcGF0Y2goKVxuICBwdWJsaWMgYXN5bmMgbmF2aWdhdGVUbyh1cmw6IHN0cmluZykge1xuICAgIHJldHVybiBuZXcgTmF2aWdhdGUoW3VybF0pO1xuICB9XG5cbiAgZXhwZXJ0TW9kZVRvZ2dsZSgpIHtcbiAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChuZXcgVG9nZ2xlRXhwZXJ0TW9kZSgpKTtcbiAgfVxuXG4gIG9uQmFja0J0bkNsaWNrKCkge1xuICAgIHRoaXMubmF2aWdhdGVUbygnLycpO1xuICB9XG5cbiAgb25TbGlkZXJDaGFuZ2UoY2hhbmdlOiBFdmVudCkge1xuICAgIC8vIGlmIChjaGFuZ2UudmFsdWUpIHRoaXMucXVlc3Rpb25Db3VudCA9IGNoYW5nZS52YWx1ZTtcbiAgICAvLyB0aGlzLmlzVmFsaWQgPSB0cnVlO1xuICB9XG5cbiAgb25CdXR0b25Ub2dnbGVDaGFuZ2UoY2hhbmdlOiBNYXRCdXR0b25Ub2dnbGVDaGFuZ2UpIHtcbiAgICB0aGlzLmNob3NlbkRpZmZpY3VsdHkgPSBjaGFuZ2UudmFsdWU7XG4gICAgdGhpcy5pc1ZhbGlkID0gdHJ1ZTtcbiAgfVxuXG4gIG9uVGFnU2VsZWN0aW9uQ2hhbmdlKGNoYW5nZTogTWF0Q2hpcExpc3Rib3hDaGFuZ2UpIHtcbiAgICB0aGlzLmNob3NlblRhZ3MgPSBjaGFuZ2UudmFsdWU7XG4gICAgdGhpcy5pc1ZhbGlkID0gdHJ1ZTtcbiAgfVxuXG4gIG9uRGVzZWxlY3RBbGxUYWdDbGljaygpIHtcbiAgICB0aGlzLmNob3NlblRhZ3MgPSBbXTtcbiAgfVxuXG4gIG9uRGVzZWxlY3RBbGxEaWZmaWN1bHR5Q2xpY2soKSB7XG4gICAgdGhpcy5jaG9zZW5EaWZmaWN1bHR5ID0gW107XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJ0b29sYmFyLWNvbnRhaW5lclwiPlxuICA8ZGl2IGNsYXNzPVwidG9vbGJhclwiPlxuICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIGNsYXNzPVwiYnV0dG9uLWJhY2tcIiAoY2xpY2spPVwib25CYWNrQnRuQ2xpY2soKVwiPlxuICAgICAgPG1hdC1pY29uPmFycm93X2JhY2s8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPlxuICAgICAgPGgyPlNlbGJzdHRlc3Q8L2gyPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuPG1hdC1jYXJkPlxuICA8bWF0LWNhcmQtY29udGVudCBjbGFzcz1cImNvbnRlbnQtY29udGFpbmVyXCI+XG4gICAgPHA+XG4gICAgICBNaXQgZGllc2VuIEZyYWdlbiBrYW5uIGRlciBwZXJzw7ZubGljaGUgV2lzc2Vuc3N0YW5kIGluIHZlcnNjaGllZGVuZW5cbiAgICAgIFRlaWxiZXJlaWNoZW4gw7xiZXJwcsO8ZnQgd2VyZGVuLiBEaWUgRnJhZ2VuIHdlcmRlbiB6dWbDpGxsaWcgYXVzIHVuc2VyZW1cbiAgICAgIEZyYWdlbnBvb2wgYXVzZ2V3w6RobHQuXG4gICAgPC9wPlxuICAgIDxwPlxuICAgICAgRGFzIEZlZWRiYWNrIGdpYnQgZ2VuYXVlcmUgSGlud2Vpc2UgZGFyw7xiZXIsIHdhcnVtIGRpZSBnZWdlYmVuZW4gQW50d29ydGVuXG4gICAgICBmYWxzY2ggKG9kZXIgcmljaHRpZykgd2FyZW4gdW5kIHplaWd0IHdlaXRlcmUgSGludGVyZ3J1bmRpbmZvcm1hdGlvbmVuXG4gICAgICBhdWYuXG4gICAgPC9wPlxuICAgIDxwPlxuICAgICAgRGFzIFF1aXoga2FubiBkaXJla3QgbWl0IGVpbmVyIEF1c3dhaGwgdm9uIDEwIEZyYWdlbiBnZXN0YXJ0ZXQgd2VyZGVuLlxuICAgIDwvcD5cbiAgICA8cD5cbiAgICAgIEltIDxlbT5FeHBlcnRlbm1vZHVzPC9lbT4ga8O2bm5lbiBGcmFnZW5hbnphaGwsIFNjaHdpZXJpZ2tlaXRzZ3JhZCB1bmRcbiAgICAgIFRoZW1lbmdlYmlldCBnZW5hdWVyIGVpbmdlc3RlbGx0IHdlcmRlbi5cbiAgICA8L3A+XG4gIDwvbWF0LWNhcmQtY29udGVudD5cbiAgPG1hdC1jYXJkLWFjdGlvbnMgKm5nSWY9XCJtZXRhRGF0YSQgfCBhc3luYyBhcyBtZXRhOyBlbHNlIHF1aXpMb2FkaW5nXCI+XG4gICAgPGRpdiBjbGFzcz1cImJ1dHRvbi1jb250YWluZXJcIj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgY2xhc3M9XCJzdGFydEJ0blwiXG4gICAgICAgIChjbGljayk9XCJvblN0YXJ0Q2xpY2soKVwiXG4gICAgICAgIG1hdC1yYWlzZWQtYnV0dG9uXG4gICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCIhaXNWYWxpZFwiXG4gICAgICA+XG4gICAgICAgIFF1aXogc3RhcnRlblxuICAgICAgPC9idXR0b24+XG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybUludmFsaWRcIiAqbmdJZj1cIiFpc1ZhbGlkXCI+XG4gICAgICAgIDxwPlxuICAgICAgICAgIE9vb3BzIC0gZXMgZ2lidCBrZWluZSBGcmFnZW4gbWl0IGRpZXNlbiBFaWdlbnNjaGFmdGVuLiBWZXJzdWNoZSBlaW5lXG4gICAgICAgICAgYW5kZXJlIEtvbWJpbmF0aW9uLlxuICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxtYXQtc2xpZGUtdG9nZ2xlXG4gICAgICAgIGNsYXNzPVwiZXhwQnRuXCJcbiAgICAgICAgW2NoZWNrZWRdPVwiZXhwZXJ0TW9kZVN0YXR1c1wiXG4gICAgICAgIChjaGFuZ2UpPVwiZXhwZXJ0TW9kZVRvZ2dsZSgpXCJcbiAgICAgID5cbiAgICAgICAgRXhwZXJ0ZW5tb2R1cyBha3RpdmllcmVuXG4gICAgICA8L21hdC1zbGlkZS10b2dnbGU+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbmZpZ1wiICpuZ0lmPVwiZXhwZXJ0TW9kZVN0YXR1c1wiPlxuICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbEhlYWRlclwiIGlkPVwicXVlc3Rpb25Db3VudFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXQtc3ViaGVhZGVyXCI+RnJhZ2VuYW56YWhsPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbEVsZW1lbnRcIiBpZD1cInF1ZXN0aW9uQ291bnRcIj5cbiAgICAgICAgICA8bWF0LXNsaWRlclxuICAgICAgICAgICAgbWluPVwiMVwiXG4gICAgICAgICAgICBtYXg9XCIzMFwiXG4gICAgICAgICAgICBzdGVwPVwiMVwiXG4gICAgICAgICAgICAoaW5wdXQpPVwib25TbGlkZXJDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICBbKG5nTW9kZWwpXT1cInF1ZXN0aW9uQ291bnRcIlxuICAgICAgICAgID5cbiAgICAgICAgICA8L21hdC1zbGlkZXI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImRpc3BsYXlWYWx1ZUJveFwiPlxuICAgICAgICAgICAge3sgcXVlc3Rpb25Db3VudCB9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbEhlYWRlclwiIGlkPVwiZGlmZmljdWx0eVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYXQtc3ViaGVhZGVyXCI+U2Nod2llcmlna2VpdHNncmFkPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICAgICAgICBjbGFzcz1cImRlc2VsZWN0QWxsQnRuXCJcbiAgICAgICAgICAgIChjbGljayk9XCJvbkRlc2VsZWN0QWxsRGlmZmljdWx0eUNsaWNrKClcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImNob3NlbkRpZmZpY3VsdHkubGVuZ3RoID09PSAwXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8bWF0LWljb24+cmVzdGFydF9hbHQ8L21hdC1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xFbGVtZW50XCIgaWQ9XCJkaWZmaWN1bHR5XCI+XG4gICAgICAgICAgPG1hdC1idXR0b24tdG9nZ2xlLWdyb3VwXG4gICAgICAgICAgICBjbGFzcz1cImRpZmZpY3VsdGllc1wiXG4gICAgICAgICAgICBtdWx0aXBsZVxuICAgICAgICAgICAgKGNoYW5nZSk9XCJvbkJ1dHRvblRvZ2dsZUNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgIFsobmdNb2RlbCldPVwiY2hvc2VuRGlmZmljdWx0eVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG1hdC1idXR0b24tdG9nZ2xlXG4gICAgICAgICAgICAgICpuZ0Zvcj1cImxldCBkaWZmaWN1bHR5IG9mIGRpZmZpY3VsdGllczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICAgICAgICAgIFt2YWx1ZV09XCJkaWZmaWN1bHR5XCJcbiAgICAgICAgICAgICAgPnt7IGRpZmZpY3VsdHkgfX08L21hdC1idXR0b24tdG9nZ2xlXG4gICAgICAgICAgICA+XG4gICAgICAgICAgPC9tYXQtYnV0dG9uLXRvZ2dsZS1ncm91cD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIiAqbmdJZj1cInRhZ3MubGVuZ3RoICE9PSAwXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sSGVhZGVyXCIgaWQ9XCJ0YWdcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0LXN1YmhlYWRlclwiPlRhZ3M8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgIGNsYXNzPVwiZGVzZWxlY3RBbGxCdG5cIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uRGVzZWxlY3RBbGxUYWdDbGljaygpXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJjaG9zZW5UYWdzLmxlbmd0aCA9PT0gMFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG1hdC1pY29uPnJlc3RhcnRfYWx0PC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sRWxlbWVudFwiIGlkPVwidGFnXCI+XG4gICAgICAgICAgPG1hdC1jaGlwLWxpc3Rib3hcbiAgICAgICAgICAgIHNlbGVjdGFibGU9XCJ0cnVlXCJcbiAgICAgICAgICAgIG11bHRpcGxlPVwidHJ1ZVwiXG4gICAgICAgICAgICAoY2hhbmdlKT1cIm9uVGFnU2VsZWN0aW9uQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJjaG9zZW5UYWdzXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8bWF0LWNoaXBcbiAgICAgICAgICAgICAgI2M9XCJtYXRDaGlwXCJcbiAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IHRhZyBvZiB0YWdzXCJcbiAgICAgICAgICAgICAgW3ZhbHVlXT1cInRhZ1wiXG4gICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInRhZ3MubGVuZ3RoID4gNiA/ICdtYXQtY2hpcC1zbWFsbCcgOiAnbWF0LWNoaXAtbGFyZ2UnXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3sgdGFnIH19XG4gICAgICAgICAgICA8L21hdC1jaGlwPlxuICAgICAgICAgIDwvbWF0LWNoaXAtbGlzdGJveD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9tYXQtY2FyZC1hY3Rpb25zPlxuPC9tYXQtY2FyZD5cbjxuZy10ZW1wbGF0ZSAjcXVpekxvYWRpbmc+XG4gIDxtYXQtY2FyZC1jb250ZW50PlxuICAgIDxtYXQtc3Bpbm5lciBjb2xvcj1cInByaW1hcnlcIj48L21hdC1zcGlubmVyPlxuICA8L21hdC1jYXJkLWNvbnRlbnQ+XG48L25nLXRlbXBsYXRlPlxuIl19
