import { async, TestBed } from '@angular/core/testing';
import { SolidSlideshowModule } from './solid-slideshow.module';

describe('SolidSlideshowModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SolidSlideshowModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SolidSlideshowModule).toBeDefined();
  });
});
