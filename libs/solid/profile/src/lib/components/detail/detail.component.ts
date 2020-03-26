import { Component, Input } from '@angular/core';
import { MineralProfile, ProfileCategory } from '../../state/profile.model';

@Component({
  selector: 'solid-profile-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  @Input() public category!: ProfileCategory;
  public ImageLoaded = [false];
  public ImageSelected = 0;
  public ImageStartIndex = 0;
  public ImageEndIndex = 0;

  private _profile!: MineralProfile;

  public get profile() {
    return this._profile;
  }

  @Input()
  public set profile(profile: MineralProfile) {
    this._profile = profile;
    this.ImageLoaded = profile.images.map(_ => false);
    this.onImageSelect(0);
  }

  public onImageLoaded(index: number) {
    this.ImageLoaded[index] = true;
  }

  public onImageSelect(index: number) {
    this.ImageSelected = index;
    if (index < 3) {
      this.ImageStartIndex = 0;
      this.ImageEndIndex = index + 3 + (3 - index);
    } else if (index > this.profile.images.length - 4) {
      this.ImageEndIndex = this.profile.images.length - 1;
      this.ImageStartIndex = index - 3 - (3 - (this.profile.images.length - index - 1));
    } else {
      this.ImageStartIndex = index - 3;
      this.ImageEndIndex = index + 3;
    }
  }
}
