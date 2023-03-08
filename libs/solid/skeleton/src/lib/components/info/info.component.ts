import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Type,
  ViewChild,
} from '@angular/core';
import {
  InternalSolidSkeletonConfig,
  SOLID_SKELETON_CONFIG,
} from '../../solid-skeleton-config';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { MessageState } from '../../state/message.state';
import { MessageModel } from '../../state/message.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'solid-skeleton-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  public tourLandingChecked = false;
  public tourProfileChecked = false;
  public landingChecked = false;
  public route;

  @Select(MessageState.getNoticesAndSeries)
  public notices!: Observable<MessageModel[]>;

  private messages: any;
  public changeLogMsg: any[] = [];
  public newsMsg: any[] = [];

  public InfoPageContentComponent: Type<any>;
  public PrivacyContentComponent: Type<any>;
  public ProfileTitle;

  tabIndex = 0;
  @ViewChild('info_container') public info_container?: ElementRef;

  constructor(
    @Inject(SOLID_SKELETON_CONFIG) cfg: InternalSolidSkeletonConfig,
    route: ActivatedRoute
  ) {
    this.InfoPageContentComponent = cfg.infoPageContent;
    this.PrivacyContentComponent = cfg.privacyContent;
    this.ProfileTitle = cfg.routingConfig.profile.title;
    this.landingChecked =
      localStorage.getItem('hide_landing_banner') === 'false';
    this.tourLandingChecked =
      localStorage.getItem('hide_landing_tour') === 'false';
    this.tourProfileChecked =
      localStorage.getItem('hide_profile_tour') === 'false';
    this.route = route;
    this.messages = localStorage.getItem('solid_skeleton_messages');
  }

  moveTabToPrivacy(event: any) {
    event.preventDefault();
    this.tabIndex = 1;
  }

  public scrollToTop() {
    const info_container = this.info_container;
    if (!info_container || info_container.nativeElement.scrollTop === 0) {
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

  ngOnInit(): void {
    const directTo = this.route.snapshot.queryParams.directTo;
    const msgObj = JSON.parse(this.messages);
    msgObj.forEach((msg: any) => {
      if (msg.type != 'CL') this.newsMsg.push(msg);
      else this.changeLogMsg.push(msg);
    });
    switch (directTo) {
      case 'privacy':
        this.tabIndex = 1;
        break;

      case 'news':
        this.tabIndex = 2;
        break;

      default:
        this.tabIndex = 0;
        break;
    }
  }
}
