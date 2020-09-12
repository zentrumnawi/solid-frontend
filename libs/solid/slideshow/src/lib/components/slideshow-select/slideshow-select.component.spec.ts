import {
  async,
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';

import { SlideshowSelectComponent } from './slideshow-select.component';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';

describe('SlideshowSelecComponent', () => {
  // let component: SlideshowSelectComponent;
  // let fixture: ComponentFixture<SlideshowSelectComponent>;

  beforeEach(
    waitForAsync(() => {
      // TestBed.configureTestingModule({
      //   declarations: [ SlideshowSelectComponent ],
      // })
      // .compileComponents();
    })
  );

  beforeEach(() => {
    // fixture = TestBed.createComponent(SlideshowSelectComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
