import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Profile, TreeNode } from '../../state/profile.model';
import { MultiProfiles, ProfileState } from '../../state/profile.state';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import {
  ProfileProperty,
  ProfilePropertyType,
} from '../../state/profile-definition.model';
import { MatAccordion } from '@angular/material/expansion';
import { MediaModel } from '@zentrumnawi/solid-core';

@Component({
  selector: 'solid-profile-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @ViewChild('expansion', { static: false, read: MatAccordion })
  expansion?: MatAccordion;
  @ViewChild('thumbnails') thumbnails: ElementRef | undefined;
  public PropertyTypes = ProfilePropertyType;
  @Select(ProfileState.selectDefinition)
  $ProfileDefinitions!: Observable<ProfileProperty[]>;
  //Load definitions from OpenAPI 2.0
  @Select(ProfileState.selectDefinition_swagger)
  $ProfileDefinition_Swagger!: Observable<MultiProfiles[]>;
  @Input() public node!: TreeNode;
  public ImageLoaded = [false];
  public ImageSelected = 0;
  public ImageIndex = 0;
  public ImageEndIndex = 0;
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  public hasDialog!: boolean;
  private _profile!: Profile;
  public hasDescription!: boolean;
  public hasDescriptionToggle = false;
  public MediaObjectsOnlyImages!: MediaModel[];
  public definitions!: MultiProfiles[];

  public get profile() {
    return this._profile;
  }

  @Input()
  public set profile(profile: Profile) {
    this._profile = profile;
    this.ImageLoaded = profile.mediaObjects.map((_) => false);
    this.expansion?._headers.forEach((panel) => panel?.panel.close());
    this.MediaObjectsOnlyImages = this.profile.mediaObjects.filter(
      (x) => x.mediaType === 'image'
    );
    this.onImageSelect(0);
  }

  ngOnInit(): void {
    this.$ProfileDefinition_Swagger.subscribe((defs) => {
      this.definitions = defs;
    });
  }

  public getProperties(profile: Profile) {
    const definition = this.definitions.filter(
      (def) => def.name === profile.def_type
    );
    return definition[0].properties;
  }

  public onImageLoaded(index: number) {
    this.ImageLoaded[index] = true;
  }

  public onImageSelect(index: number) {
    this.ImageSelected = index;
    this.ImageIndex = this.MediaObjectsOnlyImages.findIndex(
      (media) => media.getProfilePosition - 1 === index
    );
    // if (index < 3) {
    //   this.ImageStartIndex = 0;
    //   this.ImageEndIndex = index + 3 + (3 - index);
    // } else if (index > this.profile.mediaObjects.length - 4) {
    //   this.ImageEndIndex = this.profile.mediaObjects.length - 1;
    //   this.ImageStartIndex =
    //     index - 3 - (3 - (this.profile.mediaObjects.length - index - 1));
    // } else {
    //   this.ImageStartIndex = index - 3;
    //   this.ImageEndIndex = index + 3;
    // }
    if (this.profile.mediaObjects.length !== 0) {
      if (this.profile.mediaObjects[index].mediaType === 'audio') {
        this.hasDialog = false;
        this.hasDescription = false;
        this.hasDescriptionToggle = true;
      } else if (this.profile.mediaObjects[index].mediaType === 'video') {
        this.hasDialog = false;
        this.hasDescription = true;
        this.hasDescriptionToggle = false;
      } else {
        this.hasDialog = true;
        this.hasDescriptionToggle = false;
        this.hasDescription = false;
      }
    }
  }

  public shouldDisplayProperty(property: ProfileProperty, profile_obj: any) {
    if (property.required) {
      return true;
    }
    const val =
      profile_obj !== null &&
      profile_obj !== undefined &&
      property.key in profile_obj
        ? profile_obj[property.key]
        : undefined;
    switch (property.type) {
      case ProfilePropertyType.List:
        return Array.isArray(val) && val.length > 0;
      case ProfilePropertyType.Group:
      case ProfilePropertyType.String:
      case ProfilePropertyType.Integer:
      case ProfilePropertyType.Boolean:
      case ProfilePropertyType.Mdstring:
      case ProfilePropertyType.Colstring:
        return val !== undefined && val !== '';
    }
  }

  public swipe(currentIndex: number, action: string = this.SWIPE_ACTION.RIGHT) {
    if (currentIndex > this.profile.mediaObjects.length || currentIndex < 0) {
      return;
    }
    if (action === this.SWIPE_ACTION.LEFT) {
      const isLast = currentIndex === this.profile.mediaObjects.length - 1;
      this.ImageSelected = isLast ? 0 : currentIndex + 1;
    }
    if (action === this.SWIPE_ACTION.RIGHT) {
      const isFirst = currentIndex === 0;
      this.ImageSelected = isFirst
        ? this.profile.mediaObjects.length - 1
        : currentIndex - 1;
    }
    this.thumbnails?.nativeElement.children[this.ImageSelected].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }
  handleNextDialogEvent() {
    if (this.ImageIndex < this.MediaObjectsOnlyImages.length - 1) {
      this.ImageIndex++;
    } else {
      this.ImageIndex = 0;
    }
    this.ImageSelected =
      this.MediaObjectsOnlyImages[this.ImageIndex].getProfilePosition - 1;
  }

  handlePrevDialogEvent() {
    if (this.ImageIndex > 0) {
      this.ImageIndex--;
    } else {
      this.ImageIndex = this.MediaObjectsOnlyImages.length - 1;
    }
    this.ImageSelected =
      this.MediaObjectsOnlyImages[this.ImageIndex].getProfilePosition - 1;
  }
}
