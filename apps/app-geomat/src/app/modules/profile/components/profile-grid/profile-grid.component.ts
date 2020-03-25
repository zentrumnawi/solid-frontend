import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {MineralProfile} from '../../state/profile.model';

@Component({
  selector: 'app-profile-grid',
  templateUrl: './profile-grid.component.html',
  styleUrls: ['./profile-grid.component.scss']
})
export class ProfileGridComponent {
  @Input() profiles!: Observable<MineralProfile[]>;
  @Output() onSelect = new EventEmitter<number>();

  public trackByFn(index: number, profile: MineralProfile) {
    return profile.id;
  }
}
