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
  public subsequences: any[] = [];

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

    // find all the subsequences
    for (let i = 0; i < this.answersList.length - 1; ++i) {
      if (
        this.answersList[i].correct_position ==
        this.answersList[i + 1].correct_position - 1
      ) {
        if (this.subsequence.length > 1) {
          this.subsequence.push(this.answersList[i + 1].correct_position);
        } else {
          this.subsequence.push(this.answersList[i].correct_position);
          this.subsequence.push(this.answersList[i + 1].correct_position);
        }
      } else {
        if (this.subsequence.length > 0)
          this.subsequences.push(this.subsequence);
        this.subsequence = [];
      }
    }
    if (this.subsequence.length > 0) this.subsequences.push(this.subsequence);

    if (this.subsequences.length == 0) this.hasSubsequence = false;
    else if (this.subsequence.length == this.answersList.length)
      this.correct = true;
    else {
      // find the longest subsequence
      let max_length = 0;
      let indexOfMax = 0;
      for (let i = 0; i < this.subsequences.length; ++i) {
        if (this.subsequences[i].length > max_length) {
          max_length = this.subsequences[i].length;
          indexOfMax = i;
        }
      }
      this.subsequence = this.subsequences[indexOfMax];
    }
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
