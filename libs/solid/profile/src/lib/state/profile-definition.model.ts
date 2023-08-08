export interface ProfilePropertyBase {
  key: string;
  required: boolean;
  title: string;
}

export interface ProfilePropertySimple extends ProfilePropertyBase {
  // all custom types (mdstring, ...) can be retrieved from the property format (schema)
  type:
    | ProfilePropertyType.String
    | ProfilePropertyType.Integer
    | ProfilePropertyType.Boolean
    | ProfilePropertyType.List
    | ProfilePropertyType.Mdstring
    | ProfilePropertyType.Colstring;
}

export interface ProfilePropertyGroup extends ProfilePropertyBase {
  type: ProfilePropertyType.Group;
  properties: ProfileProperty[];
}

export interface EnumType {
  enum: string;
  value: string;
}

export interface ProfilePropertyEnum extends ProfilePropertyBase {
  type: ProfilePropertyType.Enum;
  valueType: ProfilePropertyType;
  values: EnumType[];
}

export enum ProfilePropertyType {
  String,
  Integer,
  Boolean,
  List,
  Mdstring,
  Colstring,
  Group,
  Enum,
}

export interface MultiProfiles {
  name: string | undefined;
  properties: ProfileProperty[];
}

export type ProfileProperty =
  | ProfilePropertySimple
  | ProfilePropertyGroup
  | ProfilePropertyEnum;
