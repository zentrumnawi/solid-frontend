import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPageContentComponent } from './info-page-content.component';

describe('InfoPageContentComponent', () => {
  let component: InfoPageContentComponent;
  let fixture: ComponentFixture<InfoPageContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InfoPageContentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
