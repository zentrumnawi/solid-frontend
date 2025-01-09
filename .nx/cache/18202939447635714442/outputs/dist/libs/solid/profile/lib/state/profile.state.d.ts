import { StateContext } from '@ngxs/store';
import { Profile, TreeNode } from './profile.model';
import { HttpClient } from '@angular/common/http';
import { SolidCoreConfig } from '@zentrumnawi/solid-core';
import { ProfileDefinitionService } from '../services/profile-definition.service';
import { MultiProfiles } from './profile-definition.model';
import * as i0 from '@angular/core';
export interface ProfileStateModel {
  profiles: Profile[];
  nodes: TreeNode[];
  definition: MultiProfiles[];
  definition_swagger: MultiProfiles[];
}
export declare class ProfileState {
  private http;
  private _config;
  private _defService;
  constructor(
    http: HttpClient,
    _config: SolidCoreConfig,
    _defService: ProfileDefinitionService
  );
  static selectProfileAndNode(state: ProfileStateModel): (
    profileId?: number,
    profileType?: string
  ) => {
    profile: Profile;
    node: TreeNode;
  } | null;
  static selectProfile(state: ProfileStateModel): Profile[];
  static selectDefinition(state: ProfileStateModel): MultiProfiles[];
  static selectDefinition_swagger(state: ProfileStateModel): MultiProfiles[];
  static selectTree(state: ProfileStateModel): TreeNode[];
  static selectFlat(state: ProfileStateModel): Profile[];
  private static findProfileDeep;
  private static composeMineralCompounds;
  set(
    ctx: StateContext<ProfileStateModel>
  ): import('rxjs').Observable<TreeNode[]> | undefined;
  loadDefinition(
    ctx: StateContext<ProfileStateModel>
  ): import('rxjs').Observable<MultiProfiles[]> | undefined;
  loadDefinitionSwagger(
    ctx: StateContext<ProfileStateModel>
  ): import('rxjs').Observable<MultiProfiles[]> | undefined;
  static ɵfac: i0.ɵɵFactoryDeclaration<ProfileState, never>;
  static ɵprov: i0.ɵɵInjectableDeclaration<ProfileState>;
}
