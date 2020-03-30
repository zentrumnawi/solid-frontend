import { async, TestBed } from '@angular/core/testing';
import { SolidProfileModule } from './solid-profile.module';

describe('SolidProfileModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SolidProfileModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SolidProfileModule).toBeDefined();
  });
});
