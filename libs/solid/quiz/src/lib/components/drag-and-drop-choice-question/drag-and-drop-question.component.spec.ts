import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropQuestionComponent } from './drag-and-drop-question.component';

describe('DragAndDropChoiceQuestionComponent', () => {
  let component: DragAndDropQuestionComponent;
  let fixture: ComponentFixture<DragAndDropQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragAndDropQuestionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndDropQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
