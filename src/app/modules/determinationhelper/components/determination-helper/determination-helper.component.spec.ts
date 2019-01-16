import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DeterminationHelperComponent} from './determination-helper.component';

describe('DeterminationHelperComponent', () => {
  let component: DeterminationHelperComponent;
  let fixture: ComponentFixture<DeterminationHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeterminationHelperComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeterminationHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
