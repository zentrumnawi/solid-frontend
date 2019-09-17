import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PhotographDetailComponent} from './photograph-detail.component';

describe('PhotographDetailComponent', () => {
  let component: PhotographDetailComponent;
  let fixture: ComponentFixture<PhotographDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhotographDetailComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
