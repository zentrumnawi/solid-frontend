import { waitForAsync, TestBed } from '@angular/core/testing';
import { SolidSlideshowModule } from './solid-slideshow.module';

describe('SolidSlideshowModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SolidSlideshowModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SolidSlideshowModule).toBeDefined();
  });
});
