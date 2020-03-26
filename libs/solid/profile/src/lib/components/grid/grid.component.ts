import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MineralProfile } from '../../state/profile.model';

@Component({
  selector: 'solid-profile-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  @Input() profiles!: Observable<MineralProfile[]>;
  @Output() select = new EventEmitter<number>();

  public trackByFn(index: number, profile: MineralProfile) {
    return profile.id;
  }
}
