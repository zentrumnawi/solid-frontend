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

  public SelectedAnswers!: number[];
  public ShowAnswers!: boolean;
  public Correct = false;

  public answersList: any[] = [];

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
      this.ShowAnswers = false;
      this.SelectedAnswers = [];
      this.Correct = false;
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.answersList, event.previousIndex, event.currentIndex);
    console.log(this.question.answers);
  }

  public onShowAnswersClick() {
    this.ShowAnswers = true;
    let hasSubsequence = false;
    for (let i = 0; i < this.question.answers.length; ++i) {
      if (this.question.answers[i].ranking_position == 1) {
        hasSubsequence = this.question.answers[i].subsequences;
        break;
      }
    }

    // set to hasSubsequence for testing
    if (hasSubsequence) {
      this.Correct = true;
      for (let i = 0; i < this.answersList.length; ++i) {
        if (this.answersList[i].correct_position != i + 1) {
          this.Correct = false;
        }
      }
    } else {
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

      // find the longest subsequence
      let max_length = 0;
      let indexOfMax = 0;
      for (let i = 0; i < this.subsequences.length; ++i) {
        if (this.subsequences[i].length >= max_length) {
          max_length = this.subsequences[i].length;
          indexOfMax = i;
        }
      }

      console.log('Longest subsequence: ' + this.subsequences[indexOfMax]);
    }
  }

  public onNextQuestionClick() {
    this.nextQuestionClicked.emit(this.Correct);
  }
}
