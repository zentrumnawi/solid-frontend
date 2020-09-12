import { async, TestBed, waitForAsync } from '@angular/core/testing';
import { SolidSkeletonModule } from './solid-skeleton.module';

describe('SolidSkeletonModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SolidSkeletonModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(SolidSkeletonModule).toBeDefined();
  });
});
