import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Profile, TreeNode, TreeNodeApi } from './profile.model';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  SOLID_CORE_CONFIG,
  SolidCoreConfig,
  MediaModel,
  MediaObjectModel,
} from '@zentrumnawi/solid-core';
import {
  LoadDefinition,
  LoadDefinitionSwagger,
  LoadProfiles,
} from './profile.actions';
import { map, tap } from 'rxjs/operators';
import { ProfileDefinitionService } from '../services/profile-definition.service';
import { MultiProfiles } from './profile-definition.model';

export interface ProfileStateModel {
  profiles: Profile[];
  nodes: TreeNode[];
  definition: MultiProfiles[];
  definition_swagger: MultiProfiles[];
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
    definition_swagger: [],
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
  static selectProfile(state: ProfileStateModel) {
    return state.profiles;
  }

  @Selector()
  static selectDefinition(state: ProfileStateModel): MultiProfiles[] {
    return state.definition;
  }

  @Selector()
  static selectDefinition_swagger(state: ProfileStateModel): MultiProfiles[] {
    return state.definition_swagger;
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

  @Action(LoadProfiles)
  public set(ctx: StateContext<ProfileStateModel>) {
    if (ctx.getState().profiles.length !== 0) {
      return;
    }
    return this.http
      .get<TreeNodeApi[]>(`${this._config.apiUrl}/profiles/`)
      .pipe(
        map((response) => {
          const mapit = (input: TreeNodeApi[]): TreeNode[] => {
            return input.map((node: any) => {
              // media models - for testing before endpoint is finished
              const mediaObj: MediaObjectModel = {
                id: 448,
                file: {
                  large:
                    'https://cdn.geomat.uni-frankfurt.de/planty/staging/media_object/Dunkelfelder_Blatt_01.09.2020_Geisenheim_Lumix_DMC-TZ10_w_12.large.jpeg',
                  medium:
                    'https://cdn.geomat.uni-frankfurt.de/planty/staging/media_object/Dunkelfelder_Blatt_01.09.2020_Geisenheim_Lumix_DMC-TZ10_w_12.medium.jpeg',
                  small:
                    'https://cdn.geomat.uni-frankfurt.de/planty/staging/media_object/Dunkelfelder_Blatt_01.09.2020_Geisenheim_Lumix_DMC-TZ10_w_12.small.jpeg',
                  thumbnail:
                    'https://cdn.geomat.uni-frankfurt.de/planty/staging/media_object/Dunkelfelder_Blatt_01.09.2020_Geisenheim_Lumix_DMC-TZ10_w_12.thumbnail.jpeg',
                  original:
                    'https://cdn.geomat.uni-frankfurt.de/planty/staging/media_object/Dunkelfelder_Blatt_01.09.2020_Geisenheim_Lumix_DMC-TZ10_w_12.JPG',
                },
                dzi_file: null,
                profile_position: 1,
                media_format: 'image',
                img_original_width: 3264,
                img_original_height: 2448,
                img_original_scale: 0,
                img_alt: 'DunkelfelderRebe',
                description: 'Das ist eine Description!',
                audio: 'null',
                title: 'Dunkelfelder Blatt',
                date: new Date(2021, 7, 31),
                author: 'Name Vorname',
                license: 'CC_BY-SA',
              };
              const media_list = [new MediaModel(mediaObj)];

              const multi_profiles = Object.entries(node)
                .filter((property: any) => {
                  if (
                    property[0].search('related') !== -1 &&
                    node[property[0]].length !== 0
                  )
                    return property;
                })
                .map((profiles: any) => {
                  return profiles[1].map((profile: any) => {
                    return {
                      name: profile.name ? profile.name : 'A Tree',
                      ...profile,
                      type: 'profile',
                      mediaObjects: profile.media_objects
                        ? profile.media_objects.map(
                            (m: any) => new MediaModel(m)
                          )
                        : media_list,
                      def_type: profiles[0].split('_')[0],
                    };
                  });
                });

              return {
                type: 'category',
                name: node.name,
                info: node.info,
                children: mapit(node.children),
                profiles: node.profiles
                  ? node.profiles.map((profile: any) => ({
                      ...profile,
                      type: 'profile',
                      // images: profile.photographs.map((p) => new ImageModel(p)),
                      mediaObjects: profile.media_objects.map(
                        (m: any) => new MediaModel(m)
                      ),
                    }))
                  : multi_profiles[0]
                  ? multi_profiles[0]
                  : [],
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

  @Action(LoadDefinition)
  public loadDefinition(ctx: StateContext<ProfileStateModel>) {
    if (ctx.getState().definition.length !== 0) {
      return;
    }
    return this._defService.loadDefinitions()?.pipe(
      tap((definition: MultiProfiles[]) => {
        ctx.patchState({
          definition,
        });
      })
    );
  }

  @Action(LoadDefinitionSwagger)
  public loadDefinitionSwagger(ctx: StateContext<ProfileStateModel>) {
    if (ctx.getState().definition_swagger.length !== 0) {
      return;
    }

    return this._defService.loadDefinitions_swagger()?.pipe(
      tap((definition_swagger: MultiProfiles[]) => {
        ctx.patchState({
          definition_swagger,
        });
      })
    );
  }
}
