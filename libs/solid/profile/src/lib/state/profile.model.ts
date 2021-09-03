import {
  ImageModel,
  PhotographModel,
  MediaObjectModel,
  MediaModel,
} from '@zentrumnawi/solid-core';

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
  [key: string]: any;
}

export interface ProfileApi {
  id: number;
  name: string;
  // photographs: PhotographModel[];
  media_objects: MediaObjectModel[];
  trivial_name: string;
  short_description?: string;
}
