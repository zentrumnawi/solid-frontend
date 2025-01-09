import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from '@angular/core';
import * as i1 from '@angular/common';
import * as i2 from '@zentrumnawi/solid-core';
import * as i3 from '@angular/material/button';
import * as i4 from '@angular/material/icon';
import * as i5 from '@angular/cdk/drag-drop';
export class RankingQuestionComponent {
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
        type: i4.MatIcon,
        selector: 'mat-icon',
        inputs: ['color', 'inline', 'svgIcon', 'fontSet', 'fontIcon'],
        exportAs: ['matIcon'],
      },
      {
        kind: 'directive',
        type: i5.CdkDropList,
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
        type: i5.CdkDrag,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFua2luZy1xdWVzdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3F1aXovc3JjL2xpYi9jb21wb25lbnRzL3JhbmtpbmctcXVlc3Rpb24vcmFua2luZy1xdWVzdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NvbGlkL3F1aXovc3JjL2xpYi9jb21wb25lbnRzL3JhbmtpbmctcXVlc3Rpb24vcmFua2luZy1xdWVzdGlvbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEUsT0FBTyxFQUNMLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sR0FFUCxNQUFNLGVBQWUsQ0FBQzs7Ozs7OztBQVF2QixNQUFNLE9BQU8sd0JBQXdCO0lBQ25CLFFBQVEsQ0FBZ0I7SUFDdkIsbUJBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUUzRCxXQUFXLENBQVc7SUFDdEIsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNaLEtBQUssQ0FBVTtJQUVmLFdBQVcsR0FBVSxFQUFFLENBQUM7SUFFeEIsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUN2QixXQUFXLEdBQWEsRUFBRSxDQUFDO0lBRWxDLFFBQVE7UUFDTixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3JELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO2dCQUNwQixJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFDbkMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFFBQVEs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LE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDO0lBQ3pFLENBQUM7SUFFTSxtQkFBbUIsQ0FBQyxNQUFXO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3JCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFDRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUM7SUFDekUsQ0FBQztJQUVNLG1CQUFtQjtRQUN4QixJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDO3VHQXBGVSx3QkFBd0I7MkZBQXhCLHdCQUF3QixtTENqQnJDLGk5RUFvRkE7OzJGRG5FYSx3QkFBd0I7a0JBTHBDLFNBQVM7K0JBQ0UsNkJBQTZCOzhCQUt2QixRQUFRO3NCQUF2QixLQUFLO2dCQUNXLG1CQUFtQjtzQkFBbkMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENka0RyYWdEcm9wLCBtb3ZlSXRlbUluQXJyYXkgfSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcclxuaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFF1aXpRdWVzdGlvbiB9IGZyb20gJy4uLy4uL3N0YXRlL3F1aXoubW9kZWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdzb2xpZC1xdWl6LXJhbmtpbmctcXVlc3Rpb24nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9yYW5raW5nLXF1ZXN0aW9uLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9yYW5raW5nLXF1ZXN0aW9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBSYW5raW5nUXVlc3Rpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgcHVibGljIHF1ZXN0aW9uITogUXVpelF1ZXN0aW9uO1xyXG4gIEBPdXRwdXQoKSBwdWJsaWMgbmV4dFF1ZXN0aW9uQ2xpY2tlZCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG5cclxuICBwdWJsaWMgc2hvd0Fuc3dlcnMhOiBib29sZWFuO1xyXG4gIHB1YmxpYyBjb3JyZWN0ID0gMDtcclxuICBwdWJsaWMgaW5kZXghOiBudW1iZXI7XHJcblxyXG4gIHB1YmxpYyBhbnN3ZXJzTGlzdDogYW55W10gPSBbXTtcclxuXHJcbiAgcHVibGljIGhhc1N1YnNlcXVlbmNlID0gZmFsc2U7XHJcbiAgcHVibGljIHN1YnNlcXVlbmNlOiBudW1iZXJbXSA9IFtdO1xyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5xdWVzdGlvbi5hbnN3ZXJzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgIHRoaXMuYW5zd2Vyc0xpc3QucHVzaCh7XHJcbiAgICAgICAgdGV4dDogdGhpcy5xdWVzdGlvbi5hbnN3ZXJzW2ldLnRleHQsXHJcbiAgICAgICAgY29ycmVjdF9wb3NpdGlvbjogdGhpcy5xdWVzdGlvbi5hbnN3ZXJzW2ldLnJhbmtpbmdfcG9zaXRpb24sXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgaWYgKGNoYW5nZXMucXVlc3Rpb24ucHJldmlvdXNWYWx1ZSAhPT0gY2hhbmdlcy5xdWVzdGlvbi5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgdGhpcy5zaG93QW5zd2VycyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmNvcnJlY3QgPSAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZHJvcChldmVudDogQ2RrRHJhZ0Ryb3A8YW55W10+KSB7XHJcbiAgICB0aGlzLmNvcnJlY3QgPSAtMTtcclxuICAgIG1vdmVJdGVtSW5BcnJheSh0aGlzLmFuc3dlcnNMaXN0LCBldmVudC5wcmV2aW91c0luZGV4LCBldmVudC5jdXJyZW50SW5kZXgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uU2hvd0Fuc3dlcnNDbGljaygpIHtcclxuICAgIHRoaXMuc2hvd0Fuc3dlcnMgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuaW5kZXggPSB0aGlzLnF1ZXN0aW9uLmFuc3dlcnMuZmluZEluZGV4KChyZXMpID0+IHtcclxuICAgICAgcmV0dXJuIHJlcy5yYW5raW5nX3Bvc2l0aW9uID09IDE7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuaGFzU3Vic2VxdWVuY2UgPSB0aGlzLnF1ZXN0aW9uLmFuc3dlcnNbdGhpcy5pbmRleF0uc3Vic2VxdWVuY2VzO1xyXG5cclxuICAgIGxldCBtYXhMZW5ndGggPSAyOyAvLyBjaGFuZ2UgbGF0ZXIgaWYgbmVlZGVkXHJcbiAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgbGV0IHN1YjogbnVtYmVyW10gPSBbXTtcclxuXHJcbiAgICB0aGlzLmFuc3dlcnNMaXN0LmZvckVhY2goKHZhbHVlLCBpbmRleCwgYXJyYXkpID0+IHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGFycmF5W2luZGV4XS5jb3JyZWN0X3Bvc2l0aW9uID09XHJcbiAgICAgICAgICBhcnJheVtpbmRleCArIDFdPy5jb3JyZWN0X3Bvc2l0aW9uIC0gMSAmJlxyXG4gICAgICAgIGFycmF5W2luZGV4XS5jb3JyZWN0X3Bvc2l0aW9uICE9IGluZGV4ICsgMVxyXG4gICAgICApIHtcclxuICAgICAgICBzdWIucHVzaChhcnJheVtpbmRleF0uY29ycmVjdF9wb3NpdGlvbik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGFycmF5W2luZGV4XS5jb3JyZWN0X3Bvc2l0aW9uID09IGluZGV4ICsgMSkgY291bnQrKztcclxuICAgICAgICBzdWIucHVzaChhcnJheVtpbmRleF0uY29ycmVjdF9wb3NpdGlvbik7XHJcbiAgICAgICAgaWYgKHN1Yi5sZW5ndGggPiBtYXhMZW5ndGgpIHtcclxuICAgICAgICAgIHRoaXMuc3Vic2VxdWVuY2UgPSBzdWI7XHJcbiAgICAgICAgICBtYXhMZW5ndGggPSBzdWIubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdWIgPSBbXTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAodGhpcy5jb3JyZWN0ICE9IDApXHJcbiAgICAgIHRoaXMuY29ycmVjdCA9IGNvdW50ID09IHRoaXMuYW5zd2Vyc0xpc3QubGVuZ3RoID8gMSA6IC0xO1xyXG4gICAgdGhpcy5oYXNTdWJzZXF1ZW5jZSA9IG1heExlbmd0aCA8IDMgPyBmYWxzZSA6IHRydWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNDb3JyZWN0UG9zaXRpb24oYW5zd2VyOiBhbnkpIHtcclxuICAgIGlmICghdGhpcy5zaG93QW5zd2Vycykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5hbnN3ZXJzTGlzdC5pbmRleE9mKGFuc3dlcikgKyAxID09IGFuc3dlci5jb3JyZWN0X3Bvc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGlzSW5Db3JyZWN0UG9zaXRpb24oYW5zd2VyOiBhbnkpIHtcclxuICAgIGlmICghdGhpcy5zaG93QW5zd2Vycykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5hbnN3ZXJzTGlzdC5pbmRleE9mKGFuc3dlcikgKyAxICE9IGFuc3dlci5jb3JyZWN0X3Bvc2l0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uTmV4dFF1ZXN0aW9uQ2xpY2soKSB7XHJcbiAgICB0aGlzLm5leHRRdWVzdGlvbkNsaWNrZWQuZW1pdCh0aGlzLmNvcnJlY3QpO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2XHJcbiAgY2RrRHJvcExpc3RcclxuICBjbGFzcz1cInJhbmtpbmctbGlzdFwiXHJcbiAgKGNka0Ryb3BMaXN0RHJvcHBlZCk9XCJkcm9wKCRldmVudClcIlxyXG4gIFtjZGtEcm9wTGlzdERpc2FibGVkXT1cInNob3dBbnN3ZXJzXCJcclxuPlxyXG4gIDxkaXZcclxuICAgIGNsYXNzPVwicmFua2luZy1ib3hcIlxyXG4gICAgY2RrRHJhZ1xyXG4gICAgW2NsYXNzLmNvcnJlY3RQb3NpdGlvbl09XCJpc0NvcnJlY3RQb3NpdGlvbihhbnN3ZXIpXCJcclxuICAgIFtjbGFzcy5pbmNvcnJlY3RQb3NpdGlvbl09XCJpc0luQ29ycmVjdFBvc2l0aW9uKGFuc3dlcilcIlxyXG4gICAgW2NsYXNzLnN1YnNlcXVlbmNlXT1cIlxyXG4gICAgICBoYXNTdWJzZXF1ZW5jZSAmJlxyXG4gICAgICBzdWJzZXF1ZW5jZS5pbmNsdWRlcyhhbnN3ZXIuY29ycmVjdF9wb3NpdGlvbikgJiZcclxuICAgICAgY29ycmVjdCA9PT0gLTFcclxuICAgIFwiXHJcbiAgICAqbmdGb3I9XCJsZXQgYW5zd2VyIG9mIGFuc3dlcnNMaXN0OyBsZXQgaW5kZXggPSBpbmRleFwiXHJcbiAgPlxyXG4gICAgPHAgY2xhc3M9XCJhbnN3ZXJUZXh0XCIgW2RhdGFdPVwiYW5zd2VyLnRleHRcIiBtYXJrZG93bj48L3A+XHJcbiAgICA8IS0tcD57eyBhbnN3ZXIudGV4dCB9fWdnPC9wLS0+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZmVlZGJhY2staWNvblwiICpuZ0lmPVwic2hvd0Fuc3dlcnNcIj5cclxuICAgICAgPG1hdC1pY29uXHJcbiAgICAgICAgKm5nSWY9XCJcclxuICAgICAgICAgICghc3Vic2VxdWVuY2UuaW5jbHVkZXMoYW5zd2VyLmNvcnJlY3RfcG9zaXRpb24pICYmXHJcbiAgICAgICAgICAgIGFuc3dlci5jb3JyZWN0X3Bvc2l0aW9uID09PSBpbmRleCArIDEpIHx8XHJcbiAgICAgICAgICBjb3JyZWN0ID09PSAxXHJcbiAgICAgICAgXCJcclxuICAgICAgICA+Y2hlY2s8L21hdC1pY29uXHJcbiAgICAgID5cclxuICAgICAgPG1hdC1pY29uXHJcbiAgICAgICAgKm5nSWY9XCJcclxuICAgICAgICAgICFzdWJzZXF1ZW5jZS5pbmNsdWRlcyhhbnN3ZXIuY29ycmVjdF9wb3NpdGlvbikgJiZcclxuICAgICAgICAgIGFuc3dlci5jb3JyZWN0X3Bvc2l0aW9uICE9PSBpbmRleCArIDFcclxuICAgICAgICBcIlxyXG4gICAgICAgID5oaWdobGlnaHRfb2ZmPC9tYXQtaWNvblxyXG4gICAgICA+XHJcbiAgICAgIDxtYXQtaWNvblxyXG4gICAgICAgICpuZ0lmPVwiXHJcbiAgICAgICAgICBoYXNTdWJzZXF1ZW5jZSAmJlxyXG4gICAgICAgICAgc3Vic2VxdWVuY2UuaW5jbHVkZXMoYW5zd2VyLmNvcnJlY3RfcG9zaXRpb24pICYmXHJcbiAgICAgICAgICBjb3JyZWN0ID09PSAtMVxyXG4gICAgICAgIFwiXHJcbiAgICAgICAgc3ZnSWNvbj1cInNlbWljb3JyZWN0XCJcclxuICAgICAgPjwvbWF0LWljb24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbjxkaXYgY2xhc3M9XCJmZWVkYmFjay1jb250YWluZXJcIiAqbmdJZj1cInNob3dBbnN3ZXJzXCI+XHJcbiAgPG1hdC1pY29uIGNsYXNzPVwiY29ycmVjdEljb25cIiAqbmdJZj1cImNvcnJlY3QgPT09IDFcIj4gY2hlY2tfY2lyY2xlIDwvbWF0LWljb24+XHJcbiAgPG1hdC1pY29uIGNsYXNzPVwiaW5jb3JyZWN0SWNvblwiICpuZ0lmPVwiY29ycmVjdCA9PT0gLTEgfHwgY29ycmVjdCA9PT0gMFwiPlxyXG4gICAgaGlnaGxpZ2h0X29mZlxyXG4gIDwvbWF0LWljb24+XHJcbiAgPHNwYW5cclxuICAgIGNsYXNzPVwiZmVlZGJhY2tcIlxyXG4gICAgbWFya2Rvd25cclxuICAgICpuZ0lmPVwic2hvd0Fuc3dlcnNcIlxyXG4gICAgW2RhdGFdPVwiXHJcbiAgICAgIGNvcnJlY3QgPT09IDFcclxuICAgICAgICA/IHRoaXMucXVlc3Rpb24uYW5zd2Vyc1tpbmRleF0uZmVlZGJhY2tfY29ycmVjdFxyXG4gICAgICAgIDogaGFzU3Vic2VxdWVuY2VcclxuICAgICAgICA/IHRoaXMucXVlc3Rpb24uYW5zd2Vyc1tpbmRleF0uZmVlZGJhY2tfc3Vic2VxdWVuY2VzXHJcbiAgICAgICAgOiB0aGlzLnF1ZXN0aW9uLmFuc3dlcnNbaW5kZXhdLmZlZWRiYWNrX2luY29ycmVjdFxyXG4gICAgXCJcclxuICA+XHJcbiAgPC9zcGFuPlxyXG48L2Rpdj5cclxuPGJ1dHRvblxyXG4gIChjbGljayk9XCJvblNob3dBbnN3ZXJzQ2xpY2soKVwiXHJcbiAgKm5nSWY9XCIhc2hvd0Fuc3dlcnNcIlxyXG4gIGNvbG9yPVwicHJpbWFyeVwiXHJcbiAgbWF0LXJhaXNlZC1idXR0b25cclxuICBjbGFzcz1cInNob3dBbnN3ZXJCdG5cIlxyXG4+XHJcbiAgTMO2c3VuZ2VuIGFuemVpZ2VuXHJcbjwvYnV0dG9uPlxyXG48YnV0dG9uXHJcbiAgKGNsaWNrKT1cIm9uTmV4dFF1ZXN0aW9uQ2xpY2soKVwiXHJcbiAgKm5nSWY9XCJzaG93QW5zd2Vyc1wiXHJcbiAgY29sb3I9XCJwcmltYXJ5XCJcclxuICBtYXQtcmFpc2VkLWJ1dHRvblxyXG4gIGNsYXNzPVwibmV4dFF1ZXN0aW9uQnRuXCJcclxuPlxyXG4gIHt7IGNvcnJlY3QgPT09IDEgPyAnUmljaHRpZywnIDogJyBGYWxzY2gsJyB9fSBuw6RjaHN0ZSBGcmFnZVxyXG48L2J1dHRvbj5cclxuIl19
