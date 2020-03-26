import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MineralProfile } from '../../state/profile.model';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'solid-profile-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() profiles!: Observable<MineralProfile[]>;
  @Input() filterValue!: Observable<string>;
  @Output() select = new EventEmitter<number>();
  public FilteredProfiles!: Observable<MineralProfile[]>;

  public trackByFn(index: number, profile: MineralProfile) {
    return profile.id;
  }

  ngOnInit(): void {
    this.FilteredProfiles = combineLatest([this.profiles, this.filterValue]).pipe(map(v => {
      const regExp = new RegExp(v[1], 'i');
      return v[0].filter(profile => {
        if (profile.mineralName.match(regExp)) {
          return true;
        }
        if (profile.trivialName && profile.trivialName.match(regExp)) {
          return true;
        }
        if (profile.variety && profile.variety.match(regExp)) {
          return true;
        }
        return false;
      });
    }));
  }
}
