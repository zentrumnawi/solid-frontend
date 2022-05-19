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
    console.log(this.answersList);
  }

  public onShowAnswersClick() {
    this.ShowAnswers = true;
    let subsequence = false;
    for (let i = 0; i < this.question.answers.length; ++i) {
      if (this.question.answers[i].ranking_position == 1) {
        subsequence = this.question.answers[i].subsequences;
        break;
      }
    }

    if (!subsequence) {
      this.Correct = true;
      for (let i = 0; i < this.answersList.length; ++i) {
        if (this.answersList[i].correct_position != i + 1) {
          this.Correct = false;
        }
      }
    } else {
      // find the subsequence
    }
  }

  public onNextQuestionClick() {
    this.nextQuestionClicked.emit(this.Correct);
  }
}
