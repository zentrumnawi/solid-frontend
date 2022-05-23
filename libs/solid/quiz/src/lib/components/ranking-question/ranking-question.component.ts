import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { QuizQuestion } from '../../state/quiz.model';

@Component({
  selector: 'solid-quiz-ranking-question',
  templateUrl: './ranking-question.component.html',
  styleUrls: ['./ranking-question.component.scss'],
})
export class RankingQuestionComponent implements OnInit, OnChanges {
  @Input() public question!: QuizQuestion;
  @Output() public nextQuestionClicked = new EventEmitter<boolean>();

  public selectedAnswers!: number[];
  public showAnswers!: boolean;
  public correct = false;
  public index!: number;

  public answersList: any[] = [];

  public hasSubsequence = false;
  public subsequence: number[] = [];

  ngOnInit(): void {
    for (let i = 0; i < this.question.answers.length; ++i) {
      this.answersList.push({
        text: this.question.answers[i].text,
        correct_position: this.question.answers[i].ranking_position,
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.question.previousValue !== changes.question.currentValue) {
      this.showAnswers = false;
      this.selectedAnswers = [];
      this.correct = false;
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.answersList, event.previousIndex, event.currentIndex);
  }

  public onShowAnswersClick() {
    this.showAnswers = true;

    this.index = this.question.answers.findIndex((res) => {
      return res.ranking_position == 1;
    });
    this.hasSubsequence = this.question.answers[this.index].subsequences;

    let maxLength = 2; // change later if needed
    let count = 0;
    let sub: number[] = [];

    this.answersList.forEach((value, index, array) => {
      if (
        array[index].correct_position ==
          array[index + 1]?.correct_position - 1 &&
        array[index].correct_position != index + 1
      ) {
        sub.push(array[index].correct_position);
      } else {
        count++;
        sub.push(array[index].correct_position);
        if (sub.length > maxLength) {
          this.subsequence = sub;
          maxLength = sub.length;
        }
        sub = [];
      }
    });
    this.correct = count == this.answersList.length ? true : false;
    this.hasSubsequence = maxLength < 3 ? false : true;
  }

  public isCorrectPosition(answer: any) {
    if (!this.showAnswers) {
      return false;
    }
    return this.answersList.indexOf(answer) + 1 == answer.correct_position;
  }

  public isInCorrectPosition(answer: any) {
    if (!this.showAnswers) {
      return false;
    }
    return this.answersList.indexOf(answer) + 1 != answer.correct_position;
  }

  public onNextQuestionClick() {
    this.nextQuestionClicked.emit(this.correct);
  }
}
