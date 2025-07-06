import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  Profile,
  TreeNode,
  TreeNodeApi,
  ProfileApiResponse,
} from './profile.model';
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
  SearchProfiles,
  LoadProfilesFlat,
} from './profile.actions';
import { map, tap } from 'rxjs/operators';
import { ProfileDefinitionService } from '../services/profile-definition.service';
import { MultiProfiles } from './profile-definition.model';

export interface ProfileStateModel {
  profiles: Profile[];
  nodes: TreeNode[];
  definition: MultiProfiles[];
  definition_swagger: MultiProfiles[];
  searchResults: Profile[];
  gridProfiles: Profile[];
}

@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    profiles: [],
    nodes: [],
    searchResults: [],
    definition: [],
    definition_swagger: [],
    gridProfiles: [],
  },
})
@Injectable()
export class ProfileState {
  constructor(
    private http: HttpClient,
    @Inject(SOLID_CORE_CONFIG) private _config: SolidCoreConfig,
    private _defService: ProfileDefinitionService,
  ) {}

  @Selector()
  static selectProfileAndNode(
    state: ProfileStateModel,
  ): (
    profileId?: number,
    profileType?: string,
  ) => { profile: Profile; node: TreeNode } | null {
    // This redundant variable is required
    // https://github.com/ng-packagr/ng-packagr/issues/696
    const fn = function (profileId?: number, profileType?: string) {
      if (!profileId) {
        return null;
      }
      for (const node of state.nodes) {
        const childSearch = profileType
          ? ProfileState.findProfileDeep(node, profileId, profileType)
          : ProfileState.findProfileDeep(node, profileId); // temporary for PLANTY
        if (childSearch !== null) {
          return childSearch;
        }
      }
      return null;
    };
    return fn;
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

  @Selector()
  static selectSearchResults(state: ProfileStateModel): Profile[] {
    return [...state.searchResults];
  }

  @Selector()
  static selectGridProfiles(state: ProfileStateModel): Profile[] {
    return [...state.gridProfiles];
  }

  private static findProfileDeep(
    node: TreeNode,
    profileId: number,
    profileType?: string,
  ): { profile: Profile; node: TreeNode } | null {
    const profile = profileType
      ? node.profiles.find(
          (p) => p.id === profileId && p.def_type === profileType,
        )
      : node.profiles.find((p) => p.id === profileId); // temporary for PLANTY
    if (profile) {
      return {
        profile,
        node,
      };
    }
    for (const leafNode of node.children) {
      const childSearch = profileType
        ? ProfileState.findProfileDeep(leafNode, profileId, profileType)
        : ProfileState.findProfileDeep(leafNode, profileId); // temporary for PLANTY
      if (childSearch !== null) {
        return childSearch;
      }
    }
    return null;
  }

  // Preliminary Workaround for GeoMat to merge unknown rock compounds with minerals from geomat db
  private static composeMineralCompounds(
    compounds: string,
    geoMatContent: object[],
  ) {
    const compundArray = compounds
      .split(', ')
      .splice(-geoMatContent.length)
      .map((value) => ({
        id: null,
        name: value,
        sub_name: '',
      }));
    const cmp = [...compundArray, ...geoMatContent];
    return cmp;
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
              let multi_profiles = Object.entries(node)
                .filter((property: any) => {
                  if (
                    property[0].search('related') !== -1 &&
                    node[property[0]].length !== 0
                  )
                    return property;
                })
                .map((profiles: any) => {
                  return profiles[1].map((profile: any) => {
                    const profileName = profile.general_information?.name;
                    const profileSubName =
                      profile.general_information?.sub_name;
                    return {
                      ...profile,
                      name: profileName ? profileName : 'Kein Name vorhanden',
                      sub_name: profileSubName,
                      type: 'profile',
                      mediaObjects: profile.media_objects
                        .sort(
                          (a: MediaObjectModel, b: MediaObjectModel) =>
                            a.profile_position - b.profile_position,
                        )
                        .map((m: MediaObjectModel) => new MediaModel(m)),
                      def_type: profiles[0].split('_')[0],
                    };
                  });
                });

              // handle inadvertent case of different types of profiles in the same node
              if (multi_profiles.length > 1) {
                multi_profiles = [
                  multi_profiles.reduce(
                    (a, b) => (a.length > b.length ? a : b),
                    [],
                  ),
                ];
              }

              return {
                type: 'category',
                name: node.name,
                info: node.info,
                children: mapit(node.children),
                profiles: node.profiles
                  ? node.profiles.map((profile: any) => ({
                      ...profile,
                      type: 'profile',
                      mediaObjects: profile.media_objects.map(
                        (m: MediaObjectModel) => new MediaModel(m),
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
          ctx.patchState({ nodes });
        }),
      );
  }

  @Action(SearchProfiles)
  searchProfiles(
    ctx: StateContext<ProfileStateModel>,
    { searchTerm }: SearchProfiles,
  ) {
    return this.http
      .get<
        ProfileApiResponse[]
      >(`${this._config.apiUrl}/profile-search/search/?q=${searchTerm}`)
      .pipe(
        map((response) =>
          response.map(
            (profile) =>
              ({
                ...profile,
                type: 'profile',
                name: profile.general_information.name,
                sub_name: profile.general_information.sub_name,
                mediaObjects: profile.media_objects
                  .sort((a, b) => a.profile_position - b.profile_position)
                  .map((m) => new MediaModel(m)),
              }) as Profile,
          ),
        ),
        tap((profiles) => ctx.patchState({ searchResults: profiles })),
      );
  }

  @Action(LoadProfilesFlat)
  public setProfilesFlat(ctx: StateContext<ProfileStateModel>) {
    if (ctx.getState().gridProfiles.length !== 0) {
      return;
    }
    return this.http
      .get<ProfileApiResponse[]>(`${this._config.apiUrl}/flat-profiles/`)
      .pipe(
        map((response) =>
          response.map(
            (profile) =>
              ({
                ...profile,
                type: 'profile',
                name: profile.general_information?.name,
                sub_name: profile.general_information?.sub_name,
                mediaObjects: profile.media_objects
                  .sort((a, b) => a.profile_position - b.profile_position)
                  .map((m) => new MediaModel(m)),
              }) as Profile,
          ),
        ),
        tap((profiles) => {
          ctx.patchState({ gridProfiles: profiles });
        }),
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
      }),
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
      }),
    );
  }
}
