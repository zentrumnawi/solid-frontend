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

  public async loadProfiles() {
    // TODO: Load full tree with new api endpoint
    const profiles = await this.get<ProfileLinks>([0, 0]).toPromise();
    const categories: Profile[] = [];
    for (let cat of Object.entries(profiles)) {
      categories.push({
        type: 'category',
        title: cat[0],
        children: await this.loadChildren(cat[1].link),
      });
    }
    this._store.dispatch(new ProfileSetAction(categories));
  }

  public async loadChildren(link: string): Promise<Profile[]> {
    const profiles = await this.get<ProfileLinks | MineralProfileApi[]>(link.substr(1), {urlFromRoot: true}).toPromise();
    if (Array.isArray(profiles)) { // MineralProfileApi[]
      return profiles.map(api => ({
        type: 'mineral' as 'mineral',
        title: api.trivial_name,
        image_file: api.image_file,
      }));
    } else { // ProfileLinks
      const categories: Profile[] = [];
      for (let cat of Object.entries(profiles)) {
        categories.push({
          type: 'category',
          title: cat[0],
          children: await this.loadChildren(cat[1].link),
        });
      }
      return categories;
    }
  }
}
