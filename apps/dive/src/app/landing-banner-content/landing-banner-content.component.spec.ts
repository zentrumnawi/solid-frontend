import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingBannerContentComponent } from './landing-banner-content.component';

describe('LandingBannerContentComponent', () => {
  let component: LandingBannerContentComponent;
  let fixture: ComponentFixture<LandingBannerContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LandingBannerContentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingBannerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
