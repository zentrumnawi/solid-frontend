import { async, TestBed } from '@angular/core/testing';
import { SolidGlossaryModule } from './solid-glossary.module';

describe('SolidGlossaryModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SolidGlossaryModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SolidGlossaryModule).toBeDefined();
  });
});
