export interface ProfilePropertyBase {
  key: string;
  required: boolean;
  title: string;
}

export interface ProfilePropertySimple extends ProfilePropertyBase {
  type:
    | ProfilePropertyType.String
    | ProfilePropertyType.Integer
    | ProfilePropertyType.Boolean
    | ProfilePropertyType.List
    | ProfilePropertyType.mdstring
    | ProfilePropertyType.colstring;
}

export interface ProfilePropertyGroup extends ProfilePropertyBase {
  type: ProfilePropertyType.Group;
  properties: ProfileProperty[];
}

export enum ProfilePropertyType {
  String,
  Integer,
  Boolean,
  List,
  mdstring,
  colstring,
  Group,
}

export type ProfileProperty = ProfilePropertySimple | ProfilePropertyGroup;
