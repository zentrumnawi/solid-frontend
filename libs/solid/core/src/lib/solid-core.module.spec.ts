import { waitForAsync, TestBed } from '@angular/core/testing';
import { SolidCoreModule } from './solid-core.module';

describe('SolidCoreModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SolidCoreModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(SolidCoreModule).toBeDefined();
  });
});
