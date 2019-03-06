import {ImageFiles} from '../../../shared/models';
import {AppState} from '../../../state/app.model';

export interface ProfileAppState extends AppState {
  profile: MineralState;
}

export type MineralState = Profile[];

export const profileInitialState = [];

export type Profile = ProfileCategory | MineralProfile;

export interface ProfileCategory {
  type: 'category';
  title: string;
  children: Profile[];
}

export interface MineralProfile {
  type: 'mineral';
  id: number;
  variety: string;
  name: string;
  imageFiles: ImageFiles;
  chemicalFormula: string;
  mohsScale: string;
  cleavage: { cleavage: string, coordinates: string }[]
  density: string;
  streak: string;
  color: string;
  crystalSystems: CrystalSystem[];
  fractures: string[];
  lustres: string[];
}

export interface MineralProfileApi {
  id: number;
  trivial_name: string;
  image_file: ImageFiles | null;
  chemical_formula: string;
  variety: string;
  mohs_scale: string;
  cleavage: { cleavage: string, coordinates: string }[]
  density: string;
  streak: string;
  crystal_system: CrystalSystemApi[];
  normal_color: string;
  fracture: string[];
  lustre: string[];
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

export type ProfileLinks = { [key: string]: ProfileLinks | MineralProfileApi[] };
