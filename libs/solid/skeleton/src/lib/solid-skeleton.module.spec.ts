import { async, TestBed } from '@angular/core/testing';
import { SolidSkeletonModule } from './solid-skeleton.module';

describe('SolidSkeletonModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SolidSkeletonModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SolidSkeletonModule).toBeDefined();
  });
});
