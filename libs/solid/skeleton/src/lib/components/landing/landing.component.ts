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
import { Navigate } from '@ngxs/router-plugin';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SolidCoreConfig, SOLID_CORE_CONFIG } from '@zentrumnawi/solid-core';

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
    @Inject(SOLID_CORE_CONFIG) public coreConfig: SolidCoreConfig,
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
    // testing - still need to be modified
    setTimeout(() => {
      this.introService.guidedTour((_targetElement: any) => {
        const id = _targetElement.id;
        const landing = this.Landing?.nativeElement;
        const menuOffSetTop =
          document.getElementById('menu-grid-list')?.offsetTop;
        const settingIndex = this.coreConfig.guidedTour.data.settingTabIndex;
        if (id.slice(0, 9) == 'menu-tile' || id == 'feedback') {
          if (menuOffSetTop) landing.scrollTop = menuOffSetTop - 50;
        } else if (id == 'reportButton') {
          this.navigateTo('/info');
          setTimeout(() => {
            for (let i = 0; i < settingIndex; ++i) {
              const settingTab = document.getElementById(
                'mat-tab-label-' + i + '-' + settingIndex
              );
              if (settingTab) settingTab.click();
            }
          }, 400);
          setTimeout(() => {
            this.introService.introJS.refresh(true);
          }, 1000);
        } else if (id == 'glossary') {
          this.navigateTo('/');
        } else if (id == 'menu') {
          this.introService.introJS.refresh(false);
        }
        return;
      });
    }, 1000);
  }

  @Dispatch()
  public async navigateTo(url: string) {
    return new Navigate([url]);
  }
}
