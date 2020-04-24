import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileEntry, ProfileNEW } from '../../state/profile.model';
import { SelectedDirective } from '../selected.directive';

@Component({
  selector: 'solid-profile-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements AfterViewInit {
  @ViewChildren(SelectedDirective, { read: ElementRef })
  public selectedElements!: QueryList<ElementRef>;
  @Input() profiles!: Observable<ProfileNEW[]>;
  @Input() selectedProfileId?: number;
  @Output() select = new EventEmitter<number>();
  public trackByFn(index: number, profile: ProfileNEW) {
    return profile.id;
  }

  public ngAfterViewInit(): void {
    this.selectedElements.changes.subscribe(_ => this.scrollTo());
    this.scrollTo();
  }

  public scrollTo() {
    setTimeout(() => {
      const card = this.selectedElements.first || null;
      if (!card) {
        return;
      }
      card.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    });
  }
}
