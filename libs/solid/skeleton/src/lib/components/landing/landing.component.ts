import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  Injector,
  Type,
  ViewChild,
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
import { IntroService } from '../../services/intro.service';

export const SOLID_SKELETON_HACKY_INJECTION = new InjectionToken<() => void>(
  'solid-skeleton-hacky-injection'
);

@Component({
  selector: 'solid-skeleton-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements AfterViewInit {
  public BannerComponent?: Type<any>;
  public BannerInjector: Injector;
  public ShowLanding = false;

  @Select(MenuState.getLandingItems)
  public MenuItems!: Observable<MenuItem[]>;

  @Select(MessageState.getNoticesAndSeries)
  public Notices!: Observable<MessageModel[]>;
  limitedMessages!: MessageModel[];

  @ViewChild('landing') Landing?: ElementRef;

  constructor(
    @Inject(SOLID_SKELETON_CONFIG) cfg: InternalSolidSkeletonConfig,
    @Inject(SOLID_SKELETON_FEEDBACK_SERVICE) public feedback: FeedbackService,
    injector: Injector,
    private introService: IntroService
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

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.introService.guidedTour((_targetElement: any) => {
        const landing = this.Landing?.nativeElement;
        const menuOffSetTop =
          document.getElementById('menu-grid-list')?.offsetTop;
        if (_targetElement.id == 'menu-tile-0') {
          if (menuOffSetTop) landing.scrollTop = menuOffSetTop - 50;
        }
        if (_targetElement.id == '') {
          if (menuOffSetTop) landing.scrollTop = 0;
        }
        return;
      });
    }, 1000);
  }
}
