import {
  AfterViewInit,
  ElementRef,
  EventEmitter,
  QueryList,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../../state/profile.model';
import * as i0 from '@angular/core';
export declare class GridComponent implements AfterViewInit {
  selectedElements: QueryList<ElementRef>;
  profiles: Observable<Profile[]>;
  selectedProfileId?: number;
  selectedProfileType?: string;
  selectProfile: EventEmitter<
    | number
    | {
        id: number;
        type: string;
      }
  >;
  isDiveApp: boolean;
  selectProfileTitle: EventEmitter<string>;
  hasControlPanel: boolean;
  trackByFn(index: number, profile: Profile): number;
  ngAfterViewInit(): void;
  scrollTo(): void;
  static ɵfac: i0.ɵɵFactoryDeclaration<GridComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    GridComponent,
    'solid-profile-grid',
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
