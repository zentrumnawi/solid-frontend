import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common';
import * as i2 from '@zentrumnawi/solid-core';
import * as i3 from '@angular/material/button';
import * as i4 from '@angular/material/radio';
import * as i5 from '@angular/material/icon';
export class SingleChoiceQuestionComponent {
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
        type: i1.NgForOf,
        selector: '[ngFor][ngForOf]',
        inputs: ['ngForOf', 'ngForTrackBy', 'ngForTemplate'],
      },
      {
        kind: 'directive',
        type: i1.NgIf,
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
        type: i3.MatButton,
        selector:
          '    button[mat-button], button[mat-raised-button], button[mat-flat-button],    button[mat-stroked-button]  ',
        inputs: ['disabled', 'disableRipple', 'color'],
        exportAs: ['matButton'],
      },
      {
        kind: 'directive',
        type: i4.MatRadioGroup,
        selector: 'mat-radio-group',
        exportAs: ['matRadioGroup'],
      },
      {
        kind: 'component',
        type: i4.MatRadioButton,
        selector: 'mat-radio-button',
        inputs: ['disableRipple', 'tabIndex'],
        exportAs: ['matRadioButton'],
      },
      {
        kind: 'component',
        type: i5.MatIcon,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlLWNob2ljZS1xdWVzdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3F1aXovc3JjL2xpYi9jb21wb25lbnRzL3NpbmdsZS1jaG9pY2UtcXVlc3Rpb24vc2luZ2xlLWNob2ljZS1xdWVzdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3F1aXovc3JjL2xpYi9jb21wb25lbnRzL3NpbmdsZS1jaG9pY2UtcXVlc3Rpb24vc2luZ2xlLWNob2ljZS1xdWVzdGlvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0FBU3ZCLE1BQU0sT0FBTyw2QkFBNkI7SUFDeEIsUUFBUSxDQUFnQjtJQUN2QixtQkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBRTNELGNBQWMsQ0FBVTtJQUN4QixXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFFbkIsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDcEUsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7WUFDaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7U0FDbEI7SUFDSCxDQUFDO0lBRU0sYUFBYSxDQUFDLENBQWlCO1FBQ3BDLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNoQyxDQUFDO0lBRU0sU0FBUyxDQUFDLEtBQWEsRUFBRSxJQUFnQjtRQUM5QyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVNLGVBQWUsQ0FBQyxNQUFrQjtRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFTSxpQkFBaUIsQ0FBQyxNQUFrQjtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVNLGtCQUFrQjtRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksU0FBUztZQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDOztZQUNsRCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3RDLElBQUksS0FBSyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLEtBQUssQ0FBQyxPQUFPO2dCQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLG1CQUFtQjtRQUN4QixJQUFJLElBQUksQ0FBQyxjQUFjLElBQUksU0FBUztZQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLENBQUM7dUdBbERVLDZCQUE2QjsyRkFBN0IsNkJBQTZCLHlMQ2hCMUMsdzhDQWdEQTs7MkZEaENhLDZCQUE2QjtrQkFMekMsU0FBUzsrQkFDRSxtQ0FBbUM7OEJBSzdCLFFBQVE7c0JBQXZCLEtBQUs7Z0JBQ1csbUJBQW1CO3NCQUFuQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPdXRwdXQsXHJcbiAgU2ltcGxlQ2hhbmdlcyxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0UmFkaW9DaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9yYWRpbyc7XHJcbmltcG9ydCB7IFF1aXpBbnN3ZXIsIFF1aXpRdWVzdGlvbiB9IGZyb20gJy4uLy4uL3N0YXRlL3F1aXoubW9kZWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzb2xpZC1xdWl6LXNpbmdsZS1jaG9pY2UtcXVlc3Rpb24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zaW5nbGUtY2hvaWNlLXF1ZXN0aW9uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zaW5nbGUtY2hvaWNlLXF1ZXN0aW9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTaW5nbGVDaG9pY2VRdWVzdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgcHVibGljIHF1ZXN0aW9uITogUXVpelF1ZXN0aW9uO1xyXG4gIEBPdXRwdXQoKSBwdWJsaWMgbmV4dFF1ZXN0aW9uQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG5cclxuICBwdWJsaWMgc2VsZWN0ZWRBbnN3ZXI/OiBudW1iZXI7XHJcbiAgcHVibGljIHNob3dBbnN3ZXJzID0gZmFsc2U7XHJcbiAgcHVibGljIGNvcnJlY3QgPSAwO1xyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZiAoY2hhbmdlcy5xdWVzdGlvbi5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzLnF1ZXN0aW9uLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkQW5zd2VyID0gdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLnNob3dBbnN3ZXJzID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuY29ycmVjdCA9IDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25SYWRpb0NoYW5nZShlOiBNYXRSYWRpb0NoYW5nZSkge1xyXG4gICAgdGhpcy5zZWxlY3RlZEFuc3dlciA9IGUudmFsdWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgdHJhY2tCeUZuKGluZGV4OiBudW1iZXIsIGl0ZW06IFF1aXpBbnN3ZXIpIHtcclxuICAgIHJldHVybiBpdGVtLmlkO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGlzQW5zd2VyQ29ycmVjdChhbnN3ZXI6IFF1aXpBbnN3ZXIpIHtcclxuICAgIGlmICghdGhpcy5zaG93QW5zd2Vycykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYW5zd2VyLmNvcnJlY3Q7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNBbnN3ZXJJbmNvcnJlY3QoYW5zd2VyOiBRdWl6QW5zd2VyKSB7XHJcbiAgICBpZiAoIXRoaXMuc2hvd0Fuc3dlcnMpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICFhbnN3ZXIuY29ycmVjdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblNob3dBbnN3ZXJzQ2xpY2soKSB7XHJcbiAgICB0aGlzLnNob3dBbnN3ZXJzID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkQW5zd2VyID09IHVuZGVmaW5lZCkgdGhpcy5jb3JyZWN0ID0gMDtcclxuICAgIGVsc2UgdGhpcy5jb3JyZWN0ID0gLTE7XHJcbiAgICB0aGlzLnF1ZXN0aW9uLmFuc3dlcnMuZm9yRWFjaCgodmFsdWUpID0+IHtcclxuICAgICAgaWYgKHZhbHVlLmlkID09IHRoaXMuc2VsZWN0ZWRBbnN3ZXIgJiYgdmFsdWUuY29ycmVjdCkgdGhpcy5jb3JyZWN0ID0gMTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uTmV4dFF1ZXN0aW9uQ2xpY2soKSB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZEFuc3dlciA9PSB1bmRlZmluZWQpIHRoaXMuY29ycmVjdCA9IDA7XHJcbiAgICB0aGlzLm5leHRRdWVzdGlvbkNsaWNrZWQuZW1pdCh0aGlzLmNvcnJlY3QpO1xyXG4gIH1cclxufVxyXG4iLCI8bWF0LXJhZGlvLWdyb3VwXHJcbiAgKGNoYW5nZSk9XCJvblJhZGlvQ2hhbmdlKCRldmVudClcIlxyXG4gIFtkaXNhYmxlZF09XCJzaG93QW5zd2Vyc1wiXHJcbiAgYXJpYS1sYWJlbD1cIlfDpGhsZSBlaW4gQW50d29ydCBhdXNcIlxyXG4gIGNvbG9yPVwicHJpbWFyeVwiXHJcbiAgY2xhc3M9XCJjb250YWluZXJcIlxyXG4+XHJcbiAgPG1hdC1yYWRpby1idXR0b25cclxuICAgICpuZ0Zvcj1cImxldCBhbnN3ZXIgb2YgcXVlc3Rpb24uYW5zd2VyczsgdHJhY2tCeTogdHJhY2tCeUZuXCJcclxuICAgIFtjbGFzcy5jb3JyZWN0XT1cImlzQW5zd2VyQ29ycmVjdChhbnN3ZXIpXCJcclxuICAgIFtjbGFzcy5pbmNvcnJlY3RdPVwiaXNBbnN3ZXJJbmNvcnJlY3QoYW5zd2VyKVwiXHJcbiAgICBbdmFsdWVdPVwiYW5zd2VyLmlkXCJcclxuICA+XHJcbiAgICA8c3BhbiBjbGFzcz1cImFuc3dlclwiIG1hcmtkb3duIFtkYXRhXT1cImFuc3dlci50ZXh0XCI+PC9zcGFuPlxyXG4gICAgPG1hdC1pY29uIGNsYXNzPVwiY29ycmVjdEljb25cIiAqbmdJZj1cInNob3dBbnN3ZXJzICYmIGFuc3dlci5jb3JyZWN0XCJcclxuICAgICAgPmNoZWNrX2NpcmNsZTwvbWF0LWljb25cclxuICAgID5cclxuICAgIDxtYXQtaWNvbiBjbGFzcz1cImluY29ycmVjdEljb25cIiAqbmdJZj1cInNob3dBbnN3ZXJzICYmICFhbnN3ZXIuY29ycmVjdFwiXHJcbiAgICAgID5oaWdobGlnaHRfb2ZmPC9tYXQtaWNvblxyXG4gICAgPlxyXG4gICAgPHNwYW5cclxuICAgICAgKm5nSWY9XCJzaG93QW5zd2VycyAmJiBzZWxlY3RlZEFuc3dlciA9PT0gYW5zd2VyLmlkXCJcclxuICAgICAgW2RhdGFdPVwiXHJcbiAgICAgICAgYW5zd2VyLmNvcnJlY3QgPyBhbnN3ZXIuZmVlZGJhY2tfY29ycmVjdCA6IGFuc3dlci5mZWVkYmFja19pbmNvcnJlY3RcclxuICAgICAgXCJcclxuICAgICAgbWFya2Rvd25cclxuICAgICAgY2xhc3M9XCJmZWVkYmFja1wiXHJcbiAgICA+PC9zcGFuPlxyXG4gIDwvbWF0LXJhZGlvLWJ1dHRvbj5cclxuPC9tYXQtcmFkaW8tZ3JvdXA+XHJcbjxidXR0b25cclxuICAoY2xpY2spPVwib25TaG93QW5zd2Vyc0NsaWNrKClcIlxyXG4gICpuZ0lmPVwiIXNob3dBbnN3ZXJzXCJcclxuICBjb2xvcj1cInByaW1hcnlcIlxyXG4gIG1hdC1yYWlzZWQtYnV0dG9uXHJcbiAgY2xhc3M9XCJzaG93QW5zd2VyQnRuXCJcclxuPlxyXG4gIEzDtnN1bmdlbiBhbnplaWdlblxyXG48L2J1dHRvbj5cclxuPGJ1dHRvblxyXG4gIChjbGljayk9XCJvbk5leHRRdWVzdGlvbkNsaWNrKClcIlxyXG4gICpuZ0lmPVwic2hvd0Fuc3dlcnNcIlxyXG4gIGNvbG9yPVwicHJpbWFyeVwiXHJcbiAgbWF0LXJhaXNlZC1idXR0b25cclxuICBjbGFzcz1cIm5leHRRdWVzdGlvbkJ0blwiXHJcbj5cclxuICB7eyBjb3JyZWN0ID09PSAxID8gJ1JpY2h0aWcsJyA6ICcgRmFsc2NoLCcgfX0gbsOkY2hzdGUgRnJhZ2VcclxuPC9idXR0b24+XHJcbiJdfQ==
