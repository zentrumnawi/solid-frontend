import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileEntry } from '../../state/profile.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'solid-profile-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() profiles!: Observable<ProfileEntry[]>;
  @Output() select = new EventEmitter<number>();

  public trackByFn(index: number, profile: ProfileEntry) {
    return profile.id;
  }
}
