import {async, TestBed} from '@angular/core/testing';
import {SolidModule} from './solid.module';

describe('SolidModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SolidModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SolidModule).toBeDefined();
  });
});
