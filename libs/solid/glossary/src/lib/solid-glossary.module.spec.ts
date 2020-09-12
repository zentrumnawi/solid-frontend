import { async, TestBed, waitForAsync } from '@angular/core/testing';
import { SolidGlossaryModule } from './solid-glossary.module';

describe('SolidGlossaryModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SolidGlossaryModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(SolidGlossaryModule).toBeDefined();
  });
});
