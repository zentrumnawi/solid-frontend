import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MediaErrorDialogComponent} from './media-error-dialog.component';

describe('MediaErrorDialogComponent', () => {
  let component: MediaErrorDialogComponent;
  let fixture: ComponentFixture<MediaErrorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaErrorDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
