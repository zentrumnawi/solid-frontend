import { LazyTreeNode, Profile, TreeNode } from "./profile.model";

export class LoadProfiles {
  static readonly type = '[Profile] LoadProfiles';
}

export class GetChildren {
  static type = '[Profile] GetChildren';
  constructor(public id: number) {}
}

export class GetEntries {
  static type = '[Profile] GetEntries';
  constructor(public id: number) {}
}

export class GetRootNodes {
  static readonly type = '[Profile] GetRootNodes';
}

export class ChildrenLoaded {
  static type = '[Profile] ChildrenLoaded';
  constructor(public parentId: number, public children: LazyTreeNode[], public profiles: Profile[]) {}
}

export class SearchProfiles {
  static readonly type = '[Profile] SearchProfiles';
  constructor(public searchTerm: string) {}
}

export class LoadProfilesFlat {
  static readonly type = '[Profile] LoadProfilesFlat';
}

export class LoadDefinition {
  static readonly type = '[Profile] LoadDefinition';
}

export class LoadDefinitionSwagger {
  static readonly type = '[Profile] LoadDefinitionSwagger';
}

export class EnsureEntryPath {
  static readonly type = '[Profile] EnsureEntryPath';
  constructor(public id: number, public defType: string) {}
}

export class InsertPathFragments {
  static readonly type = '[Profile] InsertPathFragments';
  constructor(public node: LazyTreeNode) {}
}

export class GetSingleProfile {
  static readonly type = '[Profile] GetSingleProfile';
  constructor(public id: number, public defType: string) {}
}