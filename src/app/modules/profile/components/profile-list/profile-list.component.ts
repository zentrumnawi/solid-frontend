import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MineralProfile, Profile} from "../../state/profile.model";
import {combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {
  @Input() profiles!: Observable<Profile[]>;
  @Input() filterValue!: Observable<string>;
  @Output() onSelect = new EventEmitter<number>();
  public FilteredProfiles!: Observable<MineralProfile[]>;

  public trackByFn(index: number, profile: MineralProfile) {
    return profile.id;
  }

  ngOnInit(): void {
    this.FilteredProfiles = combineLatest([this.profiles, this.filterValue]).pipe(map(v => {
      const mapit = (result: MineralProfile[], value: Profile[]) => {
        for (let v of value) {
          if (v.type === 'category') {
            result.push(...mapit([], v.children));
          } else {
            result.push(v);
          }
        }
        return result;
      };
      const flatProfiles = mapit([], v[0]);
      // this.Filter.valueChanges.subscribe(filterString => {
      const regExp = new RegExp(v[1], 'i');
      return flatProfiles.filter(profile => {
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
      })
    }));
  }
}
