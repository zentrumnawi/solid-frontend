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

export class LoadDefinition {
  static readonly type = '[Profile] LoadDefinition';
}

export class LoadDefinitionSwagger {
  static readonly type = '[Profile] LoadDefinitionSwagger';
}
