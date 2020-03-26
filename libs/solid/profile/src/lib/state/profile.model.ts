export type Profile = ProfileCategory | MineralProfile;

export interface Image {
  large: string;
  medium: string;
  small: string;
  thumbnail: string;
}

export interface ProfileCategory {
  type: 'category';
  title: string;
  description: string | null;
  children: Profile[];
}

export interface MineralProfile {
  type: 'mineral';
  id: number;
  variety?: string;
  mineralName: string;
  trivialName?: string;
  images: Image[];
  chemicalFormula: string;
  mohsScale: string;
  cleavage: { cleavage: string, coordinates: string }[];
  density: string;
  streak: string;
  color: string;
  crystalSystems: CrystalSystem[];
  fractures: string[];
  lustres: string[];
  other: string | null;
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
  cleavage: { cleavage: string, coordinates: string }[];
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
