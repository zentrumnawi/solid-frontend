export class LoadProfiles {
  static readonly type = '[Profile] LoadProfiles';
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
