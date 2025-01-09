import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common';
import * as i2 from '@zentrumnawi/solid-core';
import * as i3 from '@angular/material/button';
import * as i4 from '@angular/material/checkbox';
export class MultipleChoiceQuestionComponent {
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
        kind: 'component',
        type: i4.MatCheckbox,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlwbGUtY2hvaWNlLXF1ZXN0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2xpYnMvc29saWQvcXVpei9zcmMvbGliL2NvbXBvbmVudHMvbXVsdGlwbGUtY2hvaWNlLXF1ZXN0aW9uL211bHRpcGxlLWNob2ljZS1xdWVzdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3F1aXovc3JjL2xpYi9jb21wb25lbnRzL211bHRpcGxlLWNob2ljZS1xdWVzdGlvbi9tdWx0aXBsZS1jaG9pY2UtcXVlc3Rpb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sR0FFUCxNQUFNLGVBQWUsQ0FBQzs7Ozs7O0FBU3ZCLE1BQU0sT0FBTywrQkFBK0I7SUFDMUIsUUFBUSxDQUFnQjtJQUN2QixtQkFBbUIsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBRTNELGVBQWUsR0FBYSxFQUFFLENBQUM7SUFDL0IsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUNwQixPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBRVosV0FBVyxDQUFDLE9BQXNCO1FBQ3ZDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEtBQUssT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7WUFDcEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7U0FDbEI7SUFDSCxDQUFDO0lBRU0sY0FBYyxDQUFDLENBQW9CLEVBQUUsTUFBa0I7UUFDNUQsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQ2IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3RDO2FBQU07WUFDTCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUNoRCxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxLQUFLLE1BQU0sQ0FBQyxFQUFFLENBQ3pCLENBQUM7U0FDSDtJQUNILENBQUM7SUFFTSxlQUFlLENBQUMsTUFBa0I7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRU0saUJBQWlCLENBQUMsTUFBa0I7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUNELE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ3pCLENBQUM7SUFFTSxTQUFTLENBQUMsS0FBYSxFQUFFLElBQWdCO1FBQzlDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRU0sa0JBQWtCO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUN2QyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7Z0JBQ2xCLGNBQWMsRUFBRSxDQUFDO2dCQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUM3QyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNuQjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxLQUFLLGNBQWMsRUFBRTtZQUNsRCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ25CO0lBQ0gsQ0FBQztJQUVNLG1CQUFtQjtRQUN4QixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxJQUFJLENBQUM7WUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDO3VHQWxFVSwrQkFBK0I7MkZBQS9CLCtCQUErQiwyTENoQjVDLHMrQ0FnREE7OzJGRGhDYSwrQkFBK0I7a0JBTDNDLFNBQVM7K0JBQ0UscUNBQXFDOzhCQUsvQixRQUFRO3NCQUF2QixLQUFLO2dCQUNXLG1CQUFtQjtzQkFBbkMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT3V0cHV0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdENoZWNrYm94Q2hhbmdlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hlY2tib3gnO1xyXG5pbXBvcnQgeyBRdWl6QW5zd2VyLCBRdWl6UXVlc3Rpb24gfSBmcm9tICcuLi8uLi9zdGF0ZS9xdWl6Lm1vZGVsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc29saWQtcXVpei1tdWx0aXBsZS1jaG9pY2UtcXVlc3Rpb24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9tdWx0aXBsZS1jaG9pY2UtcXVlc3Rpb24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL211bHRpcGxlLWNob2ljZS1xdWVzdGlvbi5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTXVsdGlwbGVDaG9pY2VRdWVzdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgcHVibGljIHF1ZXN0aW9uITogUXVpelF1ZXN0aW9uO1xyXG4gIEBPdXRwdXQoKSBwdWJsaWMgbmV4dFF1ZXN0aW9uQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG5cclxuICBwdWJsaWMgc2VsZWN0ZWRBbnN3ZXJzOiBudW1iZXJbXSA9IFtdO1xyXG4gIHB1YmxpYyBzaG93QW5zd2VycyA9IGZhbHNlO1xyXG4gIHB1YmxpYyBjb3JyZWN0ID0gMDtcclxuXHJcbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgIGlmIChjaGFuZ2VzLnF1ZXN0aW9uLnByZXZpb3VzVmFsdWUgIT09IGNoYW5nZXMucXVlc3Rpb24uY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMuc2hvd0Fuc3dlcnMgPSBmYWxzZTtcclxuICAgICAgdGhpcy5zZWxlY3RlZEFuc3dlcnMgPSBbXTtcclxuICAgICAgdGhpcy5jb3JyZWN0ID0gMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblNlbGVjdENoYW5nZShlOiBNYXRDaGVja2JveENoYW5nZSwgYW5zd2VyOiBRdWl6QW5zd2VyKSB7XHJcbiAgICBpZiAoZS5jaGVja2VkKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRBbnN3ZXJzLnB1c2goYW5zd2VyLmlkKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRBbnN3ZXJzID0gdGhpcy5zZWxlY3RlZEFuc3dlcnMuZmlsdGVyKFxyXG4gICAgICAgIChpZCkgPT4gaWQgIT09IGFuc3dlci5pZFxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGlzQW5zd2VyQ29ycmVjdChhbnN3ZXI6IFF1aXpBbnN3ZXIpIHtcclxuICAgIGlmICghdGhpcy5zaG93QW5zd2Vycykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYW5zd2VyLmNvcnJlY3Q7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNBbnN3ZXJJbmNvcnJlY3QoYW5zd2VyOiBRdWl6QW5zd2VyKSB7XHJcbiAgICBpZiAoIXRoaXMuc2hvd0Fuc3dlcnMpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICFhbnN3ZXIuY29ycmVjdDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB0cmFja0J5Rm4oaW5kZXg6IG51bWJlciwgaXRlbTogUXVpekFuc3dlcikge1xyXG4gICAgcmV0dXJuIGl0ZW0uaWQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb25TaG93QW5zd2Vyc0NsaWNrKCkge1xyXG4gICAgdGhpcy5zaG93QW5zd2VycyA9IHRydWU7XHJcbiAgICB0aGlzLmNvcnJlY3QgPSAxO1xyXG5cclxuICAgIGxldCBjb3JyZWN0QW5zd2VycyA9IDA7XHJcbiAgICB0aGlzLnF1ZXN0aW9uLmFuc3dlcnMuZm9yRWFjaCgoYW5zd2VyKSA9PiB7XHJcbiAgICAgIGlmIChhbnN3ZXIuY29ycmVjdCkge1xyXG4gICAgICAgIGNvcnJlY3RBbnN3ZXJzKys7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNlbGVjdGVkQW5zd2Vycy5pbmNsdWRlcyhhbnN3ZXIuaWQpKSB7XHJcbiAgICAgICAgICB0aGlzLmNvcnJlY3QgPSAtMTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLnNlbGVjdGVkQW5zd2Vycy5sZW5ndGggIT09IGNvcnJlY3RBbnN3ZXJzKSB7XHJcbiAgICAgIHRoaXMuY29ycmVjdCA9IC0xO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uTmV4dFF1ZXN0aW9uQ2xpY2soKSB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZEFuc3dlcnMubGVuZ3RoID09IDApIHRoaXMuY29ycmVjdCA9IDA7XHJcbiAgICB0aGlzLm5leHRRdWVzdGlvbkNsaWNrZWQuZW1pdCh0aGlzLmNvcnJlY3QpO1xyXG4gIH1cclxufVxyXG4iLCI8bWF0LWNoZWNrYm94XHJcbiAgKGNoYW5nZSk9XCJvblNlbGVjdENoYW5nZSgkZXZlbnQsIGFuc3dlcilcIlxyXG4gICpuZ0Zvcj1cImxldCBhbnN3ZXIgb2YgcXVlc3Rpb24uYW5zd2VyczsgdHJhY2tCeTogdHJhY2tCeUZuXCJcclxuICBbY2hlY2tlZF09XCJpc0Fuc3dlckNvcnJlY3QoYW5zd2VyKVwiXHJcbiAgW2NsYXNzLmNvcnJlY3RTZWxlY3RlZF09XCJcclxuICAgIGlzQW5zd2VyQ29ycmVjdChhbnN3ZXIpICYmIHNlbGVjdGVkQW5zd2Vycy5pbmNsdWRlcyhhbnN3ZXIuaWQpXHJcbiAgXCJcclxuICBbY2xhc3MuaW5jb3JyZWN0U2VsZWN0ZWRdPVwiXHJcbiAgICBpc0Fuc3dlckluY29ycmVjdChhbnN3ZXIpICYmIHNlbGVjdGVkQW5zd2Vycy5pbmNsdWRlcyhhbnN3ZXIuaWQpXHJcbiAgXCJcclxuICBbY2xhc3MuY29ycmVjdFVuc2VsZWN0ZWRdPVwiXHJcbiAgICBpc0Fuc3dlckNvcnJlY3QoYW5zd2VyKSAmJiAhc2VsZWN0ZWRBbnN3ZXJzLmluY2x1ZGVzKGFuc3dlci5pZClcclxuICBcIlxyXG4gIFtjbGFzcy5pbmNvcnJlY3RVbnNlbGVjdGVkXT1cIlxyXG4gICAgaXNBbnN3ZXJJbmNvcnJlY3QoYW5zd2VyKSAmJiAhc2VsZWN0ZWRBbnN3ZXJzLmluY2x1ZGVzKGFuc3dlci5pZClcclxuICBcIlxyXG4gIFtkaXNhYmxlZF09XCJzaG93QW5zd2Vyc1wiXHJcbiAgW2luZGV0ZXJtaW5hdGVdPVwiaXNBbnN3ZXJJbmNvcnJlY3QoYW5zd2VyKVwiXHJcbiAgY29sb3I9XCJwcmltYXJ5XCJcclxuPlxyXG4gIDxzcGFuIGNsYXNzPVwiYW5zd2VyXCIgbWFya2Rvd24gW2RhdGFdPVwiYW5zd2VyLnRleHRcIj48L3NwYW4+XHJcbiAgPHNwYW5cclxuICAgIGNsYXNzPVwiZmVlZGJhY2tcIlxyXG4gICAgKm5nSWY9XCJzaG93QW5zd2VycyAmJiBzZWxlY3RlZEFuc3dlcnMuaW5jbHVkZXMoYW5zd2VyLmlkKVwiXHJcbiAgICBbZGF0YV09XCJcclxuICAgICAgYW5zd2VyLmNvcnJlY3QgPyBhbnN3ZXIuZmVlZGJhY2tfY29ycmVjdCA6IGFuc3dlci5mZWVkYmFja19pbmNvcnJlY3RcclxuICAgIFwiXHJcbiAgICBtYXJrZG93blxyXG4gID48L3NwYW4+XHJcbjwvbWF0LWNoZWNrYm94PlxyXG48YnV0dG9uXHJcbiAgKGNsaWNrKT1cIm9uU2hvd0Fuc3dlcnNDbGljaygpXCJcclxuICAqbmdJZj1cIiFzaG93QW5zd2Vyc1wiXHJcbiAgY29sb3I9XCJwcmltYXJ5XCJcclxuICBtYXQtcmFpc2VkLWJ1dHRvblxyXG4gIGNsYXNzPVwic2hvd0Fuc3dlckJ0blwiXHJcbj5cclxuICBMw7ZzdW5nZW4gYW56ZWlnZW5cclxuPC9idXR0b24+XHJcbjxidXR0b25cclxuICAoY2xpY2spPVwib25OZXh0UXVlc3Rpb25DbGljaygpXCJcclxuICAqbmdJZj1cInNob3dBbnN3ZXJzXCJcclxuICBjb2xvcj1cInByaW1hcnlcIlxyXG4gIG1hdC1yYWlzZWQtYnV0dG9uXHJcbiAgY2xhc3M9XCJuZXh0UXVlc3Rpb25CdG5cIlxyXG4+XHJcbiAge3sgY29ycmVjdCA9PT0gMSA/ICdSaWNodGlnLCcgOiAnIEZhbHNjaCwnIH19IG7DpGNoc3RlIEZyYWdlXHJcbjwvYnV0dG9uPlxyXG4iXX0=
