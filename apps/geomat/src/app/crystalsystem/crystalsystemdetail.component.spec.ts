import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrystalsystemdetailComponent } from './crystalsystemdetail.component';

describe('CrystalsystemdetailComponent', () => {
  let component: CrystalsystemdetailComponent;
  let fixture: ComponentFixture<CrystalsystemdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CrystalsystemdetailComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrystalsystemdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
