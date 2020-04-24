export type Profile = ProfileCategory | ProfileEntry;

export interface Image {
  large: string;
  medium: string;
  small: string;
  thumbnail: string;
}

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
    | ProfilePropertyType.List;
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
  Group
}

export type ProfileProperty = ProfilePropertySimple | ProfilePropertyGroup;

export interface ProfileCategory {
  type: 'category';
  title: string;
  description: string | null;
  children: Profile[];
}

export interface ProfileEntry {
  type: 'entry';
  id: number;
  variety?: string;
  mineralName: string;
  trivialName?: string;
  images: Image[];
  chemicalFormula: string;
  mohsScale: string;
  cleavage: { cleavage: string; coordinates: string }[];
  density: string;
  streak: string;
  color: string;
  crystalSystems: CrystalSystem[];
  fractures: string[];
  lustres: string[];
  other: string | null;
}

export interface TreeNode extends TreeNodeApi {
  type: 'category';
  leaf_nodes: TreeNode[];
  profiles: ProfileNEW[];
}

export interface TreeNodeApi {
  node_name: string;
  leaf_nodes: TreeNodeApi[];
  profiles: ProfileApi[];
  info_text: string;
}

export interface ProfileNEW extends ProfileApi {
  type: 'profile';
  images: Image[];
  display_name: string;
  [key: string]: any;
}

export interface ProfileApi {
  id: number;
  name: string;
  trivial_name: string;
}

export interface NodeApi {
  node_name: string;
  leaf_nodes: NodeApi[];
  info_text: string;
  image: Image | null;
  mineraltypes: MineralProfileApi[];
}

export interface MineralProfileApi {
  id: number;
  trivial_name: string;
  image_file: Image | null;
  chemical_formula: string;
  minerals: string;
  variety: string;
  mohs_scale: string;
  cleavage: { cleavage: string; coordinates: string }[];
  density: string;
  streak: string;
  crystal_system: CrystalSystemApi[];
  normal_color: string;
  fracture: string[];
  lustre: string[];
  other: string;
}

export interface CrystalSystem {
  name: string;
}

export interface CrystalSystemApi {
  id: number;
  crystal_system: string;
  mineral_type: number;
  temperature: number | null;
  pressure: number | null;
}
