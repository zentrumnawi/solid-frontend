import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GalleryOverviewComponent} from './gallery-overview.component';

describe('GalleryOverviewComponent', () => {
  let component: GalleryOverviewComponent;
  let fixture: ComponentFixture<GalleryOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryOverviewComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
