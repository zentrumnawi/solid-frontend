import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApiHttpClient} from '../../../shared/abstract/api-http-client';
import {ProfileSetAction} from '../state/profile.actions';
import {MineralProfileApi, Profile, ProfileAppState, ProfileLinks} from '../state/profile.model';

@Injectable()
export class ProfileService extends ApiHttpClient {
  constructor(
    private _store: Store<ProfileAppState>,
    httpClient: HttpClient,
  ) {
    super(httpClient, ['api', 'profiles']);
  }

  public loadProfiles() {
    this.get<ProfileLinks>().subscribe(data => {
      const categories: Profile[] = [];
      for (let cat of Object.entries(data)) {
        categories.push({
          type: 'category',
          title: cat[0],
          children: this.mapChild(cat[1]),
        });
      }
      this._store.dispatch(new ProfileSetAction(categories));
    });
  }

  private mapChild(child: ProfileLinks | MineralProfileApi[]): Profile[] {
    if (Array.isArray(child)) { // MineralProfileApi[]
      return child.map(api => ({
        type: 'mineral' as 'mineral',
        id: api.id,
        name: api.trivial_name,
        imageFiles: api.image_file ? api.image_file : {
          large: '/assets/profile/no_image.svg',
          medium: '/assets/profile/no_image.svg',
          small: '/assets/profile/no_image.svg',
          thumbnail: '/assets/profile/no_thumbnail.svg',
        },
        chemicalFormula: api.chemical_formula,
        variety: api.variety,
        mohsScale: api.mohs_scale,
        density: api.density,
        crystalSystems: api.crystal_system.map(system => ({
          name: system.crystal_system,
        })),
        streak: api.streak,
        color: api.normal_color,
        fractures: api.fracture,
        lustres: api.lustre,
      }));
    } else { // ProfileLinks
      const categories: Profile[] = [];
      for (let cat of Object.entries(child)) {
        categories.push({
          type: 'category',
          title: cat[0],
          children: this.mapChild(cat[1]),
        });
      }
      return categories;
    }
  }
}
