import {Component, Input} from '@angular/core';
import {BaseComponent} from '../../../../shared/abstract/base.component';
import {MineralProfile} from '../../state/profile.model';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent extends BaseComponent {
  @Input('profile')
  public Profile?: MineralProfile;

  constructor() {
    super();
  }
}
