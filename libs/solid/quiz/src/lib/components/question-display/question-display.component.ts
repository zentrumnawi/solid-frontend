import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  QuizQuestion,
  QuizQuestionApi,
  QuizQuestionType,
} from '../../state/quiz.model';
import { HttpClient } from '@angular/common/http';
import {
  SOLID_CORE_CONFIG,
  SolidCoreConfig,
  MediaModel,
} from '@zentrumnawi/solid-core';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'solid-quiz-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.scss'],
})
export class QuestionDisplayComponent implements OnInit {
  public question: QuizQuestion | null = null;
  public QuestionTypes = QuizQuestionType;
  public ImageIndex = 0;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    @Inject(SOLID_CORE_CONFIG) private config: SolidCoreConfig,
  ) {}

  ngOnInit(): void {
    const questionId = this.route.snapshot.paramMap.get('id');
    if (questionId) {
      const id = parseInt(questionId, 10);
      if (!isNaN(id)) {
        this.loadQuestion(id);
      }
    }
  }

  private loadQuestion(id: number): void {
    this.http
      .get<QuizQuestionApi>(`${this.config.apiUrl}/quizquestions/${id}`)
      .pipe(
        map((question) => ({
          ...question,
          images: question.img.map((p) => new MediaModel(p)),
        })),
        catchError((error) => {
          console.error('Error loading question:', error);
          return of(null);
        }),
      )
      .subscribe((question) => {
        this.question = question;
      });
  }

  swipe(
    currentIndex: number,
    imageLength: number,
    action: string = this.SWIPE_ACTION.RIGHT,
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

  trackByFn(index: number, item: any): any {
    return item.id;
  }
}
