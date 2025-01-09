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
    | ProfilePropertyType.Mdstring
    | ProfilePropertyType.Colstring;
}
export interface ProfilePropertyGroup extends ProfilePropertyBase {
  type: ProfilePropertyType.Group;
  properties: ProfileProperty[];
}
export declare enum ProfilePropertyType {
  String = 0,
  Integer = 1,
  Boolean = 2,
  List = 3,
  Mdstring = 4,
  Colstring = 5,
  Group = 6,
}
export interface MultiProfiles {
  name: string | undefined;
  properties: ProfileProperty[];
}
export type ProfileProperty = ProfilePropertySimple | ProfilePropertyGroup;
