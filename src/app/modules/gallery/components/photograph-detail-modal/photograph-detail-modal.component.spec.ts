import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PhotographDetailModalComponent} from './photograph-detail-modal.component';

describe('PhotographDetailModalComponent', () => {
  let component: PhotographDetailModalComponent;
  let fixture: ComponentFixture<PhotographDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhotographDetailModalComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
