import { Component, Input, OnInit } from '@angular/core';
import { QuizQuestion } from '../../state/quiz.model';

@Component({
  selector: 'solid-quiz-question-media',
  templateUrl: './question-media.component.html',
  styleUrls: ['./question-media.component.scss'],
})
export class QuestionMediaComponent implements OnInit {
  @Input() public question!: QuizQuestion;
  @Input() public ImageIndex!: number;

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  ngOnInit(): void {
    return;
  }

  public swipe(
    currentIndex: number,
    imageLength: number,
    action: string = this.SWIPE_ACTION.RIGHT
  ) {
    if (currentIndex > imageLength || currentIndex < 0) {
      return;
    }
    if (action === this.SWIPE_ACTION.LEFT) {
      const isLast = currentIndex === imageLength - 1;
      this.ImageIndex = isLast ? 0 : currentIndex + 1;
    }
    if (action === this.SWIPE_ACTION.RIGHT) {
      const isFirst = currentIndex === 0;
      this.ImageIndex = isFirst ? imageLength - 1 : currentIndex - 1;
    }
  }
}
