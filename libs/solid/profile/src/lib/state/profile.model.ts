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
  // images: ImageModel[];
  mediaObjects: MediaModel[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  def_type: string;
}

export interface ProfileApi {
  id: number;
  name: string;
  // photographs: PhotographModel[];
  media_objects: MediaObjectModel[];
  sub_name: string;
  short_description?: string;
}

export interface ProfileShort {
  id: number;
  type?: string;
}
