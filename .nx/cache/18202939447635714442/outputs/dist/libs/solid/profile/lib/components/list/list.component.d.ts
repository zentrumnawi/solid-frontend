import { EventEmitter } from '@angular/core';
import { Profile } from '../../state/profile.model';
import { Observable } from 'rxjs';
import * as i0 from '@angular/core';
export declare class ListComponent {
  profiles: Observable<Profile[]>;
  selectProfile: EventEmitter<
    | number
    | {
        id: number;
        type: string;
      }
  >;
  selectProfileTitle: EventEmitter<string>;
  selectedProfileId?: number;
  selectedProfileType?: string;
  isDiveApp: boolean;
  trackByFn(index: number, profile: Profile): number;
  static ɵfac: i0.ɵɵFactoryDeclaration<ListComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    ListComponent,
    'solid-profile-list',
    never,
    {
      profiles: { alias: 'profiles'; required: false };
      selectedProfileId: { alias: 'selectedProfileId'; required: false };
      selectedProfileType: { alias: 'selectedProfileType'; required: false };
      isDiveApp: { alias: 'isDiveApp'; required: false };
    },
    {
      selectProfile: 'selectProfile';
      selectProfileTitle: 'selectProfileTitle';
    },
    never,
    never,
    false,
    never
  >;
}
