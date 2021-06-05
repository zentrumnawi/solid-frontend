import {
  Component,
  Inject,
  InjectionToken,
  Injector,
  Type,
} from '@angular/core';
import {
  SOLID_SKELETON_CONFIG,
  InternalSolidSkeletonConfig,
} from '../../solid-skeleton-config';
import { MenuState } from '../../state/menu.state';
import { Observable } from 'rxjs';
import { MenuItem } from '../../state/menu.model';
import { Select } from '@ngxs/store';
import { MessageState } from '../../state/message.state';
import { MessageModel } from '../../state/message.model';
import {
  FeedbackService,
  SOLID_SKELETON_FEEDBACK_SERVICE,
} from '../../services/feedback.service';

export const SOLID_SKELETON_HACKY_INJECTION = new InjectionToken<() => void>(
  'solid-skeleton-hacky-injection'
);

@Component({
  selector: 'solid-skeleton-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  public BannerComponent?: Type<any>;
  public BannerInjector: Injector;
  public ShowLanding = false;

  @Select(MenuState.getLandingItems)
  public MenuItems!: Observable<MenuItem[]>;

  @Select(MessageState.getNoticesAndSeries)
  public Notices!: Observable<MessageModel[]>;
  limitedMessages!: MessageModel[];

  constructor(
    @Inject(SOLID_SKELETON_CONFIG) cfg: InternalSolidSkeletonConfig,
    @Inject(SOLID_SKELETON_FEEDBACK_SERVICE) public feedback: FeedbackService,
    injector: Injector
  ) {
    this.BannerComponent = cfg.landingBannerContent;
    this.BannerInjector = Injector.create({
      providers: [
        {
          provide: SOLID_SKELETON_HACKY_INJECTION,
          useValue: () => this.onCloseClick(),
        },
      ],
      parent: injector,
    });
    if (localStorage.getItem('hide_landing') !== 'true') {
      this.ShowLanding = true;
    }
    this.limitMessages();
  }

  private onCloseClick() {
    this.ShowLanding = false;
    localStorage.setItem('hide_landing', 'true');
  }

  private limitMessages() {
    this.Notices.subscribe((message) => {
      this.limitedMessages = message.slice(0, 2);
      return this.limitedMessages;
    });
  }
}
