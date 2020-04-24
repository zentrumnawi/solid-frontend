import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  ProfileNEW,
  ProfileProperty,
  ProfilePropertyType,
  TreeNode,
  TreeNodeApi
} from './profile.model';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '@zentrumnawi/solid/core';
import { ProfileActions } from './profile.actions';
import { map, tap } from 'rxjs/operators';
import { Schema, Spec } from 'swagger-schema-official';
import { ProfileDefinitionService } from '../services/profile-definition.service';

export interface ProfileStateModel {
  profiles: ProfileNEW[];
  nodes: TreeNode[];
  definition: ProfileProperty[];
}

@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    profiles: [],
    nodes: [],
    definition: []
  }
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
  ): (profileId?: number) => { profile: ProfileNEW; node: TreeNode } | null {
    return (profileId?: number) => {
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
  static selectFlat(state: ProfileStateModel): ProfileNEW[] {
    return [...state.profiles];
  }

  private static findProfileDeep(
    node: TreeNode,
    profileId: number
  ): { profile: ProfileNEW; node: TreeNode } | null {
    const profile = node.profiles.find(p => p.id === profileId);
    if (profile) {
      return {
        profile,
        node
      };
    }
    for (const leafNode of node.leaf_nodes) {
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
      .get<TreeNodeApi[]>(`${this._config.apiUrl}/api/profiles/`)
      .pipe(
        map(response => {
          const mapit = (input: TreeNodeApi[]): TreeNode[] => {
            return input.map(node => {
              return {
                type: 'category',
                node_name: node.node_name,
                info_text: node.info_text,
                leaf_nodes: mapit(node.leaf_nodes),
                profiles: node.profiles.map(profile => ({
                  ...profile,
                  type: 'profile',
                  images: [], // TODO: Fix if images are set from api
                  display_name: `${profile.name} (${profile.trivial_name})`
                }))
              };
            });
          };
          return mapit(response);
        }),
        tap(nodes => {
          const mapIt = (result: ProfileNEW[], value: TreeNode[]) => {
            for (const v of value) {
              result.push(...mapIt([], v.leaf_nodes));
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
      tap(definition => {
        ctx.patchState({
          definition
        });
      })
    );
  }
}
