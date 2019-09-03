import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ApiHttpClient} from '../../../shared/abstract/api-http-client';
import {ProfileSetAction, ProfileSetEntryAction} from '../state/profile.actions';
import {
  MineralProfile,
  MineralProfileApi,
  NodeApi,
  Profile,
  ProfileCategory
} from '../state/profile.model';
import {Store} from "@ngxs/store";

@Injectable()
export class ProfileService extends ApiHttpClient {
  constructor(
    private _store: Store,
    httpClient: HttpClient,
  ) {
    super(httpClient, ['api']);
  }

  public loadProfiles() {
    this.get<NodeApi[]>('profiles').subscribe(data => {
      const categories: ProfileCategory[] = this.mapTree(data);
      this._store.dispatch(new ProfileSetAction(categories));
    });
  }

  private mapTree(children: NodeApi[]): ProfileCategory[] {
    return children.map(child => ({
      type: 'category' as 'category',
      title: child.node_name,
      description: child.info_text.length === 0 ? null : child.info_text,
      children: [...this.mapTree(child.leaf_nodes), ...this.mapMinerals(child.mineraltypes)],
    }));
  }

  private mapMinerals(children: MineralProfileApi[]): MineralProfile[] {
    return children.map(child => ({
      type: 'mineral' as 'mineral',
      id: child.id,
      name: child.trivial_name,
      imageFiles: child.image_file ? child.image_file : {
        large: '/assets/profile/no_image.svg',
        medium: '/assets/profile/no_image.svg',
        small: '/assets/profile/no_image.svg',
        thumbnail: '/assets/profile/no_thumbnail.svg',
      },
      chemicalFormula: child.chemical_formula,
      variety: child.variety,
      mohsScale: child.mohs_scale,
      cleavage: child.cleavage,
      density: child.density,
      crystalSystems: child.crystal_system.map(system => ({
        name: system.crystal_system,
      })),
      streak: child.streak,
      color: child.normal_color,
      fractures: child.fracture,
      lustres: child.lustre,
    }));
  }

  loadProfile(profileId: number) {
    this.get<MineralProfileApi>(['mineraltype', profileId]).subscribe(data => {
      this._store.dispatch(new ProfileSetEntryAction(this.mapMinerals([data])[0]));
    });
  }
}
