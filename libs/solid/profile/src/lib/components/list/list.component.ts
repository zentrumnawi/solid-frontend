import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile } from '../../state/profile.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'solid-profile-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() profiles!: Observable<Profile[]>;
  @Output() selectProfile = new EventEmitter<
    number | { id: number; type: string }
  >();
  @Output() selectProfileTitle = new EventEmitter<string>();
  @Input() selectedProfileId?: number;
  @Input() selectedProfileType?: string;
  @Input() isDiveApp = false;

  public trackByFn(index: number, profile: Profile) {
    return profile.id;
  }
}
