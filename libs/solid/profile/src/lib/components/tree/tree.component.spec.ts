import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeComponent } from './tree.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';

describe('ProfileTreeComponent', () => {
  let component: TreeComponent;
  let fixture: ComponentFixture<TreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TreeComponent],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatTreeModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
