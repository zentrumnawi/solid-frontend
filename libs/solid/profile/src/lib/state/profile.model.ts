import { ImageModel, PhotographModel } from '@zentrumnawi/solid-core';

export interface TreeNode extends TreeNodeApi {
  type: 'category';
  leaf_nodes: TreeNode[];
  profiles: Profile[];
}

export interface TreeNodeApi {
  node_name: string;
  leaf_nodes: TreeNodeApi[];
  profiles: ProfileApi[];
  info_text: string;
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
}
