import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleChoiceQuestionComponent } from './single-choice-question.component';

describe('SingleChoiceQuestionComponent', () => {
  let component: SingleChoiceQuestionComponent;
  let fixture: ComponentFixture<SingleChoiceQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleChoiceQuestionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleChoiceQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
