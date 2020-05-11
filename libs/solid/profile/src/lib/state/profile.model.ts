export interface Image {
  large: string;
  medium: string;
  small: string;
  thumbnail: string;
}

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
  images: Image[];
  [key: string]: any;
}

export interface ProfileApi {
  id: number;
  name: string;
  trivial_name: string;
}
