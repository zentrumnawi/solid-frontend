import { async, TestBed } from '@angular/core/testing';
import { SolidQuizModule } from './solid-quiz.module';

describe('SolidQuizModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SolidQuizModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SolidQuizModule).toBeDefined();
  });
});
