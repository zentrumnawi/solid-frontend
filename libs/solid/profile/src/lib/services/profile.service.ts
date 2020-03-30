import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ProfileSetAction } from '../state/profile.actions';
import {
  MineralProfile,
  MineralProfileApi,
  NodeApi,
  ProfileCategory
} from '../state/profile.model';
import { Store } from '@ngxs/store';
import { SOLID_CORE_CONFIG, SolidCoreConfig } from '@zentrumnawi/solid/core';

@Injectable()
export class ProfileService {
  constructor(
    private _store: Store,
    private _http: HttpClient,
    @Inject(SOLID_CORE_CONFIG) private _config: SolidCoreConfig
  ) {}

  public loadProfiles() {
    if (this._store.selectSnapshot(state => state.profile).length === 0) {
      this._http
        .get<NodeApi[]>(`${this._config.apiUrl}/api/profiles/`)
        .subscribe(data => {
          const categories: ProfileCategory[] = this.mapTree(data);
          this._store.dispatch(new ProfileSetAction(categories));
        });
    }
  }

  private mapTree(children: NodeApi[]): ProfileCategory[] {
    return children.map(child => ({
      type: 'category' as 'category',
      title: child.node_name,
      description: child.info_text.length === 0 ? null : child.info_text,
      children: [
        ...this.mapTree(child.leaf_nodes),
        ...this.mapMinerals(child.mineraltypes)
      ]
    }));
  }

  private mapMinerals(children: MineralProfileApi[]): MineralProfile[] {
    return children.map(child => ({
      type: 'mineral' as 'mineral',
      id: child.id,
      mineralName: child.minerals,
      images: child.image_file ? [child.image_file] : [],
      chemicalFormula: child.chemical_formula,
      variety: child.variety === '' ? undefined : child.variety,
      trivialName: child.trivial_name === '' ? undefined : child.trivial_name,
      mohsScale: child.mohs_scale,
      cleavage: child.cleavage,
      density: child.density,
      crystalSystems: child.crystal_system.map(system => ({
        name: system.crystal_system
      })),
      streak: child.streak,
      color: child.normal_color,
      fractures: child.fracture,
      lustres: child.lustre,
      other: child.other === '' ? null : child.other
    }));
  }
}
