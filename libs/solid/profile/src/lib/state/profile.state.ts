import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  Profile,
  TreeNode,
  TreeNodeApi,
  ProfileApiResponse,
  LazyTreeNode,
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
  GetChildren,
  GetRootNodes,
  GetEntries,
  ChildrenLoaded,
  EnsureEntryPath,
  InsertPathFragments,
  GetSingleProfile,
  SearchProfiles,
  LoadProfilesFlat,
  SetNavigateProfileFromURL,
  SetFullPaths,
  SetExpandedNodeIds,
  SetSelectedProfilePath,
} from './profile.actions';
import { concatMap, map, switchMap, tap, toArray } from 'rxjs/operators';
import { ProfileDefinitionService } from '../services/profile-definition.service';
import { MultiProfiles } from './profile-definition.model';
import { from, of } from 'rxjs';

export interface ProfileStateModel {
  profiles: Profile[];
  nodes: TreeNode[];
  definition: MultiProfiles[];
  definition_swagger: MultiProfiles[];
  rootNodes: LazyTreeNode[];
  children: { [id: number]: LazyTreeNode[] };
  entries: { [id: number]: Profile[] };
  selectedProfile: Profile | null;
  selectedProfilePath: LazyTreeNode[];
  fullPaths: { [id: number]: LazyTreeNode[] };
  navigateProfileFromURL: boolean;
  searchResults: Profile[];
  gridProfiles: Profile[];
  expandedNodeIds: number[];
}

@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    profiles: [],
    nodes: [],
    searchResults: [],
    definition: [],
    definition_swagger: [],
    children: {},
    rootNodes: [],
    entries: {},
    selectedProfile: null,
    selectedProfilePath: [],
    gridProfiles: [],
    navigateProfileFromURL: false,
    fullPaths: {},
    expandedNodeIds: [],
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
  static selectExpandedNodeIds(state: ProfileStateModel): number[] {
    return state.expandedNodeIds;
  }

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
      const entries = Object.values(state.entries);
      console.log('entries', entries);
      if (!profileId) {
        return null;
      }
      for (const entry of entries) {
        //const profile = profileType ? entry[profileId] : entry;
        console.log('entry', entry);
        const profile = profileType
          ? entry.find((p) => p.id === profileId && p.def_type === profileType)
          : entry.find((p) => p.id === profileId);
        console.log('this profile?', profile);
        if (profile) {
          return { profile: profile, node: profile.tree_node };
        }
        // const childSearch = profileType
        //   ? ProfileState.findProfileDeep(node, profileId, profileType)
        //   : ProfileState.findProfileDeep(node, profileId); // temporary for PLANTY
        // if (childSearch !== null) {
        //   return childSearch;
        // }
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
  static selectRootNodes(state: ProfileStateModel): LazyTreeNode[] {
    return [...state.rootNodes];
  }

  @Selector()
  static selectChildrenById(state: ProfileStateModel): {
    [id: number]: LazyTreeNode[];
  } {
    return state.children;
  }

  @Selector()
  static selectEntries(state: ProfileStateModel): { [id: number]: Profile[] } {
    return state.entries;
  }

  @Selector()
  static selectSelectedProfile(state: ProfileStateModel): Profile | null {
    return state.selectedProfile;
  }

  @Selector()
  static selectSelectedProfilePath(state: ProfileStateModel): LazyTreeNode[] {
    return state.selectedProfilePath;
  }

  @Selector()
  static selectFullPaths(state: ProfileStateModel): {
    [id: number]: LazyTreeNode[];
  } {
    return state.fullPaths;
  }

  @Selector()
  static selectSearchResults(state: ProfileStateModel): Profile[] {
    return [...state.searchResults];
  }

  @Selector()
  static selectGridProfiles(state: ProfileStateModel): Profile[] {
    return [...state.gridProfiles];
  }

  @Selector()
  static selectNavigateProfileFromURL(state: ProfileStateModel): boolean {
    return state.navigateProfileFromURL;
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
                id: node.id,
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

  @Action(GetChildren)
  getChildren(ctx: StateContext<ProfileStateModel>, { id }: GetChildren) {

    return this.http
      .get<LazyTreeNode[]>(`${this._config.apiUrl}/children/${id}`)
      .pipe(
        map((children: LazyTreeNode[]) => {
          return children.map(
            (node: LazyTreeNode) =>
              ({
                type: 'category',
                id: node?.id ?? 0,
                name: node?.name ?? '',
                sub_name: node?.info ?? '',
                has_children: node?.has_children ?? false,
                expandable: true,
                info: node?.info ?? '',
                loaded: false,
                loading: false,
                // set children to empty array, so that after lazy-loading children, array can be artificially nested
                children: [],
                profiles: [],
              }) as LazyTreeNode,
          );
        }),
        tap((children: LazyTreeNode[]) => {
          ctx.patchState({
            children: {
              ...ctx.getState().children,
              [id]: children,
            },
          });
        }),
      );
  }

  @Action(GetEntries)
  getEntries(ctx: StateContext<ProfileStateModel>, { id }: GetEntries) {
    if (ctx.getState().entries[id] && ctx.getState().entries[id].length > 0) {
      console.log('returning early');
      return ctx.getState().entries[id];
    }
    return this.http
      .get<Profile[]>(`${this._config.apiUrl}/flat-profiles/?node_id=${id}`)
      .pipe(
        map((entries: Profile[]) => {
          
          return entries.map(
            (profile: Profile) =>
              ({
                ...profile,
                type: 'profile',
                name: profile.general_information?.name,
                sub_name: profile.general_information?.sub_name,
                mediaObjects: profile.media_objects
                  .sort((a, b) => a.profile_position - b.profile_position)
                  .map((m) => new MediaModel(m)),
              }) as Profile,
          );
        }),
        tap((entries: Profile[]) => {
          console.log('getEntries inside tap', entries);
          console.log('treenode id:', id, typeof id);
          console.log('entries[id]:', ctx.getState().entries[id]);
          ctx.patchState({
            entries: {
              ...ctx.getState().entries,
              [id]: entries,
            },
          });
        }),
      );
  }

  @Action(GetRootNodes)
  getRootNodes(ctx: StateContext<ProfileStateModel>) {
    return this.http
      .get<LazyTreeNode[]>(`${this._config.apiUrl}/root-nodes/`)
      .pipe(
        map((rootNodes: LazyTreeNode[]) => {
          return rootNodes.map(
            (node: LazyTreeNode) =>
              ({
                type: 'category',
                id: node?.id ?? 0,
                name: node?.name ?? '',
                sub_name: node?.info ?? '',
                has_children: node?.has_children ?? false,
                expandable: true,
                info: node?.info ?? '',
                loaded: false,
                loading: false,
                // set children to empty array, so that after lazy-loading children, array can be artificially nested
                children: [],
                profiles: [],
              }) as LazyTreeNode,
          );
        }),
        tap((rootNodes: LazyTreeNode[]) => {
          ctx.patchState({
            rootNodes,
          });
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

  @Action(EnsureEntryPath)
  ensureEntryPath(
    ctx: StateContext<ProfileStateModel>,
    { id, defType }: EnsureEntryPath,
  ) {
    console.log('ensuring');
    if (!id || !defType) return;
    const sel = ProfileState.selectProfileAndNode(ctx.getState())(id, defType);
    console.log('sel', sel);
    //if (sel) return;

    return this.http
      .get<LazyTreeNode[]>(`${this._config.apiUrl}/ancestors/${id}`)
      .pipe(
        // For each node, dispatch InsertPathFragments sequentially
        switchMap((path: LazyTreeNode[]) =>
          from(path).pipe(
            toArray(),
            map(() => path),
          ),
        ),
        tap((path: LazyTreeNode[]) => {
          console.log('path inside ensure tap', path);
          ctx.patchState({
            selectedProfilePath: path.map((node) => ({
              ...node,
              type: 'category',
              expandable: true,
            })),
          });
        }),
      );
  }

  @Action(InsertPathFragments)
  insertPathFragments(
    ctx: StateContext<ProfileStateModel>,
    { node }: InsertPathFragments,
  ) {
    const state = ctx.getState();
    return this.http
      .get<LazyTreeNode[]>(`${this._config.apiUrl}/children/${node.id}`)
      .pipe(
        tap((children: LazyTreeNode[]) => {
          ctx.patchState({
            children: { ...state.children, [node.id]: children ?? [] },
          });
        }),
      );
  }

  @Action(GetSingleProfile)
  getSingleProfile(
    ctx: StateContext<ProfileStateModel>,
    { id, defType }: GetSingleProfile,
  ) {
    // Check if profile exists in any cached entries (entries are keyed by node id)
    // Hint: from ES2019 on we could use flat() instead of the reduce workaround
    const allEntries = Object.values(ctx.getState().entries).reduce(
      (acc, profiles) => {
        return acc.concat(profiles);
      },
      [] as Profile[],
    );
    const cachedProfile = allEntries.find(
      (p: Profile) => p.id === id && (defType ? p.def_type === defType : true),
    );
    console.log('cachedProfile', cachedProfile, 'id', id, 'defType', defType);

    if (cachedProfile) {
      const profile = {
        ...cachedProfile,
        type: 'profile',
        def_type: cachedProfile.def_type.split('_')[0],
        name: cachedProfile.general_information?.name,
        sub_name: cachedProfile.general_information?.sub_name,
        mediaObjects: cachedProfile.media_objects
          .sort(
            (a: MediaObjectModel, b: MediaObjectModel) =>
              a.profile_position - b.profile_position,
          )
          .map((m: MediaObjectModel) => new MediaModel(m)),
      } as Profile;

      return of(profile).pipe(
        tap((profile: Profile) => {
          ctx.patchState({ selectedProfile: profile });
        }),
      );
    }

    return this.http
      .get<Profile>(
        `${this._config.apiUrl}/contentItem/${id}/${defType}_related`,
      )
      .pipe(
        tap((profile: Profile) => {
          profile = {
            ...profile,
            type: 'profile',
            def_type: profile.def_type.split('_')[0],
            name: profile.general_information?.name,
            sub_name: profile.general_information?.sub_name,
            mediaObjects: profile.media_objects
              .sort((a, b) => a.profile_position - b.profile_position)
              .map((m) => new MediaModel(m)),
          } as Profile;

          ctx.patchState({
            selectedProfile: profile,
            //entries: { ...ctx.getState().entries, [profile.tree_node.id]: [...(ctx.getState().entries[profile.tree_node.id] ?? []), profile] },
          });
        }),
      );
  }

  @Action(SetNavigateProfileFromURL)
  setNavigateProfileFromURL(
    ctx: StateContext<ProfileStateModel>,
    { navigateProfileFromURL }: SetNavigateProfileFromURL,
  ) {
    ctx.patchState({ navigateProfileFromURL });
  }

  @Action(SetFullPaths)
  setFullPaths(
    ctx: StateContext<ProfileStateModel>,
    { fullPaths }: SetFullPaths,
  ) {
    ctx.patchState({ fullPaths });
  }

  @Action(SetExpandedNodeIds)
  setExpandedNodeIds(
    ctx: StateContext<ProfileStateModel>,
    { expandedNodeIds }: SetExpandedNodeIds,
  ) {
    ctx.patchState({ expandedNodeIds });
  }

  @Action(SetSelectedProfilePath)
  public setSelectedProfilePath(
    ctx: StateContext<ProfileStateModel>,
    { selectedProfilePath }: SetSelectedProfilePath,
  ) {
    ctx.patchState({ selectedProfilePath });
  }
}
