import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ProfileTreeComponent} from './profile-tree.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTreeModule} from "@angular/material/tree";

describe('ProfileTreeComponent', () => {
  let component: ProfileTreeComponent;
  let fixture: ComponentFixture<ProfileTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileTreeComponent],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatTreeModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
