import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Profile, TreeNode, TreeNodeApi } from './profile.model';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ImageModel,
  SOLID_CORE_CONFIG,
  SolidCoreConfig,
  MediaModel,
} from '@zentrumnawi/solid-core';
import { ProfileActions } from './profile.actions';
import { map, tap } from 'rxjs/operators';
import { ProfileDefinitionService } from '../services/profile-definition.service';
import { ProfileProperty } from './profile-definition.model';

export interface ProfileStateModel {
  profiles: Profile[];
  nodes: TreeNode[];
  definition: ProfileProperty[];
}

function b() {
  return null;
}

function a() {
  const bb = b;
  return b;
}

@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    profiles: [],
    nodes: [],
    definition: [],
  },
})
@Injectable()
export class ProfileState {
  constructor(
    private http: HttpClient,
    @Inject(SOLID_CORE_CONFIG) private _config: SolidCoreConfig,
    private _defService: ProfileDefinitionService
  ) {}

  @Selector()
  static selectProfileAndNode(
    state: ProfileStateModel
  ): (profileId?: number) => { profile: Profile; node: TreeNode } | null {
    // This redundant variable is required
    // https://github.com/ng-packagr/ng-packagr/issues/696
    const fn = function (profileId?: number) {
      if (!profileId) {
        return null;
      }
      for (const node of state.nodes) {
        const childSearch = ProfileState.findProfileDeep(node, profileId);
        if (childSearch !== null) {
          return childSearch;
        }
      }
      return null;
    };
    return fn;
    // return ProfileState.__internal__selectProfileAndNode;
  }

  static __internal__selectProfileAndNode(profileId?: number) {
    return null;
  }

  @Selector()
  static selectDefinition(state: ProfileStateModel): ProfileProperty[] {
    return state.definition;
  }

  @Selector()
  static selectTree(state: ProfileStateModel): TreeNode[] {
    return [...state.nodes];
  }

  @Selector()
  static selectFlat(state: ProfileStateModel): Profile[] {
    return [...state.profiles];
  }

  private static findProfileDeep(
    node: TreeNode,
    profileId: number
  ): { profile: Profile; node: TreeNode } | null {
    const profile = node.profiles.find((p) => p.id === profileId);
    if (profile) {
      return {
        profile,
        node,
      };
    }
    for (const leafNode of node.children) {
      const childSearch = ProfileState.findProfileDeep(leafNode, profileId);
      if (childSearch !== null) {
        return childSearch;
      }
    }
    return null;
  }

  @Action(ProfileActions.LoadProfiles)
  public set(
    ctx: StateContext<ProfileStateModel>,
    {}: ProfileActions.LoadProfiles
  ) {
    if (ctx.getState().profiles.length !== 0) {
      return;
    }
    return this.http
      .get<TreeNodeApi[]>(`${this._config.apiUrlMediaObject}/profiles/`)
      .pipe(
        map((response) => {
          const mapit = (input: TreeNodeApi[]): TreeNode[] => {
            return input.map((node) => {
              return {
                type: 'category',
                name: node.name,
                info: node.info,
                children: mapit(node.children),
                profiles: node.profiles.map((profile) => ({
                  ...profile,
                  type: 'profile',
                  // images: profile.photographs.map((p) => new ImageModel(p)),
                  images: profile.media_objects.map((m) => new MediaModel(m)),
                })),
              };
            });
          };
          return mapit(response);
        }),
        tap((nodes) => {
          const mapIt = (result: Profile[], value: TreeNode[]) => {
            for (const v of value) {
              result.push(...mapIt([], v.children));
              result.push(...v.profiles);
            }
            return result;
          };
          const flat = mapIt([], nodes);
          ctx.patchState({ nodes, profiles: flat });
        })
      );
  }

  @Action(ProfileActions.LoadDefinition)
  public loadDefinition(
    ctx: StateContext<ProfileStateModel>,
    {}: ProfileActions.LoadDefinition
  ) {
    if (ctx.getState().definition.length !== 0) {
      return;
    }
    return this._defService.loadDefinitions().pipe(
      tap((definition) => {
        ctx.patchState({
          definition,
        });
      })
    );
  }
}
