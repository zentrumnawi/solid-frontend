import {
  ImageModel,
  PhotographModel,
  MediaObjectModel,
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
  images: ImageModel[];
  [key: string]: any;
}

export interface ProfileApi {
  id: number;
  name: string;
  photographs: PhotographModel[];
  trivial_name: string;
  short_description?: string;
}
