import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideshowSelectComponent } from './slideshow-select.component';

describe('SlideshowSelecComponent', () => {
  let component: SlideshowSelectComponent;
  let fixture: ComponentFixture<SlideshowSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideshowSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideshowSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
