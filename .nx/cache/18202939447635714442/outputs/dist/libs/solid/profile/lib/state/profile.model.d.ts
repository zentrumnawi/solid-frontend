import { MediaObjectModel, MediaModel } from '@zentrumnawi/solid-core';
export interface TreeNode extends TreeNodeApi {
  type: 'category';
  children: TreeNode[];
  profiles: Profile[];
}
export interface TreeNodeApi {
  name: string;
  children: TreeNodeApi[];
  profiles: ProfileApi[];
  info: string;
}
export interface Profile extends ProfileApi {
  type: 'profile';
  mediaObjects: MediaModel[];
  [key: string]: any;
  def_type: string;
}
export interface ProfileApi {
  id: number;
  name: string;
  media_objects: MediaObjectModel[];
  sub_name: string;
  short_description?: string;
}
export interface ProfileShort {
  id: number;
  type?: string;
}
