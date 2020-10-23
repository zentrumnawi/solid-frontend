import { Component, Input } from '@angular/core';
import { DragAndDropQuestion } from '../../state/quiz.model';
import { QuestionTypeComponent } from '../question/question.component';

@Component({
  selector: 'solid-quiz-drag-and-drop-question',
  templateUrl: './drag-and-drop-question.component.html',
  styleUrls: ['./drag-and-drop-question.component.scss'],
})
export class DragAndDropQuestionComponent implements QuestionTypeComponent {
  @Input() public question!: DragAndDropQuestion;
  @Input() public showAnswers = false;

  validateAnswers(): boolean {
    // TODO: Implement me
    return false;
  }
}
