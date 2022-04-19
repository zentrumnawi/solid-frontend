import { waitForAsync, TestBed } from '@angular/core/testing';
import { SolidQuizModule } from './solid-quiz.module';

describe('SolidQuizModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SolidQuizModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SolidQuizModule).toBeDefined();
  });
});
