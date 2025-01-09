import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common';
import * as i2 from '@angular/forms';
import * as i3 from '@zentrumnawi/solid-core';
import * as i4 from '@angular/material/button';
import * as i5 from '@angular/material/icon';
import * as i6 from '@angular/material/slider';
export class RangeQuestionComponent {
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
        type: i1.NgIf,
        selector: '[ngIf]',
        inputs: ['ngIf', 'ngIfThen', 'ngIfElse'],
      },
      {
        kind: 'directive',
        type: i2.NgControlStatus,
        selector: '[formControlName],[ngModel],[formControl]',
      },
      {
        kind: 'directive',
        type: i2.NgModel,
        selector: '[ngModel]:not([formControlName]):not([formControl])',
        inputs: ['name', 'disabled', 'ngModel', 'ngModelOptions'],
        outputs: ['ngModelChange'],
        exportAs: ['ngModel'],
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
        type: i5.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'component',
        type: i6.MatSlider,
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
        type: i6.MatSliderThumb,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UtcXVlc3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zb2xpZC9xdWl6L3NyYy9saWIvY29tcG9uZW50cy9yYW5nZS1xdWVzdGlvbi9yYW5nZS1xdWVzdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3F1aXovc3JjL2xpYi9jb21wb25lbnRzL3JhbmdlLXF1ZXN0aW9uL3JhbmdlLXF1ZXN0aW9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7Ozs7O0FBU3ZFLE1BQU0sT0FBTyxzQkFBc0I7SUFDakIsUUFBUSxDQUFnQjtJQUN2QixtQkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBRTNELE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNiLFdBQVcsQ0FBVztJQUN0QixjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBRXJELGtCQUFrQjtRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUV4QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDckQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQzFELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUMvQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFFL0MsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ3RCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQyxJQUFJLFNBQVM7Z0JBQzNELElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1NBQ3BCOztZQUFNLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRXhCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzdELE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDL0QsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM3RCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRWpELElBQUksTUFBTSxJQUFJLFlBQVksSUFBSSxZQUFZLElBQUksYUFBYSxFQUFFO2dCQUMzRCxNQUFNLGFBQWEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQzlELE1BQU0sVUFBVSxHQUFHLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxHQUFHLGFBQWEsQ0FBQztnQkFDeEQsTUFBTSxjQUFjLEdBQUcsQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7Z0JBQ3JELE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsR0FBRyxhQUFhLENBQUM7Z0JBRWhFLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFVBQVUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO2dCQUVqRCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxLQUFLLENBQUMsRUFBRTtvQkFDbEUsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsY0FBYyxHQUFHLElBQUksQ0FBQztvQkFDakQsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsVUFBVSxHQUFHLGNBQWMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2lCQUNsRTtxQkFBTTtvQkFDTCxZQUFZLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7aUJBQzFDO2dCQUVELElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLEtBQUssQ0FBQyxFQUFFO29CQUNsRSxhQUFhLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7aUJBQzNDO3FCQUFNO29CQUNMLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFdBQVcsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO2lCQUNwRDthQUNGO1FBQ0gsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFhO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVNLG1CQUFtQjtRQUN4QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDO3VHQXpEVSxzQkFBc0I7MkZBQXRCLHNCQUFzQiw0SkNUbkMsODNFQW9GQTs7MkZEM0VhLHNCQUFzQjtrQkFMbEMsU0FBUzsrQkFDRSwyQkFBMkI7OEJBS3JCLFFBQVE7c0JBQXZCLEtBQUs7Z0JBQ1csbUJBQW1CO3NCQUFuQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFNsaWRlckNoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlcic7XG5pbXBvcnQgeyBRdWl6UXVlc3Rpb24gfSBmcm9tICcuLi8uLi9zdGF0ZS9xdWl6Lm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc29saWQtcXVpei1yYW5nZS1xdWVzdGlvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9yYW5nZS1xdWVzdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3JhbmdlLXF1ZXN0aW9uLmNvbXBvbmVudC5zY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFJhbmdlUXVlc3Rpb25Db21wb25lbnQge1xuICBASW5wdXQoKSBwdWJsaWMgcXVlc3Rpb24hOiBRdWl6UXVlc3Rpb247XG4gIEBPdXRwdXQoKSBwdWJsaWMgbmV4dFF1ZXN0aW9uQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIHB1YmxpYyBjb3JyZWN0ID0gLTI7XG4gIHB1YmxpYyBzaG93QW5zd2VycyE6IGJvb2xlYW47XG4gIHB1YmxpYyBzbGlkZXJQb3NpdGlvbiA9IHRoaXMucXVlc3Rpb24/LmFuc3dlcnNbMF0ucmFuZ2VfbWluO1xuXG4gIHB1YmxpYyBvblNob3dBbnN3ZXJzQ2xpY2soKSB7XG4gICAgdGhpcy5zaG93QW5zd2VycyA9IHRydWU7XG5cbiAgICBjb25zdCB0b2xlcmFuY2UgPSB0aGlzLnF1ZXN0aW9uLmFuc3dlcnNbMF0udG9sZXJhbmNlO1xuICAgIGNvbnN0IGNvcnJlY3RWYWx1ZSA9IHRoaXMucXVlc3Rpb24uYW5zd2Vyc1swXS5yYW5nZV92YWx1ZTtcbiAgICBjb25zdCBtYXggPSB0aGlzLnF1ZXN0aW9uLmFuc3dlcnNbMF0ucmFuZ2VfbWF4O1xuICAgIGNvbnN0IG1pbiA9IHRoaXMucXVlc3Rpb24uYW5zd2Vyc1swXS5yYW5nZV9taW47XG5cbiAgICBpZiAodGhpcy5jb3JyZWN0ICE9IC0yKSB7XG4gICAgICBpZiAoTWF0aC5hYnModGhpcy5zbGlkZXJQb3NpdGlvbiAtIGNvcnJlY3RWYWx1ZSkgPD0gdG9sZXJhbmNlKVxuICAgICAgICB0aGlzLmNvcnJlY3QgPSAxO1xuICAgIH0gZWxzZSB0aGlzLmNvcnJlY3QgPSAwO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCBjb3JyZWN0VGh1bWIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29ycmVjdFRodW1iJyk7XG4gICAgICBjb25zdCBzZWxlY3RlZFRodW1iID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdGVkVGh1bWInKTtcbiAgICAgIGNvbnN0IHRvbGVyYW5jZUJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2xlcmFuY2VCYXInKTtcbiAgICAgIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZXInKTtcblxuICAgICAgaWYgKHNsaWRlciAmJiBjb3JyZWN0VGh1bWIgJiYgdG9sZXJhbmNlQmFyICYmIHNlbGVjdGVkVGh1bWIpIHtcbiAgICAgICAgY29uc3Qgc2NhbGluZ0ZhY3RvciA9IChzbGlkZXIub2Zmc2V0V2lkdGggLSAxNCkgLyAobWF4IC0gbWluKTtcbiAgICAgICAgY29uc3QgY29ycmVjdFBvcyA9IChjb3JyZWN0VmFsdWUgLSBtaW4pICogc2NhbGluZ0ZhY3RvcjtcbiAgICAgICAgY29uc3QgdG9sZXJhbmNlV2lkdGggPSAyICogdG9sZXJhbmNlICogc2NhbGluZ0ZhY3RvcjtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRQb3MgPSAodGhpcy5zbGlkZXJQb3NpdGlvbiAtIG1pbikgKiBzY2FsaW5nRmFjdG9yO1xuXG4gICAgICAgIGNvcnJlY3RUaHVtYi5zdHlsZS5sZWZ0ID0gY29ycmVjdFBvcyAtIDEwICsgJ3B4JztcblxuICAgICAgICBpZiAodGhpcy5jb3JyZWN0ID09PSAxICYmIHRoaXMuc2xpZGVyUG9zaXRpb24gLSBjb3JyZWN0VmFsdWUgIT09IDApIHtcbiAgICAgICAgICB0b2xlcmFuY2VCYXIuc3R5bGUud2lkdGggPSB0b2xlcmFuY2VXaWR0aCArICdweCc7XG4gICAgICAgICAgdG9sZXJhbmNlQmFyLnN0eWxlLmxlZnQgPSBjb3JyZWN0UG9zIC0gdG9sZXJhbmNlV2lkdGggLyAyICsgJ3B4JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b2xlcmFuY2VCYXIuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY29ycmVjdCA9PT0gMCB8fCB0aGlzLnNsaWRlclBvc2l0aW9uIC0gY29ycmVjdFZhbHVlID09PSAwKSB7XG4gICAgICAgICAgc2VsZWN0ZWRUaHVtYi5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZWN0ZWRUaHVtYi5zdHlsZS5sZWZ0ID0gc2VsZWN0ZWRQb3MgLSAxMCArICdweCc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCA1KTtcbiAgfVxuXG4gIG9uU2xpZGVyQ2hhbmdlKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLmNvcnJlY3QgPSAtMTtcbiAgfVxuXG4gIHB1YmxpYyBvbk5leHRRdWVzdGlvbkNsaWNrKCkge1xuICAgIHRoaXMubmV4dFF1ZXN0aW9uQ2xpY2tlZC5lbWl0KHRoaXMuY29ycmVjdCk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJ2aXN1YWxGZWVkYmFja0NvbnRhaW5lclwiPlxuICA8ZGl2XG4gICAgaWQ9XCJjb3JyZWN0VGh1bWJcIlxuICAgICpuZ0lmPVwic2hvd0Fuc3dlcnNcIlxuICAgIFtjbGFzcy5jb3JyZWN0XT1cImNvcnJlY3QgPT09IDFcIlxuICAgIFtjbGFzcy5pbmNvcnJlY3RdPVwiY29ycmVjdCA9PT0gLTEgfHwgY29ycmVjdCA9PT0gMFwiXG4gID5cbiAgICA8cD57eyBxdWVzdGlvbi5hbnN3ZXJzWzBdLnJhbmdlX3ZhbHVlIH19PC9wPlxuICA8L2Rpdj5cbiAgPGRpdiBpZD1cInRvbGVyYW5jZUJhclwiICpuZ0lmPVwic2hvd0Fuc3dlcnNcIj48L2Rpdj5cbjwvZGl2PlxuPGRpdiBjbGFzcz1cInJhbmdlLWNvbnRhaW5lclwiPlxuICA8c3BhblxuICAgIGNsYXNzPVwibWluVGlja1wiXG4gICAgW2NsYXNzLmNvcnJlY3RdPVwic2hvd0Fuc3dlcnMgJiYgY29ycmVjdCA9PT0gMVwiXG4gICAgW2NsYXNzLmluY29ycmVjdF09XCIoc2hvd0Fuc3dlcnMgJiYgY29ycmVjdCA9PT0gLTEpIHx8IGNvcnJlY3QgPT09IDBcIlxuICA+PC9zcGFuPlxuICA8cCBjbGFzcz1cIm1pbkxhYmVsXCI+e3sgcXVlc3Rpb24uYW5zd2Vyc1swXS5yYW5nZV9taW4gfX08L3A+XG5cbiAgPG1hdC1zbGlkZXJcbiAgICBpZD1cInNsaWRlclwiXG4gICAgdGh1bWJMYWJlbFxuICAgIFtkaXNhYmxlZF09XCJzaG93QW5zd2Vyc1wiXG4gICAgW21pbl09XCJxdWVzdGlvbi5hbnN3ZXJzWzBdLnJhbmdlX21pblwiXG4gICAgW21heF09XCJxdWVzdGlvbi5hbnN3ZXJzWzBdLnJhbmdlX21heFwiXG4gICAgW3N0ZXBdPVwicXVlc3Rpb24uYW5zd2Vyc1swXS5yYW5nZV9zdGVwXCJcbiAgICBbY2xhc3MuY29ycmVjdFJhbmdlXT1cInNob3dBbnN3ZXJzICYmIGNvcnJlY3QgPT09IDFcIlxuICAgIFtjbGFzcy5pbmNvcnJlY3RSYW5nZV09XCIoc2hvd0Fuc3dlcnMgJiYgY29ycmVjdCA9PT0gLTEpIHx8IGNvcnJlY3QgPT09IDBcIlxuICAgIFsobmdNb2RlbCldPVwic2xpZGVyUG9zaXRpb25cIlxuICA+XG4gICAgPGlucHV0ICh2YWx1ZUNoYW5nZSk9XCJvblNsaWRlckNoYW5nZSgkZXZlbnQpXCIgbWF0U2xpZGVyVGh1bWIgLz5cbiAgPC9tYXQtc2xpZGVyPlxuICA8cCBjbGFzcz1cIm1heExhYmVsXCI+e3sgcXVlc3Rpb24uYW5zd2Vyc1swXS5yYW5nZV9tYXggfX08L3A+XG4gIDxzcGFuIGNsYXNzPVwibWF4VGlja1wiPjwvc3Bhbj5cbjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwidmlzdWFsRmVlZGJhY2tDb250YWluZXJcIj5cbiAgPGRpdlxuICAgIGlkPVwic2VsZWN0ZWRUaHVtYlwiXG4gICAgW2NsYXNzLmNvcnJlY3RdPVwic2hvd0Fuc3dlcnMgJiYgY29ycmVjdCA9PT0gMVwiXG4gICAgW2NsYXNzLmluY29ycmVjdF09XCIoc2hvd0Fuc3dlcnMgJiYgY29ycmVjdCA9PT0gLTEpIHx8IGNvcnJlY3QgPT09IDBcIlxuICAgICpuZ0lmPVwic2hvd0Fuc3dlcnNcIlxuICA+XG4gICAgPHA+e3sgc2xpZGVyUG9zaXRpb24gfX08L3A+XG4gIDwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJmZWVkYmFjay1jb250YWluZXJcIiAqbmdJZj1cInNob3dBbnN3ZXJzXCI+XG4gIDxtYXQtaWNvbiBjbGFzcz1cImNvcnJlY3RJY29uXCIgKm5nSWY9XCJjb3JyZWN0ID09PSAxXCI+IGNoZWNrX2NpcmNsZSA8L21hdC1pY29uPlxuICA8bWF0LWljb24gY2xhc3M9XCJpbmNvcnJlY3RJY29uXCIgKm5nSWY9XCJjb3JyZWN0ID09PSAtMSB8fCBjb3JyZWN0ID09PSAwXCI+XG4gICAgaGlnaGxpZ2h0X29mZlxuICA8L21hdC1pY29uPlxuICA8c3BhblxuICAgIGNsYXNzPVwiZmVlZGJhY2tcIlxuICAgIG1hcmtkb3duXG4gICAgW2RhdGFdPVwiXG4gICAgICBjb3JyZWN0ID09PSAxXG4gICAgICAgID8gdGhpcy5xdWVzdGlvbi5hbnN3ZXJzWzBdLmZlZWRiYWNrX2NvcnJlY3RcbiAgICAgICAgOiB0aGlzLnF1ZXN0aW9uLmFuc3dlcnNbMF0uZmVlZGJhY2tfaW5jb3JyZWN0XG4gICAgXCJcbiAgPlxuICA8L3NwYW4+XG48L2Rpdj5cblxuPGRpdj5cbiAgPGJ1dHRvblxuICAgIChjbGljayk9XCJvblNob3dBbnN3ZXJzQ2xpY2soKVwiXG4gICAgKm5nSWY9XCIhc2hvd0Fuc3dlcnNcIlxuICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgbWF0LXJhaXNlZC1idXR0b25cbiAgICBjbGFzcz1cInNob3dBbnN3ZXJCdG5cIlxuICA+XG4gICAgTMO2c3VuZ2VuIGFuemVpZ2VuXG4gIDwvYnV0dG9uPlxuICA8YnV0dG9uXG4gICAgKGNsaWNrKT1cIm9uTmV4dFF1ZXN0aW9uQ2xpY2soKVwiXG4gICAgKm5nSWY9XCJzaG93QW5zd2Vyc1wiXG4gICAgY29sb3I9XCJwcmltYXJ5XCJcbiAgICBtYXQtcmFpc2VkLWJ1dHRvblxuICAgIGNsYXNzPVwibmV4dFF1ZXN0aW9uQnRuXCJcbiAgPlxuICAgIHt7IGNvcnJlY3QgPT09IDEgPyAnUmljaHRpZywnIDogJyBGYWxzY2gsJyB9fSBuw6RjaHN0ZSBGcmFnZVxuICA8L2J1dHRvbj5cbjwvZGl2PlxuIl19
