import { Component, ElementRef, Inject, Type, ViewChild } from '@angular/core';
import {
  InternalSolidSkeletonConfig,
  SOLID_SKELETON_CONFIG,
} from '../../solid-skeleton-config';
import { MessageState } from '../../state/message.state';
import { Select } from '@ngxs/store';
import { MessageModel } from '../../state/message.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'solid-skeleton-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
  public tourLandingChecked = false;
  public tourProfileChecked = false;
  public landingChecked = false;

  public InfoPageContentComponent: Type<any>;
  public PrivacyContentComponent: Type<any>;
  public ProfileTitle;
  @Select(MessageState.getChangelog)
  public Changelog!: Observable<MessageModel[]>;

  @Select(MessageState.getNoticesAndSeries)
  public Notices!: Observable<MessageModel[]>;
  tabIndex = 0;
  @ViewChild('info_container') public info_container?: ElementRef;

  constructor(@Inject(SOLID_SKELETON_CONFIG) cfg: InternalSolidSkeletonConfig) {
    this.InfoPageContentComponent = cfg.infoPageContent;
    this.PrivacyContentComponent = cfg.privacyContent;
    this.ProfileTitle = cfg.routingConfig.profile.title;
    this.landingChecked =
      localStorage.getItem('hide_landing_banner') === 'false';
    this.tourLandingChecked =
      localStorage.getItem('hide_landing_tour') === 'false';
    this.tourProfileChecked =
      localStorage.getItem('hide_profile_tour') === 'false';
  }

  moveTabToPrivacy(event: any) {
    event.preventDefault();
    this.tabIndex = 1;
    this.scrollToTop();
  }

  public scrollToTop() {
    const info_container = this.info_container;
    if (!info_container) {
      return;
    }
    info_container.nativeElement.scrollTop = 0;
  }

  public toggleChange() {
    if (this.tourLandingChecked)
      localStorage.setItem('hide_landing_tour', 'false');
    else localStorage.setItem('hide_landing_tour', 'true');
    if (this.tourProfileChecked)
      localStorage.setItem('hide_profile_tour', 'false');
    else localStorage.setItem('hide_profile_tour', 'true');
    if (this.landingChecked)
      localStorage.setItem('hide_landing_banner', 'false');
    else localStorage.setItem('hide_landing_banner', 'true');
  }
}
