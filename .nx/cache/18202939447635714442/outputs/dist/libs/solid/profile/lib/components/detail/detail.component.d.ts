import { ElementRef, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Profile, TreeNode } from '../../state/profile.model';
import { Observable, Subscription } from 'rxjs';
import {
  MultiProfiles,
  ProfileProperty,
  ProfilePropertyType,
} from '../../state/profile-definition.model';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MediaModel, SolidCoreConfig } from '@zentrumnawi/solid-core';
import * as i0 from '@angular/core';
export declare class DetailComponent implements OnInit, OnDestroy {
  config: SolidCoreConfig;
  expansionPanel?: MatExpansionPanel;
  thumbnails: ElementRef | undefined;
  PropertyTypes: typeof ProfilePropertyType;
  $ProfileDefinitions: Observable<MultiProfiles[]>;
  $ProfileDefinition_Swagger: Observable<MultiProfiles[]>;
  node: TreeNode;
  selectProfile: EventEmitter<
    | number
    | {
        id: number;
        type: string;
      }
  >;
  ImageLoaded: boolean[];
  ImageSelected: number;
  ImageIndex: number;
  ImageEndIndex: number;
  SWIPE_ACTION: {
    LEFT: string;
    RIGHT: string;
  };
  hasDialog: boolean;
  private _profile;
  hasDescription: boolean;
  hasDescriptionToggle: boolean;
  MediaObjectsOnlyImages: MediaModel[];
  definitions: MultiProfiles[];
  definitions_swagger: MultiProfiles[];
  profileDefinitionSub: Subscription;
  profileDefinitionSwaggerSub: Subscription;
  shouldExpandAllgemein: boolean;
  shouldExpandCategories: string[];
  get profile(): Profile;
  set profile(profile: Profile);
  constructor(config: SolidCoreConfig);
  ngOnInit(): void;
  ngOnDestroy(): void;
  getProperties(profile: Profile): ProfileProperty[];
  onImageLoaded(index: number): void;
  onImageSelect(index: number): void;
  shouldDisplayProperty(property: ProfileProperty, profile_obj: any): boolean;
  swipe(currentIndex: number, action?: string): void;
  handleNextDialogEvent(): void;
  handlePrevDialogEvent(): void;
  getClass(level: number, type: string): string;
  shouldExpand(title: string): boolean;
  static ɵfac: i0.ɵɵFactoryDeclaration<DetailComponent, never>;
  static ɵcmp: i0.ɵɵComponentDeclaration<
    DetailComponent,
    'solid-profile-detail',
    never,
    {
      node: { alias: 'node'; required: false };
      profile: { alias: 'profile'; required: false };
    },
    { selectProfile: 'selectProfile' },
    never,
    never,
    false,
    never
  >;
}
