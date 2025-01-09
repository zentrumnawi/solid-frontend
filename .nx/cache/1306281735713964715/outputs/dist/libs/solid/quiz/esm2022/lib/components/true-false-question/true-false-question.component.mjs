import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common';
import * as i2 from '@zentrumnawi/solid-core';
import * as i3 from '@angular/material/button';
import * as i4 from '@angular/material/icon';
export class TrueFalseQuestionComponent {
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
        kind: 'component',
        type: i4.MatIcon,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1ZS1mYWxzZS1xdWVzdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3F1aXovc3JjL2xpYi9jb21wb25lbnRzL3RydWUtZmFsc2UtcXVlc3Rpb24vdHJ1ZS1mYWxzZS1xdWVzdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3F1aXovc3JjL2xpYi9jb21wb25lbnRzL3RydWUtZmFsc2UtcXVlc3Rpb24vdHJ1ZS1mYWxzZS1xdWVzdGlvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxHQUVQLE1BQU0sZUFBZSxDQUFDOzs7Ozs7QUFRdkIsTUFBTSxPQUFPLDBCQUEwQjtJQUNyQixRQUFRLENBQWdCO0lBQ3ZCLG1CQUFtQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7SUFFM0QsY0FBYyxDQUFXO0lBQ3pCLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDcEIsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRWIsV0FBVyxDQUFDLE9BQXNCO1FBQ3ZDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDcEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNuQjtJQUNILENBQUM7SUFFTSxXQUFXO1FBQ2hCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFFTSxZQUFZO1FBQ2pCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7SUFFTSxrQkFBa0I7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUMzRCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztTQUNsQjthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNuQjtJQUNILENBQUM7SUFFTSxtQkFBbUI7UUFDeEIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQzt1R0FsQ1UsMEJBQTBCOzJGQUExQiwwQkFBMEIsc0xDZnZDLHEwRUFnRkE7OzJGRGpFYSwwQkFBMEI7a0JBTHRDLFNBQVM7K0JBQ0UsZ0NBQWdDOzhCQUsxQixRQUFRO3NCQUF2QixLQUFLO2dCQUNXLG1CQUFtQjtzQkFBbkMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT3V0cHV0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFF1aXpRdWVzdGlvbiB9IGZyb20gJy4uLy4uL3N0YXRlL3F1aXoubW9kZWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzb2xpZC1xdWl6LXRydWUtZmFsc2UtcXVlc3Rpb24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90cnVlLWZhbHNlLXF1ZXN0aW9uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90cnVlLWZhbHNlLXF1ZXN0aW9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUcnVlRmFsc2VRdWVzdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgcHVibGljIHF1ZXN0aW9uITogUXVpelF1ZXN0aW9uO1xyXG4gIEBPdXRwdXQoKSBwdWJsaWMgbmV4dFF1ZXN0aW9uQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG5cclxuICBwdWJsaWMgc2VsZWN0ZWRBbnN3ZXIhOiBib29sZWFuO1xyXG4gIHB1YmxpYyBzaG93QW5zd2VycyA9IGZhbHNlO1xyXG4gIHB1YmxpYyBjb3JyZWN0ID0gLTE7XHJcblxyXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XHJcbiAgICBpZiAoY2hhbmdlcy5xdWVzdGlvbi5wcmV2aW91c1ZhbHVlICE9PSBjaGFuZ2VzLnF1ZXN0aW9uLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICB0aGlzLnNob3dBbnN3ZXJzID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuY29ycmVjdCA9IC0xO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVHJ1ZUNsaWNrKCkge1xyXG4gICAgdGhpcy5zZWxlY3RlZEFuc3dlciA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25GYWxzZUNsaWNrKCkge1xyXG4gICAgdGhpcy5zZWxlY3RlZEFuc3dlciA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uU2hvd0Fuc3dlcnNDbGljaygpIHtcclxuICAgIHRoaXMuc2hvd0Fuc3dlcnMgPSB0cnVlO1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRBbnN3ZXIgPT0gdGhpcy5xdWVzdGlvbi5hbnN3ZXJzWzBdLmNvcnJlY3QpIHtcclxuICAgICAgdGhpcy5jb3JyZWN0ID0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY29ycmVjdCA9IC0xO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uTmV4dFF1ZXN0aW9uQ2xpY2soKSB7XHJcbiAgICB0aGlzLm5leHRRdWVzdGlvbkNsaWNrZWQuZW1pdCh0aGlzLmNvcnJlY3QpO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwiYnV0dG9uLWNvbnRhaW5lclwiPlxyXG4gIDxidXR0b25cclxuICAgIGNsYXNzPVwidHJ1ZUJ0blwiXHJcbiAgICBbZGlzYWJsZWRdPVwic2hvd0Fuc3dlcnNcIlxyXG4gICAgbWF0LXN0cm9rZWQtYnV0dG9uXHJcbiAgICBbY2xhc3MuY29ycmVjdFVuc2VsZWN0ZWRdPVwic2hvd0Fuc3dlcnMgJiYgcXVlc3Rpb24uYW5zd2Vyc1swXS5jb3JyZWN0XCJcclxuICAgIFtjbGFzcy5pbmNvcnJlY3RVbnNlbGVjdGVkXT1cInNob3dBbnN3ZXJzICYmICFxdWVzdGlvbi5hbnN3ZXJzWzBdLmNvcnJlY3RcIlxyXG4gICAgW2NsYXNzLmNvcnJlY3RTZWxlY3RlZF09XCJcclxuICAgICAgc2hvd0Fuc3dlcnMgJiYgcXVlc3Rpb24uYW5zd2Vyc1swXS5jb3JyZWN0ICYmIHNlbGVjdGVkQW5zd2VyXHJcbiAgICBcIlxyXG4gICAgW2NsYXNzLmluY29ycmVjdFNlbGVjdGVkXT1cIlxyXG4gICAgICBzaG93QW5zd2VycyAmJiAhcXVlc3Rpb24uYW5zd2Vyc1swXS5jb3JyZWN0ICYmIHNlbGVjdGVkQW5zd2VyXHJcbiAgICBcIlxyXG4gICAgKGNsaWNrKT1cIm9uVHJ1ZUNsaWNrKClcIlxyXG4gID5cclxuICAgIFdhaHJcclxuICA8L2J1dHRvbj5cclxuICA8YnV0dG9uXHJcbiAgICBjbGFzcz1cImZhbHNlQnRuXCJcclxuICAgIFtkaXNhYmxlZF09XCJzaG93QW5zd2Vyc1wiXHJcbiAgICBtYXQtc3Ryb2tlZC1idXR0b25cclxuICAgIFtjbGFzcy5jb3JyZWN0VW5zZWxlY3RlZF09XCJzaG93QW5zd2VycyAmJiAhcXVlc3Rpb24uYW5zd2Vyc1swXS5jb3JyZWN0XCJcclxuICAgIFtjbGFzcy5pbmNvcnJlY3RVbnNlbGVjdGVkXT1cInNob3dBbnN3ZXJzICYmIHF1ZXN0aW9uLmFuc3dlcnNbMF0uY29ycmVjdFwiXHJcbiAgICBbY2xhc3MuY29ycmVjdFNlbGVjdGVkXT1cIlxyXG4gICAgICBzaG93QW5zd2VycyAmJiAhcXVlc3Rpb24uYW5zd2Vyc1swXS5jb3JyZWN0ICYmICFzZWxlY3RlZEFuc3dlclxyXG4gICAgXCJcclxuICAgIFtjbGFzcy5pbmNvcnJlY3RTZWxlY3RlZF09XCJcclxuICAgICAgc2hvd0Fuc3dlcnMgJiYgcXVlc3Rpb24uYW5zd2Vyc1swXS5jb3JyZWN0ICYmICFzZWxlY3RlZEFuc3dlclxyXG4gICAgXCJcclxuICAgIChjbGljayk9XCJvbkZhbHNlQ2xpY2soKVwiXHJcbiAgPlxyXG4gICAgRmFsc2NoXHJcbiAgPC9idXR0b24+XHJcbjwvZGl2PlxyXG5cclxuPGRpdiBjbGFzcz1cImZlZWRiYWNrXCIgKm5nSWY9XCJzaG93QW5zd2Vyc1wiPlxyXG4gIDxtYXQtaWNvblxyXG4gICAgY2xhc3M9XCJjb3JyZWN0SWNvblwiXHJcbiAgICAqbmdJZj1cInF1ZXN0aW9uLmFuc3dlcnNbMF0uY29ycmVjdCA9PT0gc2VsZWN0ZWRBbnN3ZXIgJiYgc2hvd0Fuc3dlcnNcIlxyXG4gID5cclxuICAgIGNoZWNrXHJcbiAgPC9tYXQtaWNvbj5cclxuICA8bWF0LWljb25cclxuICAgIGNsYXNzPVwiaW5jb3JyZWN0SWNvblwiXHJcbiAgICAqbmdJZj1cInF1ZXN0aW9uLmFuc3dlcnNbMF0uY29ycmVjdCAhPT0gc2VsZWN0ZWRBbnN3ZXIgJiYgc2hvd0Fuc3dlcnNcIlxyXG4gID5cclxuICAgIGhpZ2hsaWdodF9vZmZcclxuICA8L21hdC1pY29uPlxyXG4gIDxzcGFuXHJcbiAgICBjbGFzcz1cImZlZWRiYWNrLXRleHRcIlxyXG4gICAgbWFya2Rvd25cclxuICAgIFtkYXRhXT1cIlxyXG4gICAgICBzZWxlY3RlZEFuc3dlciA9PT0gcXVlc3Rpb24uYW5zd2Vyc1swXS5jb3JyZWN0XHJcbiAgICAgICAgPyBxdWVzdGlvbi5hbnN3ZXJzWzBdLmZlZWRiYWNrX2NvcnJlY3RcclxuICAgICAgICA6IHF1ZXN0aW9uLmFuc3dlcnNbMF0uZmVlZGJhY2tfaW5jb3JyZWN0XHJcbiAgICBcIlxyXG4gID48L3NwYW4+XHJcbjwvZGl2PlxyXG5cclxuPGRpdj5cclxuICA8YnV0dG9uXHJcbiAgICBbZGlzYWJsZWRdPVwic2VsZWN0ZWRBbnN3ZXIgPT09IHVuZGVmaW5lZFwiXHJcbiAgICAoY2xpY2spPVwib25TaG93QW5zd2Vyc0NsaWNrKClcIlxyXG4gICAgKm5nSWY9XCIhc2hvd0Fuc3dlcnNcIlxyXG4gICAgY29sb3I9XCJwcmltYXJ5XCJcclxuICAgIG1hdC1yYWlzZWQtYnV0dG9uXHJcbiAgICBjbGFzcz1cInNob3dBbnN3ZXJCdG5cIlxyXG4gID5cclxuICAgIEzDtnN1bmdlbiBhbnplaWdlblxyXG4gIDwvYnV0dG9uPlxyXG4gIDxidXR0b25cclxuICAgIChjbGljayk9XCJvbk5leHRRdWVzdGlvbkNsaWNrKClcIlxyXG4gICAgKm5nSWY9XCJzaG93QW5zd2Vyc1wiXHJcbiAgICBjb2xvcj1cInByaW1hcnlcIlxyXG4gICAgbWF0LXJhaXNlZC1idXR0b25cclxuICAgIGNsYXNzPVwibmV4dFF1ZXN0aW9uQnRuXCJcclxuICA+XHJcbiAgICB7eyBjb3JyZWN0ID09PSAxID8gJ1JpY2h0aWcsJyA6ICcgRmFsc2NoLCcgfX0gbsOkY2hzdGUgRnJhZ2VcclxuICA8L2J1dHRvbj5cclxuPC9kaXY+XHJcbiJdfQ==
